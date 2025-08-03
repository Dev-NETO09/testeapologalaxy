import { useTransacoes } from '../contextos/ContextoTransacoes';
import { TrendingUp, TrendingDown, DollarSign, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

// Componente do resumo financeiro
export function ResumoFinanceiro() {
  const { obterTotais } = useTransacoes();
  const [mostrarValores, setMostrarValores] = useState(true);
  const totais = obterTotais();

  // Função para formatar moeda
  const formatarMoeda = (valor) => {
    if (!mostrarValores) return '••••••';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  // Configuração dos cards
  const cards = [
    {
      titulo: 'Receitas',
      valor: totais.receitas,
      icone: TrendingUp,
      cor: 'text-green-600',
      corFundo: 'bg-green-50',
      corBorda: 'border-green-200'
    },
    {
      titulo: 'Despesas',
      valor: totais.despesas,
      icone: TrendingDown,
      cor: 'text-red-600',
      corFundo: 'bg-red-50',
      corBorda: 'border-red-200'
    },
    {
      titulo: 'Saldo',
      valor: totais.saldo,
      icone: DollarSign,
      cor: totais.saldo >= 0 ? 'text-blue-600' : 'text-red-600',
      corFundo: totais.saldo >= 0 ? 'bg-blue-50' : 'bg-red-50',
      corBorda: totais.saldo >= 0 ? 'border-blue-200' : 'border-red-200'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Resumo Financeiro</h2>
        <button
          onClick={() => setMostrarValores(!mostrarValores)}
          className="flex items-center gap-2 text-purple-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          {mostrarValores ? <EyeOff size={20} /> : <Eye size={20} />}
          {mostrarValores ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, indice) => {
          const Icone = card.icone;
          return (
            <div
              key={indice}
              className="galaxy-card rounded-xl p-6 transition-all duration-200 hover:shadow-lg animate-fade-in border border-white/10"
              style={{ animationDelay: `${indice * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.cor} p-3 rounded-lg bg-white/10`}>
                  <Icone size={24} />
                </div>
              </div>
              <div>
                <p className="text-purple-200 text-sm font-medium mb-1">{card.titulo}</p>
                <p className={`text-2xl font-bold ${card.cor}`}>
                  {formatarMoeda(card.valor)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}