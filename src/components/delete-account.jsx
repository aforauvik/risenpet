import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Field, FieldLabel, FieldGroup} from "@/components/ui/field";
import Modal from "@/components/modal";
import {Button} from "@/components/ui/button";
export default function DeleteAccount() {
	return (
		<Card className="w-full max-w-md mx-auto bg-destructive/5 border-destructive/20 shadow-destructive/10">
			<CardHeader>
				<CardTitle className="text-destructive text-sm font-medium mb-2">
					Danger Zone
				</CardTitle>
				<CardTitle>Delete Account</CardTitle>
				<CardDescription>
					Your account will be deleted permanently. All pet profiles will be
					deleted as well. This action is irreversible.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						<Modal
							title="Confirm Your Action"
							description="Once confirmed, this action cannot be reversed. It will delete your account and remove all associated data."
							buttonVariant="destructive"
							buttonText="Yes, Delete Account"
						>
							<Button type="submit" className="w-full" variant="destructive">
								Delete Account
							</Button>
						</Modal>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
