import { prettyPrint } from '@/src/core/utils/prettyPrint';

export function logDebug(logData: unknown): void {
    const isDebug = process.env.DEBUG === 'true';

    if (!isDebug) return;
    prettyPrint(logData);
}
