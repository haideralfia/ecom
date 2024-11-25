async function SearchPage({
    // studwy more about searchPrams in next.js 15 and general and why not useParams hook
	searchParams,
}: {
	searchParams: {
		query: string;
	};
}) {
	const { query } = await searchParams;

	return <div>SearchPage for {query}</div>;
}

export default SearchPage;
