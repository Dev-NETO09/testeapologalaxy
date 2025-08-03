import { useTransacoes } from '../contextos/ContextoTransacoes';
import { Search, Filter, X } from 'lucide-react';

// Componente de filtros
export function Filtros() {
  const { filtros, setFiltros, categorias, limparFiltros, obterTransacoesFiltradas } = useTransacoes();

  // Função para alterar filtro
  const alterarFiltro = (chave, valor) => {
    setFiltros(anterior => ({ ...anterior, [chave]: valor }));
  };

  // Meses do ano
  const meses = [
    { valor: '1', rotulo: 'Janeiro' },
    { valor: '2', rotulo: 'Fevereiro' },
    { valor: '3', rotulo: 'Março' },
    { valor: '4', rotulo: 'Abril' },
    { valor: '5', rotulo: 'Maio' },
    { valor: '6', rotulo: 'Junho' },
    { valor: '7', rotulo: 'Julho' },
    { valor: '8', rotulo: 'Agosto' },
    { valor: '9', rotulo: 'Setembro' },
    { valor: '10', rotulo: 'Outubro' },
    { valor: '11', rotulo: 'Novembro' },
    { valor: '12', rotulo: 'Dezembro' }
  ];

  const anoAtual = new Date().getFullYear();
  const anos = Array.from({ length: 5 }, (_, i) => anoAtual - i);

  const temFiltrosAtivos = filtros.tipo !== 'todos' || 
                          filtros.categoria !== 'todas' || 
                          filtros.busca !== '' || 
                          filtros.mes !== '';

  return (
    <div className="galaxy-card rounded-xl shadow-lg border border-white/10 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-purple-300" />
          <h3 className="text-lg font-semibold text-white">Filtros</h3>
        </div>
        {temFiltrosAtivos && (
          <button
            onClick={limparFiltros}
            className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm font-medium"
          >
            <X size={16} />
            Limpar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Busca */}
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
          <input
            type="text"
            placeholder="Buscar por descrição..."
            value={filtros.busca}
            onChange={(e) => alterarFiltro('busca', e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300"
          />
        </div>

        {/* Filtro por Tipo */}
        <select
          value={filtros.tipo}
          onChange={(e) => alterarFiltro('tipo', e.target.value)}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
        >
          <option value="todos">Todos os tipos</option>
          <option value="receita">Receitas</option>
          <option value="despesa">Despesas</option>
        </select>

        {/* Filtro por Categoria */}
        <select
          value={filtros.categoria}
          onChange={(e) => alterarFiltro('categoria', e.target.value)}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
        >
          <option value="todas">Todas as categorias</option>
          {categorias.map(categoria => (
            <option key={categoria} value={categoria}>{categoria}</option>
          ))}
        </select>

        {/* Filtro por Mês */}
        <select
          value={filtros.mes}
          onChange={(e) => alterarFiltro('mes', e.target.value)}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
        >
          <option value="">Todos os meses</option>
          {meses.map(mes => (
            <option key={mes.valor} value={mes.valor}>{mes.rotulo}</option>
          ))}
        </select>

        {/* Filtro por Ano */}
        <select
          value={filtros.ano}
          onChange={(e) => alterarFiltro('ano', e.target.value)}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
        >
          {anos.map(ano => (
            <option key={ano} value={ano.toString()}>{ano}</option>
          ))}
        </select>
      </div>

      {/* Contador de resultados */}
      <div className="text-sm text-purple-200">
        {obterTransacoesFiltradas().length} transação(ões) encontrada(s)
      </div>
    </div>
  );
}