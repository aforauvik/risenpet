"use client";

import {useRouter} from "next/navigation";
import Image from "next/image";
import {Card, CardHeader, CardTitle, CardContent, CardFooter} from "./ui/card";
import {Button} from "./ui/button";
import {Badge} from "./ui/badge";
import {useEffect, useState} from "react";
import {ConnectQR} from "./connect-qr";
import {Spinner} from "./ui/spinner";
import {Separator} from "./ui/separator";
import {NotepadText} from "lucide-react";

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

	useEffect(() => {
		// Extract the ID from params
		// params should be { id: "1" } from the dynamic route
		const petId = params?.id;

		if (petId) {
			// Convert to string to ensure comparison works
			const foundPet = pets.find((p) => p.id === String(petId));
			setPet(foundPet);
		}
		setLoading(false);
	}, [params]);

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

	// if (!pet) {
	// 	return (
	// 		<div className="flex flex-col w-full max-w-sm mx-auto">
	// 			<Card>
	// 				<CardContent className="p-6 text-center">
	// 					<p className="text-muted-foreground">Pet not found</p>
	// 					<Button
	// 						className="mt-4"
	// 						variant="outline"
	// 						onClick={() => router.push("/dashboard")}
	// 					>
	// 						Back to Dashboard
	// 					</Button>
	// 				</CardContent>
	// 			</Card>
	// 		</div>
	// 	);
	// }

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
							<h1 className="text-xl font-bold">{pet.name}</h1>
							<p className="text-sm text-muted-foreground">{pet.type}</p>
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
					<Separator className="mt-6" />
					<p className="text-xs font-medium text-muted-foreground my-4">
						Special Notes
					</p>
					{pet?.medicalConditions?.length > 0 ? (
						<div className="flex flex-col items-start gap-4">
							{pet.medicalConditions.map((condition, index) => (
								<div
									key={condition.id ?? index}
									className="flex flex-col items-start gap-2"
								>
									<p className="text-xs font-medium">{index + 1}.</p>
									<p className="text-sm font-medium">{condition.condition}</p>
									<p className="text-sm text-muted-foreground">
										{condition.description}
									</p>
								</div>
							))}
						</div>
					) : (
						<Button
							type="button"
							variant="secondary"
							className="w-full border-gray-200 text-sm hover:bg-gray-100"
							onClick={() => router.push("/add-pet-notes")}
						>
							<NotepadText className="size-4" /> Add Special Note
						</Button>
					)}
					<Separator className="mt-6" />
				</CardContent>

				<CardFooter className="flex flex-col items-center justify-between gap-4">
					<Button className="w-full">Edit Pet Profile</Button>
					<Button
						className="w-full"
						variant="outline"
						onClick={() => router.push("/dashboard")}
					>
						Go Back
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
