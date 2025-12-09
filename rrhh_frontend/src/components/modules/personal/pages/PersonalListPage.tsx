import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericTable, { type ColumnDef } from '../../../global/GenericTable';
import { Loader2, User, Mail, Briefcase, Calendar,Shield,Building,FileText,Plus,Eye,Edit} from 'lucide-react';

// Interface para el personal
interface Personal {
  id: number;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  cargo: string;
  proceso: 'docencia' | 'producción' | 'servicio';
  area: string;
  esAdministradorDeArea: boolean;
  fechaContratacion: string;
  correo: string;
  [key: string]: unknown;
}

// Datos de ejemplo
const mockPersonal: Personal[] = [
  { id: 1, nombre: 'Ana', apellido: 'García', nombreUsuario: 'agarcia', cargo: 'Desarrollador Senior', proceso: 'producción', area: 'Desarrollo de Software', esAdministradorDeArea: false, fechaContratacion: '2021-03-15', correo: 'ana.garcia@empresa.com' },
  { id: 2, nombre: 'Carlos', apellido: 'Rodríguez', nombreUsuario: 'crodriguez', cargo: 'Jefe de Proyecto', proceso: 'producción', area: 'Desarrollo de Software', esAdministradorDeArea: true, fechaContratacion: '2019-07-22', correo: 'carlos.rodriguez@empresa.com' },
  { id: 3, nombre: 'María', apellido: 'López', nombreUsuario: 'mlopez', cargo: 'Profesora', proceso: 'docencia', area: 'Academia', esAdministradorDeArea: true, fechaContratacion: '2020-01-10', correo: 'maria.lopez@empresa.com' },
  { id: 4, nombre: 'Juan', apellido: 'Martínez', nombreUsuario: 'jmartinez', cargo: 'Especialista en Soporte', proceso: 'servicio', area: 'Soporte Técnico', esAdministradorDeArea: false, fechaContratacion: '2022-05-30', correo: 'juan.martinez@empresa.com' },
  { id: 5, nombre: 'Laura', apellido: 'Fernández', nombreUsuario: 'lfernandez', cargo: 'Analista de Calidad', proceso: 'producción', area: 'Calidad', esAdministradorDeArea: false, fechaContratacion: '2021-11-08', correo: 'laura.fernandez@empresa.com' },
  { id: 6, nombre: 'Pedro', apellido: 'Sánchez', nombreUsuario: 'psanchez', cargo: 'Coordinador de Ventas', proceso: 'servicio', area: 'Ventas', esAdministradorDeArea: true, fechaContratacion: '2018-09-12', correo: 'pedro.sanchez@empresa.com' },
  { id: 7, nombre: 'Sofía', apellido: 'González', nombreUsuario: 'sgonzalez', cargo: 'Contadora', proceso: 'servicio', area: 'Contabilidad', esAdministradorDeArea: false, fechaContratacion: '2020-06-18', correo: 'sofia.gonzalez@empresa.com' },
  { id: 8, nombre: 'Diego', apellido: 'Hernández', nombreUsuario: 'dhernandez', cargo: 'Ingeniero de Operaciones', proceso: 'producción', area: 'Operaciones', esAdministradorDeArea: false, fechaContratacion: '2022-02-14', correo: 'diego.hernandez@empresa.com' },
  { id: 9, nombre: 'Elena', apellido: 'Díaz', nombreUsuario: 'ediaz', cargo: 'Diseñadora UX', proceso: 'producción', area: 'Marketing Digital', esAdministradorDeArea: false, fechaContratacion: '2021-08-25', correo: 'elena.diaz@empresa.com' },
  { id: 10, nombre: 'Miguel', apellido: 'Torres', nombreUsuario: 'mtorres', cargo: 'Reclutador', proceso: 'servicio', area: 'Recursos Humanos', esAdministradorDeArea: false, fechaContratacion: '2023-01-05', correo: 'miguel.torres@empresa.com' },
  { id: 11, nombre: 'Isabel', apellido: 'Ramírez', nombreUsuario: 'iramirez', cargo: 'Profesora Adjunta', proceso: 'docencia', area: 'Academia', esAdministradorDeArea: false, fechaContratacion: '2022-09-15', correo: 'isabel.ramirez@empresa.com' },
  { id: 12, nombre: 'Roberto', apellido: 'Castro', nombreUsuario: 'rcastro', cargo: 'Supervisor de Logística', proceso: 'producción', area: 'Logística', esAdministradorDeArea: true, fechaContratacion: '2019-04-20', correo: 'roberto.castro@empresa.com' },
  { id: 13, nombre: 'Patricia', apellido: 'Romero', nombreUsuario: 'promero', cargo: 'Especialista en Comunicaciones', proceso: 'servicio', area: 'Comunicaciones', esAdministradorDeArea: false, fechaContratacion: '2021-12-01', correo: 'patricia.romero@empresa.com' },
  { id: 14, nombre: 'Fernando', apellido: 'Navarro', nombreUsuario: 'fnavarro', cargo: 'Asesor Legal', proceso: 'servicio', area: 'Legal', esAdministradorDeArea: false, fechaContratacion: '2020-10-30', correo: 'fernando.navarro@empresa.com' },
  { id: 15, nombre: 'Carmen', apellido: 'Molina', nombreUsuario: 'cmolina', cargo: 'Investigadora', proceso: 'docencia', area: 'Innovación', esAdministradorDeArea: true, fechaContratacion: '2018-11-15', correo: 'carmen.molina@empresa.com' }
];

export const PersonalListPage: React.FC = () => {
  const navigate = useNavigate();
  const [personal, setPersonal] = useState<Personal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonal = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setPersonal(mockPersonal);
      setLoading(false);
    };

    fetchPersonal();
  }, []);

  // Handlers
  const handleViewDetails = (id: number) => {
    console.log('Ver detalles del personal:', id);
    alert(`Ver detalles del empleado ID: ${id}`);
  };

  const handleEditPersonal = (id: number) => {
    console.log('Editar personal:', id);
    alert(`Editar empleado ID: ${id}`);
  };

  const handleAddPersonal = () => {
    navigate('/personal/nuevo');
  };

  // Función para formatear fecha
  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Función para obtener el color según el proceso
  const getProcesoColor = (proceso: string) => {
    switch (proceso) {
      case 'docencia': return 'bg-blue-100 text-blue-800';
      case 'producción': return 'bg-blue-50 text-blue-700';
      case 'servicio': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para obtener el icono según el proceso
  const getProcesoIcon = (proceso: string) => {
    switch (proceso) {
      case 'docencia': return '📚';
      case 'producción': return '⚙️';
      case 'servicio': return '🔧';
      default: return '📋';
    }
  };

  // Columnas de la tabla
  const columns: ColumnDef<Personal>[] = [
    {
      header: 'ID',
      accessor: 'id',
      className: 'w-16 text-center',
      cell: (row) => (
        <div className="flex justify-center">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">
            #{row.id}
          </span>
        </div>
      ),
    },
    {
      header: 'Nombre Completo',
      className: 'w-48',
      cell: (row) => (
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={18} className="text-blue-600" />
            </div>
          </div>
          <div className="ml-3">
            <div className="font-semibold text-gray-900">
              {row.nombre} {row.apellido}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              @{row.nombreUsuario}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Cargo',
      accessor: 'cargo',
      className: 'w-40',
      cell: (row) => (
        <div className="flex items-center">
          <Briefcase size={16} className="text-gray-400 mr-2" />
          <span className="font-medium text-gray-800">{row.cargo}</span>
        </div>
      ),
    },
    {
      header: 'Proceso',
      accessor: 'proceso',
      className: 'w-32',
      cell: (row) => (
        <div className="flex items-center">
          <span className="mr-2">{getProcesoIcon(row.proceso)}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProcesoColor(row.proceso)}`}>
            {row.proceso.charAt(0).toUpperCase() + row.proceso.slice(1)}
          </span>
        </div>
      ),
    },
    {
      header: 'Área',
      accessor: 'area',
      className: 'w-44',
      cell: (row) => (
        <div className="flex items-center">
          <Building size={16} className="text-gray-400 mr-2" />
          <span className="text-gray-700">{row.area}</span>
        </div>
      ),
    },
    {
      header: 'Admin',
      accessor: 'esAdministradorDeArea',
      className: 'w-24 text-center',
      cell: (row) => (
        <div className="flex justify-center">
          {row.esAdministradorDeArea ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <Shield size={12} className="mr-1" />
              Admin
            </span>
          ) : (
            <span className="text-gray-400 text-xs">-</span>
          )}
        </div>
      ),
    },
    {
      header: 'Fecha Contratación',
      accessor: 'fechaContratacion',
      className: 'w-36',
      cell: (row) => (
        <div className="flex items-center">
          <Calendar size={14} className="text-gray-400 mr-2" />
          <span className="text-gray-700">{formatFecha(row.fechaContratacion)}</span>
        </div>
      ),
    },
    {
      header: 'Correo',
      accessor: 'correo',
      className: 'w-48',
      cell: (row) => (
        <div className="flex items-center truncate">
          <Mail size={14} className="text-gray-400 mr-2 flex-shrink-0" />
          <a 
            href={`mailto:${row.correo}`}
            className="text-blue-600 hover:text-blue-800 hover:underline truncate"
            title={row.correo}
          >
            {row.correo}
          </a>
        </div>
      ),
    },
    {
      header: 'Acciones',
      className: 'w-32',
      cell: (row) => (
        <div className="flex space-x-1">
          <button 
            onClick={() => handleViewDetails(row.id)}
            className="px-2 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition duration-150"
            title="Ver detalles"
          >
            <Eye size={16} />
          </button>
          <button 
            onClick={() => handleEditPersonal(row.id)}
            className="px-2 py-1 bg-gray-50 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-100 transition duration-150"
            title="Editar"
          >
            <Edit size={16} />
          </button>
        </div>
      ),
    },
  ];

  // Estadísticas
  const totalPersonal = personal.length;
  const administradores = personal.filter(p => p.esAdministradorDeArea).length;
  const procesoCounts = personal.reduce((acc, curr) => {
    acc[curr.proceso] = (acc[curr.proceso] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Gestión de Personal</h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Listado completo de empleados con información detallada
              </p>
            </div>
            
            <button
              onClick={handleAddPersonal}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 shadow-sm w-full sm:w-auto"
            >
              <Plus size={20} className="mr-2" />
              Nuevo Empleado
            </button>
          </div>
          
          {/* Estadísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <User size={16} className="mr-2" />
                Total de Personal
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalPersonal}</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Shield size={16} className="mr-2" />
                Administradores
              </div>
              <div className="text-2xl font-bold text-blue-600">{administradores}</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <FileText size={16} className="mr-2" />
                Proceso: Docencia
              </div>
              <div className="text-2xl font-bold text-blue-600">{procesoCounts.docencia || 0}</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <FileText size={16} className="mr-2" />
                Proceso: Producción
              </div>
              <div className="text-2xl font-bold text-blue-600">{procesoCounts.producción || 0}</div>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <GenericTable<Personal>
            data={personal}
            columns={columns}
            loading={loading}
            rowsPerPage={10}
          />
        </div>

        {/* Pie de página informativo */}
        <div className="mt-6 text-sm text-gray-500 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-start">
            <Loader2 size={18} className="mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
            <div>
              <p className="font-medium text-blue-800 mb-1">Información sobre los procesos</p>
              <p className="text-gray-600 mb-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                  📚 Docencia
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                  ⚙️ Producción
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  🔧 Servicio
                </span>
              </p>
              <p className="text-gray-600">
                Los administradores de área tienen permisos especiales para gestionar su departamento. 
                Usa el buscador para filtrar empleados por nombre, cargo o área.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalListPage;