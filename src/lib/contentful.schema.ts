import { Document } from '@contentful/rich-text-types';
import { ContentfulCollection } from 'contentful';

export type IContentfulCollectionResponse = {
	blogCollection: ContentfulCollection<IPost>;
};

export type IMediaItem = {
	title: string;
	description: string;
	contentType: string;
	filename: string;
	url: string;
	height: number;
	width: number;
};

export type IPost = {
	title: string;
	slug: string;
	entry: {
		json: Document;
	};
	date: Date;
	media: {
		items: IMediaItem[];
	};
};

export enum ContentType {
	mp4 = 'video/mp4',
	jpeg = 'image/jpeg',
}
