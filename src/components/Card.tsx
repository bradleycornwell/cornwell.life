import { IMediaItem, IPost } from '@/lib/contentful.schema';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useState } from 'react';

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

const Arrow = ({
	disabled,
	left,
	onClick,
}: {
	disabled: boolean;
	left?: boolean;
	onClick: (e: any) => void;
}) => {
	const isDisabled = disabled ? ' arrow--disabled' : '';
	return (
		<svg
			onClick={onClick}
			className={`arrow ${
				left ? 'arrow--left' : 'arrow--right'
			} ${disabled}`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			{left && (
				<path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
			)}
			{!left && (
				<path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
			)}
		</svg>
	);
};

const Card = ({ post }: { post: IPost }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
		loop: true,
	});

	return (
		<section className="shadow-lg p-4 bg-grey-100 border-t border-green-300">
			<h2 className="font-semibold text-grey-500 py-2">{post.title}</h2>
			<div className="navigation-wrapper">
				<div ref={sliderRef} className="keen-slider">
					{post.media.items.map((item, idx) => (
						<div
							key={idx}
							className="keen-slider__slide bg-green-100 rounded-sm"
						>
							<MediaItem media={item}></MediaItem>
						</div>
					))}
				</div>
				{loaded &&
					post.media.items.length > 1 &&
					instanceRef.current && (
						<>
							<Arrow
								left
								onClick={(e: any) =>
									e.stopPropagation() ||
									instanceRef.current?.prev()
								}
								disabled={currentSlide === 0}
							/>

							<Arrow
								onClick={(e: any) =>
									e.stopPropagation() ||
									instanceRef.current?.next()
								}
								disabled={
									currentSlide ===
									instanceRef.current.track.details.slides
										.length -
										1
								}
							/>
						</>
					)}
			</div>
			{loaded && instanceRef.current && (
				<div className="dots">
					{[
						...Array.from({
							length: instanceRef.current.track.details.slides
								.length,
						}).fill(0),
					].map((_zero, idx) => {
						return (
							<button
								key={idx}
								onClick={() => {
									instanceRef.current?.moveToIdx(idx);
								}}
								className={
									'dot' +
									(currentSlide === idx ? ' active' : '')
								}
							></button>
						);
					})}
				</div>
			)}
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
