"use client";

import {ArrowUpRightIcon, Cat, Dog, PawPrint} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import {useRouter} from "next/navigation";

export function EmptyState() {
	const router = useRouter();

	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<PawPrint />
				</EmptyMedia>
				<EmptyTitle>No Pet Profile Yet</EmptyTitle>
				<EmptyDescription>
					You haven&apos;t created any pet profile yet. Get started by creating
					your first pet profile.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<div className="flex gap-2">
					<Button onClick={() => router.push("/add-pet-profile")}>
						Create Pet Profile
					</Button>
					{/* <Button variant="outline">Import Project</Button> */}
				</div>
			</EmptyContent>
			<Button
				variant="link"
				asChild
				className="text-muted-foreground"
				size="sm"
				onClick={() => router.push("/dashboard")}
			></Button>
		</Empty>
	);
}
