import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { CanonicalizeContext, Importer } from 'sass';
import { tokens } from './src/components/Theme/tokens';

const THEME_DIR = path.resolve(__dirname, 'src/components/Theme');
const VIRTUAL_QUERY = 'tv-tools-theme-tokens';

const namespaceFromUrl = (resolved: string): string | null => {
	if (path.dirname(resolved) !== THEME_DIR) return null;
	const base = path.basename(resolved, path.extname(resolved));
	const namespace = base.startsWith('_') ? base.slice(1) : base;
	return namespace in tokens ? namespace : null;
};

const renderModule = (entries: Record<string, string>) =>
	Object.entries(entries)
		.map(([name, value]) => `$${name}: ${value};`)
		.join('\n') + '\n';

const buildVirtualUrl = (namespace: string): URL => {
	const url = pathToFileURL(path.join(THEME_DIR, `_${namespace}.scss`));
	url.search = VIRTUAL_QUERY;
	return url;
};

/**
 * Custom Sass importer so `@use '../Theme/<namespace>'` resolves to variables
 * sourced from `tokens.ts` (single source of truth for TS + SCSS).
 *
 * Any top-level key in `tokens` is exposed as a virtual SCSS module under the
 * `Theme/` directory with its entries as Sass variables.
 */
export const themeImporter: Importer<'sync'> = {
	canonicalize(url: string, context: CanonicalizeContext) {
		const containing = context.containingUrl
			? fileURLToPath(context.containingUrl)
			: '';
		const resolved = path.resolve(
			containing ? path.dirname(containing) : THEME_DIR,
			url,
		);
		const namespace = namespaceFromUrl(resolved);
		return namespace ? buildVirtualUrl(namespace) : null;
	},
	load(canonicalUrl) {
		if (canonicalUrl.search !== `?${VIRTUAL_QUERY}`) return null;
		const namespace = path
			.basename(fileURLToPath(canonicalUrl), '.scss')
			.replace(/^_/, '');
		const entries = (tokens as Record<string, Record<string, string>>)[
			namespace
		];
		if (!entries) return null;
		return {
			contents: renderModule(entries),
			syntax: 'scss',
		};
	},
};
