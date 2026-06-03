import {
	LIST_SCROLL_FIRST_DIVISOR,
	computeListNavigation,
} from '../Theme/computeListNavigation';
import { type ScssDynamicTokenBinding, tokens } from '../Theme/tokens';

/** @config — HeroRow list layout; consumed by HeroRow.tsx and @use './list' in SCSS. */
const navigation = computeListNavigation({
	screen: tokens.screen.width.px,
	step: tokens.hero.step.px,
	margin: tokens.hero.margin.px,
});

export const heroRowConfig = {
	list: {
		visibleElements: navigation.visible,
		navigatableElements: navigation.navigatable,
		scrolling: {
			first: tokens.hero.step.px / LIST_SCROLL_FIRST_DIVISOR,
			other: tokens.hero.step.px,
		},
	},
} as const;

export const heroRowScssBinding: ScssDynamicTokenBinding = {
	moduleBaseName: 'list',
	folder: 'HeroRow',
	getValues: () => ({
		visibleElements: { unitless: heroRowConfig.list.visibleElements },
		step: { px: heroRowConfig.list.scrolling.other },
	}),
};
