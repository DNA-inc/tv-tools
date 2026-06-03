import { type ScssDynamicTokenBinding, tokens } from '../Theme/tokens';

/** @config — Modal layout insets; consumed by Modal.module.scss. */
export const modalConfig = {
	padding: {
		verticalColumns: 3,
		horizontalColumns: 6,
	},
	contentHeightRows: 23,
	small: {
		verticalRows: 12,
		horizontalColumns: 40,
	},
	large: {
		verticalRows: 5,
		horizontalColumns: tokens.menu.openColumns.unitless,
	},
} as const;

export const modalScssBinding: ScssDynamicTokenBinding = {
	moduleBaseName: 'config',
	folder: 'Modal',
	getValues: () => ({
		paddingVerticalColumns: {
			unitless: modalConfig.padding.verticalColumns,
		},
		paddingHorizontalColumns: {
			unitless: modalConfig.padding.horizontalColumns,
		},
		contentHeightRows: { unitless: modalConfig.contentHeightRows },
		smallVerticalRows: { unitless: modalConfig.small.verticalRows },
		smallHorizontalColumns: {
			unitless: modalConfig.small.horizontalColumns,
		},
		largeVerticalRows: { unitless: modalConfig.large.verticalRows },
		largeHorizontalColumns: {
			unitless: modalConfig.large.horizontalColumns,
		},
	}),
};
