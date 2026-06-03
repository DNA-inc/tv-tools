import { type ComponentProps, type FocusEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Interactable } from '@salik1992/tv-tools-react/focus';
import type {
	Asset,
	AssetDescription,
	MovieAsset,
	ShowAllAsset,
} from '@salik1992/test-app-data/types';
import { useDataProvider } from '../../data';
import { Image } from '../Image';
import { tokens } from '../Theme/tokens';
import { H1, NBSP, P } from '../Typography';
import * as css from './Hero.module.scss';

const getAssetDescription = (asset?: Asset) => {
	if (!asset || !('description' in asset)) {
		return NBSP;
	}
	return (asset as Asset & Partial<AssetDescription>).description ?? NBSP;
};

export const Hero = ({
	asset,
	id,
	style,
	onFocus,
}: {
	asset?: Asset;
	id?: string;
	style?: ComponentProps<'div'>['style'];
	onFocus?: (event: FocusEvent) => void;
}) => {
	const dataProvider = useDataProvider();
	const navigate = useNavigate();

	const onPress = useCallback(() => {
		switch (asset?.type) {
			case 'show-all':
				navigate(
					`/discover/${btoa((asset as unknown as ShowAllAsset).data)}`,
				);
				break;
			default:
				navigate(`detail/${asset?.type}/${asset?.id}`);
		}
		return true;
	}, [navigate, asset]);

	return (
		<Interactable
			id={id}
			className={css.wrap}
			style={{ ...style, visibility: asset ? 'visible' : 'hidden' }}
			onPress={onPress}
			onFocus={onFocus}
		>
			{asset && (asset as MovieAsset).images ? (
				<Image
					className={css.image}
					src={
						asset
							? dataProvider.getImageUrl(
									asset,
									['backdrop', 'still'],
									{ width: tokens.hero.width.px },
								)
							: ''
					}
				/>
			) : (
				<div className={css.colorbox}>
					<P>{asset?.title.toLowerCase() ?? '-'}</P>
				</div>
			)}
			<H1 className={css.text}>{asset?.title ?? NBSP}</H1>
			<P className={css.text}>{getAssetDescription(asset)}</P>
		</Interactable>
	);
};
Hero.width = tokens.hero.width.px + tokens.hero.margin.px;
Hero.height = tokens.hero.height.px;
