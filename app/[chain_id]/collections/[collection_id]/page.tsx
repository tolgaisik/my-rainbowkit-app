import Image from "next/image";
import ListHeader from "../../../../components/ListHeader";
import { getCards } from "../../../../service";
import TesterClient from "../../../../components/TesterClient";
import List from "../../../../components/List";

enum SortType {
	recentlyListed = "recentlyListed",
	priceAsc = "priceAsc",
	priceDesc = "priceDesc",
}

export default async function page({
	params,
	searchParams,
}: {
	params: any;
	searchParams: any;
}) {
  const chainId = parseInt(params.chain_id ?? 43_182) ;
	const firstPage = await getCards(searchParams, chainId, 1);

	return (
		<div>
			<h1>Page</h1>
			{JSON.stringify(params.collection_id, null, 2)}
			<ListHeader />
      <TesterClient />
			{/* <List items={firstPage} /> */}
		</div>
	);
}
