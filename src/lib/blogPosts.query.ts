import { gql } from '@apollo/client';

export const BLOGPOSTS_QUERY = gql`
	query {
		blogCollection {
			total
			skip
			limit
			items {
				slug
				title
				entry {
					json
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
