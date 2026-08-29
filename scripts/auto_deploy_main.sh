#!/usr/bin/env bash
set -Eeuo pipefail

DEPLOY_DIR="${TOANVUI_DEPLOY_DIR:-/home/khaidinh/deployments/toanvui.tinhocsaoviet.com}"
STATE_DIR="${TOANVUI_STATE_DIR:-/home/khaidinh/.local/state/toanvui-auto-deploy}"
COMPOSE_FILE="${DEPLOY_DIR}/docker-compose.vps.yml"
HEALTH_URL="https://toanvui.tinhocsaoviet.com/api/health"
GITHUB_CHECKS_URL="https://api.github.com/repos/antonoveight/edu-farm/commits"

mkdir -p "$STATE_DIR"
exec 9>"${STATE_DIR}/deploy.lock"
flock -n 9 || exit 0

log() {
    printf '[%s] %s\n' "$(date --iso-8601=seconds)" "$*"
}

read_state() {
    local state_file="$1"
    if [[ -f "$state_file" ]]; then
        tr -d '[:space:]' < "$state_file"
    fi
}

record_state() {
    local state_file="$1"
    local value="$2"
    printf '%s\n' "$value" > "$state_file"
}

rollback_image() {
    local previous_image="$1"
    if [[ -n "$previous_image" ]]; then
        log "Rolling back to image ${previous_image}"
        docker image tag "$previous_image" toanvui-edu-farm:production
        docker compose -f "$COMPOSE_FILE" up -d --no-build --force-recreate
    fi
}

cd "$DEPLOY_DIR"
git fetch --quiet origin main

target_sha="$(git rev-parse origin/main)"
deployed_sha="$(read_state "${STATE_DIR}/deployed-sha")"
failed_sha="$(read_state "${STATE_DIR}/failed-sha")"

if [[ "$target_sha" == "$deployed_sha" ]]; then
    exit 0
fi

if [[ "$target_sha" == "$failed_sha" ]]; then
    log "Skipping previously failed commit ${target_sha}"
    exit 0
fi

checks_payload="$(curl --fail --silent --show-error \
    -H 'Accept: application/vnd.github+json' \
    -H 'X-GitHub-Api-Version: 2022-11-28' \
    "${GITHUB_CHECKS_URL}/${target_sha}/check-runs")"

quality_state="$(printf '%s' "$checks_payload" | node -e '
let input = "";
process.stdin.on("data", chunk => input += chunk);
process.stdin.on("end", () => {
  const payload = JSON.parse(input);
  const check = (payload.check_runs || []).find(item => item.name === "quality");
  if (!check || check.status !== "completed") process.stdout.write("pending");
  else process.stdout.write(check.conclusion === "success" ? "success" : "failure");
});
')"

case "$quality_state" in
    pending)
        log "Quality check is not complete for ${target_sha}"
        exit 0
        ;;
    failure)
        log "Quality check failed for ${target_sha}; deployment blocked"
        record_state "${STATE_DIR}/failed-sha" "$target_sha"
        exit 1
        ;;
esac

git switch --quiet main
git merge --ff-only origin/main

previous_image="$(docker inspect --format '{{.Image}}' toanvui-app 2>/dev/null || true)"
log "Deploying ${target_sha}"

if ! docker compose -f "$COMPOSE_FILE" up -d --build; then
    record_state "${STATE_DIR}/failed-sha" "$target_sha"
    rollback_image "$previous_image"
    exit 1
fi

healthy=false
for _ in $(seq 1 30); do
    if curl --fail --silent --max-time 10 "$HEALTH_URL" >/dev/null; then
        healthy=true
        break
    fi
    sleep 2
done

if [[ "$healthy" != true ]]; then
    log "Health check failed for ${target_sha}"
    record_state "${STATE_DIR}/failed-sha" "$target_sha"
    rollback_image "$previous_image"
    exit 1
fi

record_state "${STATE_DIR}/deployed-sha" "$target_sha"
: > "${STATE_DIR}/failed-sha"
log "Deployment completed for ${target_sha}"
