import { computeListNavigation } from './computeListNavigation';

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
