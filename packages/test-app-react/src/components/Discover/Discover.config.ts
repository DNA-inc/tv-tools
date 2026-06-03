import {
	computeListNavigation,
	LIST_SCROLL_FIRST_DIVISOR,
} from '../Theme/computeListNavigation';
import { tokens } from '../Theme/tokens';

/** @config — Discover grid layout and data prefetch; consumed by Discover.tsx. */
const verticalStep = tokens.tile.height.px + tokens.tile.margin.px;

const navigation = computeListNavigation({
	screen: tokens.screen.height.px,
	step: verticalStep,
	margin: tokens.tile.margin.px,
});

export const discoverConfig = {
	grid: {
		columns: 6,
		visibleGroups: navigation.visible,
		navigatableGroups: navigation.navigatable,
		scrolling: {
			first: tokens.tile.height.px / LIST_SCROLL_FIRST_DIVISOR,
			other: tokens.tile.height.px,
		},
	},
	pagination: {
		offsetRows: 2,
		initialVisibleRows: 6,
	},
} as const;

export const discoverPaginationOffset =
	discoverConfig.pagination.offsetRows * discoverConfig.grid.columns;

export const discoverInitialVisibleData =
	discoverConfig.pagination.initialVisibleRows *
	discoverConfig.grid.columns;
