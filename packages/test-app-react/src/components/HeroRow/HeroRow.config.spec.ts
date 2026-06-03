import { heroRowConfig, heroRowScssBinding } from './HeroRow.config';

describe('HeroRow.config (default 1920x1080 screen)', () => {
	it('list config matches expected navigation counts', () => {
		expect(heroRowConfig.list).toEqual({
			visibleElements: 5,
			navigatableElements: 2,
			scrolling: {
				first: 1065 / 1.3,
				other: 1065,
			},
		});
	});

	it('scss binding exposes the same values via getValues', () => {
		expect(heroRowScssBinding.getValues()).toEqual({
			visibleElements: { unitless: 5 },
			step: { px: 1065 },
		});
	});
});
