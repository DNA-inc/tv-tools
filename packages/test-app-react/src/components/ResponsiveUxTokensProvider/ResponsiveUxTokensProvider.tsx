import {
	type PropsWithChildren,
	createContext,
	useContext,
	useMemo,
} from 'react';
import { useViewport } from '../../hooks/useViewport';

export type ResponsiveUxTokens = {
	viewport: {
		width: number;
		height: number;
	};
	orientation: 'landscape' | 'portrait';
	scale: number;
	tileWidth: number;
	tileHeight: number;
	gap: number;
	carouselWidth: number;
	numberOfTilesInCarousel: number;
	heroTileWidth: number;
	numberOfTilesInHeroCarousel: number;
};

const DESIGN_VIEWPORT = {
	width: 1920,
	height: 1080,
} as const;

const DESIGN_TOKENS = {
	tileWidth: 16 * 15,
	tileHeight: 6 * 30,
	gap: 2 * 15,
	screenLeftOffset: 105,
	heroTileWidth: 66 * 15,
	carouselWidth: 66 * 15,
} as const;

const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));

const DEFAULT_TOKENS: ResponsiveUxTokens = {
	viewport: DESIGN_VIEWPORT,
	orientation: 'landscape',
	scale: 1,
	tileWidth: DESIGN_TOKENS.tileWidth,
	tileHeight: DESIGN_TOKENS.tileHeight,
	gap: DESIGN_TOKENS.gap,
	carouselWidth: DESIGN_TOKENS.carouselWidth,
	numberOfTilesInCarousel: 7,
	heroTileWidth: DESIGN_TOKENS.heroTileWidth,
	numberOfTilesInHeroCarousel: 2,
};

const ResponsiveUxTokensContext =
	createContext<ResponsiveUxTokens>(DEFAULT_TOKENS);

export const ResponsiveUxTokensProvider = ({ children }: PropsWithChildren) => {
	const viewport = useViewport();

	const value = useMemo<ResponsiveUxTokens>(() => {
		// Use design viewport as a safe fallback during initial render.
		const width =
			(viewport.width || DESIGN_VIEWPORT.width) -
			DESIGN_TOKENS.screenLeftOffset;
		const height = viewport.height || DESIGN_VIEWPORT.height;
		const orientation = width >= height ? 'landscape' : 'portrait';

		// Scaling if needed - currently not scaling
		const scaleX = width / DESIGN_VIEWPORT.width;
		const scaleY = height / DESIGN_VIEWPORT.height;
		const scale = clamp(Math.min(scaleX, scaleY), 0.6, 1.8);

		const tileWidth = Math.round(DESIGN_TOKENS.tileWidth);
		const tileHeight = Math.round(DESIGN_TOKENS.tileHeight);
		const gap = Math.round(DESIGN_TOKENS.gap);
		const heroTileWidth = Math.round(DESIGN_TOKENS.heroTileWidth);
		const carouselWidth = Math.round(
			clamp(width * 0.66, DESIGN_TOKENS.carouselWidth * 0.75, width),
		);
		const numberOfTilesInCarousel = Math.max(
			1,
			Math.floor(width / Math.max(1, tileWidth + gap)),
		);
		const numberOfTilesInHeroCarousel = clamp(
			Math.round(width / Math.max(1, heroTileWidth)),
			1,
			2,
		);

		return {
			viewport: { width, height },
			orientation,
			scale,
			tileWidth,
			tileHeight,
			gap,
			carouselWidth,
			numberOfTilesInCarousel,
			heroTileWidth,
			numberOfTilesInHeroCarousel,
		};
	}, [viewport.height, viewport.width]);

	return (
		<ResponsiveUxTokensContext.Provider value={value}>
			{children}
		</ResponsiveUxTokensContext.Provider>
	);
};

export const useResponsiveUxTokens = () =>
	useContext(ResponsiveUxTokensContext);
