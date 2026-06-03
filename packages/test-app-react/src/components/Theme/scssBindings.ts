import { assetsRowScssBinding } from '../AssetsRow/AssetsRow.config';
import { detailScssBinding } from '../Detail/Detail.config';
import { detailPosterScssBinding } from '../DetailPoster/DetailPoster.config';
import { heroRowScssBinding } from '../HeroRow/HeroRow.config';
import { modalScssBinding } from '../Modal/Modal.config';
import { screenLayoutScssBinding } from '../Screen/Screen.config';

/** Aggregates per-component SCSS dynamic token bindings for the theme importer. */
export const scssDynamicTokenBindings = [
	heroRowScssBinding,
	assetsRowScssBinding,
	detailScssBinding,
	detailPosterScssBinding,
	screenLayoutScssBinding,
	modalScssBinding,
] as const;
