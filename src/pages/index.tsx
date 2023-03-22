import Head from 'next/head';
import { initializeApollo } from '@/lib/apollo-client';
import { BLOGPOSTS_QUERY } from '@/lib/blogPosts.query';
import { IContentfulCollectionResponse, IPost } from '@/lib/contentful.schema';
import Card from '@/components/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';

export default function Home({ posts }: { posts: IPost[] }) {
	const [loadedPosts, setLoadedPosts] = useState<IPost[]>(posts.slice(0, 3));
	const fetchData = () => {
		setLoadedPosts(
			loadedPosts.concat(
				posts.slice(loadedPosts.length, loadedPosts.length + 3)
			)
		);
	};

	return (
		<>
			<Head>
				<title>Cornwells.life</title>
			</Head>
			<section className="grid grid-cols-1 pt-4 lg:w-[70%] xl:w-[50%] md:mx-auto">
				<InfiniteScroll
					dataLength={loadedPosts.length} //This is important field to render the next data
					next={fetchData}
					hasMore={posts.length !== loadedPosts.length}
					loader={
						<svg
							className="animate-spin h-5 w-5 mr-3 ..."
							viewBox="0 0 24 24"
						></svg>
					}
					endMessage={
						<p className="my-4 text-center">
							Wow. We are impressed you looked at EVERYTHING!!!!
							And we love you for it!
						</p>
					}
				>
					{loadedPosts.map((post, idx) => (
						<Card key={idx} post={post} />
					))}
				</InfiniteScroll>
			</section>
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
