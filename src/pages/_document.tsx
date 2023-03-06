import Header from '@/components/Header';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta
					name="description"
					content="Our blog with updates from Cambridge, MA"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.png" />
			</Head>
			<Header />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
