import React from 'react';
import FormularioBase, { type FormularioDatos, type CampoConfig } from '../../global/FormularioBase';

const configuracionCondecoracion: CampoConfig[] = [
  { nombre: 'nombre', etiqueta: 'Nombre de la Condecoración', tipo: 'text', requerido: true },
  { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textarea', requerido: true },
  { 
    nombre: 'anosExperiencia', 
    etiqueta: 'Años de Experiencia', 
    tipo: 'number', 
    requerido: true,
    minimo: 0
  },
];

const FormularioCondecoracion: React.FC = () => {
  const manejarGuardar = (datos: FormularioDatos) => {
    console.log('✅ Datos de Condecoración a enviar al API:', datos);
    
    // Validación de valores negativos
    const anosExperiencia = Number(datos.anosExperiencia);
    if (anosExperiencia < 0) {
      console.error('Los años de experiencia no pueden ser negativos');
      return;
    }

    // Aquí iría la llamada fetch/axios
    // api.crearCondecoracion(datos);
  };

  const manejarCancelar = () => {
    console.log('❌ Cancelando creación de condecoración. Redireccionando...');
  };

  return (
    <FormularioBase
      titulo="Crear Nueva Condecoración"
      configCampos={configuracionCondecoracion}
      alGuardar={manejarGuardar}
      alCancelar={manejarCancelar}
    />
  );
};

export default FormularioCondecoracion;
