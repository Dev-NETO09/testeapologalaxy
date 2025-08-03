import { useState, useEffect } from 'react';
import { useTransacoes } from '../contextos/ContextoTransacoes';
import { X } from 'lucide-react';
import { Carregamento } from './Carregamento';

// Componente do modal de transação
export function ModalTransacao({ aberto, aoFechar, aoSalvar, aoErro, transacao }) {
  const { adicionarTransacao, atualizarTransacao, categorias } = useTransacoes();
  const [carregando, setCarregando] = useState(false);
  const [dadosFormulario, setDadosFormulario] = useState({
    tipo: 'receita',
    descricao: '',
    valor: '',
    categoria: '',
    data: new Date().toISOString().split('T')[0],
    hora: new Date().toTimeString().slice(0, 5)
  });

  const [erros, setErros] = useState({});

  // Preencher formulário quando transação for passada (edição)
  useEffect(() => {
    if (transacao) {
      const dataTransacao = new Date(transacao.data);
      setDadosFormulario({
        tipo: transacao.tipo,
        descricao: transacao.descricao,
        valor: transacao.valor.toString(),
        categoria: transacao.categoria,
        data: dataTransacao.toISOString().split('T')[0],
        hora: dataTransacao.toTimeString().slice(0, 5)
      });
    } else {
      setDadosFormulario({
        tipo: 'receita',
        descricao: '',
        valor: '',
        categoria: '',
        data: new Date().toISOString().split('T')[0],
        hora: new Date().toTimeString().slice(0, 5)
      });
    }
    setErros({});
  }, [transacao, aberto]);

  // Validar formulário
  const validarFormulario = () => {
    const novosErros = {};

    if (!dadosFormulario.descricao.trim()) {
      novosErros.descricao = 'Descrição é obrigatória';
    }

    if (!dadosFormulario.valor || parseFloat(dadosFormulario.valor) <= 0) {
      novosErros.valor = 'Valor deve ser maior que zero';
    }

    if (!dadosFormulario.categoria) {
      novosErros.categoria = 'Categoria é obrigatória';
    }

    if (!dadosFormulario.data) {
      novosErros.data = 'Data é obrigatória';
    }

    if (!dadosFormulario.hora) {
      novosErros.hora = 'Hora é obrigatória';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Lidar com envio do formulário
  const lidarComEnvio = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;

    try {
      setCarregando(true);
      
      // Combinar data e hora
      const dataHoraCompleta = new Date(`${dadosFormulario.data}T${dadosFormulario.hora}`);
      
      const dadosParaSalvar = {
        ...dadosFormulario,
        data: dataHoraCompleta
      };
      
      if (transacao) {
        await atualizarTransacao(transacao.id, dadosParaSalvar);
        aoSalvar('Transação atualizada com sucesso!');
      } else {
        await adicionarTransacao(dadosParaSalvar);
        aoSalvar('Transação adicionada com sucesso!');
      }
    } catch (erro) {
      aoErro('Erro ao salvar transação. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  // Lidar com mudanças nos campos
  const lidarComMudanca = (e) => {
    const { name, value } = e.target;
    setDadosFormulario(anterior => ({ ...anterior, [name]: value }));
    
    // Limpar erro quando usuário começar a digitar
    if (erros[name]) {
      setErros(anterior => ({ ...anterior, [name]: '' }));
    }
  };

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="galaxy-card rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">
            {transacao ? 'Editar Transação' : 'Nova Transação'}
          </h2>
          <button
            onClick={aoFechar}
            className="p-1 hover:bg-white/10 rounded-full transition-colors text-purple-300 hover:text-white"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={lidarComEnvio} className="p-6 space-y-4">
          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Tipo *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => lidarComMudanca({ target: { name: 'tipo', value: 'receita' } })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  dadosFormulario.tipo === 'receita'
                    ? 'border-green-500 bg-green-500/20 text-green-400'
                    : 'border-white/20 hover:border-white/40 text-purple-200'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium">Receita</div>
                  <div className="text-sm opacity-75">Dinheiro que entra</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => lidarComMudanca({ target: { name: 'tipo', value: 'despesa' } })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  dadosFormulario.tipo === 'despesa'
                    ? 'border-red-500 bg-red-500/20 text-red-400'
                    : 'border-white/20 hover:border-white/40 text-purple-200'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium">Despesa</div>
                  <div className="text-sm opacity-75">Dinheiro que sai</div>
                </div>
              </button>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-white mb-2">
              Descrição *
            </label>
            <input
              type="text"
              id="descricao"
              name="descricao"
              value={dadosFormulario.descricao}
              onChange={lidarComMudanca}
              placeholder="Ex: Salário, Supermercado, Conta de luz..."
              className={`w-full px-3 py-2 bg-white/10 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300 ${
                erros.descricao ? 'border-red-500' : 'border-white/20'
              }`}
            />
            {erros.descricao && (
              <p className="text-red-500 text-sm mt-1">{erros.descricao}</p>
            )}
          </div>

          {/* Valor */}
          <div>
            <label htmlFor="valor" className="block text-sm font-medium text-white mb-2">
              Valor *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300">
                R$
              </span>
              <input
                type="number"
                id="valor"
                name="valor"
                value={dadosFormulario.valor}
                onChange={lidarComMudanca}
                step="0.01"
                min="0"
                placeholder="0,00"
                className={`w-full pl-10 pr-3 py-2 bg-white/10 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-purple-300 ${
                  erros.valor ? 'border-red-500' : 'border-white/20'
                }`}
              />
            </div>
            {erros.valor && (
              <p className="text-red-500 text-sm mt-1">{erros.valor}</p>
            )}
          </div>

          {/* Categoria */}
          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-white mb-2">
              Categoria *
            </label>
            <select
              id="categoria"
              name="categoria"
              value={dadosFormulario.categoria}
              onChange={lidarComMudanca}
              className={`w-full px-3 py-2 bg-white/10 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white ${
                erros.categoria ? 'border-red-500' : 'border-white/20'
              }`}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
            {erros.categoria && (
              <p className="text-red-500 text-sm mt-1">{erros.categoria}</p>
            )}
          </div>

          {/* Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Data */}
            <div>
              <label htmlFor="data" className="block text-sm font-medium text-white mb-2">
                Data *
              </label>
              <input
                type="date"
                id="data"
                name="data"
                value={dadosFormulario.data}
                onChange={lidarComMudanca}
                className={`w-full px-3 py-2 bg-white/10 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white ${
                  erros.data ? 'border-red-500' : 'border-white/20'
                }`}
              />
              {erros.data && (
                <p className="text-red-400 text-sm mt-1">{erros.data}</p>
              )}
            </div>

            {/* Hora */}
            <div>
              <label htmlFor="hora" className="block text-sm font-medium text-white mb-2">
                Hora *
              </label>
              <input
                type="time"
                id="hora"
                name="hora"
                value={dadosFormulario.hora}
                onChange={lidarComMudanca}
                className={`w-full px-3 py-2 bg-white/10 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white ${
                  erros.hora ? 'border-red-500' : 'border-white/20'
                }`}
              />
              {erros.hora && (
                <p className="text-red-400 text-sm mt-1">{erros.hora}</p>
              )}
            </div>
          </div>

          {/* Ações */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={aoFechar}
              className="flex-1 px-4 py-2 text-purple-200 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={carregando}
              className="flex-1 px-4 py-2 galaxy-button text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {carregando ? (
                <>
                  <Carregamento tamanho="pequeno" texto="" />
                  Salvando...
                </>
              ) : (
                transacao ? 'Atualizar' : 'Adicionar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}