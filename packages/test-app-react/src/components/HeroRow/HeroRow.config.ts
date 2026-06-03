import { computeListNavigation } from '../Theme/computeListNavigation';
import { tokens } from '../Theme/tokens';

/** @config — HeroRow list layout; consumed by HeroRow.tsx. */
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
			first: tokens.hero.step.px,
			other: tokens.hero.step.px,
		},
	},
} as const;
