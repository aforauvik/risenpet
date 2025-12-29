"use client";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import Image from "next/image";
export default function NotFound() {
	const router = useRouter();

	return (
		<div className="relative min-h-screen w-full overflow-hidden">
			<Image
				src="/404-not-found.jpg"
				alt="Not Found"
				fill
				priority
				className="object-cover"
			/>
			<div className="absolute inset-0 bg-black/50" />

			<div className="relative flex flex-1 flex-col gap-4 items-center justify-center min-h-screen px-6 text-center text-white">
				<h1 className="text-3xl font-bold">Page Not Found</h1>
				<p className="text-base max-w-lg">
					The page you are looking for does not exist. Please try again or go to
					the home page.
				</p>
				<Button
					variant="default"
					onClick={() => router.push("/dashboard")}
					className="bg-white text-black hover:bg-white/90"
				>
					Take me back to the dashboard
				</Button>
			</div>
		</div>
	);
}
