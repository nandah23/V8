import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioArea from '../FormularioArea';
import { ArrowLeft } from 'lucide-react';

const AreaFormPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/area');
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
            Volver a las Áreas
          </button>
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Crear Nueva Área</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Completa el formulario para agregar una nueva área al sistema
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <FormularioArea />
        </div>

        <div className="mt-6 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="font-medium text-blue-800 mb-2">💡 Información</p>
          <p>
            La cantidad de trabajadores no puede ser negativa. Todos los campos marcados con asterisco (*) son obligatorios.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AreaFormPage;
