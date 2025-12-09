// Boton.tsx

import React from 'react';
import { Loader2 } from 'lucide-react';

// Tipos para las variantes del botón
type BotonVariante = 'primario' | 'secundario';

interface BotonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante: BotonVariante;
  cargando?: boolean;
}

const Boton: React.FC<BotonProps> = ({ 
  variante, 
  cargando = false, 
  children, 
  className = '', 
  ...props 
}) => {
  let classes = "px-4 py-2 font-semibold rounded-lg transition duration-200 ease-in-out flex items-center justify-center";

  if (variante === 'primario') {
    // Azul vibrante para acción principal
    classes += " bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300";
  } else {
    // Texto azul sobre fondo blanco/transparente para acción secundaria
    classes += " bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-300";
  }

  // Deshabilitar si está cargando o por prop disabled
  if (cargando || props.disabled) {
    classes += " opacity-50 cursor-not-allowed";
  }

  return (
    <button 
      className={`${classes} ${className}`} 
      disabled={cargando || props.disabled}
      {...props}
    >
      {cargando ? (
        <Loader2 className="animate-spin h-5 w-5 mr-2" />
      ) : (
        children
      )}
    </button>
  );
};

export default Boton;