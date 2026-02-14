import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center">
      <Container>
        <div className="flex flex-col items-center gap-4">
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-primary-500"
            aria-hidden
          />
          <p className="text-sm text-neutral-500">Loading…</p>
        </div>
      </Container>
    </div>
  );
}
