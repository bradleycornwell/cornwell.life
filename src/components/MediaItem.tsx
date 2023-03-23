import { IMediaItem } from '@/lib/contentful.schema';
import Image from 'next/image';

export default function MediaItem({
	media,
	eagerLoad,
}: {
	media: IMediaItem;
	eagerLoad: boolean;
}) {
	return (
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
					loading={eagerLoad ? 'eager' : 'lazy'}
					placeholder={'blur'}
					blurDataURL={
						'/cornwells-in-boston-website-favicon-color.png'
					}
				/>
			)}
		</>
	);
}
