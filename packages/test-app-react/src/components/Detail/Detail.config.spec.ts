import { detailConfig, detailScssBinding } from './Detail.config';

describe('Detail.config', () => {
	it('precomputes scroll landmark px from typography row size', () => {
		expect(detailConfig.scrollLandmarksPx).toEqual({
			overview: 0,
			castAndCrew: 210,
			related: 420,
		});
	});

	it('scss binding exposes inner rows via getValues', () => {
		expect(detailScssBinding.getValues()).toEqual({
			innerRows: { unitless: 21 },
		});
	});
});
