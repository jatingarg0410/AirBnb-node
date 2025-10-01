import {v4 as uuidV4} from 'uuid';

export function generateIdempotencyKey(): string {
    return uuidV4();
}