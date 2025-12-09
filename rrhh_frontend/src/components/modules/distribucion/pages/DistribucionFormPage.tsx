import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioDistribucion from '../FormularioDistribucion';
import { ArrowLeft } from 'lucide-react';

const DistribucionFormPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/incentivo/distribucion');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver a Distribuciones
          </button>
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Crear Nueva Distribución</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Completa el formulario para crear una nueva distribución de incentivos
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <FormularioDistribucion />
        </div>

        <div className="mt-6 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="font-medium text-blue-800 mb-2">💡 Información</p>
          <p>
            La cantidad no puede ser negativa. El estado por defecto es "Pendiente" y puede modificarse a "Entregada". Una vez entregada, el administrador puede cambiar el estado. Todos los campos marcados con asterisco (*) son obligatorios.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DistribucionFormPage;
