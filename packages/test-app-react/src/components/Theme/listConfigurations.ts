import { type ScssDynamicTokenBinding, tokens } from './tokens';

/**
 * Compute the navigatable / visible counts for a 1-D virtualized list
 * from the screen dimension and the rendered item dimensions.
 *
 * - `navigatable` — how many positions the user can land on while the
 *   list stays anchored before it starts scrolling.
 * - `visible` — how many items are rendered (`navigatable + 2`, plus an
 *   extra buffer when a single step spans more than half the screen).
 */
export function computeListNavigation({
	screen,
	step,
	margin,
}: {
	screen: number;
	step: number;
	margin: number;
}): { navigatable: number; visible: number } {
	const navigatable = Math.ceil((screen - margin) / step);
	const visible = navigatable + 2 + (step * 2 > screen ? 1 : 0);
	return { navigatable, visible };
}

const heroRowNavigation = computeListNavigation({
	screen: tokens.screen.width.px,
	step: tokens.hero.step.px,
	margin: tokens.hero.margin.px,
});

const assetsRowNavigation = computeListNavigation({
	screen: tokens.screen.width.px,
	step: tokens.tile.step.px,
	margin: tokens.tile.margin.px,
});

const heroRowListScss = {
	visibleElements: heroRowNavigation.visible,
	step: tokens.hero.step.px,
} as const;

const assetsRowListScss = {
	visibleElements: assetsRowNavigation.visible,
	step: tokens.tile.step.px,
} as const;

/**
 * SCSS bindings derived from computed list dimensions. Row stylesheets
 * `@use './list' as heroList;` and read `heroList.$visible-elements` /
 * `heroList.$step`, which the Sass importer fills in via `getValues`.
 */
export const scssDynamicTokenBindings: ReadonlyArray<ScssDynamicTokenBinding> =
	[
		{
			moduleBaseName: 'list',
			folder: 'HeroRow',
			getValues: () => ({
				visibleElements: {
					unitless: heroRowListScss.visibleElements,
				},
				step: { px: heroRowListScss.step },
			}),
		},
		{
			moduleBaseName: 'list',
			folder: 'AssetsRow',
			getValues: () => ({
				visibleElements: {
					unitless: assetsRowListScss.visibleElements,
				},
				step: { px: assetsRowListScss.step },
			}),
		},
	];

export const heroRowListScssTokens = heroRowListScss;
export const assetsRowListScssTokens = assetsRowListScss;
