import { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { bancoDados } from '../firebase/configuracao';
import { useAutenticacao } from './ContextoAutenticacao';

const ContextoTransacoes = createContext();

// Hook personalizado para usar o contexto de transações
export function useTransacoes() {
  return useContext(ContextoTransacoes);
}

// Provedor do contexto de transações
export function ProvedorTransacoes({ children }) {
  const [transacoes, setTransacoes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [filtros, setFiltros] = useState({
    tipo: 'todos',
    categoria: 'todas',
    busca: '',
    mes: '',
    ano: new Date().getFullYear().toString()
  });
  
  const { usuarioAtual } = useAutenticacao();

  // Categorias disponíveis
  const categorias = [
    'Alimentação',
    'Transporte',
    'Saúde',
    'Educação',
    'Lazer',
    'Salário',
    'Freelance',
    'Investimentos',
    'Outros'
  ];

  // Carregar transações do usuário
  const carregarTransacoes = async () => {
    if (!usuarioAtual) return;
    
    setCarregando(true);
    try {
      const consulta = query(
        collection(bancoDados, 'transacoes'),
        where('idUsuario', '==', usuarioAtual.uid),
        orderBy('data', 'desc')
      );
      
      const resultadoConsulta = await getDocs(consulta);
      const dadosTransacoes = [];
      
      resultadoConsulta.forEach((documento) => {
        dadosTransacoes.push({
          id: documento.id,
          ...documento.data(),
          data: documento.data().data?.toDate() || new Date()
        });
      });
      
      setTransacoes(dadosTransacoes);
    } catch (erro) {
      console.error('Erro ao carregar transações:', erro);
      alert('Erro ao carregar transações. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  // Adicionar nova transação
  const adicionarTransacao = async (dadosTransacao) => {
    if (!usuarioAtual) return;
    
    try {
      const referenciaDocumento = await addDoc(collection(bancoDados, 'transacoes'), {
        ...dadosTransacao,
        idUsuario: usuarioAtual.uid,
        valor: parseFloat(dadosTransacao.valor),
        data: new Date(dadosTransacao.data),
        criadoEm: serverTimestamp(),
        atualizadoEm: serverTimestamp()
      });
      
      const novaTransacao = {
        id: referenciaDocumento.id,
        ...dadosTransacao,
        idUsuario: usuarioAtual.uid,
        valor: parseFloat(dadosTransacao.valor),
        data: new Date(dadosTransacao.data)
      };
      
      setTransacoes(anterior => [novaTransacao, ...anterior]);
      return referenciaDocumento;
    } catch (erro) {
      console.error('Erro ao adicionar transação:', erro);
      throw erro;
    }
  };

  // Atualizar transação existente
  const atualizarTransacao = async (id, dadosTransacao) => {
    try {
      const referenciaDocumento = doc(bancoDados, 'transacoes', id);
      await updateDoc(referenciaDocumento, {
        ...dadosTransacao,
        valor: parseFloat(dadosTransacao.valor),
        data: new Date(dadosTransacao.data),
        atualizadoEm: serverTimestamp()
      });
      
      setTransacoes(anterior => 
        anterior.map(transacao => 
          transacao.id === id 
            ? { 
                ...transacao, 
                ...dadosTransacao, 
                valor: parseFloat(dadosTransacao.valor),
                data: new Date(dadosTransacao.data)
              }
            : transacao
        )
      );
    } catch (erro) {
      console.error('Erro ao atualizar transação:', erro);
      throw erro;
    }
  };

  // Excluir transação
  const excluirTransacao = async (id) => {
    try {
      await deleteDoc(doc(bancoDados, 'transacoes', id));
      setTransacoes(anterior => anterior.filter(transacao => transacao.id !== id));
    } catch (erro) {
      console.error('Erro ao excluir transação:', erro);
      throw erro;
    }
  };

  // Calcular totais financeiros
  const obterTotais = () => {    
    const receitas = transacoes
      .filter(t => t.tipo === 'receita')
      .reduce((soma, t) => soma + t.valor, 0);
    
    const despesas = transacoes
      .filter(t => t.tipo === 'despesa')
      .reduce((soma, t) => soma + t.valor, 0);
    
    return {
      receitas,
      despesas,
      saldo: receitas - despesas
    };
  };

  // Filtrar transações
  const obterTransacoesFiltradas = () => {
    return transacoes.filter(transacao => {
      const dataTransacao = new Date(transacao.data);
      const mesTransacao = (dataTransacao.getMonth() + 1).toString();
      const anoTransacao = dataTransacao.getFullYear().toString();
      
      // Filtro por tipo
      if (filtros.tipo !== 'todos' && transacao.tipo !== filtros.tipo) {
        return false;
      }
      
      // Filtro por categoria
      if (filtros.categoria !== 'todas' && transacao.categoria !== filtros.categoria) {
        return false;
      }
      
      // Filtro por busca
      if (filtros.busca && !transacao.descricao.toLowerCase().includes(filtros.busca.toLowerCase())) {
        return false;
      }
      
      // Filtro por mês
      if (filtros.mes && mesTransacao !== filtros.mes) {
        return false;
      }
      
      // Filtro por ano
      if (filtros.ano && anoTransacao !== filtros.ano) {
        return false;
      }
      
      return true;
    });
  };

  // Limpar filtros
  const limparFiltros = () => {
    setFiltros({
      tipo: 'todos',
      categoria: 'todas',
      busca: '',
      mes: '',
      ano: new Date().getFullYear().toString()
    });
  };

  // Carregar transações quando o usuário mudar
  useEffect(() => {
    if (usuarioAtual) {
      carregarTransacoes();
    } else {
      setTransacoes([]);
    }
  }, [usuarioAtual]);

  const valor = {
    transacoes,
    carregando,
    filtros,
    setFiltros,
    categorias,
    adicionarTransacao,
    atualizarTransacao,
    excluirTransacao,
    carregarTransacoes,
    obterTotais,
    obterTransacoesFiltradas,
    limparFiltros
  };

  return (
    <ContextoTransacoes.Provider value={valor}>
      {children}
    </ContextoTransacoes.Provider>
  );
}