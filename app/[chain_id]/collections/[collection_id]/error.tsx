"use client";
export default function Error({
	reset,
	error,
}: {
	reset: () => void;
	error: Error;
}) {
	return (
		<div>
			<h1>Something went wrong</h1>
			<pre>{error.message}</pre>
			<button onClick={reset}>Reset</button>
		</div>
	);
}
