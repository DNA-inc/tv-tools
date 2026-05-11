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
] as const satisfies ReadonlyArray<{
	moduleBaseName: string;
	folder: string;
	tokensKey: keyof typeof tokens;
}>;
