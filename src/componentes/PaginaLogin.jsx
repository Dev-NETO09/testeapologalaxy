import { useState } from 'react';
import { useAutenticacao } from '../contextos/ContextoAutenticacao';
import { Rocket, TrendingUp, PieChart, Shield, Stars } from 'lucide-react';
import { Carregamento } from './Carregamento';

// Componente da página de login
export function PaginaLogin() {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const { entrarComGoogle } = useAutenticacao();

  // Função para lidar com login do Google
  const lidarComLoginGoogle = async () => {
    try {
      setCarregando(true);
      setErro('');
      await entrarComGoogle();
    } catch (erro) {
      console.error('Erro no login:', erro);
      setErro('Erro ao fazer login. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen galaxy-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Estrelas de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-purple-300 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-40 left-32 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-80 animate-pulse"></div>
        <div className="absolute top-64 left-1/2 w-1 h-1 bg-pink-300 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-20 right-40 w-2 h-2 bg-cyan-300 rounded-full opacity-60 animate-pulse"></div>
      </div>

      
      <div className="max-w-md w-full space-y-8">
        {/* Logo e Cabeçalho */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="galaxy-button p-4 rounded-full shadow-lg">
              <Rocket className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Stars className="w-8 h-8 text-purple-300" />
            Apolo Gestão Pessoal
          </h1>
          <p className="text-purple-200">
            Controle suas receitas e despesas de forma simples e eficiente
          </p>
        </div>

        {/* Recursos */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="flex items-center gap-3 galaxy-card p-4 rounded-lg shadow-lg">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-white">Acompanhe suas receitas e despesas</span>
          </div>
          <div className="flex items-center gap-3 galaxy-card p-4 rounded-lg shadow-lg">
            <PieChart className="w-5 h-5 text-cyan-400" />
            <span className="text-white">Visualize relatórios detalhados</span>
          </div>
          <div className="flex items-center gap-3 galaxy-card p-4 rounded-lg shadow-lg">
            <Shield className="w-5 h-5 text-purple-500" />
            <span className="text-white">Seus dados seguros na nuvem</span>
          </div>
        </div>

        {/* Card de Login */}
        <div className="galaxy-card rounded-xl shadow-2xl p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Faça seu login
              </h2>
              <p className="text-purple-200">
                Entre com sua conta Google para começar
              </p>
            </div>

            {erro && (
              <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
                {erro}
              </div>
            )}

            <button
              onClick={lidarComLoginGoogle}
              disabled={carregando}
              className="w-full flex items-center justify-center gap-3 bg-white/10 border-2 border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 hover:border-white/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
            >
              {carregando ? (
                <Carregamento tamanho="pequeno" texto="" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continuar com Google
                </>
              )}
            </button>

            <div className="text-center text-sm text-purple-300">
              Ao fazer login, você concorda com nossos termos de serviço
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
