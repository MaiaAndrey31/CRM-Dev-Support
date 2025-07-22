// src/services/gemini.js

const API_KEY = 'SUA_API_KEY_AQUI'; // Substitua por sua chave real

const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

export async function perguntarGemini(pergunta) {
    const body = {
        contents: [
            {
                parts: [{ text: pergunta }],
            },
        ],
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sem resposta.';
    } catch (err) {
        console.error('Erro ao chamar IA:', err);
        return 'Erro ao consultar IA.';
    }
}
