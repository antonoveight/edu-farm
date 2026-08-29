import path from 'path';
import { RequestValidationError } from './request-validation.js';

export function resolvePathWithinBase(basePath, candidatePath) {
    const resolvedBase = path.resolve(basePath);
    const resolvedCandidate = path.resolve(resolvedBase, candidatePath);
    const relativePath = path.relative(resolvedBase, resolvedCandidate);
    const escapesBase = relativePath === '..'
        || relativePath.startsWith(`..${path.sep}`)
        || path.isAbsolute(relativePath);

    if (escapesBase) {
        throw new RequestValidationError('Resolved path must remain within grade directory');
    }

    return resolvedCandidate;
}
