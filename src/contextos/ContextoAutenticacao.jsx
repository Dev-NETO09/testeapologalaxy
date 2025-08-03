import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { autenticacao, provedorGoogle, bancoDados } from '../firebase/configuracao';

const ContextoAutenticacao = createContext();

// Hook personalizado para usar o contexto de autenticação
export function useAutenticacao() {
  return useContext(ContextoAutenticacao);
}

// Provedor do contexto de autenticação
export function ProvedorAutenticacao({ children }) {
  const [usuarioAtual, setUsuarioAtual] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Função para fazer login com Google
  const entrarComGoogle = async () => {
    try {
      const resultado = await signInWithPopup(autenticacao, provedorGoogle);
      const usuario = resultado.user;
      
      // Verificar se o documento do usuário existe, se não criar
      const referenciaUsuario = doc(bancoDados, 'usuarios', usuario.uid);
      const documentoUsuario = await getDoc(referenciaUsuario);
      
      if (!documentoUsuario.exists()) {
        await setDoc(referenciaUsuario, {
          nome: usuario.displayName,
          email: usuario.email,
          fotoURL: usuario.photoURL,
          criadoEm: serverTimestamp(),
          atualizadoEm: serverTimestamp()
        });
      }
      
      return resultado;
    } catch (erro) {
      console.error('Erro ao fazer login com Google:', erro);
      throw erro;
    }
  };

  // Função para fazer logout
  const sair = async () => {
    try {
      await signOut(autenticacao);
    } catch (erro) {
      console.error('Erro ao fazer logout:', erro);
      throw erro;
    }
  };

  // Monitorar mudanças no estado de autenticação
  useEffect(() => {
    const cancelarInscricao = onAuthStateChanged(autenticacao, (usuario) => {
      setUsuarioAtual(usuario);
      setCarregando(false);
    });

    return cancelarInscricao;
  }, []);

  const valor = {
    usuarioAtual,
    entrarComGoogle,
    sair,
    carregando
  };

  return (
    <ContextoAutenticacao.Provider value={valor}>
      {!carregando && children}
    </ContextoAutenticacao.Provider>
  );
}