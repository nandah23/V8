// FormularioUsuario.tsx

import React from 'react';
// Importamos FormularioBase como default, y los tipos necesarios (FormularioDatos y CampoConfig)
// usando la sintaxis 'type' para que no haya confusión en el bundle.
import FormularioBase, { type FormularioDatos, type CampoConfig } from '../../global/FormularioBase'; 


// 1. Tipado estricto para la configuración de campos
// Usamos 'CampoConfig[]' para forzar que todos los campos cumplan la estructura, 
// incluyendo los literales estrictos para la propiedad 'tipo'.
const configuracionUsuario: CampoConfig[] = [
  // Todos los campos 'tipo' deben ser literales string definidos en TipoCampo ('text', 'email', etc.)
  { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'text', requerido: true },
  { nombre: 'apellido', etiqueta: 'Apellido', tipo: 'text', requerido: true },
  { nombre: 'nombreUsuario', etiqueta: 'Nombre de Usuario', tipo: 'text', requerido: true },
  { nombre: 'correo', etiqueta: 'Correo Electrónico', tipo: 'email', requerido: true },
  
  { 
    nombre: 'sexo', 
    etiqueta: 'Sexo', 
    tipo: 'select',
    opciones: ['Masculino', 'Femenino']
  },
  { 
    nombre: 'edad', 
    etiqueta: 'Edad', 
    tipo: 'number'
  },
  
  { 
    nombre: 'cargo', 
    etiqueta: 'Cargo (Puesto)', 
    tipo: 'select',
    opciones: ['Administrador', 'Jefe de Área', 'Especialista de Recursos Humanos']
  },
  { 
    nombre: 'proceso', 
    etiqueta: 'Proceso', 
    tipo: 'select',
    opciones: ['Servicio', 'Producción', 'Docencia']
  },
  
  // Campo condicional: solo se muestra si proceso es "Docencia"
  {
    nombre: 'categoriaDocente',
    etiqueta: 'Categoría Docente',
    tipo: 'select',
    opciones: ['Profesor Titular', 'Profesor Auxiliar', 'Profesor Asistente', 'Profesor Instructor'],
    mostrarSi: {
      campo: 'proceso',
      valor: 'Docencia'
    }
  },
  
  { nombre: 'area', etiqueta: 'Área/Departamento', tipo: 'text' },
  { 
    nombre: 'fechaContratacion', 
    etiqueta: 'Fecha de Contratación', 
    tipo: 'date',
  },
];


const FormularioUsuario: React.FC = () => {

  /**
   * Lógica al GUARDAR
   * El parámetro 'datos' está correctamente tipado como FormularioDatos.
   */
  const manejarGuardar = (datos: FormularioDatos) => {
    console.log('✅ Datos del Usuario a enviar al API:', datos);
    
    // --- Lógica de Negocio/Validación Específica ---
    const proceso: string = datos.proceso as string;
    const procesosValidos = ['docencia', 'producción', 'servicio'];
    
    if (!procesosValidos.includes(proceso.toLowerCase())) {
        console.error('Proceso inválido. Debe ser uno de los procesos predefinidos.');
        // Aquí se detendría la ejecución si la validación falla
        return;
    }
    
    // Aquí iría la llamada fetch/axios
    // api.crearUsuario(datos);
  };

  /**
   * Lógica al CANCELAR
   */
  const manejarCancelar = () => {
    console.log('❌ Cancelando creación de usuario. Redireccionando...');
    // Lógica para redirigir o cerrar el formulario.
  };

  return (
    // Utilizamos FormularioBase, cumpliendo su contrato de props
    <FormularioBase
      titulo="Crear Nuevo Usuario Personal"
      configCampos={configuracionUsuario}
      alGuardar={manejarGuardar}
      alCancelar={manejarCancelar}
    />
  );
};

export default FormularioUsuario;