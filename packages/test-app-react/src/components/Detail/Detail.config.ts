import { type ScssDynamicTokenBinding, tokens } from '../Theme/tokens';

/** @config — Detail panel layout and scroll landmarks; consumed by Detail SCSS and detail pages. */
export const detailConfig = {
	innerRows: 21,
	scrollLandmarksPx: {
		overview: 0,
		castAndCrew: 7 * tokens.typography.row.px,
		related: 14 * tokens.typography.row.px,
	},
} as const;

export const detailScssBinding: ScssDynamicTokenBinding = {
	moduleBaseName: 'config',
	folder: 'Detail',
	getValues: () => ({
		innerRows: { unitless: detailConfig.innerRows },
	}),
};
