import { type ScssDynamicTokenBinding, tokens } from './tokens';

/** Scroll distance multiplier for the first step in list/grid carousels. */
export const LIST_SCROLL_FIRST_DIVISOR = 1.3;

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

const discoverGridVerticalStep = tokens.tile.height.px + tokens.tile.margin.px;

const discoverGridNavigation = computeListNavigation({
	screen: tokens.screen.height.px,
	step: discoverGridVerticalStep,
	margin: tokens.tile.margin.px,
});

export const heroRowListConfiguration = {
	visibleElements: heroRowNavigation.visible,
	navigatableElements: heroRowNavigation.navigatable,
	scrolling: {
		first: tokens.hero.step.px / LIST_SCROLL_FIRST_DIVISOR,
		other: tokens.hero.step.px,
	},
} as const;

export const assetsRowListConfiguration = {
	visibleElements: assetsRowNavigation.visible,
	navigatableElements: assetsRowNavigation.navigatable,
	scrolling: {
		first: tokens.tile.step.px / LIST_SCROLL_FIRST_DIVISOR,
		other: tokens.tile.step.px,
	},
} as const;

export const discoverGridConfiguration = {
	columns: 6,
	visibleGroups: discoverGridNavigation.visible,
	navigatableGroups: discoverGridNavigation.navigatable,
	scrolling: {
		first: tokens.tile.height.px / LIST_SCROLL_FIRST_DIVISOR,
		other: tokens.tile.height.px,
	},
} as const;

/**
 * SCSS bindings derived from the list configurations above. Row
 * stylesheets `@use './list'` and read `$visible-elements` / `$step`.
 */
export const scssDynamicTokenBindings: ReadonlyArray<ScssDynamicTokenBinding> =
	[
		{
			moduleBaseName: 'list',
			folder: 'HeroRow',
			getValues: () => ({
				visibleElements: {
					unitless: heroRowListConfiguration.visibleElements,
				},
				step: { px: heroRowListConfiguration.scrolling.other },
			}),
		},
		{
			moduleBaseName: 'list',
			folder: 'AssetsRow',
			getValues: () => ({
				visibleElements: {
					unitless: assetsRowListConfiguration.visibleElements,
				},
				step: { px: assetsRowListConfiguration.scrolling.other },
			}),
		},
	];
