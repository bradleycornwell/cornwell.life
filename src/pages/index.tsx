import Head from 'next/head';
import { initializeApollo } from '@/lib/apollo-client';
import { BLOGPOSTS_QUERY } from '@/lib/blogPosts.query';
import { IContentfulCollectionResponse, IPost } from '@/lib/contentful.schema';
import Card from '@/components/Card';

export default function Home({ posts }: { posts: IPost[] }) {
	return (
		<>
			<Head>
				<title>Cornwells.life</title>
			</Head>
			<section className="grid grid-cols-1 pt-4 lg:w-[70%] xl:w-[50%] md:mx-auto">
				{posts.map((post, idx) => (
					<Card key={idx} post={post} />
				))}
			</section>
		</>
	);
}

export async function getStaticProps() {
	const apolloClient = initializeApollo();

	const response = await apolloClient.query<IContentfulCollectionResponse>({
		query: BLOGPOSTS_QUERY,
		variables: {
			limit: 3,
			skip: 0,
		},
	});

	return {
		props: {
			posts: response.data.blogCollection.items,
			initialApolloState: apolloClient.cache.extract(),
		},
		revalidate: 1,
	};
}
