import { Loader } from "@/components/shared/loader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="p-2">
			<h3>BaseUrl : {import.meta.env.VITE_API_URL}</h3>
			<h3>Welcome Home!</h3>
			<Loader />
			<div>End</div>
		</div>
	);
}
