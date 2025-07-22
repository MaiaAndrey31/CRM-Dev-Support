// Centraliza as chamadas à API
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Funções para Pedidos
export async function getPedidos() {
  const res = await fetch(`${BASE_URL}/pedidos`);
  if (!res.ok) throw new Error('Erro ao buscar pedidos');
  return res.json();
}

// Funções para Links Úteis
export async function getLinks() {
  const res = await fetch(`${BASE_URL}/links`);
  if (!res.ok) throw new Error('Erro ao buscar links');
  return res.json();
}

export async function createLink(linkData) {
  const res = await fetch(`${BASE_URL}/links`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(linkData),
  });
  if (!res.ok) throw new Error('Erro ao criar link');
  return res.json();
}

export async function updateLink(id, linkData) {
  const res = await fetch(`${BASE_URL}/links/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(linkData),
  });
  if (!res.ok) throw new Error('Erro ao atualizar link');
  return res.json();
}

export async function deleteLink(id) {
  const res = await fetch(`${BASE_URL}/links/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erro ao deletar link');
  return res.json();
}
