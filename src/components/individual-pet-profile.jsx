"use client";

import {useRouter} from "next/navigation";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Card, CardHeader, CardTitle, CardContent, CardFooter} from "./ui/card";
import {Button} from "./ui/button";
import {Badge} from "./ui/badge";
import {Input} from "./ui/input";
import {ConnectQR} from "./connect-qr";
import {Spinner} from "./ui/spinner";
import {Separator} from "./ui/separator";
import {NotepadText} from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog";

// Pet data - matching the structure from all-pet-profiles
const pets = [
	{
		id: "1",
		name: "Jaxs",
		breed: "Tabby",
		avatar: "cat-1.jpg",
		status: "QR Active",
		type: "Cat",
		color: "Gray",
		age: "3",
		weight: "12",
		gender: "Male",
		qr: "Connected",
	},
	{
		id: "2",
		name: "Rex",
		breed: "Golden Retriever",
		avatar: "dog-1.jpg",
		status: "QR Inactive",
		type: "Dog",
		color: "Golden",
		age: "5",
		weight: "65",
		gender: "Male",
		qr: "Not Connected",
	},
	{
		id: "3",
		name: "Bella",
		breed: "Labrador Retriever",
		avatar: "dog-2.jpg",
		status: "QR Active",
		type: "Dog",
		color: "Brown",
		age: "2",
		weight: "55",
		gender: "Female",
		qr: "Connected",
		medicalConditions: [
			{
				id: "1",
				condition: "Diabetes",
				description: "Pet has diabetes and needs to take insulin",
			},
			{
				id: "2",
				condition: "Heart Disease",
				description: "Pet has heart disease and needs to take heart medication",
			},
		],
	},
	{
		id: "4",
		name: "Max",
		breed: "Siamese",
		avatar: "cat-2.jpg",
		status: "QR Inactive",
		type: "Cat",
		color: "White",
		age: "4",
		weight: "8",
		gender: "Male",
		qr: "Not Connected",
		medicalConditions: [
			{
				id: "1",
				condition: "Diabetes",
				description: "Pet has diabetes and needs to take insulin",
			},
		],
	},
	{
		id: "5",
		name: "Roxie",
		breed: "Beagle",
		avatar: "dog-3.jpg",
		status: "QR Active",
		type: "Dog",
		color: "White",
		age: "1",
		weight: "25",
		gender: "Female",
		qr: "Connected",
		medicalConditions: [
			{
				id: "1",
				condition: "Diabetes",
				description: "Pet has diabetes and needs to take insulin",
			},
		],
	},
];
export default function IndividualPetProfile({params}) {
	const router = useRouter();
	const [pet, setPet] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [isAddingNote, setIsAddingNote] = useState(false);
	const [newNote, setNewNote] = useState({condition: "", description: ""});
	const [formData, setFormData] = useState({
		name: "",
		type: "",
		breed: "",
		color: "",
		age: "",
		weight: "",
		gender: "",
		qr: "",
		medicalConditions: [],
	});

	useEffect(() => {
		// Extract the ID from params
		// params should be { id: "1" } from the dynamic route
		const petId = params?.id;

		if (petId) {
			// Convert to string to ensure comparison works
			const foundPet = pets.find((p) => p.id === String(petId));
			setPet(foundPet);
			if (foundPet) {
				setFormData({
					name: foundPet.name ?? "",
					type: foundPet.type ?? "",
					breed: foundPet.breed ?? "",
					color: foundPet.color ?? "",
					age: foundPet.age ?? "",
					weight: foundPet.weight ?? "",
					gender: foundPet.gender ?? "",
					qr: foundPet.qr ?? "",
					medicalConditions:
						foundPet.medicalConditions?.map((condition) => ({...condition})) ??
						[],
				});
			}
		}
		setLoading(false);
	}, [params]);

	const handleFieldChange = (field, value) => {
		setFormData((prev) => ({...prev, [field]: value}));
	};

	const handleSave = () => {
		if (!pet) return;
		setPet((prev) => (prev ? {...prev, ...formData} : prev));
		setIsEditing(false);
	};

	const handleCancel = () => {
		if (!pet) return;
		setFormData({
			name: pet.name ?? "",
			type: pet.type ?? "",
			breed: pet.breed ?? "",
			color: pet.color ?? "",
			age: pet.age ?? "",
			weight: pet.weight ?? "",
			gender: pet.gender ?? "",
			qr: pet.qr ?? "",
			medicalConditions:
				pet.medicalConditions?.map((condition) => ({...condition})) ?? [],
		});
		setIsEditing(false);
	};

	const handleConditionChange = (index, field, value) => {
		setFormData((prev) => {
			const nextConditions = [...(prev.medicalConditions ?? [])];
			if (!nextConditions[index]) {
				nextConditions[index] = {condition: "", description: ""};
			}
			nextConditions[index] = {...nextConditions[index], [field]: value};
			return {...prev, medicalConditions: nextConditions};
		});
	};

	const handleAddCondition = () => {
		setFormData((prev) => ({
			...prev,
			medicalConditions: [
				...(prev.medicalConditions ?? []),
				{
					id: crypto.randomUUID?.() ?? Date.now().toString(),
					condition: "",
					description: "",
				},
			],
		}));
	};

	const handleRemoveCondition = (index) => {
		setFormData((prev) => {
			const nextConditions = [...(prev.medicalConditions ?? [])];
			nextConditions.splice(index, 1);
			return {...prev, medicalConditions: nextConditions};
		});
	};

	const startAddNote = () => {
		setIsAddingNote(true);
		setNewNote({condition: "", description: ""});
	};

	const cancelAddNote = () => {
		setIsAddingNote(false);
		setNewNote({condition: "", description: ""});
	};

	const saveNewNote = () => {
		if (!pet) return;
		const noteToAdd = {
			id: crypto.randomUUID?.() ?? Date.now().toString(),
			condition: newNote.condition,
			description: newNote.description,
		};
		const nextNotes = [...(pet.medicalConditions ?? []), noteToAdd];
		setPet((prev) => (prev ? {...prev, medicalConditions: nextNotes} : prev));
		setFormData((prev) => ({
			...prev,
			medicalConditions: nextNotes.map((note) => ({...note})),
		}));
		setIsAddingNote(false);
		setNewNote({condition: "", description: ""});
	};

	const handleDelete = () => {
		setPet(null);
		router.push("/dashboard");
	};

	if (loading) {
		return (
			<div className="flex flex-col w-full max-w-sm mx-auto">
				<Card>
					<CardContent className="flex items-center justify-center text-center">
						<Spinner />
					</CardContent>
				</Card>
			</div>
		);
	}

	if (!pet) {
		return (
			<div className="flex flex-col w-full max-w-sm mx-auto">
				<Card>
					<CardContent className="p-6 text-center">
						<p className="text-muted-foreground">Pet not found</p>
						<Button
							className="mt-4"
							variant="outline"
							onClick={() => router.push("/dashboard")}
						>
							Back to Dashboard
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex flex-col w-full max-w-2xl mx-auto">
			<Card>
				<Image
					src={`/${pet.avatar}`}
					alt={pet.name}
					width={1000}
					height={1000}
					className="w-full -mt-6 h-40 object-cover rounded-t-xl"
				/>
				<CardHeader>
					<CardTitle className="flex flex-row items-start justify-between gap-2">
						<div className="flex flex-col items-start justify-between">
							{isEditing ? (
								<div className="flex flex-col gap-2 w-full">
									<Input
										value={formData.name}
										onChange={(e) => handleFieldChange("name", e.target.value)}
										placeholder="Pet name"
									/>
									<Input
										value={formData.type ?? pet.type ?? ""}
										onChange={(e) => handleFieldChange("type", e.target.value)}
										placeholder="Pet type"
									/>
								</div>
							) : (
								<>
									<h1 className="text-xl font-bold">{pet.name}</h1>
									<p className="text-sm text-muted-foreground">{pet.type}</p>
								</>
							)}
						</div>

						{pet.status === "QR Active" ? (
							<Badge appearance="light" variant="success">
								{pet.status}
							</Badge>
						) : (
							<ConnectQR />
						)}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-xs font-medium text-muted-foreground mb-4">
						Pet Details
					</p>
					{isEditing ? (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex flex-col gap-2">
								<label className="text-sm text-muted-foreground">Breed</label>
								<Input
									value={formData.breed}
									onChange={(e) => handleFieldChange("breed", e.target.value)}
									placeholder="Breed"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-sm text-muted-foreground">Color</label>
								<Input
									value={formData.color}
									onChange={(e) => handleFieldChange("color", e.target.value)}
									placeholder="Color"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-sm text-muted-foreground">Age</label>
								<Input
									value={formData.age}
									onChange={(e) => handleFieldChange("age", e.target.value)}
									placeholder="Age"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-sm text-muted-foreground">Weight</label>
								<Input
									value={formData.weight}
									onChange={(e) => handleFieldChange("weight", e.target.value)}
									placeholder="Weight"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-sm text-muted-foreground">Gender</label>
								<Input
									value={formData.gender}
									onChange={(e) => handleFieldChange("gender", e.target.value)}
									placeholder="Gender"
								/>
							</div>
							{/* <div className="flex flex-col gap-2">
								<label className="text-sm text-muted-foreground">QR</label>
								<Input
									value={formData.qr}
									onChange={(e) => handleFieldChange("qr", e.target.value)}
									placeholder="QR status"
								/>
							</div> */}
						</div>
					) : (
						<div className="flex flex-row items-center justify-between">
							<div className="flex flex-col items-start gap-2">
								<p className="text-sm text-muted-foreground">Breed</p>
								<p className="text-sm text-muted-foreground">Color</p>
								<p className="text-sm text-muted-foreground">Age</p>
								<p className="text-sm text-muted-foreground">Weight</p>
								<p className="text-sm text-muted-foreground">Gender</p>
								<p className="text-sm text-muted-foreground">QR</p>
							</div>

							<div className="flex flex-col items-end gap-2">
								<p className="text-sm font-medium">{pet.breed}</p>
								<p className="text-sm font-medium">{pet.color}</p>
								<p className="text-sm font-medium">{pet.age} years</p>
								<p className="text-sm font-medium">{pet.weight} lbs</p>
								<p className="text-sm font-medium">{pet.gender}</p>
								<p className="text-sm font-medium">{pet.qr}</p>
							</div>
						</div>
					)}
					<Separator className="mt-6" />
					<p className="text-xs font-medium text-muted-foreground my-4">
						Special Notes
					</p>
					{pet?.medicalConditions?.length > 0 ? (
						<div className="flex flex-col items-start gap-4">
							{isEditing ? (
								<>
									{(formData.medicalConditions ?? []).map(
										(condition, index) => (
											<div
												key={condition.id ?? index}
												className="flex flex-col items-start gap-2 w-full"
											>
												<div className="flex w-full items-center justify-between gap-2">
													<p className="text-xs font-medium">
														Note {index + 1}
													</p>
													<Button
														type="button"
														variant="ghost"
														className="text-destructive hover:bg-destructive/10 hover:text-destructive/80"
														size="sm"
														onClick={() => handleRemoveCondition(index)}
													>
														Delete
													</Button>
												</div>
												<Input
													value={condition.condition ?? ""}
													onChange={(e) =>
														handleConditionChange(
															index,
															"condition",
															e.target.value
														)
													}
													placeholder="Title (e.g. Diabetes/Picky Eater)"
												/>
												<textarea
													className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
													value={condition.description ?? ""}
													onChange={(e) =>
														handleConditionChange(
															index,
															"description",
															e.target.value
														)
													}
													placeholder="Description"
												/>
											</div>
										)
									)}
									<Button
										type="button"
										variant="secondary"
										className="w-full border-gray-200 text-sm hover:bg-gray-100"
										onClick={handleAddCondition}
									>
										Add Special Note
									</Button>
								</>
							) : (
								<>
									{pet.medicalConditions.map((condition, index) => (
										<div
											key={condition.id ?? index}
											className="flex flex-col items-start gap-2 w-full"
										>
											<p className="text-xs font-medium">{index + 1}.</p>
											<p className="text-sm font-medium">
												{condition.condition}
											</p>
											<p className="text-sm text-muted-foreground">
												{condition.description}
											</p>
										</div>
									))}
									{isAddingNote ? (
										<div className="flex flex-col items-start gap-3 w-full">
											<Input
												value={newNote.condition}
												onChange={(e) =>
													setNewNote((prev) => ({
														...prev,
														condition: e.target.value,
													}))
												}
												placeholder="Title (e.g. Diabetes/Picky Eater)"
											/>
											<textarea
												className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
												value={newNote.description}
												onChange={(e) =>
													setNewNote((prev) => ({
														...prev,
														description: e.target.value,
													}))
												}
												placeholder="Description"
											/>
											<div className="flex flex-col w-full gap-2">
												<Button className="w-full" onClick={saveNewNote}>
													Save Note
												</Button>
												<Button
													className="w-full"
													variant="outline"
													onClick={cancelAddNote}
												>
													Cancel
												</Button>
											</div>
										</div>
									) : (
										<Button
											type="button"
											variant="secondary"
											className="w-full border-gray-200 text-sm hover:bg-gray-100"
											onClick={startAddNote}
										>
											<NotepadText className="size-4" /> Add Special Note
										</Button>
									)}
								</>
							)}
						</div>
					) : (
						<>
							{isAddingNote ? (
								<div className="flex flex-col items-start gap-3 w-full">
									<Input
										value={newNote.condition}
										onChange={(e) =>
											setNewNote((prev) => ({
												...prev,
												condition: e.target.value,
											}))
										}
										placeholder="Title (e.g. Diabetes/Picky Eater)"
									/>
									<textarea
										className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
										value={newNote.description}
										onChange={(e) =>
											setNewNote((prev) => ({
												...prev,
												description: e.target.value,
											}))
										}
										placeholder="Description"
									/>
									<div className="flex flex-col w-full gap-4">
										<Button className="w-full" onClick={saveNewNote}>
											Save Note
										</Button>
										<Button
											className="w-full"
											variant="outline"
											onClick={cancelAddNote}
										>
											Cancel
										</Button>
									</div>
								</div>
							) : (
								<Button
									type="button"
									variant="secondary"
									className="w-full border-gray-200 text-sm hover:bg-gray-100"
									onClick={startAddNote}
								>
									<NotepadText className="size-4" /> Add Special Note
								</Button>
							)}
						</>
					)}
					{/* <Separator className="mt-6" /> */}
				</CardContent>

				<CardFooter className="flex flex-col items-center justify-between gap-4">
					{!isAddingNote && (
						<>
							{isEditing ? (
								<>
									<Button className="w-full" onClick={handleSave}>
										Save Changes
									</Button>
									<Button
										className="w-full"
										variant="outline"
										onClick={handleCancel}
									>
										Cancel
									</Button>
								</>
							) : (
								<>
									<Button className="w-full" onClick={() => setIsEditing(true)}>
										Edit Pet Profile
									</Button>
									<Button
										className="w-full"
										variant="outline"
										onClick={() => router.push("/dashboard")}
									>
										Go Back
									</Button>
								</>
							)}
							{isEditing && (
								<>
									<Separator className="my-2" />
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button className="w-full" variant="destructive">
												Delete Pet Profile
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>Delete pet profile?</AlertDialogTitle>
												<AlertDialogDescription>
													This will permanently remove the pet profile. This
													action cannot be undone.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													variant="destructive"
													onClick={handleDelete}
												>
													Delete
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</>
							)}
						</>
					)}
				</CardFooter>
			</Card>
		</div>
	);
}
