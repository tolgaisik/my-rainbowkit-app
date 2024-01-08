import { create } from "zustand";
interface InfiniteListStore<T> {
	items: T[];
	ids: Array<keyof T>;
	isFetching: boolean;
	isLoading: boolean;
	hasMore: boolean;
	page: number;
  filterOptions: any;
	loadItems: (searchParams: any, chainId: number) => Promise<void>;
	fetchMore: (searchParams: any, chainId: number) => Promise<void>;
  updateItem: (id: keyof T, item: T) => void;
  loadOnMount: (searchParams: any, chainId: number) => void;
}
export const createInfiniteListStore = <StoreItem>(
	fetcher: (searchParams: any, chainId: number, page: number) => Promise<Array<StoreItem>>
) => {
	return create<InfiniteListStore<StoreItem>>((set, get) => ({
		items: [],
		ids: [],
		isFetching: false,
		isLoading: false,
		hasMore: true,
		page: 1,
    filterOptions: {},
    loadOnMount: (searchParams: any, chainId: number) => {
      set({ filterOptions: searchParams });
      set({ items: [], ids: [], page: 1, hasMore: true });
      get().loadItems(searchParams, chainId);
    },
		loadItems: async (searchParams: any, chainId: number) => {
			const items = await fetcher(searchParams, chainId, 1);
			if (items.length === 0) {
				set({ hasMore: false });
				return;
			}
      //@ts-ignore
			const _ids = items.map((item) => item["id"]);
      console.log('loadItems', items, _ids)
			set({ items, ids: _ids as Array<keyof StoreItem> });
		},
		fetchMore: async (searchParams: any, chainId: number) => {
			if (get().isFetching || !get().hasMore) return;
			set({ isFetching: true });
			try {
				const items = await fetcher(searchParams, chainId, get().page + 1);
        if (items.length === 0) {
          set({ hasMore: false });
          return;
        }
        //@ts-ignore
				const _ids = items.map((item) => item["id"]);
				set({
					items: [...get().items, ...items],
					ids: [...get().ids, ..._ids] as Array<keyof StoreItem>,
					isFetching: false,
					page: get().page + 1,
				});
			} catch (error) {
        console.error(error);
      }
		},
		updateItem: (id: keyof StoreItem, item: StoreItem) => {
			const index = get().ids.indexOf(id);
			if (index === -1) return;
			const _items = [...get().items];
			_items[index] = item;
			set({ items: _items });
		},
	}));
};
