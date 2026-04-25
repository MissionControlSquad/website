// Receives BuildBase SDK events forwarded from the client handleEvent callback.
// No database in this marketing site — events are acknowledged and discarded.

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Env {}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    await context.request.json();
  } catch {
    // ignore malformed body
  }

  return Response.json({ success: true });
};
