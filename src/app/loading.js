import {Spinner} from "@/components/ui/spinner";

export default function Loading() {
	return (
		<div className="flex items-center justify-center text-center h-screen">
			<Spinner className="size-6" />
		</div>
	);
}
