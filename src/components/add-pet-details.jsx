"use client";
import {useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

import {Calendar} from "@/components/ui/calendar";
import {Label} from "@/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

import {
	Stepper,
	StepperContent,
	StepperIndicator,
	StepperItem,
	StepperNav,
	StepperPanel,
	StepperSeparator,
	StepperTitle,
	StepperTrigger,
} from "@/components/ui/stepper";
import {Check, LoaderCircleIcon, ChevronDownIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Field, FieldLabel, FieldGroup} from "@/components/ui/field";
export function AddPetDetails() {
	const router = useRouter();
	const formRef = useRef(null);

	const validateForm = () => {
		const form = formRef.current;
		if (!form) return false;

		if (!form.checkValidity()) {
			form.reportValidity();
			return false;
		}

		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		router.push("/pet-image-upload");
	};

	const handleCancel = (e) => {
		e.preventDefault();
		router.push("/dashboard");
	};

	const steps = [
		{title: "Pet Profile", route: "/add-pet-profile"},
		{title: "Pet Details", route: "/add-pet-details"},
		{title: "Pet Image", route: "/pet-image-upload"},
	];

	const handleStepClick = (stepIndex, e) => {
		e?.preventDefault();
		e?.stopPropagation();
		const step = steps[stepIndex];

		// Allow navigation to current step (no-op)
		if (step.route === "/add-pet-details") {
			return;
		}

		// For forward navigation (to step 3), validate first
		if (stepIndex === 2) {
			if (!validateForm()) {
				return;
			}
		}

		// Allow backward navigation (to step 1) without validation
		if (step && step.route) {
			router.push(step.route);
		}
	};

	const [open, setOpen] = useState(false);
	const [date, setDate] = useState(undefined);

	return (
		<div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
			<Stepper
				defaultValue={2}
				indicators={{
					completed: <Check className="size-4" />,
					loading: <LoaderCircleIcon className="size-4 animate-spin" />,
				}}
				className="space-y-8"
			>
				<StepperNav>
					{steps.map((step, index) => (
						<StepperItem
							key={index}
							step={index + 1}
							completed={index < 1}
							className="relative flex-1 items-start"
						>
							<StepperTrigger
								className="flex flex-col gap-2.5 cursor-pointer"
								onClick={(e) => handleStepClick(index, e)}
							>
								<StepperIndicator>{index + 1}</StepperIndicator>
								<StepperTitle>{step.title}</StepperTitle>
							</StepperTrigger>
							{steps.length > index + 1 && (
								<StepperSeparator className="absolute top-3 inset-x-0 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none group-data-[state=completed]/step:bg-primary" />
							)}
						</StepperItem>
					))}
				</StepperNav>
				<StepperPanel>
					<StepperContent value={1}>
						{/* Step 1 content was shown on the previous page */}
					</StepperContent>
					<StepperContent value={2}>
						<Card className="w-full max-w-2xl mx-auto">
							<CardHeader>
								<CardTitle>Add Pet Details</CardTitle>
								<CardDescription>Enter your pet details below</CardDescription>
							</CardHeader>
							<CardContent>
								<form ref={formRef} onSubmit={handleSubmit}>
									<FieldGroup>
										<div className="flex flex-col gap-6">
											<Field>
												<FieldLabel htmlFor="pet-breed">Breed</FieldLabel>
												<Input
													id="pet-breed"
													type="text"
													placeholder="e.g. Persian"
													required
												/>
											</Field>

											<Field>
												<FieldLabel htmlFor="pet-color">Color</FieldLabel>
												<Input
													id="pet-color"
													type="text"
													placeholder="e.g. Black"
													required
												/>
											</Field>

											<Field>
												<Label htmlFor="date" className="px-1">
													Date of Birth
												</Label>
												<Popover open={open} onOpenChange={setOpen}>
													<PopoverTrigger asChild>
														<Button
															variant="outline"
															id="date"
															className="w-48 justify-between font-normal"
														>
															{date ? date.toLocaleDateString() : "Select date"}
															<ChevronDownIcon />
														</Button>
													</PopoverTrigger>
													<PopoverContent
														className="w-auto overflow-hidden p-0"
														align="start"
													>
														<Calendar
															mode="single"
															selected={date}
															captionLayout="dropdown"
															onSelect={(date) => {
																setDate(date);
																setOpen(false);
															}}
														/>
													</PopoverContent>
												</Popover>
											</Field>

											<Field>
												<FieldLabel htmlFor="pet-weight">
													Weight (lbs)
												</FieldLabel>
												<Input
													id="pet-weight"
													type="number"
													min={0}
													placeholder="e.g. 10"
												/>
											</Field>

											<div className="flex flex-col gap-4">
												<Field>
													<Button type="submit" className="w-full">
														Next: Upload Pet Image
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
					</StepperContent>
					<StepperContent value={3}>
						{/* Step 3 content will be shown on the next page */}
					</StepperContent>
				</StepperPanel>
			</Stepper>
		</div>
	);
}
