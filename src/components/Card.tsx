import { ContentType, IMediaItem, IPost } from '@/lib/contentful.schema';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const MediaItem = ({ media }: { media: IMediaItem }) => (
	<>
		{media?.contentType === 'video/mp4' ? (
			<video
				controls
				className="relative top-1/2 -translate-y-1/2 drop-shadow-sm"
			>
				<source
					src={media.url}
					type="video/mp4"
					width={'3024'}
					height={'509px'}
				/>
				Your browser does not support the video tag.
			</video>
		) : (
			<Image
				alt={''}
				className="relative top-1/2 -translate-y-1/2"
				src={media.url}
				width={media.width}
				height={media.height}
			/>
		)}
	</>
);

const Card = ({ post }: { post: IPost }) => {
	const [sliderRef, instanceRef] = useKeenSlider(
		{
			slideChanged() {},
		},
		[
			// add plugins here
		]
	);

	return (
		<section className="shadow-lg p-4 bg-grey-100 border-t border-green-300">
			<h2 className="font-semibold text-grey-500 py-2">{post.title}</h2>
			<div ref={sliderRef} className="keen-slider">
				{post.media.items.map((item, idx) => (
					<div
						key={idx}
						className="keen-slider__slide mx-auto bg-green-100 rounded-sm"
					>
						<MediaItem media={item}></MediaItem>
					</div>
				))}
			</div>
			<article className="text-grey-500 text-sm py-2">
				{post.entry && documentToReactComponents(post.entry.json)}
			</article>
			<time className="text-xs text-grey-500 py-2 flex justify-end">
				{new Date(post.date).toDateString()}
			</time>
		</section>
	);
};

export default Card;
