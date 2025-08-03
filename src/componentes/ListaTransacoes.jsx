import { useTransacoes } from '../contextos/ContextoTransacoes';
import { Carregamento } from './Carregamento';
import { Edit, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';

// Componente da lista de transações
export function ListaTransacoes({ aoEditar, aoExcluir, aoErro }) {
  const { obterTransacoesFiltradas, excluirTransacao, carregando } = useTransacoes();
  const [excluindoId, setExcluindoId] = useState(null);
  const transacoes = obterTransacoesFiltradas();

  // Função para lidar com exclusão
  const lidarComExclusao = async (transacao) => {
    const confirmado = window.confirm(
      `Tem certeza que deseja excluir a transação "${transacao.descricao}"?`
    );
    
    if (!confirmado) return;

    try {
      setExcluindoId(transacao.id);
      await excluirTransacao(transacao.id);
      aoExcluir();
    } catch (erro) {
      aoErro('Erro ao excluir transação. Tente novamente.');
    } finally {
      setExcluindoId(null);
    }
  };

  // Função para formatar moeda
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  // Função para formatar data
  const formatarDataHora = (data) => {
    return new Date(data).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (carregando) {
    return (
      <div className="galaxy-card rounded-xl shadow-lg border border-white/10 p-8">
        <Carregamento texto="Carregando transações..." />
      </div>
    );
  }

  if (transacoes.length === 0) {
    return (
      <div className="galaxy-card rounded-xl shadow-lg border border-white/10 p-8 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
            <TrendingUp className="w-8 h-8 text-purple-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Nenhuma transação encontrada
            </h3>
            <p className="text-purple-200">
              Adicione sua primeira transação ou ajuste os filtros para ver seus dados.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="galaxy-card rounded-xl shadow-lg border border-white/10">
      <div className="divide-y divide-white/10">
        {transacoes.map((transacao, indice) => {
          const ehReceita = transacao.tipo === 'receita';
          const Icone = ehReceita ? TrendingUp : TrendingDown;
          const estaExcluindo = excluindoId === transacao.id;
          
          return (
            <div
              key={transacao.id}
              className={`p-4 sm:p-6 hover:bg-white/5 transition-colors animate-fade-in ${estaExcluindo ? 'opacity-50' : ''}`}
              style={{ animationDelay: `${indice * 0.05}s` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Ícone */}
                  <div className={`p-2 rounded-lg flex-shrink-0 ${ehReceita ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    <Icone className={`w-5 h-5 ${ehReceita ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                  
                  {/* Informações da Transação */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                      <h4 className="font-medium text-white truncate">
                        {transacao.descricao}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        ehReceita 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transacao.tipo}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-purple-200">
                      <span>{transacao.categoria}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-xs sm:text-sm">{formatarDataHora(transacao.data)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  {/* Valor */}
                  <div className="text-left sm:text-right">
                    <p className={`text-lg font-semibold ${
                      ehReceita ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {ehReceita ? '+' : '-'} {formatarMoeda(transacao.valor)}
                    </p>
                  </div>
                  
                  {/* Ações */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => aoEditar(transacao)}
                      disabled={estaExcluindo}
                      className="p-2 text-purple-300 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors disabled:opacity-50"
                      title="Editar transação"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                    onClick={() => lidarComExclusao(transacao)}
                    disabled={estaExcluindo}
                    className="p-2 text-purple-300 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
                    title="Excluir transação"
                  >
                    {estaExcluindo ? (
                      <Carregamento tamanho="pequeno" texto="" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}