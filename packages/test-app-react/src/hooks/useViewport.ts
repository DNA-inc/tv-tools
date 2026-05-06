import { useSyncExternalStore } from 'react';

export type Viewport = {
	width: number;
	height: number;
};

const getViewport = (): Viewport => {
	if (typeof window === 'undefined') {
		return { width: 0, height: 0 };
	}

	return {
		width: window.innerWidth,
		height: window.innerHeight,
	};
};

let viewport = getViewport();
const listeners = new Set<() => void>();

const notifyListeners = () => {
	const nextViewport = getViewport();
	if (
		nextViewport.width === viewport.width &&
		nextViewport.height === viewport.height
	) {
		return;
	}
	viewport = nextViewport;
	listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
	listeners.add(listener);

	if (listeners.size === 1 && typeof window !== 'undefined') {
		window.addEventListener('resize', notifyListeners);
		window.addEventListener('orientationchange', notifyListeners);
	}

	return () => {
		listeners.delete(listener);
		if (listeners.size === 0 && typeof window !== 'undefined') {
			window.removeEventListener('resize', notifyListeners);
			window.removeEventListener('orientationchange', notifyListeners);
		}
	};
};

const getSnapshot = () => viewport;
const getServerSnapshot = (): Viewport => ({ width: 0, height: 0 });

export const useViewport = () =>
	useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
