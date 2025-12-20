import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Separator} from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import IndividualPetProfile from "@/components/individual-pet-profile";

// Pet data - matching the structure from all-pet-profiles
const pets = [
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

export default async function IndividualPetProfilePage({params}) {
	const resolvedParams = await params;
	const pet = pets.find((p) => p.id === resolvedParams.id);
	const petName = pet?.name || "Pet Profile";

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="/dashboard">Risen Pet</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Pet Profile</BreadcrumbPage>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>{petName}</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<div className="flex justify-center">
						<IndividualPetProfile params={resolvedParams} />
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
