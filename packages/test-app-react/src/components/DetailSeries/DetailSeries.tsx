import type { SeriesAsset } from '@salik1992/test-app-data/types';
import { useDataProvider } from '../../data';
import { AssetsRow } from '../AssetsRow';
import { DetailPoster } from '../DetailPoster';
import { DetailRating } from '../DetailRating';
import { Overview } from '../Overview';
import { detailConfig, detailScrollPx } from '../Detail/Detail.config';
import { detailPosterImageWidthPx } from '../DetailPoster/DetailPoster.config';
import { H1, P } from '../Typography';
import * as css from './DetailSeries.module.scss';

export const DetailSeries = ({
	asset,
	scroll,
}: {
	asset: SeriesAsset;
	scroll: (px: number) => () => void;
}) => {
	const dataProvider = useDataProvider();

	return (
		<>
			<DetailPoster
				$src={dataProvider.getImageUrl(asset, ['poster'], {
					width: detailPosterImageWidthPx,
				})}
			/>
			<H1>{asset.title}</H1>
			<P>
				<span className={css.label}>First aired: </span>
				{new Date(asset.releaseDate).getFullYear()}
			</P>
			<DetailRating asset={asset} />
			<br />
			<Overview
				key={`overview-${asset.type}-${asset.id}`}
				overview={asset.description}
				onFocus={scroll(
					detailScrollPx(detailConfig.scrollLandmarkRows.overview),
				)}
				focusOnMount
			/>
			<AssetsRow
				key={`castAndCrew-${asset.id}`}
				listData={{
					filterBy: 'castAndCrew',
					type: 'series',
					title: 'Cast & Crew',
					id: asset.id,
					pageItemType: 'person',
				}}
				showDetail={false}
				onFocus={scroll(
					detailScrollPx(
						detailConfig.scrollLandmarkRows.castAndCrew,
					),
				)}
				paginate
			/>
			<AssetsRow
				key={`related-${asset.id}`}
				listData={{
					filterBy: 'related',
					type: 'series',
					title: 'You might also like',
					id: asset.id,
					pageItemType: 'series',
				}}
				showDetail={false}
				onFocus={scroll(
					detailScrollPx(detailConfig.scrollLandmarkRows.related),
				)}
				paginate
			/>
		</>
	);
};
