import { IMediaItem } from '@/lib/contentful.schema';
import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';
import Arrow from './Arrow';
import MediaItem from './MediaItem';

export function Carousel({ items }: { items: IMediaItem[] }) {
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
		<>
			<div className="navigation-wrapper">
				<div ref={sliderRef} className="keen-slider">
					{items.map((item, idx) => (
						<div
							key={idx}
							className="keen-slider__slide bg-green-100 rounded-sm"
						>
							<MediaItem media={item}></MediaItem>
						</div>
					))}
				</div>
				{loaded && items.length > 1 && instanceRef.current && (
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
		</>
	);
}
