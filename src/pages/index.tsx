import Head from "next/head";
import { initializeApollo } from "@/lib/apollo-client";
import { BLOGPOSTS_QUERY } from "@/lib/blogPosts.query";
import { IContentfulCollectionResponse, IPost } from "@/lib/contentful.schema";
import Card from "@/components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

export default function Home({
  posts,
  total,
  limit,
}: {
  posts: IPost[];
  total: number;
  limit: number;
}) {
  const [loadedPosts, setLoadedPosts] = useState<IPost[]>(posts);
  const fetchData = () =>
    getPosts({ variables: { skip: loadedPosts.length, limit } });
  const [getPosts, { loading, error, data }] =
    useLazyQuery<IContentfulCollectionResponse>(BLOGPOSTS_QUERY, {
      variables: { skip: loadedPosts.length, limit },
    });

  useEffect(() => {
    if (data !== undefined) {
      setLoadedPosts((currentPosts) => [
        ...currentPosts,
        ...data.blogCollection.items,
      ]);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Cornwells.life</title>
      </Head>
      <section className="grid grid-cols-1 pt-4 lg:w-[70%] xl:w-[50%] md:mx-auto">
        <InfiniteScroll
          dataLength={loadedPosts.length}
          next={fetchData}
          hasMore={loadedPosts.length < total}
          loader={
            <svg
              className="animate-spin h-5 w-5 mr-3 ..."
              viewBox="0 0 24 24"
            ></svg>
          }
          endMessage={
            <p className="my-4 text-center">
              Wow. We are impressed you looked at EVERYTHING!!!! And we love you
              for it!
            </p>
          }
        >
          {loadedPosts?.map((post, idx) => (
            <Card key={idx} post={post} />
          ))}
        </InfiniteScroll>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  const limit = parseInt(process.env.POST_LIMIT || "5");

  const response = await apolloClient.query<IContentfulCollectionResponse>({
    query: BLOGPOSTS_QUERY,
    variables: { limit, skip: 0 },
  });

  return {
    props: {
      posts: response.data.blogCollection.items,
      total: response.data.blogCollection.total,
      limit,
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}
