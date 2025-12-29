"use client";

import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
// Assuming you have Avatar components
import {Badge} from "@/components/ui/badge"; // Assuming you have a Badge component
import {Button} from "@/components/ui/button";
import {EmptyState} from "@/components/empty-state";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardHeading,
	CardTitle,
	CardToolbar,
} from "@/components/ui/list-card";
import {useRouter} from "next/navigation";
import {PlusIcon} from "lucide-react";
// User data
export const users = [
	{
		id: "1",
		name: "Jaxs",
		breed: "Maine Coon",
		avatar: "cat-1.jpg",
		status: "active",
		type: "Cat",
		color: "Black",
	},
	{
		id: "2",
		name: "Rex",
		breed: "Golden Retriever",
		avatar: "dog-1.jpg",
		status: "inactive",
		type: "Dog",
		color: "Golden",
	},
	{
		id: "3",
		name: "Bella",
		breed: "Labrador Retriever",
		avatar: "dog-2.jpg",
		status: "active",
		type: "Dog",
		color: "Brown",
	},
	{
		id: "4",
		name: "Max",
		breed: "Siamese",
		avatar: "cat-2.jpg",
		status: "inactive",
		type: "Cat",
		color: "White",
	},
	{
		id: "5",
		name: "Roxie",
		breed: "Beagle",
		avatar: "dog-3.jpg",
		status: "active",
		type: "Dog",
		color: "White",
	},
];

export default function AllPetProfiles() {
	const router = useRouter();

	if (!users.length) {
		return (
			<>
				<EmptyState />
			</>
		);
	}

	return (
		<Card className="flex flex-col w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardHeading>
					<CardTitle>My Pets</CardTitle>
				</CardHeading>
				<CardToolbar>
					<p className="text-sm font-medium text-muted-foreground">
						Add New Pet
					</p>
					<Button
						variant="outline"
						size="icon"
						onClick={() => router.push("/add-pet-profile")}
					>
						<PlusIcon className="w-4 h-4" />
					</Button>
				</CardToolbar>
			</CardHeader>
			<CardContent className="py-1">
				{users.map((user) => {
					return (
						<Link
							href={`/dashboard/individual-pet-profile/${user.id}`}
							key={user.id}
							className="flex items-center justify-between gap-2 py-2 border-b border-dashed last:border-none"
						>
							{/* Left: Avatar and User Info */}
							<div className="flex items-center gap-3">
								<Avatar className="size-12">
									<AvatarImage src={`/${user.avatar}`} alt={user.name} />
									<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
								</Avatar>
								<div>
									<div className="text-sm font-medium text-foreground hover:text-primary">
										{user.name}
									</div>
									<div className="text-sm font-medium text-muted-foreground">
										{user.type}
									</div>
									<div className="flex flex-wrap items-center gap-1">
										<div className="text-xs font-normal text-muted-foreground">
											{user.breed}
										</div>
										<div className="text-xs font-normal text-muted-foreground">
											• {user.color}
										</div>
									</div>
								</div>
							</div>
							{/* Right: Status Badge */}
							<Badge
								appearance="light"
								variant={user.status === "active" ? "success" : "secondary"}
							>
								{user.status.charAt(0).toUpperCase() + user.status.slice(1)}
							</Badge>
						</Link>
					);
				})}
			</CardContent>
			<CardFooter className="justify-center">
				<Button variant="link" className="text-sm text-muted-foreground">
					Load More
				</Button>
			</CardFooter>
		</Card>
	);
}
