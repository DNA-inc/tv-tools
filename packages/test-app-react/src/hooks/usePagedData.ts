import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ns } from '@salik1992/tv-tools/logger';
import type { Asset, Paged, ShowAllAsset } from '@salik1992/test-app-data/types';
import { type ListDataConfiguration, useDataProvider } from '../data';

const logger = ns('[usePagedData]');

export const usePagedData = (
	listData: ListDataConfiguration,
	{
		appendShowAll = false,
	}: {
		appendShowAll?: boolean;
	} = {},
) => {
	const mounted = useRef(true);
	const dataProvider = useDataProvider();
	const [pagedData, setPagedData] = useState<Paged<Asset>>({
		pages: 0,
	});
	const data = useMemo(
		() => {
			const pages = Object.keys(pagedData)
				.filter((key) => key !== 'pages')
				.map((key) => Number(key))
				.filter((page) => !Number.isNaN(page))
				.sort((a, b) => a - b);
			return pages.flatMap((page) => pagedData[page] ?? []) as Asset[];
		},
		[pagedData],
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<unknown>(null);
	const fetchedPages = useRef<number>(0);
	const requestedPages = useRef<number>(0);

	const fetchNextPage = useCallback(async () => {
		if (
			requestedPages.current !== fetchedPages.current ||
			(pagedData.pages > 0 &&
				(fetchedPages.current >= pagedData.pages || appendShowAll))
		) {
			return;
		}
		requestedPages.current += 1;
		try {
			const pageIndex = requestedPages.current - 1;
			const fetchedData = await dataProvider.getPagedAssets(
				listData,
				pageIndex,
			);
			const showAllAsset: ShowAllAsset = {
				id: 'show-all',
				type: 'show-all',
				title: 'Show All >>>',
				data: JSON.stringify(listData),
			};
			const dataToAppend =
				!appendShowAll || fetchedData.pages < 2
					? fetchedData
					: {
							...fetchedData,
							[pageIndex]: [
								...(fetchedData[pageIndex] || []),
								showAllAsset,
							],
						};
			if (mounted.current) {
				setPagedData((currentData) => ({
					...currentData,
					...dataToAppend,
				}));
				fetchedPages.current = requestedPages.current;
			}
		} catch (e: unknown) {
			logger.error(e);
			if (mounted.current) {
				setError(e);
			}
		} finally {
			if (mounted.current) {
				setLoading(false);
			}
		}
	}, [dataProvider, pagedData]);

	useEffect(() => {
		fetchNextPage();
	}, []);

	useEffect(
		() => () => {
			mounted.current = false;
		},
		[],
	);

	return {
		data,
		pagedData,
		pages: pagedData.pages,
		fetchNextPage,
		loading,
		error,
	};
};
