export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        stream: true,
        messages: messages,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to connect to OpenAI');
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    // Manually parse the OpenAI stream and translate it into the format the frontend expects
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) return controller.close();

        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Keep incomplete lines in the buffer

          for (const line of lines) {
            if (line.startsWith('data: ') && !line.includes('[DONE]')) {
              try {
                const data = JSON.parse(line.slice(6));
                const text = data.choices[0]?.delta?.content;
                if (text) {
                  // Vercel AI SDK expects format: 0:"chunk"\n
                  controller.enqueue(encoder.encode(`0:${JSON.stringify(text)}\n`));
                }
              } catch (e) {
                // Ignore incomplete JSON chunks
              }
            }
          }
        }
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response('Error connecting to AI. Please try again.', { status: 500 });
  }
}
