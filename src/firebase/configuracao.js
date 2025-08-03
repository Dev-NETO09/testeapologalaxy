// Importar as funções necessárias dos SDKs do Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase - SUBSTITUA PELAS SUAS CONFIGURAÇÕES
const configuracaoFirebase = {
  apiKey: "AIzaSyBP3SRxR5x-NQgdwSp3VHiYWRr5_kPAQzw",
  authDomain: "apolo-4a40d.firebaseapp.com",
  projectId: "apolo-4a40d",
  storageBucket: "apolo-4a40d.firebasestorage.app",
  messagingSenderId: "308571182220",
  appId: "1:308571182220:web:f46395075a9fcace4c57a9"
};

// Inicializar Firebase
const app = initializeApp(configuracaoFirebase);

// Inicializar serviços
export const bancoDados = getFirestore(app);
export const autenticacao = getAuth(app);
export const provedorGoogle = new GoogleAuthProvider();

export default app;