import Head from 'next/head';
import { initializeApollo } from '@/lib/apollo-client';
import { BLOGPOSTS_QUERY } from '@/lib/blogPosts.query';
import { IContentfulCollectionResponse, IPost } from '@/lib/contentful.schema';
import Card from '@/components/Card';

export default function Home({ posts }: { posts: Array<IPost> }) {
	return (
		<>
			<Head>
				<title>Cornwells.life</title>
				<meta
					name="description"
					content="Our blog with updates from Cambridge, MA"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header>
				<h1 className="text-3xl">Cornwells.life</h1>
			</header>
			<main className="mx-auto w-[80vw]">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{posts.map((post, idx) => (
						<Card key={post.slug || idx} post={post} />
					))}
				</div>
			</main>
		</>
	);
}

export async function getStaticProps() {
	const apolloClient = initializeApollo();

	const response = await apolloClient.query<IContentfulCollectionResponse>({
		query: BLOGPOSTS_QUERY,
	});

	return {
		props: {
			posts: response.data.blogCollection.items,
			initialApolloState: apolloClient.cache.extract(),
		},
		revalidate: 1,
	};
}
