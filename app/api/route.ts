export async function GET(request: Request) {
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0] || request.socket.remoteAddress || null;
  return new Response(JSON.stringify({ ip: clientIp }));
}