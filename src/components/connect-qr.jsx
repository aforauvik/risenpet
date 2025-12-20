import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {QrCode} from "lucide-react";

export function ConnectQR() {
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button
						variant="default"
						size="sm"
						className="bg-emerald-500 text-white hover:bg-emerald-600"
					>
						<QrCode className="w-4 h-4 text-white" />
						Connect QR
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Connect QR</DialogTitle>
						<DialogDescription>
							The ID and PIN are on your pet&apos;s collar.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="qr-id">ID</Label>
							<Input
								type="number"
								id="qr-id"
								name="qr-id"
								placeholder="Enter 6 digit ID"
								required
							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="qr-pin">PIN</Label>
							<Input
								id="qr-pin"
								name="qr-pin"
								placeholder="Enter 6 digit PIN"
								type="number"
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Connect</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
