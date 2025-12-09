import React from 'react';
import FormularioBase, { type FormularioDatos, type CampoConfig } from '../../global/FormularioBase';

const configuracionDistribucion: CampoConfig[] = [
  { 
    nombre: 'area', 
    etiqueta: 'Área', 
    tipo: 'select',
    opciones: ['Área 1', 'Área 2', 'Área 3'],
    requerido: true
  },
  { 
    nombre: 'incentivo', 
    etiqueta: 'Incentivo', 
    tipo: 'select',
    opciones: ['Incentivo 1', 'Incentivo 2', 'Incentivo 3'],
    requerido: true
  },
  { 
    nombre: 'cantidad', 
    etiqueta: 'Cantidad', 
    tipo: 'number', 
    requerido: true,
    //minimo: 0
  },
  { 
    nombre: 'estado', 
    etiqueta: 'Estado', 
    tipo: 'select',
    opciones: ['Pendiente', 'Entregada'],
    requerido: true
  },
  { 
    nombre: 'usuarioSolicitud', 
    etiqueta: 'Usuario que Hace la Solicitud', 
    tipo: 'select',
    opciones: ['Usuario 1', 'Usuario 2', 'Usuario 3'],
    requerido: true
  },
  { 
    nombre: 'usuarioDistribucion', 
    etiqueta: 'Usuario que Hace la Distribución', 
    tipo: 'select',
    opciones: ['Usuario 1', 'Usuario 2', 'Usuario 3'],
    requerido: true
  },
];

const FormularioDistribucion: React.FC = () => {
  const manejarGuardar = (datos: FormularioDatos) => {
    console.log('✅ Datos de Distribución a enviar al API:', datos);
    
    // Validación de valores negativos
    const cantidad = Number(datos.cantidad);
    if (cantidad < 0) {
      console.error('La cantidad no puede ser negativa');
      return;
    }

    // Si el estado no es proporcionado, por defecto es "Pendiente"
    const datosActualizados = {
      ...datos,
      estado: datos.estado || 'Pendiente'
    };

    console.log('✅ Datos finales:', datosActualizados);

    // Aquí iría la llamada fetch/axios
    // api.crearDistribucion(datosActualizados);
  };

  const manejarCancelar = () => {
    console.log('❌ Cancelando creación de distribución. Redireccionando...');
  };

  return (
    <FormularioBase
      titulo="Crear Nueva Distribución"
      configCampos={configuracionDistribucion}
      alGuardar={manejarGuardar}
      alCancelar={manejarCancelar}
    />
  );
};

export default FormularioDistribucion;
