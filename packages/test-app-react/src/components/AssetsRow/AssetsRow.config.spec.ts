import { assetsRowConfig } from './AssetsRow.config';

describe('AssetsRow.config (default 1920x1080 screen)', () => {
	it('list config matches expected navigation counts', () => {
		expect(assetsRowConfig.list).toEqual({
			visibleElements: 9,
			navigatableElements: 7,
			scrolling: {
				first: 270 / 1.3,
				other: 270,
			},
		});
	});
});
