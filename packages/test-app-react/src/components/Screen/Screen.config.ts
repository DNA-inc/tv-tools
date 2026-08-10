import { type ScssDynamicTokenBinding } from '../Theme/tokens';

/** @config — Screen container layout; consumed by Screen.module.scss. */
export const screenLayoutConfig = {
	gutterColumns: 3,
} as const;

export const screenLayoutScssBinding: ScssDynamicTokenBinding = {
	moduleBaseName: 'config',
	folder: 'Screen',
	getValues: () => ({
		gutterColumns: { unitless: screenLayoutConfig.gutterColumns },
	}),
};
