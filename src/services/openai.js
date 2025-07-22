// src/services/openai.js

const API_KEY = 'SUA_API_KEY_AQUI'; // ⚠️ Cuidado: visível no navegador!

const endpoint = 'https://api.openai.com/v1/chat/completions';

export async function perguntarChatGPT(pergunta) {
  const body = {
    model: 'gpt-3.5-turbo', // ou 'gpt-4' se sua conta permitir
    messages: [{ role: 'user', content: pergunta }],
    temperature: 0.7,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'Sem resposta.';
  } catch (error) {
    console.error('Erro ao chamar ChatGPT:', error);
    return 'Erro ao consultar ChatGPT.';
  }
}
