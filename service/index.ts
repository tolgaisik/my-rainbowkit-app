
const API_URL = "https://test-cards.heroesofnft.com/cards";

export const getCards = async (searchParams: any, chainId: number, page: number) => {
	const filterOptions: any = {
		take: 50,
		skip: (page - 1) * 50,
	};
	function copyAttributesToOptions(attributeName: string) {
		const attributeVal = searchParams[attributeName];
		if (attributeVal) {
			if (typeof attributeVal === "string") {
				filterOptions[attributeName] = [attributeVal];
			} else if (Array.isArray(attributeVal)) {
				filterOptions[attributeName] = attributeVal;
			}
		}
	}
	if (searchParams) {
		const sort = searchParams["sortType"];
		if (sort) {
			filterOptions['sortType'] = sort;
		}
		copyAttributesToOptions("class");
		copyAttributesToOptions("rarity");
	}
  const chainApiUrl = API_URL // TODO: handle different chains
	const response = await fetch(chainApiUrl, {
		method: "post",
		body: JSON.stringify(filterOptions),
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-cache",
	});
	const json = await response.json();
	return json;
};
