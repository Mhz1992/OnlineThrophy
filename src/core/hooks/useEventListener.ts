import { useEffect, useRef } from 'react';

import type { RefObject } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

function useEventListener<K extends keyof MediaQueryListEventMap>(
    _eventName: K,
    _handler: (_event: MediaQueryListEventMap[K]) => void,
    _element: RefObject<MediaQueryList>,
    _options?: boolean | AddEventListenerOptions,
): void;

function useEventListener<K extends keyof WindowEventMap>(
    _eventName: K,
    _handler: (_event: WindowEventMap[K]) => void,
    _element?: undefined,
    _options?: boolean | AddEventListenerOptions,
): void;

function useEventListener<
    K extends keyof HTMLElementEventMap & keyof SVGElementEventMap,
    T extends Element = K extends keyof HTMLElementEventMap ? HTMLDivElement : SVGElement,
>(
    _eventName: K,
    _handler: ((_event: HTMLElementEventMap[K]) => void) | ((_event: SVGElementEventMap[K]) => void),
    _element: RefObject<T>,
    _options?: boolean | AddEventListenerOptions,
): void;

function useEventListener<K extends keyof DocumentEventMap>(
    _eventName: K,
    _handler: (_event: DocumentEventMap[K]) => void,
    _element: RefObject<Document>,
    _options?: boolean | AddEventListenerOptions,
): void;

function useEventListener<
    KW extends keyof WindowEventMap,
    KH extends keyof HTMLElementEventMap & keyof SVGElementEventMap,
    KM extends keyof MediaQueryListEventMap,
    T extends HTMLElement | SVGAElement | MediaQueryList = HTMLElement,
>(
    eventName: KW | KH | KM,
    handler: (
        _event:
            | WindowEventMap[KW]
            | HTMLElementEventMap[KH]
            | SVGElementEventMap[KH]
            | MediaQueryListEventMap[KM]
            | Event,
    ) => void,
    element?: RefObject<T>,
    options?: boolean | AddEventListenerOptions,
): void {
    const savedHandler = useRef(handler);

    useIsomorphicLayoutEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const targetElement: T | Window = element?.current ?? window;

        if (!(targetElement && targetElement.addEventListener)) return;

        const listener: typeof handler = (event) => {
            savedHandler.current(event);
        };

        targetElement.addEventListener(eventName, listener, options);

        return (): void => {
            targetElement.removeEventListener(eventName, listener, options);
        };
    }, [eventName, element, options]);
}

export { useEventListener };
