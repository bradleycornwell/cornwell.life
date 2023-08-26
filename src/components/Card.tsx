import { IPost } from "@/lib/contentful.schema";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Carousel } from "./Carousel";
import Image from "next/image";
import { howLongAgo } from "@/lib/util";

const Card = ({ post }: { post: IPost }) => {
  const date = new Date(post.date);
  const today = new Date();

  return (
    <article className="shadow-lg p-4 bg-grey-100 border-t border-green-300 text-grey-500">
      <div className="flex justify-between pb-4">
        <div>
          <h2 className="font-semibold">{post.title}</h2>
          <time
            className="inline-block font-semibold text-xs"
            title={new Date(post.date).toDateString()}
          >
            {howLongAgo(new Date(post.date))}
          </time>
        </div>
        <div className="flex">
          {post.author && (
            <Image
              alt={post.author.name}
              height="50"
              width="50"
              src={post.author.avatar.url}
            />
          )}
        </div>
      </div>
      <Carousel items={post?.media?.items} />
      <div className="py-4 prose max-w-none">
        {post.entry && documentToReactComponents(post.entry.json)}
      </div>
      <div className="flex justify-between place-items-baseline"></div>
    </article>
  );
};

export default Card;
