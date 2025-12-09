// CampoInput.tsx

import React from 'react';
import { AlertTriangle } from 'lucide-react';

// Tipos para los campos de entrada válidos
type TipoCampo = 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select' | 'date';

interface CampoInputProps {
  etiqueta: string;
  nombre: string;
  // Usamos 'unknown' para el valor y manejamos su tipo en el onChange si es necesario,
  // pero para los inputs de formulario, 'string' es lo más común para el valor.
  valor: string | number; 
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  tipo: TipoCampo;
  requerido?: boolean;
  error?: string;
  opciones?: string[]; // Para campos select
}

const CampoInput: React.FC<CampoInputProps> = ({
  etiqueta,
  nombre,
  valor,
  onChange,
  tipo,
  requerido = false,
  error,
  opciones,
}) => {
  const baseClasses = "w-full p-2 border rounded-lg transition duration-150 ease-in-out bg-white";
  const focusClasses = "focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none";
  const errorClasses = error ? "border-red-500" : "border-gray-300 hover:border-blue-300";

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={nombre} className="text-sm font-medium text-gray-700">
        {etiqueta}
        {requerido && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {/* Renderizar select si tipo es 'select' */}
      {tipo === 'select' ? (
        <select
          id={nombre}
          name={nombre}
          value={valor}
          onChange={onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
          required={requerido}
          className={`${baseClasses} ${focusClasses} ${errorClasses}`}
        >
          <option value="">Selecciona una opción</option>
          {opciones?.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      ) : tipo === 'date' ? (
        <input
          id={nombre}
          name={nombre}
          value={valor}
          onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
          required={requerido}
          type="date"
          className={`${baseClasses} ${focusClasses} ${errorClasses}`}
        />
      ) : tipo === 'textarea' ? (
        <textarea
          id={nombre}
          name={nombre}
          value={valor}
          onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
          required={requerido}
          className={`${baseClasses} ${focusClasses} ${errorClasses} resize-y h-24`}
        />
      ) : (
        <input
          id={nombre}
          name={nombre}
          value={valor}
          onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
          required={requerido}
          type={tipo as Exclude<TipoCampo, 'textarea' | 'select'>}
          className={`${baseClasses} ${focusClasses} ${errorClasses}`}
        />
      )}
      
      {error && (
        <p className="text-xs text-red-500 flex items-center">
          <AlertTriangle className="w-3 h-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default CampoInput;