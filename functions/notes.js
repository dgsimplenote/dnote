export async function onRequestGet(context) {
  const { DB } = context.env;
  const url = new URL(context.request.url);
  const limit = parseInt(url.searchParams.get('limit') || '20');
  const offset = parseInt(url.searchParams.get('offset') || '0');

  try {
    const { results } = await DB.prepare(
      'SELECT id, t1, v1 FROM danote ORDER BY v1 DESC LIMIT ? OFFSET ?'
    )
      .bind(limit, offset)
      .all();

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('DB GET error:', err);
    return new Response(JSON.stringify({ error: 'Database read failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequestPost(context) {
  const { DB } = context.env;
  try {
    const { text } = await context.request.json();
    if (!text || typeof text !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid text' }), { status: 400 });
    }

    await DB.prepare('INSERT INTO danote (t1) VALUES (?)').bind(text).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('DB POST error:', err);
    return new Response(JSON.stringify({ error: 'Database insert failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
