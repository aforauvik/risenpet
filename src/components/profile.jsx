"use client";

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import {Field, FieldLabel, FieldGroup} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {ChevronDownIcon} from "lucide-react";
import {useState, useRef} from "react";
import {Label} from "@/components/ui/label";

export default function Profile() {
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState(undefined);
	const formRef = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleCancel = (e) => {
		e.preventDefault();
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Profile</CardTitle>
				<CardDescription>Your profile details</CardDescription>
			</CardHeader>
			<CardContent>
				<form ref={formRef} onSubmit={handleSubmit}>
					<FieldGroup>
						<div className="flex flex-col gap-6">
							<Field>
								<FieldLabel htmlFor="name">Name</FieldLabel>
								<Input
									id="name"
									type="text"
									placeholder="e.g. John Doe"
									required
								/>
							</Field>

							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									placeholder="e.g. john.doe@example.com"
									required
								/>
							</Field>

							<div className="flex flex-col gap-4">
								<Field>
									<Button type="submit" className="w-full">
										Edit Profile
									</Button>
								</Field>
								<Field>
									<Button
										type="button"
										variant="outline"
										className="w-full"
										onClick={handleCancel}
									>
										Cancel
									</Button>
								</Field>
							</div>
						</div>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
