export type ThemeTokens = {
	[namespace: string]: { [name: string]: string };
};

export const tokens = {
	screen: {
		width: '1920px',
		height: '1080px',
	},
} as const satisfies ThemeTokens;
