import { type ScssDynamicTokenBinding, tokens } from '../Theme/tokens';

/** @config — Detail poster dimensions; consumed by DetailPoster SCSS and detail pages. */
export const detailPosterConfig = {
	widthColumns: 13,
	heightRows: 9,
	imageWidthPx: 13 * tokens.typography.column.px,
} as const;

export const detailPosterScssBinding: ScssDynamicTokenBinding = {
	moduleBaseName: 'config',
	folder: 'DetailPoster',
	getValues: () => ({
		widthColumns: { unitless: detailPosterConfig.widthColumns },
		heightRows: { unitless: detailPosterConfig.heightRows },
	}),
};
