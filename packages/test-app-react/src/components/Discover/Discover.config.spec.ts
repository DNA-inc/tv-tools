import {
	discoverConfig,
	discoverInitialVisibleData,
	discoverPaginationOffset,
} from './Discover.config';

describe('Discover.config (default 1920x1080 screen)', () => {
	it('grid config matches expected navigation counts', () => {
		expect(discoverConfig.grid).toEqual({
			columns: 6,
			visibleGroups: 7,
			navigatableGroups: 5,
			scrolling: {
				first: 180 / 1.3,
				other: 180,
			},
		});
	});

	it('derives pagination constants from grid columns', () => {
		expect(discoverPaginationOffset).toBe(12);
		expect(discoverInitialVisibleData).toBe(36);
	});
});
