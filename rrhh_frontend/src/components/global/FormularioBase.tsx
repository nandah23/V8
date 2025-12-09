// FormularioBase.tsx

import React, { useState, type FormEvent, useMemo } from 'react';
import Boton from './Boton'; 
import CampoInput from './CampoInput'; 
import { AlertTriangle } from 'lucide-react'; 

// 1. Tipos para la configuración de los campos (reutilizando TipoCampo)
type TipoCampo = 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select' | 'date';

export interface CampoConfig {
  nombre: string;
  etiqueta: string;
  tipo: TipoCampo;
  requerido?: boolean;
  //min?: 0;
  opciones?: string[]; // Para campos select
  // Para campos condicionales: mostrar solo si el valor del campo especificado es igual al valor esperado
  mostrarSi?: {
    campo: string;      // Nombre del campo a evaluar
    valor: string;      // Valor que debe tener para mostrar este campo
  };
}

// 2. Tipo para los datos del formulario (Colección de campos)
export type FormularioDatos = Record<string, string | number>;

// 3. Tipado de las propiedades del Formulario Base
interface FormularioBaseProps {
  titulo: string;
  configCampos: CampoConfig[];
  // alGuardar ahora recibe un objeto tipado
  alGuardar: (datos: FormularioDatos) => void; 
  alCancelar: () => void;
  // Errores es un mapa de nombres de campo a mensaje de error
  errores?: Record<string, string>; 
}

// 4. Componente Principal
const FormularioBase: React.FC<FormularioBaseProps> = ({ 
  titulo, 
  configCampos, 
  alGuardar, 
  alCancelar, 
  errores = {} 
}) => {
  
  // Inicializa el estado con claves vacías y tipado fuerte
  const initialData: FormularioDatos = useMemo(() => {
    const data: FormularioDatos = {};
    configCampos.forEach(campo => {
      data[campo.nombre] = campo.tipo === 'number' ? 0 : '';
    });
    return data;
  }, [configCampos]);

  const [datosFormulario, setDatosFormulario] = useState<FormularioDatos>(initialData);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    
    // Aseguramos el tipo para 'number'
    const valorTipado = type === 'number' && value !== '' ? parseFloat(value) : value;

    setDatosFormulario(prevDatos => ({
      ...prevDatos,
      [name]: valorTipado,
    }));
  };

  const manejarEnvio = (evento: FormEvent) => {
    evento.preventDefault();
    // Se asegura que los datos pasados son del tipo FormularioDatos
    alGuardar(datosFormulario); 
  };
  
  // Extraemos errores que no son de un campo específico (ej: error.general)
  const errorGeneral = errores.general;

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-lg mx-auto">
      
      <h2 className="text-2xl font-semibold mb-2 text-blue-900 border-b-2 border-blue-500 pb-2">
        {titulo}
      </h2>
      
      <form onSubmit={manejarEnvio} className="space-y-6 mt-4">
        
        <div className="space-y-4">
          {configCampos.map((campo) => {
            // Evaluar si el campo debe mostrarse según la condición
            let mostrarCampo = true;
            if (campo.mostrarSi) {
              const valorDelCampoCondicional = datosFormulario[campo.mostrarSi.campo];
              mostrarCampo = valorDelCampoCondicional === campo.mostrarSi.valor;
            }

            // Si la condición no se cumple, no renderizar el campo
            if (!mostrarCampo) return null;

            return (
              <CampoInput
                key={campo.nombre}
                etiqueta={campo.etiqueta}
                tipo={campo.tipo}
                nombre={campo.nombre}
                // El valor debe coincidir con el tipo FormularioDatos
                valor={datosFormulario[campo.nombre] || (campo.tipo === 'number' ? 0 : '')} 
                requerido={campo.requerido}
                error={errores[campo.nombre]} // Error específico del campo
                onChange={manejarCambio} // Manejador de cambio unificado
                opciones={campo.opciones} // Pasar opciones si existen
              />
            );
          })}
        </div>

        {errorGeneral && (
          <div className="flex items-center p-3 bg-red-100 text-red-700 rounded-md">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <p className="text-sm font-medium">{errorGeneral}</p>
          </div>
        )}

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
          <Boton 
            type="button" 
            onClick={alCancelar} 
            variante="secundario"
          >
            Cancelar
          </Boton>
          <Boton 
            type="submit" 
            variante="primario"
          >
            Crear
          </Boton>
        </div>
      </form>
    </div>
  );
};

export default FormularioBase;