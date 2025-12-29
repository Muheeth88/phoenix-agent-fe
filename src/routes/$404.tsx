import { Button } from "@/components/ui/button";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/$404")({
  component: NotFound,
});

function NotFound() {
  const router = useRouter();

  return (
    <div>
      <div>404 Page Not Found</div>
      <div>
        <Link to="/">
          <Button variant="link">Go Home</Button>
        </Link>

        <Button variant="link" onClick={() => router.history.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
