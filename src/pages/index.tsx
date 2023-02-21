import Head from 'next/head';
import Image from 'next/image';
import { initializeApollo } from '@/lib/apollo-client';
import { BLOGPOSTS_QUERY } from '@/lib/blogPosts.query';
import { IContentfulCollectionResponse, IPost } from '@/lib/contentful.schema';
import Card from '@/components/Card';

export default function Home({ posts }: { posts: IPost[] }) {
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
				<link rel="icon" href="/favicon.png" />
			</Head>
			<header className="bg-green-100 flex place-content-between border-b-2 border-green-300">
				<h1 className="text-2xl md:text-4xl ml-2 my-auto text-grey-500">
					Cornwells in Boston
				</h1>
				<Image
					src="/cornwells-in-boston-website-favicon-black.png"
					width="100"
					height="100"
					alt="Cornwells in Boston logo"
				/>
			</header>
			<main className="mx-4">
				<div className="grid grid-cols-1 pt-4 md:w-[40%] md:mx-auto">
					{posts.map((post, idx) => (
						<Card key={idx} post={post} />
					))}
				</div>
				{/* <div className="hidden md:block pt-4">
					<h3 className="text-xl font-medium">Welcome...</h3>
					<p>
						Welcome to our blog we wanted to keep family and friends
						updated with what is happening in Boston
					</p>
				</div> */}
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
