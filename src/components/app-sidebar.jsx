"use client";

import * as React from "react";
import {
	BookOpen,
	Bot,
	Command,
	Frame,
	LifeBuoy,
	Map,
	PieChart,
	Send,
	Settings2,
	PawPrint,
	SquareTerminal,
} from "lucide-react";

import {NavMain} from "@/components/nav-main";
import {NavProjects} from "@/components/nav-projects";
import {NavSecondary} from "@/components/nav-secondary";
import {NavUser} from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
	user: {
		name: "John Doe",
		email: "john.doe@example.com",
		avatar: "/john-doe.jpg",
	},
	navMain: [
		{
			title: "Pet Profile",
			url: "/dashboard",
			icon: PawPrint,
			isActive: true,
			items: [],
		},
		// {
		// 	title: "Models",
		// 	url: "#",
		// 	icon: Bot,
		// 	items: [
		// 		{
		// 			title: "Genesis",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Explorer",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Quantum",
		// 			url: "#",
		// 		},
		// 	],
		// },
		// {
		// 	title: "Documentation",
		// 	url: "#",
		// 	icon: BookOpen,
		// 	items: [
		// 		{
		// 			title: "Introduction",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Get Started",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Tutorials",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Changelog",
		// 			url: "#",
		// 		},
		// 	],
		// },
		{
			title: "Settings",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "General",
					url: "#",
				},
				// {
				// 	title: "Team",
				// 	url: "#",
				// },
				{
					title: "Billing",
					url: "#",
				},
				// {
				// 	title: "Limits",
				// 	url: "#",
				// },
			],
		},
	],
	navSecondary: [
		{
			title: "Support",
			url: "#",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "#",
			icon: Send,
		},
	],
	projects: [
		// {
		// 	name: "Design Engineering",
		// 	url: "#",
		// 	icon: Frame,
		// },
		// {
		// 	name: "Sales & Marketing",
		// 	url: "#",
		// 	icon: PieChart,
		// },
		// {
		// 	name: "Travel",
		// 	url: "#",
		// 	icon: Map,
		// },
	],
};

export function AppSidebar({...props}) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<img
									src="/risen-pet-logo.svg"
									alt="Risen Pet"
									className="w-8 h-8"
								/>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Risen Pet</span>
									<span className="truncate text-xs">Free</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
