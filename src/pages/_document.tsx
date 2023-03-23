import Header from '@/components/Header';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
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
