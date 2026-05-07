export type ThemeTokens = {
	[namespace: string]: { [name: string]: string };
};

export const screen = {
	width: 1920,
	height: 1080,
};

export const tokens = {
	screen: {
		width: `${screen.width}px`,
		height: `${screen.height}px`,
	},
} as const satisfies ThemeTokens;
