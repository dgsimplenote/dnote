export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const limit = url.searchParams.get('limit') || 20;
  const offset = url.searchParams.get('offset') || 0;

  // ✅ Change this to your actual backend endpoint
  const backendUrl = `https://your-backend.example.com/notes?limit=${limit}&offset=${offset}`;

  const res = await fetch(backendUrl);
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

export async function onRequestPost(context) {
  const body = await context.request.json();

  const res = await fetch('https://your-backend.example.com/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}
