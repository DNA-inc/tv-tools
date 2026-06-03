import { type ScssDynamicTokenBinding, tokens } from '../Theme/tokens';

/** @config — Detail panel layout and scroll landmarks; consumed by Detail SCSS and detail pages. */
export const detailConfig = {
	innerRows: 21,
	scrollLandmarkRows: {
		overview: 0,
		castAndCrew: 7,
		related: 14,
	},
} as const;

export const detailScrollPx = (rows: number) =>
	rows * tokens.typography.row.px;

export const detailScssBinding: ScssDynamicTokenBinding = {
	moduleBaseName: 'config',
	folder: 'Detail',
	getValues: () => ({
		innerRows: { unitless: detailConfig.innerRows },
	}),
};
