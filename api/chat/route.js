export const runtime = 'edge'

export async function POST(req) {
  const body = await req.json()

  const upstream = await fetch(
    'https://www.triggr.ru/api/chat/completions',
    {
      method: 'POST',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:147.0) Gecko/20100101 Firefox/147.0',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.triggr.ru/',
        'Content-Type': 'application/json',
        'Origin': 'https://www.triggr.ru',
      },
      body: JSON.stringify(body),
    }
  )

  return new Response(await upstream.text(), {
    status: upstream.status,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
