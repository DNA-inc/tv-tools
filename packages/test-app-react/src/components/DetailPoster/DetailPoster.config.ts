import { type ScssDynamicTokenBinding, tokens } from '../Theme/tokens';

/** @config — Detail poster dimensions; consumed by DetailPoster SCSS and detail pages. */
export const detailPosterConfig = {
	widthColumns: 13,
	heightRows: 9,
} as const;

export const detailPosterImageWidthPx =
	detailPosterConfig.widthColumns * tokens.typography.column.px;

export const detailPosterScssBinding: ScssDynamicTokenBinding = {
	moduleBaseName: 'config',
	folder: 'DetailPoster',
	getValues: () => ({
		widthColumns: { unitless: detailPosterConfig.widthColumns },
		heightRows: { unitless: detailPosterConfig.heightRows },
	}),
};
