import { Loader } from "@/components/shared/loader";
import { useGetUsers } from "@/hooks/queryHooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: About,
	loader: async ({ context }) => {
		const data = await context.queryClient.ensureQueryData(useGetUsers());
		return data;
	},
	pendingComponent: () => <Loader />,
});

function About() {
	const { data } = Route.useLoaderData();
	console.log("data>>>", data);
	return (
		<div className="p-2">
			<div>Hello from About!</div>
			<div>
				{data?.map((user: any) => (
					<div key={user.id}>{user.name}</div>
				))}
			</div>
		</div>
	);
}
