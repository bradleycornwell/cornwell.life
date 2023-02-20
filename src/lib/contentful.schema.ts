import { Document } from '@contentful/rich-text-types';
import { AssetCollection, ContentfulCollection } from 'contentful';

export type IContentfulCollectionResponse = {
	blogCollection: ContentfulCollection<IPost>;
};

export type IPost = {
	title: string;
	slug: string;
	entry: Document;
	date: Date;
	media: {
		items: {
			title: string;
			description: string;
			contentType: string;
			filename: string;
			url: string;
			height: number;
			width: number;
		}[];
	};
};

export enum ContentType {
	mp4 = 'video/mp4',
	jpeg = 'image/jpeg',
}
