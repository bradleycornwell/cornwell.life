import { gql } from '@apollo/client';

export const BLOGPOSTS_QUERY = gql`
	query ($skip: Int, $limit: Int) {
		blogCollection(order: happenedOn_DESC, limit: $limit, skip: $skip) {
			total
			skip
			limit
			items {
				slug
				title
				entry {
					json
				}
				author {
					name
					avatar {
						title
						description
						fileName
						url
					}
				}
				date: happenedOn
				media: mediaCollection {
					total
					skip
					limit
					items {
						title
						description
						contentType
						fileName
						description
						url
						width
						height
					}
				}
			}
		}
	}
`;
