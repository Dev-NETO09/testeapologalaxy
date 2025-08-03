import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

// Componente de notificação toast
export function Notificacao({ mensagem, tipo = 'sucesso', aoFechar, duracao = 3000 }) {
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setVisivel(false);
      setTimeout(aoFechar, 300); // Aguardar animação completar
    }, duracao);

    return () => clearTimeout(temporizador);
  }, [duracao, aoFechar]);

  const aoClicarFechar = () => {
    setVisivel(false);
    setTimeout(aoFechar, 300);
  };

  const corFundo = tipo === 'sucesso' ? 'bg-green-500' : 'bg-red-500';
  const Icone = tipo === 'sucesso' ? CheckCircle : XCircle;

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg text-white shadow-2xl transition-all duration-300 ${corFundo} ${
        visivel ? 'animate-slide-down opacity-100' : 'opacity-0 transform translate-y-[-100%]'
      }`}
    >
      <Icone size={20} />
      <span className="font-medium">{mensagem}</span>
      <button
        onClick={aoClicarFechar}
        className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}