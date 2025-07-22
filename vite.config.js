import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente
  const env = loadEnv(mode, process.cwd(), '')

  // Log para depuração (opcional)
  console.log('Variáveis de ambiente carregadas:', {
    apiKey: env.VITE_FIREBASE_API_KEY ? '***' : 'não definida',
    projectId: env.VITE_FIREBASE_PROJECT_ID || 'não definido'
  })

  return {
    plugins: [react()],
    server: {
      port: 3000
    },
    // Expõe as variáveis de ambiente para o cliente
    define: {
      'process.env': {}
    },
    envPrefix: 'VITE_',
  }
})
