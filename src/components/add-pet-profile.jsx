"use client";
import {useState, useRef} from "react";
import {Button} from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

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
import {Check, LoaderCircleIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Field, FieldLabel, FieldGroup} from "@/components/ui/field";
export function AddPetProfile() {
	const router = useRouter();
	const [petType, setPetType] = useState("");
	const [petGender, setPetGender] = useState("");
	const formRef = useRef(null);

	const validateForm = () => {
		const form = formRef.current;
		if (!form) return false;

		if (!form.checkValidity()) {
			form.reportValidity();
			return false;
		}

		if (!petType) {
			toast.error("Please select a pet type");
			return false;
		}

		if (!petGender) {
			toast.error("Please select a gender");
			return false;
		}

		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		router.push("/add-pet-details");
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
		if (step.route === "/add-pet-profile") {
			return;
		}

		// For forward navigation (to next steps), validate first
		if (stepIndex > 0) {
			if (!validateForm()) {
				return;
			}
		}

		// Allow backward navigation (to previous steps) without validation
		if (step && step.route) {
			router.push(step.route);
		}
	};

	return (
		<div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
			<Stepper
				defaultValue={1}
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
						<Card className="w-full max-w-sm mx-auto">
							<CardHeader>
								<CardTitle>Add Pet Profile</CardTitle>
								<CardDescription>
									Enter pet information to add your pet profile
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form ref={formRef} onSubmit={handleSubmit}>
									<FieldGroup>
										<div className="flex flex-col gap-6">
											<Field>
												<FieldLabel htmlFor="pet-name">Name</FieldLabel>
												<Input
													id="pet-name"
													type="text"
													placeholder="e.g. Max"
													required
												/>
											</Field>

											<Field>
												<FieldLabel htmlFor="pet-type">Type</FieldLabel>
												<Select
													id="pet-type"
													value={petType}
													onValueChange={setPetType}
													required
												>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Select Type" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="cat">Cat</SelectItem>
														<SelectItem value="dog">Dog</SelectItem>
														<SelectItem value="other">Other</SelectItem>
													</SelectContent>
												</Select>
											</Field>

											<Field>
												<FieldLabel htmlFor="pet-gender">Gender</FieldLabel>
												<Select
													id="pet-gender"
													value={petGender}
													onValueChange={setPetGender}
													required
												>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Select Gender" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="male">Male</SelectItem>
														<SelectItem value="female">Female</SelectItem>
													</SelectContent>
												</Select>
											</Field>

											<div className="flex flex-col gap-4">
												<Field>
													<Button type="submit" className="w-full">
														Next: Pet Details
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
					<StepperContent value={2}>
						{/* Step 2 content will be shown on the next page */}
					</StepperContent>
					<StepperContent value={3}>
						{/* Step 3 content will be shown on the next page */}
					</StepperContent>
				</StepperPanel>
			</Stepper>
		</div>
	);
}
