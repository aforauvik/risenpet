"use client";

import {useState} from "react";
import {GalleryVerticalEnd} from "lucide-react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import {AlertCircleIcon} from "lucide-react";
import {
	Alert,
	AlertTitle,
	AlertDescription,
	AlertIcon,
} from "@/components/ui/alert";

export function OTPForm({className, ...props}) {
	const [otp, setOtp] = useState("");
	const router = useRouter();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (otp === "123456") {
			router.push("/dashboard");
			toast.success("Logged in successfully");
		} else {
			toast.error("Invalid OTP");
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<form onSubmit={handleSubmit}>
				<FieldGroup>
					<div className="flex flex-col items-center justify-center gap-2 text-center">
						<a
							href="#"
							className="flex flex-col items-center gap-2 font-medium"
						>
							<img
								src="risen-pet-logo.svg"
								alt="Risen Pet"
								className="w-10 h-10"
							/>
							<span className="sr-only">Risen Pet</span>
						</a>
						<h1 className="text-xl font-bold">Enter verification code</h1>
						<FieldDescription>
							We sent a 6-digit code to your email address
						</FieldDescription>
					</div>
					<Field>
						<FieldLabel htmlFor="otp" className="sr-only">
							Verification code
						</FieldLabel>
						<InputOTP
							maxLength={6}
							id="otp"
							value={otp}
							onChange={setOtp}
							required
						>
							<InputOTPGroup className="md:gap-2.5 lg:gap-4 gap-2 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
								<InputOTPSeparator className="md:hidden lg:block hidden" />
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>

							{/* <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup> */}
						</InputOTP>
						<FieldDescription className="text-center">
							Didn&apos;t receive the code? <a href="#">Resend</a>
						</FieldDescription>
					</Field>

					<Field>
						<Button type="submit">Verify</Button>
					</Field>
				</FieldGroup>
			</form>
		</div>
	);
}
