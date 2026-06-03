import { useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { RenderDataGroup } from '@salik1992/tv-tools/grid';
import { BasicGrid } from '@salik1992/tv-tools/grid/BasicGrid';
import { Grid } from '@salik1992/tv-tools-react/grid';
import type { Asset } from '@salik1992/test-app-data/types';
import type { ListDataConfiguration } from '../../data';
import { useAssertedParams } from '../../hooks/useAssertedParams';
import { usePagedData } from '../../hooks/usePagedData';
import { Screen } from '../Screen';
import { ScreenCentered } from '../ScreenCentered';
import { Performance } from '../Theme';
import { Tile } from '../Tile';
import { H1 } from '../Typography';
import {
	discoverConfig,
	discoverInitialVisibleData,
	discoverPaginationOffset,
} from './Discover.config';
import * as css from './Discover.module.scss';

const validateFilter = (value: unknown): ListDataConfiguration => {
	try {
		return JSON.parse(atob(value as string));
	} catch (e: unknown) {
		throw new Error(
			`Invalid filter value: "${value}" caused error: "${e}".`,
		);
	}
};

export const DiscoverInner = (filter: ListDataConfiguration) => {
	const { data, pages, loading, error, fetchNextPage } = usePagedData(filter);

	const onDataIndex = useCallback(
		(index: number) => {
			if (index + discoverPaginationOffset >= data.length) {
				fetchNextPage();
			}
		},
		[data, fetchNextPage],
	);

	useEffect(() => {
		if (data.length < discoverInitialVisibleData) {
			fetchNextPage();
		}
	}, [data, fetchNextPage]);

	const gridConfiguration = useMemo(
		() => ({
			performance: Performance,
			visibleGroups: discoverConfig.grid.visibleGroups,
			elementsPerGroup: discoverConfig.grid.columns,
			config: {
				navigatableGroups: discoverConfig.grid.navigatableGroups,
				scrolling: discoverConfig.grid.scrolling,
			},
		}),
		[],
	);

	const renderGroup = useCallback(
		({ id, elements, offset }: RenderDataGroup<Asset>) => (
			<div key={id} style={{ transform: `translateY(${offset}px)` }}>
				{elements.map(({ id, item, onFocus }) => (
					<Tile id={id} key={id} asset={item} onFocus={onFocus} />
				))}
			</div>
		),
		[],
	);

	return (
		<Screen className={css.screen} backNavigation={-1}>
			<H1 className={css.header}>{filter.title}</H1>
			{loading && (
				<ScreenCentered>
					<H1>Loading...</H1>
				</ScreenCentered>
			)}
			{!!error && (
				<ScreenCentered>
					<H1>There was an error loading the data.</H1>
				</ScreenCentered>
			)}
			{!loading && !error && pages === 0 && (
				<ScreenCentered>
					<H1>No data available.</H1>
				</ScreenCentered>
			)}
			{data && data.length && (
				<Grid
					Implementation={BasicGrid}
					configuration={gridConfiguration}
					renderGroup={renderGroup}
					data={data}
					onDataIndex={onDataIndex}
					scrollToTopWithBack
					focusOnMount
				/>
			)}
		</Screen>
	);
};

export const Discover = () => {
	const { filter: key } = useParams();
	const { filter } = useAssertedParams({ filter: validateFilter });

	return <DiscoverInner key={key} {...filter} />;
};
