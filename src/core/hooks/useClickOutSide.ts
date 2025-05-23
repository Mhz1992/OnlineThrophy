import type { RefObject } from 'react';
import { useEventListener } from './useEventListener';

type EventType = 'mousedown' | 'mouseup' | 'touchstart' | 'touchend' | 'focusin' | 'focusout';

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
    ref: RefObject<T | null> | RefObject<T | null>[], // Changed type to allow null
    handler: (_event: MouseEvent | TouchEvent | FocusEvent) => void,
    eventType: EventType = 'mousedown',
    eventListenerOptions: AddEventListenerOptions = {},
): void => {
    useEventListener(
        eventType,
        (event) => {
            const target = event.target as Node;

            if (!target || !target.isConnected) {
                return;
            }

            const isOutside = Array.isArray(ref)
                ? ref
                      .filter((item) => Boolean(item.current))
                      .every((item) => item.current && !item.current.contains(target))
                : ref.current && !ref.current.contains(target);

            if (isOutside) {
                handler(event);
            }
        },
        undefined,
        eventListenerOptions,
    );
};
