import { Loader2 } from 'lucide-react';

// Componente de indicador de carregamento
export function Carregamento({ tamanho = 'padrao', texto = 'Carregando...' }) {
  const classesTamanho = {
    pequeno: 'w-4 h-4',
    padrao: 'w-8 h-8',
    grande: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2 className={`${classesTamanho[tamanho]} animate-spin text-purple-400`} />
      {texto && <p className="text-purple-200 text-sm">{texto}</p>}
    </div>
  );
}