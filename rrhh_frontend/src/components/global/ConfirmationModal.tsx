import React from 'react';
import { X } from 'lucide-react';

// NOTA: Si tienes la utilidad 'cn', úsala aquí. Si no, usa el concatenador simple.
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// --- 1. Definición de Tipos ---
interface ConfirmationModalProps {
  // Estado para controlar la visibilidad del modal
  isOpen: boolean;
  // Función para cerrar el modal (generalmente se usa con setIsOpen(false))
  onClose: () => void;
  // Función que se ejecuta al presionar "Confirmar"
  onConfirm: () => void;
  
  // Contenido dinámico del modal
  title: string;
  message: React.ReactNode; // Permite texto simple o elementos JSX (ej: párrafos)
  
  // Opcional: Personalizar el texto de los botones
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}) => {

  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  // --- Manejadores ---
  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose(); // Cerrar automáticamente después de confirmar
  };

  // --- Renderizado ---
  return (
    // 1. Overlay (Fondo oscuro)
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      aria-modal="true" // Accesibilidad
      role="dialog"
      aria-labelledby="modal-title"
    >
      
      {/* 2. Contenedor del Modal */}
      <div 
        className={cn(
          "bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300",
          // Animación simple de entrada (escalar y opacidad)
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        )}
      >
        
        {/* 2.1 Header y Botón de Cerrar */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 id="modal-title" className="text-xl font-bold text-gray-900">
            {title}
          </h3>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
        </div>

        {/* 2.2 Cuerpo del Mensaje */}
        <div className="p-6">
          <div className="text-gray-700 leading-relaxed">
            {message}
          </div>
        </div>

        {/* 2.3 Footer con Botones (Siguiendo el patrón visual) */}
        <div className="p-6 pt-0 flex justify-end gap-3">
          
          {/* Botón 1: Cancelar (Secundario/Invertido) */}
          <button
            onClick={handleCancel}
            className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition duration-150"
          >
            {cancelText}
          </button>

          {/* Botón 2: Confirmar (Primario/Azul) */}
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-150"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};