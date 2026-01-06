import { Loader } from "@/components/shared/loader";
import { useHealthCheck } from "@/hooks/queryHooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
	loader: async ({ context }) => {
		const data = await context.queryClient.ensureQueryData(useHealthCheck());
		return data;
	},
	pendingComponent: () => <div>Loading...</div>,
});

function Index() {
	const { data } = Route.useLoaderData();
	console.log("data>>>", data);
	return (
		<div className="p-2">
			<h3>Welcome!</h3>
			<div>
				<span>Backend: </span>
				{data?.message}
			</div>
			<h3>BaseUrl : {import.meta.env.VITE_API_URL}</h3>
			{/* <Loader /> */}
		</div>
	);
}
