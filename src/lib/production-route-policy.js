const NOT_FOUND_BODY = Object.freeze({ error: 'Not Found' });

export function isCompilerDisabled(nodeEnv) {
    return nodeEnv === 'production';
}

export function compilerDisabledResponse() {
    return Response.json(NOT_FOUND_BODY, { status: 404 });
}
