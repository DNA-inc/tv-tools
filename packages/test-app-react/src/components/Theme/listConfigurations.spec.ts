import {
	assetsRowListConfiguration,
	computeListNavigation,
	discoverGridConfiguration,
	heroRowListConfiguration,
	scssDynamicTokenBindings,
} from './listConfigurations';

describe('listConfigurations (default 1920x1080 screen)', () => {
	it('hero row list config matches computed navigation counts', () => {
		expect(heroRowListConfiguration).toEqual({
			visibleElements: 5,
			navigatableElements: 2,
			scrolling: {
				first: 1065 / 1.3,
				other: 1065,
			},
		});
	});

	it('assets row list config matches computed navigation counts', () => {
		expect(assetsRowListConfiguration).toEqual({
			visibleElements: 9,
			navigatableElements: 7,
			scrolling: {
				first: 270 / 1.3,
				other: 270,
			},
		});
	});

	it('discover grid config matches computed navigation counts', () => {
		expect(discoverGridConfiguration).toEqual({
			columns: 6,
			visibleGroups: 7,
			navigatableGroups: 5,
			scrolling: {
				first: 180 / 1.3,
				other: 180,
			},
		});
	});

	it('scssDynamicTokenBindings expose the same values via getValues', () => {
		const heroBinding = scssDynamicTokenBindings.find(
			(b) => b.folder === 'HeroRow',
		);
		const assetsBinding = scssDynamicTokenBindings.find(
			(b) => b.folder === 'AssetsRow',
		);

		expect(heroBinding?.getValues()).toEqual({
			visibleElements: { unitless: 5 },
			step: { px: 1065 },
		});
		expect(assetsBinding?.getValues()).toEqual({
			visibleElements: { unitless: 9 },
			step: { px: 270 },
		});
	});
});

describe('computeListNavigation', () => {
	it('uses navigatable + 2 when several tiles fit on screen', () => {
		expect(
			computeListNavigation({ screen: 1920, step: 270, margin: 30 }),
		).toEqual({ navigatable: 7, visible: 9 });
	});

	it('adds an extra buffer slot when a single tile spans more than half the screen', () => {
		expect(
			computeListNavigation({ screen: 1920, step: 1065, margin: 75 }),
		).toEqual({ navigatable: 2, visible: 5 });
	});

	it('rounds up so a peeking tile is still navigatable', () => {
		expect(
			computeListNavigation({ screen: 1080, step: 210, margin: 30 }),
		).toEqual({ navigatable: 5, visible: 7 });
	});
});
