import {
	detailConfig,
	detailScrollPx,
	detailScssBinding,
} from './Detail.config';

describe('Detail.config', () => {
	it('scroll landmarks sum to inner panel rows', () => {
		expect(detailConfig.innerRows).toBe(21);
		expect(detailConfig.scrollLandmarkRows.related).toBe(14);
	});

	it('detailScrollPx converts row counts using typography tokens', () => {
		expect(
			detailScrollPx(detailConfig.scrollLandmarkRows.castAndCrew),
		).toBe(210);
	});

	it('scss binding exposes inner rows via getValues', () => {
		expect(detailScssBinding.getValues()).toEqual({
			innerRows: { unitless: 21 },
		});
	});
});
