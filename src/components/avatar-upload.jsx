"use client";
import {formatBytes, useFileUpload} from "@/hooks/use-file-upload";
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import {
	TriangleAlert,
	User,
	ImageUp,
	X,
	Check,
	LoaderCircleIcon,
} from "lucide-react";
import {cn} from "@/lib/utils";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "./ui/card";
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
import {useRouter} from "next/navigation";
export default function AvatarUpload({
	// 5MB
	maxSize = 5 * 1024 * 1024,

	className,
	onFileChange,
	defaultAvatar,
}) {
	const router = useRouter();
	const [
		{files, isDragging, errors},
		{
			removeFile,
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			getInputProps,
		},
	] = useFileUpload({
		maxFiles: 1,
		maxSize,
		accept: "image/*",
		multiple: false,
		onFilesChange: (files) => {
			onFileChange?.(files[0] || null);
		},
	});

	const currentFile = files[0];
	const previewUrl = currentFile?.preview || defaultAvatar;

	const handleRemove = () => {
		if (currentFile) {
			removeFile(currentFile.id);
		}
	};

	const handleContinue = () => {
		router.push("/dashboard");
	};

	const handleSkip = () => {
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
		if (step && step.route && step.route !== "/petimageupload") {
			router.push(step.route);
		}
	};

	return (
		<div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
			<Stepper
				defaultValue={3}
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
							completed={index < 2}
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
						{/* Step 2 content was shown on the previous page */}
					</StepperContent>
					<StepperContent value={3}>
						<Card className="w-full max-w-sm mx-auto">
							<CardHeader>
								<CardTitle>Pet Profile Image</CardTitle>
								<CardDescription>Upload your pet profile image</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col items-center gap-4">
									<div className="border-2 border-dashed border-muted-foreground/10 rounded-md w-full max-w-sm px-4 py-4">
										<div
											className={cn(
												"flex flex-col items-center gap-4",
												className
											)}
										>
											{/* Avatar Preview */}
											<div className="relative">
												<div
													className={cn(
														"group/avatar relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border border-dashed transition-colors",
														isDragging
															? "border-primary bg-primary/5"
															: "border-muted-foreground/25 hover:border-muted-foreground/20",
														previewUrl && "border-solid"
													)}
													onDragEnter={handleDragEnter}
													onDragLeave={handleDragLeave}
													onDragOver={handleDragOver}
													onDrop={handleDrop}
													onClick={openFileDialog}
												>
													<input {...getInputProps()} className="sr-only" />

													{previewUrl ? (
														<img
															src={previewUrl}
															alt="Avatar"
															className="h-full w-full object-cover"
														/>
													) : (
														<div className="flex h-full w-full items-center justify-center">
															<ImageUp className="size-6 text-muted-foreground" />
														</div>
													)}
												</div>

												{/* Remove Button - only show when file is uploaded */}
												{currentFile && (
													<Button
														size="icon"
														variant="outline"
														onClick={handleRemove}
														className="size-6 absolute end-0 top-0 rounded-full"
														aria-label="Remove pet image"
													>
														<X className="size-3.5" />
													</Button>
												)}
											</div>
											{/* Upload Instructions */}
											<div className="text-center space-y-0.5">
												<p className="text-sm font-medium">
													{currentFile
														? "Pet image uploaded"
														: "Upload pet image"}
												</p>
												<p className="text-xs text-muted-foreground">
													PNG, JPG up to {formatBytes(maxSize)}
												</p>
											</div>
											{/* Error Messages */}
											{errors.length > 0 && (
												<Alert
													variant="destructive"
													appearance="light"
													className="mt-5"
												>
													<AlertIcon>
														<TriangleAlert />
													</AlertIcon>
													<AlertContent>
														<AlertTitle>File upload error(s)</AlertTitle>
														<AlertDescription>
															{errors.map((error, index) => (
																<p key={index} className="last:mb-0">
																	{error}
																</p>
															))}
														</AlertDescription>
													</AlertContent>
												</Alert>
											)}
										</div>
									</div>
									<Button className="w-full" onClick={handleContinue}>
										Continue
									</Button>
									<Button
										variant="outline"
										className="w-full"
										onClick={handleSkip}
									>
										I'll do it later
									</Button>
								</div>
							</CardContent>
						</Card>
					</StepperContent>
				</StepperPanel>
			</Stepper>
		</div>
	);
}
