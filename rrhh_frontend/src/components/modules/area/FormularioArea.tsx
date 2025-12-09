import React from 'react';
import FormularioBase, { type FormularioDatos, type CampoConfig } from '../../global/FormularioBase';

const configuracionArea: CampoConfig[] = [
  { nombre: 'nombre', etiqueta: 'Nombre del Área', tipo: 'text', requerido: true},
  { 
    nombre: 'cantidadTrabajadores', 
    etiqueta: 'Cantidad de Trabajadores', 
    tipo: 'number', 
    requerido: true,
    //min?: 'number',
  },
];

const FormularioArea: React.FC = () => {
  const manejarGuardar = (datos: FormularioDatos) => {
    console.log('✅ Datos del Área a enviar al API:', datos);
    
    // Validación de valores negativos
    const cantidadTrabajadores = Number(datos.cantidadTrabajadores);
    if (cantidadTrabajadores < 0) {
      console.error('La cantidad de trabajadores no puede ser negativa');
      return;
    }

    // Aquí iría la llamada fetch/axios
    // api.crearArea(datos);
  };

  const manejarCancelar = () => {
    console.log('❌ Cancelando creación de área. Redireccionando...');
  };

  return (
    <FormularioBase
      titulo="Crear Nueva Área"
      configCampos={configuracionArea}
      alGuardar={manejarGuardar}
      alCancelar={manejarCancelar}
    />
  );
};

export default FormularioArea;
