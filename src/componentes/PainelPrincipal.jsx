import { useState } from 'react';
import { useAutenticacao } from '../contextos/ContextoAutenticacao';
import { useTransacoes } from '../contextos/ContextoTransacoes';
import { ModalTransacao } from './ModalTransacao';
import { ListaTransacoes } from './ListaTransacoes';
import { ResumoFinanceiro } from './ResumoFinanceiro';
import { Filtros } from './Filtros';
import { Notificacao } from './Notificacao';
import { 
  Plus, 
  LogOut, 
  Rocket,
  Menu,
  X,
  Filter,
  Stars
} from 'lucide-react';

// Componente do painel principal (dashboard)
export function PainelPrincipal() {
  const [modalAberto, setModalAberto] = useState(false);
  const [transacaoEditando, setTransacaoEditando] = useState(null);
  const [notificacao, setNotificacao] = useState(null);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const { usuarioAtual, sair } = useAutenticacao();
  const { carregando } = useTransacoes();

  // Função para lidar com logout
  const lidarComLogout = async () => {
    try {
      await sair();
    } catch (erro) {
      setNotificacao({
        mensagem: 'Erro ao fazer logout',
        tipo: 'erro'
      });
    }
  };

  // Função para adicionar nova transação
  const lidarComAdicionarTransacao = () => {
    setTransacaoEditando(null);
    setModalAberto(true);
  };

  // Função para editar transação
  const lidarComEditarTransacao = (transacao) => {
    setTransacaoEditando(transacao);
    setModalAberto(true);
  };

  // Função chamada quando transação é salva
  const lidarComTransacaoSalva = (mensagem) => {
    setModalAberto(false);
    setTransacaoEditando(null);
    setNotificacao({
      mensagem,
      tipo: 'sucesso'
    });
  };

  // Função chamada quando transação é excluída
  const lidarComTransacaoExcluida = () => {
    setNotificacao({
      mensagem: 'Transação excluída com sucesso!',
      tipo: 'sucesso'
    });
  };

  // Função para lidar com erros
  const lidarComErro = (mensagem) => {
    setNotificacao({
      mensagem,
      tipo: 'erro'
    });
  };

  return (
    <div className="min-h-screen galaxy-bg">
      {/* Cabeçalho */}
      <header className="galaxy-card shadow-lg border-b border-white/10 relative overflow-hidden">
        {/* Efeito de estrelas no header */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-2 right-20 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute top-4 right-40 w-0.5 h-0.5 bg-purple-300 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-3 left-32 w-1 h-1 bg-blue-300 rounded-full opacity-50 animate-pulse"></div>
        </div>

        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="galaxy-button p-2 rounded-lg shadow-lg">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                  <Stars className="w-5 h-5 text-purple-300" />
                  Apolo Gestão Pessoal
                </h1>
                <p className="text-sm text-purple-200">Olá, {usuarioAtual?.displayName}</p>
              </div>
            </div>

            {/* Ações Desktop - Removido botão de adicionar */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={lidarComLogout}
                className="flex items-center gap-2 text-purple-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <LogOut size={20} />
                Sair
              </button>
            </div>

            {/* Botão Menu Mobile */}
            <button
              onClick={() => setMenuMobileAberto(!menuMobileAberto)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 text-white"
            >
              {menuMobileAberto ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Menu Mobile */}
          {menuMobileAberto && (
            <div className="md:hidden border-t border-white/10 py-4 space-y-2">
              <button
                onClick={lidarComLogout}
                className="w-full flex items-center gap-2 text-purple-200 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <LogOut size={20} />
                Sair
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Resumo Financeiro */}
          <ResumoFinanceiro />

          {/* Botões de Ação acima da lista */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
            <h2 className="text-2xl font-bold text-white">Transações</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setFiltrosAbertos(!filtrosAbertos)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  filtrosAbertos 
                    ? 'galaxy-button text-white shadow-lg' 
                    : 'bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Filter size={20} />
                Filtros
              </button>
              <button
                onClick={lidarComAdicionarTransacao}
                className="galaxy-button text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
              >
                <Plus size={20} />
                Nova Transação
              </button>
            </div>
          </div>

          {/* Filtros (condicionalmente visível) */}
          {filtrosAbertos && (
            <div className="animate-fade-in">
              <Filtros />
            </div>
          )}

          {/* Lista de Transações */}
          <ListaTransacoes
            aoEditar={lidarComEditarTransacao}
            aoExcluir={lidarComTransacaoExcluida}
            aoErro={lidarComErro}
          />
        </div>
      </main>

      {/* Modal de Transação */}
      {modalAberto && (
        <ModalTransacao
          aberto={modalAberto}
          aoFechar={() => {
            setModalAberto(false);
            setTransacaoEditando(null);
          }}
          aoSalvar={lidarComTransacaoSalva}
          aoErro={lidarComErro}
          transacao={transacaoEditando}
        />
      )}

      {/* Notificações Toast */}
      {notificacao && (
        <Notificacao
          mensagem={notificacao.mensagem}
          tipo={notificacao.tipo}
          aoFechar={() => setNotificacao(null)}
        />
      )}
    </div>
  );
}
