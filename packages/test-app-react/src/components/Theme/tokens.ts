/**
 * A token value is a single-entry object whose key is the CSS unit and
 * whose value is the raw number (e.g. `{ px: 1920 }` → `1920px` in SCSS).
 *
 * Aliased units:
 * - `unitless` → no CSS unit (e.g. `{ unitless: 5 }` → `5`)
 * - `percent`  → `%` (e.g. `{ percent: 50 }` → `50%`)
 */
export type TokenValue = { [unit: string]: number };

export type ThemeTokens = {
	[namespace: string]: { [name: string]: TokenValue };
};

export const tokens = {
	screen: {
		width: { px: 1920 },
		height: { px: 1080 },
	},
	typography: {
		row: { px: 30 },
		column: { px: 15 },
		font: { px: 25 },
	},
	hero: {
		width: { px: 990 },
		height: { px: 570 },
		margin: { px: 75 },
		step: { px: 1065 },
		imageWidth: { px: 960 },
		imageHeight: { px: 450 },
	},
	tile: {
		width: { px: 240 },
		height: { px: 180 },
		personHeight: { px: 240 },
		margin: { px: 30 },
		step: { px: 270 },
		imageWidth: { px: 210 },
		imageHeight: { px: 120 },
		personImageHeight: { px: 150 },
	},
	menu: {
		closedColumns: { unitless: 4 },
		openColumns: { unitless: 20 },
	},
	theme: {
		transitionMs: { ms: 300 },
	},
} as const satisfies ThemeTokens;

/**
 * Maps SCSS `@use` targets (path basename without `_`) to a token group.
 *
 * Example: `@use '../Typography/sizes'` loads `tokens.typography`, because the
 * file basename `sizes` is listed here with `tokensKey: 'typography'`.
 */
export const scssTokenBindings = [
	{ moduleBaseName: 'screen', folder: 'Theme', tokensKey: 'screen' },
	{
		moduleBaseName: 'sizes',
		folder: 'Typography',
		tokensKey: 'typography',
	},
	{ moduleBaseName: 'variables', folder: 'Hero', tokensKey: 'hero' },
	{ moduleBaseName: 'variables', folder: 'Tile', tokensKey: 'tile' },
	{ moduleBaseName: 'variables', folder: 'Theme', tokensKey: 'theme' },
	{ moduleBaseName: 'widths', folder: 'Menu', tokensKey: 'menu' },
] as const satisfies ReadonlyArray<{
	moduleBaseName: string;
	folder: string;
	tokensKey: keyof typeof tokens;
}>;

/**
 * Binding for an SCSS `@use` target whose contents are derived from
 * runtime values (e.g. list/grid configurations that depend on screen
 * size and are computed in TypeScript). Complements `scssTokenBindings`
 * for cases where the values are not statically known under `tokens`.
 *
 * `getValues` is invoked by the Sass importer when the matching module
 * is resolved.
 */
export interface ScssDynamicTokenBinding {
	moduleBaseName: string;
	folder: string;
	getValues: () => Record<string, TokenValue>;
}
