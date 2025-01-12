"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, MessageSquare, Share, MoreHorizontal } from "lucide-react";
import Image from "next/image";

export default function Feed() {
	const [posts, setPosts] = useState([]);
	const [activeSubCategory, setActiveSubCategory] = useState("Hot");
	const [loading, setLoading] = useState(false);
	const [timeFilter, setTimeFilter] = useState("day");
	const [error, setError] = useState(null);

	const categories = ["Hot", "New", "Controversial", "Rising", "Top"];
	const timeFilters = ["hour", "day", "week", "month", "year", "all"];

	const transformRedditData = (apiData) => {
		return apiData.data.children.map(post => {
			let imageUrl = '/default-image.jpg';

			if (post.data.thumbnail) {
				if (post.data.thumbnail.startsWith('http') && !['self', 'default', 'nsfw', 'spoiler'].includes(post.data.thumbnail)) {
					try {
						imageUrl = decodeURIComponent(post.data.thumbnail).split('&amp;').join('&');
					} catch {
						imageUrl = '/default-image.jpg';
					}
				} else if (post.data.preview?.images?.[0]?.source?.url) {
					try {
						imageUrl = decodeURIComponent(post.data.preview.images[0].source.url).split('&amp;').join('&');
					} catch {
						imageUrl = '/default-image.jpg';
					}
				}
			}

			return {
				id: post.data.id,
				title: post.data.title,
				author: post.data.author,
				date: new Date(post.data.created_utc * 1000).toLocaleString(),
				comments: post.data.num_comments,
				shares: post.data.num_crossposts,
				votes: formatVotes(post.data.score),
				image: imageUrl,
			};
		});
	};

	const formatVotes = (number) => {
		if (number >= 1000) {
			return (number / 1000).toFixed(1) + 'K';
		}
		return number.toString();
	};

	const getRedditAccessToken = async () => {
		try {
			const response = await fetch('/api/reddit-auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(`Auth Error: ${response.status} - ${errorData.message || 'Failed to get access token'}`);
			}

			const data = await response.json();
			if (!data.access_token) {
				throw new Error('No access token received');
			}
			return data.access_token;
		} catch (error) {
			console.error('Error getting Reddit access token:', error);
			throw error;
		}
	};

	const fetchRedditData = async (category, time = 'day', limit = 50) => {
		setLoading(true);
		setError(null);

		try {
			const accessToken = await getRedditAccessToken();

			if (!accessToken) {
				setError('Authentication failed. Please try again.');
				return;
			}

			const response = await fetch(
				`/api/reddit-data?category=${category}&time=${time}&accessToken=${accessToken}&limit=${limit}`
			);

			if (response.status === 429) {
				const retryAfter = response.headers.get('Retry-After') || '60';
				setError('Rate limit reached. Retrying...');

				setTimeout(() => {
					fetchRedditData(category, time, limit);
				}, parseInt(retryAfter) * 1000);
				return;
			}

			if (response.status === 401 || response.status === 403) {
				setError('Authentication expired. Please refresh the page.');
				return;
			}

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(`API Error: ${response.status} - ${errorData.message || 'Failed to fetch data'}`);
			}

			const data = await response.json();
			if (!data?.data?.children) {
				throw new Error('Invalid data format received');
			}

			const transformedPosts = transformRedditData(data);
			setPosts(transformedPosts);
		} catch (error) {
			console.error('Error fetching Reddit data:', error);
			setPosts([]);
			setError(error.message || 'Failed to load posts. Please try again later.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRedditData(activeSubCategory, timeFilter);
	}, [activeSubCategory, timeFilter]);

	return (
		<div className="max-w-7xl mx-auto px-4 rounded-md bg-white dark:bg-gray-800 dark:border-gray-700">
			<div className="flex justify-between items-center mb-6 py-4">
				<h2 className="text-xl font-semibold dark:text-white">Popular</h2>
				<div className="flex gap-2 overflow-x-auto">
					{categories.map((category) => (
						<Button
							key={category}
							variant="ghost"
							size="sm"
							className={`whitespace-nowrap ${activeSubCategory === category
								? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
								: "text-black dark:text-white"
								}`}
							onClick={() => setActiveSubCategory(category)}
							disabled={loading}
						>
							{category}
						</Button>
					))}
				</div>
			</div>

			{error && (
				<div className="text-red-500 dark:text-red-400 text-center py-4">
					{error}
				</div>
			)}

			{(activeSubCategory === 'Top' || activeSubCategory === 'Controversial') && (
				<div className="flex gap-2 mb-4 overflow-x-auto">
					{timeFilters.map((time) => (
						<Button
							key={time}
							variant="ghost"
							size="sm"
							className={`whitespace-nowrap ${timeFilter === time
								? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
								: "text-gray-600 dark:text-gray-400"
								}`}
							onClick={() => setTimeFilter(time)}
							disabled={loading}
						>
							{time.charAt(0).toUpperCase() + time.slice(1)}
						</Button>
					))}
				</div>
			)}

			{loading ? (
				<div className="flex justify-center items-center py-8">
					<div className="text-gray-500 dark:text-gray-400">Loading...</div>
				</div>
			) : (
				<div className="space-y-4">
					{posts.map((post) => (
						<div
							key={post.id}
							className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900"
						>
							<div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,auto] md:gap-8">
								<div className="space-y-4">
									<div className="flex gap-4">
										<div className="flex-shrink-0 relative w-20 h-20">
											{loading ? (
												<div className="w-20 h-20 bg-gray-200 rounded-md animate-pulse" />
											) : (
												<div className="relative w-20 h-20">
													{post.image.startsWith('http') ? (
														<Image
															src={post.image}
															alt={post.title}
															fill
															className="rounded-md object-cover"
															onError={() => {
																const img = document.getElementById(`img-${post.id}`);
																if (img) img.src = '/default-image.jpg';
															}}
															sizes="80px"
															unoptimized
															id={`img-${post.id}`}
														/>
													) : (
														// For local fallback image
														<Image
															src={post.image}
															alt={post.title}
															fill
															className="rounded-md object-cover"
															sizes="80px"
														/>
													)}
												</div>
											)}
										</div>
										<div className="space-y-3">
											<h3 className="mb-8 text-lg font-semibold text-gray-800 dark:text-white">
												{post.title}
											</h3>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												Posted by {post.author} - {post.date}
											</p>
										</div>
									</div>
								</div>

								<div className="flex flex-col gap-5 md:border-r border-gray-200 dark:border-gray-700 md:px-8">
									<div className="flex items-center gap-1">
										<MessageSquare className="w-4 h-4 text-gray-500 dark:text-gray-400" />
										<span className="text-gray-900 dark:text-white">{post.comments}</span>
										<span className="text-gray-500 dark:text-gray-400">Comments</span>
									</div>
									<div className="flex items-center gap-1">
										<Share className="w-4 h-4 text-gray-500 dark:text-gray-400" />
										<span className="text-gray-900 dark:text-white">{post.shares}</span>
										<span className="text-gray-500 dark:text-gray-400">Shares</span>
									</div>
									<Button variant="ghost" size="sm" className="w-fit p-0">
										<MoreHorizontal className="w-4 h-4 text-gray-500 dark:text-gray-400" />
										<span className="text-gray-500 dark:text-gray-400">More</span>
									</Button>
								</div>

								<div className="flex md:flex-col items-center gap-2 justify-end md:px-4">
									<Button variant="outline" size="sm" className="p-1">
										<ChevronUp className="w-4 h-4 text-green-500" />
									</Button>
									<p className="text-sm font-semibold text-gray-800 dark:text-white">
										{post.votes}
									</p>
									<Button variant="outline" size="sm" className="p-1">
										<ChevronDown className="w-4 h-4 text-red-500" />
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}