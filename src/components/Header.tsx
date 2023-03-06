import Image from 'next/image';

export default function Header() {
	return (
		<header className="bg-green-100 flex place-content-between border-b-2 border-green-300 px-4 md:px-8">
			<h1 className="text-2xl md:text-4xl my-auto text-grey-500">
				Cornwells in Boston
			</h1>
			<Image
				src="/cornwells-in-boston-website-favicon-black.png"
				width="100"
				height="100"
				alt="Cornwells in Boston logo"
			/>
		</header>
	);
}
