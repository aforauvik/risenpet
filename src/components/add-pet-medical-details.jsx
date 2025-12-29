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
import {Check, LoaderCircleIcon, PlusIcon} from "lucide-react";
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
import {Textarea} from "./ui/textarea";
import {Separator} from "./ui/separator";
export function AddPetMedicalDetails() {
	const router = useRouter();
	const formRef = useRef(null);
	const [conditions, setConditions] = useState([
		{condition: "", description: ""},
	]);

	const handleSubmit = (e) => {
		e.preventDefault();

		router.push("/dashboard");
		toast.success("Medical details added successfully");
	};

	const handleCancel = (e) => {
		e.preventDefault();
		router.push("/dashboard");
	};

	const handleAddAnotherCondition = (e) => {
		e.preventDefault();
		setConditions([...conditions, {condition: "", description: ""}]);
	};

	const handleConditionChange = (index, field, value) => {
		const updatedConditions = [...conditions];
		updatedConditions[index][field] = value;
		setConditions(updatedConditions);
	};

	const handleRemoveCondition = (index) => {
		if (conditions.length > 1) {
			setConditions(conditions.filter((_, i) => i !== index));
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
				<StepperPanel>
					<StepperContent value={1}>
						<Card className="w-full max-w-2xl mx-auto">
							<CardHeader>
								<CardTitle>Special Notes</CardTitle>
								<CardDescription>
									Add information about your pet's special needs, medical
									conditions, habits, or any other important details.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form ref={formRef} onSubmit={handleSubmit}>
									<FieldGroup>
										<div className="flex flex-col gap-6">
											{conditions.map((condition, index) => (
												<div key={index} className="flex flex-col gap-6">
													{index > 0 && <Separator />}
													<div className="flex items-center justify-between">
														<h3 className="text-sm font-medium text-muted-foreground">
															Note {index + 1}
														</h3>
														{conditions.length > 1 && (
															<Button
																type="button"
																variant="ghost"
																size="sm"
																onClick={() => handleRemoveCondition(index)}
																className="text-destructive hover:text-destructive"
															>
																Remove
															</Button>
														)}
													</div>
													<Field>
														<FieldLabel htmlFor={`medical-condition-${index}`}>
															Title
														</FieldLabel>
														<Input
															id={`medical-condition-${index}`}
															type="text"
															placeholder="e.g. Max is afraid of loud noises"
															value={condition.condition}
															onChange={(e) =>
																handleConditionChange(
																	index,
																	"condition",
																	e.target.value
																)
															}
															required
														/>
													</Field>
													<Field>
														<div className="flex flex-col w-full gap-3">
															<Label htmlFor={`condition-description-${index}`}>
																Details
															</Label>
															<Textarea
																placeholder="Type your note details here."
																id={`condition-description-${index}`}
																value={condition.description}
																onChange={(e) =>
																	handleConditionChange(
																		index,
																		"description",
																		e.target.value
																	)
																}
															/>
														</div>
													</Field>
												</div>
											))}
											<Button
												type="button"
												variant="secondary"
												className="w-full border-gray-200 text-sm hover:bg-gray-100"
												onClick={handleAddAnotherCondition}
											>
												<PlusIcon className="size-4" /> Add Another Note
											</Button>
											<Separator />

											<div className="flex flex-col gap-4">
												<Field>
													<Button type="submit" className="w-full">
														Save
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
