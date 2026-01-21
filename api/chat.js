export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const upstreamRes = await fetch(
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
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        body: JSON.stringify(req.body),
      }
    )

    const text = await upstreamRes.text()

    res.status(upstreamRes.status)
    res.setHeader('Content-Type', 'application/json')
    res.send(text)
  } catch (err) {
    res.status(500).json({
      error: 'proxy_error',
      message: err.message,
    })
  }
}
