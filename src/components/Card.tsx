import { IPost } from '@/lib/contentful.schema';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Carousel } from './Carousel';
import Image from 'next/image';

const Card = ({ post }: { post: IPost }) => {
	return (
		<article className="shadow-lg p-4 bg-grey-100 border-t border-green-300 text-grey-500">
			<h2 className="font-semibold pb-4">{post.title}</h2>
			<Carousel items={post?.media?.items} />
			<div className="py-4 prose max-w-none">
				{post.entry && documentToReactComponents(post.entry.json)}
			</div>
			<div className="flex justify-between place-items-baseline">
				<time className="font-semibold">
					{new Date(post.date).toDateString()}
				</time>
				{post.author && (
					<Image
						alt={post.author.name}
						height="100"
						width="100"
						src={post.author.avatar.url}
					/>
				)}
			</div>
		</article>
	);
};

export default Card;
