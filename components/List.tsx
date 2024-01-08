import React from "react";
import Image from "next/image";

export default function List({ items }: { items: any[] }) {
	return (
		<div
			style={{
				display: "flex",
				flexWrap: "wrap",
				gap: "20px",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{items.map((card: any, index) => {
				return (
					<div key={index}>
						<h2>{card.name}</h2>
						<Image
							src={card.image}
							alt=''
							width={200}
							height={250}
							style={{
								width: "auto",
							}}
						/>
						<p>{card.price}</p>
					</div>
				);
			})}
		</div>
	);
}
