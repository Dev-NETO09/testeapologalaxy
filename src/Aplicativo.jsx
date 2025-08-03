import { ProvedorAutenticacao } from './contextos/ContextoAutenticacao';
import { ProvedorTransacoes } from './contextos/ContextoTransacoes';
import { useAutenticacao } from './contextos/ContextoAutenticacao';
import { PaginaLogin } from './componentes/PaginaLogin';
import { PainelPrincipal } from './componentes/PainelPrincipal';
import { Carregamento } from './componentes/Carregamento';

// Componente principal do conteúdo da aplicação
function ConteudoAplicativo() {
  const { usuarioAtual, carregando } = useAutenticacao();

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Carregamento texto="Carregando aplicação..." />
      </div>
    );
  }

  return usuarioAtual ? <PainelPrincipal /> : <PaginaLogin />;
}

// Componente raiz da aplicação
function Aplicativo() {
  return (
    <ProvedorAutenticacao>
      <ProvedorTransacoes>
        <ConteudoAplicativo />
      </ProvedorTransacoes>
    </ProvedorAutenticacao>
  );
}

export default Aplicativo;