import React from 'react';
import FormularioBase, { type FormularioDatos, type CampoConfig } from '../../global/FormularioBase';

const configuracionSolicitud: CampoConfig[] = [
  { 
    nombre: 'incentivo', 
    etiqueta: 'Incentivo', 
    tipo: 'select',
    opciones: ['Incentivo 1', 'Incentivo 2', 'Incentivo 3'],
    requerido: true
  },
  { 
    nombre: 'area', 
    etiqueta: 'Área', 
    tipo: 'select',
    opciones: ['Área 1', 'Área 2', 'Área 3'],
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
    nombre: 'fechaCreacion', 
    etiqueta: 'Fecha de Creación', 
    tipo: 'text',
    requerido: false // Se genera automáticamente
  },
  { 
    nombre: 'estado', 
    etiqueta: 'Estado', 
    tipo: 'select',
    opciones: ['Pendiente', 'Enviada', 'Cancelada', 'Aceptada'],
    requerido: true
  },
];

const FormularioSolicitud: React.FC = () => {
  const manejarGuardar = (datos: FormularioDatos) => {
    // Generar fecha automáticamente con hora local
    const ahora = new Date();
    const fechaFormato = ahora.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const datosActualizados = {
      ...datos,
      fechaCreacion: fechaFormato
    };

    console.log('✅ Datos de Solicitud a enviar al API:', datosActualizados);
    
    // Validación de valores negativos
    const cantidad = Number(datos.cantidad);
    if (cantidad < 0) {
      console.error('La cantidad no puede ser negativa');
      return;
    }

    // Aquí iría la llamada fetch/axios
    // api.crearSolicitud(datosActualizados);
  };

  const manejarCancelar = () => {
    console.log('❌ Cancelando creación de solicitud. Redireccionando...');
  };

  return (
    <FormularioBase
      titulo="Crear Nueva Solicitud"
      configCampos={configuracionSolicitud}
      alGuardar={manejarGuardar}
      alCancelar={manejarCancelar}
    />
  );
};

export default FormularioSolicitud;
