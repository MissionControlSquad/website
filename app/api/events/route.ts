export async function POST(request: Request) {
  try {
    await request.json();
  } catch {
    // ignore malformed body
  }

  return Response.json({ success: true });
}
