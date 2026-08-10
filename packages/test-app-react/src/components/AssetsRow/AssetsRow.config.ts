import {
	LIST_SCROLL_FIRST_DIVISOR,
	computeListNavigation,
} from '../Theme/computeListNavigation';
import { tokens } from '../Theme/tokens';

/** @config — AssetsRow list layout and pagination; consumed by AssetsRow.tsx. */
const navigation = computeListNavigation({
	screen: tokens.screen.width.px,
	step: tokens.tile.step.px,
	margin: tokens.tile.margin.px,
});

export const assetsRowConfig = {
	paginationOffset: 3,
	list: {
		visibleElements: navigation.visible,
		navigatableElements: navigation.navigatable,
		scrolling: {
			first: tokens.tile.step.px / LIST_SCROLL_FIRST_DIVISOR,
			other: tokens.tile.step.px,
		},
	},
} as const;
