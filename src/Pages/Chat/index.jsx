// src/Pages/Chat/index.jsx

import { useState } from 'react';
import { perguntarChatGPT } from '../../services/openai';

function Chat() {
    const [mensagem, setMensagem] = useState('');
    const [respostas, setRespostas] = useState([]);

    const enviarMensagem = async () => {
        if (!mensagem.trim()) return;

        // Adiciona a mensagem do usuário ao chat
        const novaMensagem = { tipo: 'usuário', texto: mensagem };
        setRespostas((prev) => [...prev, novaMensagem]);

        // Consulta a IA
        const respostaIA = await perguntarChatGPT(mensagem);

        // Adiciona a resposta da IA ao chat
        const respostaMensagem = { tipo: 'ia', texto: respostaIA };
        setRespostas((prev) => [...prev, respostaMensagem]);

        setMensagem('');
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Chat com ChatGPT</h1>

            <div
                style={{
                    marginBottom: '1rem',
                    height: '300px',
                    overflowY: 'auto',
                    border: '1px solid #ccc',
                    padding: '1rem',
                    backgroundColor: '#f9f9f9',
                }}
            >
                {respostas.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            marginBottom: '1rem',
                            textAlign: msg.tipo === 'ia' ? 'left' : 'right',
                            color: msg.tipo === 'ia' ? '#333' : '#007bff',
                        }}
                    >
                        <strong>{msg.tipo === 'ia' ? 'ChatGPT:' : 'Você:'}</strong>
                        <br />
                        <span>{msg.texto}</span>
                    </div>
                ))}
            </div>

            <textarea
                rows="3"
                cols="60"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Digite sua mensagem..."
            />
            <br />
            <button onClick={enviarMensagem}>Enviar</button>
        </div>
    );
}

export default Chat;
