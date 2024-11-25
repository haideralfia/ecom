'use client';

import {
	ClerkLoaded,
	SignedIn,
	SignInButton,
	UserButton,
	useUser,
} from '@clerk/nextjs';
import Link from 'next/link';
import Form from 'next/form';
import { TrolleyIcon, PackageIcon } from '@sanity/icons';

export default function Header() {
	const { user } = useUser();
	// console.log(user);

	const createClerkPassKey = async () => {
		try {
			// ? is used to shorten an if else statement into one line of code/ to check if user is true or we do have a user check before using the function on it.
			const response = await user?.createPasskey();
			console.log(response);
		} catch (err) {
			// JSON.stringify(The value to convert to a JSON string, replacer/If replacer is anything other than a function or an array (e.g. null or not provided), all string-keyed properties of the object are included in the resulting JSON string, space/A string or number that's used to insert white space )
			console.error('Error', JSON.stringify(err, null, 2));
		}
	};
	return (
		<header className="flex flex-wrap justify-between items-center px-4 py-2">
			{/* top row */}
			<div className="flex w-full flex-wrap justify-between items-center">
				<Link
					href="/"
					className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
				>
					Shopr
				</Link>
				<Form
					className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
					action="/search"
				>
					<input
						type="text"
						name="query"
						placeholder="Search for products"
						className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
					/>
				</Form>
				<div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
					<Link
						href="/basket"
						className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						<TrolleyIcon className="w-6 h-6" />
						{/* span item count once global state is implemented */}
						<span>My Basket</span>
					</Link>
					{/* user area */}
					<ClerkLoaded>
						<SignedIn>
							<Link
								href="/orders"
								className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							>
								<PackageIcon className="h-6 w-6" />
								<span>My Orders</span>
							</Link>
						</SignedIn>

						{user ? (
							<div className="flex items-center space-x-2">
								<UserButton />
								<div className="hidden sm:block text-xs">
									<p className="text-gray-400">
										Welcome Back
									</p>
									<p className="font-bold">{user.fullName}</p>
								</div>
							</div>
						) : (
							// modal gives us access to the modal of signIn page with clerk
							<SignInButton mode="modal" />
						)}

						{user?.passkeys.length === 0 && (
							<button
								onClick={createClerkPassKey}
								className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border"
							>
								Create passkey
							</button>
						)}
					</ClerkLoaded>
				</div>
			</div>
		</header>
	);
}
