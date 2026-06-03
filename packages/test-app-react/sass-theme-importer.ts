import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { CanonicalizeContext, Importer } from 'sass';
import { scssDynamicTokenBindings } from './src/components/Theme/scssBindings';
import {
	type ScssDynamicTokenBinding,
	type TokenValue,
	scssTokenBindings,
	tokens,
} from './src/components/Theme/tokens';

const COMPONENTS_DIR = path.resolve(__dirname, 'src/components');
const VIRTUAL_QUERY = 'tv-tools-theme-tokens';

type StaticBinding = (typeof scssTokenBindings)[number];
type ResolvedBinding =
	| { kind: 'static'; binding: StaticBinding }
	| { kind: 'dynamic'; binding: ScssDynamicTokenBinding };

const moduleBaseNameOf = (resolvedPath: string): string => {
	const rawBase = path.basename(resolvedPath, path.extname(resolvedPath));
	return rawBase.startsWith('_') ? rawBase.slice(1) : rawBase;
};

const bindingFromResolvedPath = (
	resolvedPath: string,
): ResolvedBinding | null => {
	const dir = path.dirname(resolvedPath);
	const moduleBaseName = moduleBaseNameOf(resolvedPath);
	const staticBinding = scssTokenBindings.find(
		(b) =>
			path.join(COMPONENTS_DIR, b.folder) === dir &&
			b.moduleBaseName === moduleBaseName,
	);
	if (staticBinding) return { kind: 'static', binding: staticBinding };
	const dynamicBinding = scssDynamicTokenBindings.find(
		(b) =>
			path.join(COMPONENTS_DIR, b.folder) === dir &&
			b.moduleBaseName === moduleBaseName,
	);
	if (dynamicBinding) return { kind: 'dynamic', binding: dynamicBinding };
	return null;
};

const UNIT_ALIASES: Record<string, string> = {
	unitless: '',
	percent: '%',
};

const renderValue = (tokenValue: TokenValue): string => {
	const entries = Object.entries(tokenValue);
	if (entries.length !== 1) {
		throw new Error(
			`Token value must have exactly one unit entry, got: ${JSON.stringify(tokenValue)}`,
		);
	}
	const [unit, n] = entries[0];
	const cssUnit = unit in UNIT_ALIASES ? UNIT_ALIASES[unit] : unit;
	return `${n}${cssUnit}`;
};

/** Maps TS token keys (camelCase) to SCSS variable names (kebab-case). */
const tokenKeyToScssName = (key: string) =>
	key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

const renderModule = (entries: Record<string, TokenValue>) =>
	Object.entries(entries)
		.map(
			([cssProperty, cssPropertyValue]) =>
				`$${tokenKeyToScssName(cssProperty)}: ${renderValue(cssPropertyValue)};`,
		)
		.join('\n') + '\n';

const buildVirtualUrl = (folder: string, moduleBaseName: string): URL => {
	const url = pathToFileURL(
		path.join(COMPONENTS_DIR, folder, `_${moduleBaseName}.scss`),
	);
	url.search = VIRTUAL_QUERY;
	return url;
};

/**
 * Custom Sass importer: `@use '<Folder>/<moduleBaseName>'` resolves to
 * either a static token group from `scssTokenBindings` (in `tokens.ts`)
 * or a dynamically-computed group from `scssDynamicTokenBindings`
 * (via `Theme/scssBindings.ts`). Dynamic bindings let SCSS
 * consume values that are computed in TypeScript at build time.
 */
export const themeImporter: Importer<'sync'> = {
	canonicalize(url: string, context: CanonicalizeContext) {
		const containing = context.containingUrl
			? fileURLToPath(context.containingUrl)
			: '';
		const resolved = path.resolve(
			containing ? path.dirname(containing) : COMPONENTS_DIR,
			url,
		);
		const resolvedBinding = bindingFromResolvedPath(resolved);
		if (!resolvedBinding) return null;
		return buildVirtualUrl(
			resolvedBinding.binding.folder,
			resolvedBinding.binding.moduleBaseName,
		);
	},
	load(canonicalUrl) {
		if (canonicalUrl.search !== `?${VIRTUAL_QUERY}`) return null;
		const resolvedPath = fileURLToPath(canonicalUrl);
		const resolvedBinding = bindingFromResolvedPath(resolvedPath);
		if (!resolvedBinding) return null;
		const entries =
			resolvedBinding.kind === 'static'
				? (tokens as Record<string, Record<string, TokenValue>>)[
						resolvedBinding.binding.tokensKey
					]
				: resolvedBinding.binding.getValues();
		if (!entries) return null;
		return {
			contents: renderModule(entries),
			syntax: 'scss',
		};
	},
};
