'use client';
import React, { useEffect } from 'react'
import { createInfiniteListStore } from '../store';
import { getCards } from '../service';
import { useSearchParams } from 'next/navigation';
import List from './List';
const useStore = createInfiniteListStore(getCards);
export default function TesterClient() {
  const ids = useStore(state => state.ids);
  const items = useStore(state => state.items);
  const loadOnMount = useStore(state => state.loadItems);
  const isLoading = useStore(state => state.isLoading);
  const isFetching = useStore(state => state.isFetching);
  const fetchMore = useStore(state => state.fetchMore);
  const searchParams = useSearchParams();
  useEffect(() => {
    console.log('useEffect');
    loadOnMount(searchParams, 1);
  }, []);

  return (
    <div>
      <h1>TesterClient</h1>
      {JSON.stringify(ids, null, 2)}
      <button disabled={isFetching} onClick={e => fetchMore(searchParams, 41)}>Fetch More</button>
      <List items={items} />
    </div>
  )
}
