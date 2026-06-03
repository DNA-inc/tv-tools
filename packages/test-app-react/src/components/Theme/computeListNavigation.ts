/** Scroll distance multiplier for the first step in list/grid carousels. */
export const LIST_SCROLL_FIRST_DIVISOR = 1.3;

/**
 * Compute the navigatable / visible counts for a 1-D virtualized list
 * from the screen dimension and the rendered item dimensions.
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
