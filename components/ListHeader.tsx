"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const checks = {
	class: [
		{
			name: "class",
			value: "warrior",
		},
		{
			name: "class",
			value: "gunslinger",
		},
		{
			name: "class",
			value: "mystic",
		},
	],
	rarity: [
		{
			name: "rarity",
			value: "uncommon",
		},
		{
			name: "rarity",
			value: "common",
		},
		{
			name: "rarity",
			value: "rare",
		},
	],
};

export default function ListHeader(props: any) {
	const { push, replace } = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		return new Promise((resolve, reject) => {
			const target = event.target as HTMLFormElement;
			const formData = new FormData(target);
			// @ts-ignore
			const queryString = new URLSearchParams(formData).toString();
			push(`${pathname}?${queryString}`);
			resolve(true);
		});
	};

	const isChecked = (name: string, value: string) => {
		if (!searchParams) return false;
		return searchParams.getAll(name).includes(value);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-row justify-between w-full border bg-black p-4'
		>
			<div className='flex flex-col justify-between items-center'>
				{checks.class.map((check, index) => {
					return (
						<Checkbox
							label={check.value}
							name={check.name}
							value={check.value}
							defaultChecked={isChecked(check.name, check.value)}
							key={index}
						/>
					);
				})}
			</div>
			<div className='flex flex-col justify-between items-center'>
				{checks.rarity.map((check, index) => {
					return (
						<Checkbox
							label={check.value}
							name={check.name}
							value={check.value}
							defaultChecked={isChecked(check.name, check.value)}
							key={index}
						/>
					);
				})}
			</div>
			<div>
				<label htmlFor='sort'>Sort: </label>
				<select name='sortType'>
					<option value='priceAsc'>asc</option>
					<option value='priceDesc'>desc</option>
					<option value='recentlyListed'>random</option>
				</select>
			</div>
			<button type='submit' className='p-3 bg-white text-black'>
				Submit
			</button>
		</form>
	);
}

function Checkbox({
	label,
	name,
	value,
	defaultChecked,
}: {
	label: string;
	name: string;
	value: string;
	defaultChecked?: boolean;
}) {
	return (
		<div className='flex flex-row justify-between border rounded-sm p-2'>
			<label htmlFor={name} className='text-white'>
				{label}:{" "}
			</label>
			<input
				type='checkbox'
				name={name}
				value={value}
				defaultChecked={defaultChecked}
			/>
		</div>
	);
}

function SubmitButton() {
	return (
		<button type='submit' className='p-3 bg-white text-black'>
			Submit
		</button>
	);
}
