import { heroRowConfig } from './HeroRow.config';

describe('HeroRow.config (default 1920x1080 screen)', () => {
	it('list config matches expected navigation counts', () => {
		expect(heroRowConfig.list).toEqual({
			visibleElements: 5,
			navigatableElements: 2,
			scrolling: {
				first: 1065,
				other: 1065,
			},
		});
	});
});
