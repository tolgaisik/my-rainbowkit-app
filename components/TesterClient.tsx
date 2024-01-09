"use client";
import React, { useEffect } from "react";
import { createInfiniteListStore } from "../store";
import { getCards } from "../service";
import { useSearchParams } from "next/navigation";
import List from "./List";
import { InfinitySpin, Oval } from "react-loader-spinner";
const useStore = createInfiniteListStore(getCards);

const Loader = ({ onHit, isFetching }: { onHit: (target: any) => void, isFetching: boolean }) => {
	const loaderRef = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					console.log("visible");
					onHit(entry);
				}
			});
		});
		if (loaderRef.current) {
			observer.observe(loaderRef.current);
		}
		return () => {
			if (loaderRef.current) {
				observer.unobserve(loaderRef.current);
			}
		};
	}, []);
	return <div ref={loaderRef} className='w-full h-16 border'>
    {isFetching ? <Oval /> : null}
  </div>;
};

export default function TesterClient() {
	const ids = useStore((state) => state.ids);
	const items = useStore((state) => state.items);
	const loadOnMount = useStore((state) => state.loadItems);
	const isLoading = useStore((state) => state.isLoading);
	const isFetching = useStore((state) => state.isFetching);
	const fetchMore = useStore((state) => state.fetchMore);
	const searchParams = useSearchParams();
	useEffect(() => {
		loadOnMount(searchParams, 1);
	}, []);

  if (isLoading) {
    return <InfinitySpin />
  }

	return (
		<div>
			<h1>TesterClient</h1>
			{JSON.stringify(ids, null, 2)}
			<button
				disabled={isFetching}
				onClick={(e) => fetchMore(searchParams, 41)}
			>
				Fetch More
			</button>
			<List items={items} />
      <Loader onHit={(entry) => fetchMore(searchParams, 41)} isFetching={isFetching}/>
		</div>
	);
}
