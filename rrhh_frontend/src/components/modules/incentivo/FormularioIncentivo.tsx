import React from 'react';
import FormularioBase, { type FormularioDatos, type CampoConfig } from '../../global/FormularioBase';

const configuracionIncentivo: CampoConfig[] = [
  { nombre: 'nombre', etiqueta: 'Nombre del Incentivo', tipo: 'text', requerido: true },
  { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textarea', requerido: true },
  { 
    nombre: 'cantidad', 
    etiqueta: 'Cantidad', 
    tipo: 'number', 
    requerido: true,
    //minimo: 0
  },
  { 
    nombre: 'precio', 
    etiqueta: 'Precio', 
    tipo: 'number', 
    requerido: true,
    //minimo: 0
  },
];

const FormularioIncentivo: React.FC = () => {
  const manejarGuardar = (datos: FormularioDatos) => {
    console.log('✅ Datos del Incentivo a enviar al API:', datos);
    
    // Validación de valores negativos
    const cantidad = Number(datos.cantidad);
    const precio = Number(datos.precio);
    
    if (cantidad < 0 || precio < 0) {
      console.error('La cantidad y el precio no pueden ser negativos');
      return;
    }

    // Aquí iría la llamada fetch/axios
    // api.crearIncentivo(datos);
  };

  const manejarCancelar = () => {
    console.log('❌ Cancelando creación de incentivo. Redireccionando...');
  };

  return (
    <FormularioBase
      titulo="Crear Nuevo Incentivo"
      configCampos={configuracionIncentivo}
      alGuardar={manejarGuardar}
      alCancelar={manejarCancelar}
    />
  );
};

export default FormularioIncentivo;
