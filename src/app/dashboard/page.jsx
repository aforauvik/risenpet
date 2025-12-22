import {AppSidebar} from "@/components/app-sidebar";
import {ImageUp} from "lucide-react";
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
import {EmptyState} from "@/components/empty-state";
import {AddPetProfile} from "@/components/add-pet-profile";
import AvatarUpload from "@/components/avatar-upload";
import AllPetProfiles from "@/components/all-pet-profiles";
import IndividualPetProfile from "@/components/individual-pet-profile";
import {ConnectQR} from "@/components/connect-qr";
import {AddPetSpecialNotes} from "@/components/add-pet-medical-details";

export default function Page() {
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
									<BreadcrumbLink href="#">Risen Pet</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Pet Profile</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					{/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
						<div className="bg-muted/50 aspect-video rounded-xl" />
						<div className="bg-muted/50 aspect-video rounded-xl" />
						<div className="bg-muted/50 aspect-video rounded-xl" />
					</div> */}
					<div className="flex justify-center">
						{/* <ConnectQR /> */}
						<AllPetProfiles />
						{/* <IndividualPetProfile /> */}
						{/* <EmptyState /> */}
						{/* <AddPetSpecialNotes /> */}
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
