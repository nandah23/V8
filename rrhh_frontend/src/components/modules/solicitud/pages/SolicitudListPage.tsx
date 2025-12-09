import React, { useState, useEffect } from 'react';
import GenericTable, { type ColumnDef } from '../../../global/GenericTable';
import {FileText, Calendar,Clock,CheckCircle,XCircle,Send,AlertCircle,Building,Gift,Package,Plus,Eye,Edit,TrendingUp,BarChart3,Filter} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Interface para las solicitudes
interface Solicitud {
  id: number;
  incentivo: string;
  area: string;
  cantidad: number;
  fechaCreacion: string;
  estado: 'pendiente' | 'enviada' | 'cancelada' | 'aceptada';
  [key: string]: unknown;
}

// Datos de ejemplo
const mockSolicitudes: Solicitud[] = [
  { id: 1, incentivo: 'Bono de Productividad', area: 'Desarrollo de Software', cantidad: 25, fechaCreacion: '2024-01-15', estado: 'aceptada' },
  { id: 2, incentivo: 'Vale de Compras', area: 'Recursos Humanos', cantidad: 15, fechaCreacion: '2024-01-14', estado: 'pendiente' },
  { id: 3, incentivo: 'Día Libre Remunerado', area: 'Marketing Digital', cantidad: 8, fechaCreacion: '2024-01-13', estado: 'enviada' },
  { id: 4, incentivo: 'Curso de Capacitación', area: 'Contabilidad', cantidad: 12, fechaCreacion: '2024-01-12', estado: 'cancelada' },
  { id: 5, incentivo: 'Equipo Tecnológico', area: 'Soporte Técnico', cantidad: 3, fechaCreacion: '2024-01-11', estado: 'aceptada' },
  { id: 6, incentivo: 'Viaje de Incentivo', area: 'Ventas', cantidad: 5, fechaCreacion: '2024-01-10', estado: 'pendiente' },
  { id: 7, incentivo: 'Certificado de Reconocimiento', area: 'Operaciones', cantidad: 30, fechaCreacion: '2024-01-09', estado: 'enviada' },
  { id: 8, incentivo: 'Cheque Regalo', area: 'Calidad', cantidad: 20, fechaCreacion: '2024-01-08', estado: 'aceptada' },
  { id: 9, incentivo: 'Suscripción Streaming', area: 'Desarrollo de Software', cantidad: 18, fechaCreacion: '2024-01-07', estado: 'cancelada' },
  { id: 10, incentivo: 'Kit de Bienestar', area: 'Recursos Humanos', cantidad: 22, fechaCreacion: '2024-01-06', estado: 'pendiente' },
  { id: 11, incentivo: 'Membresía Gimnasio', area: 'Marketing Digital', cantidad: 10, fechaCreacion: '2024-01-05', estado: 'enviada' },
  { id: 12, incentivo: 'Cena Ejecutiva', area: 'Contabilidad', cantidad: 6, fechaCreacion: '2024-01-04', estado: 'aceptada' },
  { id: 13, incentivo: 'Experiencia Cultural', area: 'Soporte Técnico', cantidad: 14, fechaCreacion: '2024-01-03', estado: 'pendiente' },
  { id: 14, incentivo: 'Asesoría Financiera', area: 'Ventas', cantidad: 7, fechaCreacion: '2024-01-02', estado: 'enviada' },
  { id: 15, incentivo: 'Paquete Familiar', area: 'Operaciones', cantidad: 9, fechaCreacion: '2024-01-01', estado: 'cancelada' }
];

export const SolicitudListPage: React.FC = () => {
  const navigate = useNavigate();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [filterArea, setFilterArea] = useState<string>('todas');

  useEffect(() => {
    const fetchSolicitudes = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setSolicitudes(mockSolicitudes);
      setLoading(false);
    };

    fetchSolicitudes();
  }, []);

  // Obtener áreas únicas
  const areasUnicas = [...new Set(solicitudes.map(item => item.area))].sort();

  // Filtrar solicitudes por estado y área
  const filteredSolicitudes = solicitudes.filter(item => {
    const estadoMatch = filterEstado === 'todos' || item.estado === filterEstado;
    const areaMatch = filterArea === 'todas' || item.area === filterArea;
    return estadoMatch && areaMatch;
  });

  // Handlers
  const handleViewDetails = (id: number) => {
    console.log('Ver detalles de la solicitud:', id);
    alert(`Ver detalles de la solicitud ID: ${id}`);
  };

  const handleEditSolicitud = (id: number) => {
    console.log('Editar solicitud:', id);
    alert(`Editar solicitud ID: ${id}`);
  };

  const handleAddSolicitud = () => {
     navigate('/incentivo/solicitud/nuevo');
  };

  // Función para formatear fecha
  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Función para obtener el color según el estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'enviada': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'aceptada': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelada': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Función para obtener el icono según el estado
  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'pendiente': return <Clock size={14} className="mr-1" />;
      case 'enviada': return <Send size={14} className="mr-1" />;
      case 'aceptada': return <CheckCircle size={14} className="mr-1" />;
      case 'cancelada': return <XCircle size={14} className="mr-1" />;
      default: return <AlertCircle size={14} className="mr-1" />;
    }
  };

  // Función para obtener el texto del estado
  const getEstadoText = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'Pendiente';
      case 'enviada': return 'Enviada';
      case 'aceptada': return 'Aceptada';
      case 'cancelada': return 'Cancelada';
      default: return estado;
    }
  };

  // Calcular estadísticas
  const totalSolicitudes = filteredSolicitudes.length;
  const solicitudesAceptadas = filteredSolicitudes.filter(s => s.estado === 'aceptada').length;
  const solicitudesPendientes = filteredSolicitudes.filter(s => s.estado === 'pendiente').length;
  const totalCantidad = filteredSolicitudes.reduce((sum, item) => sum + item.cantidad, 0);

  // Calcular porcentaje de aceptación
  const porcentajeAceptacion = filteredSolicitudes.length > 0
    ? (filteredSolicitudes.filter(s => s.estado === 'aceptada').length / filteredSolicitudes.length) * 100
    : 0;

  // Columnas de la tabla
  const columns: ColumnDef<Solicitud>[] = [
    {
      header: 'ID',
      accessor: 'id',
      className: 'w-20 text-center',
      cell: (row) => (
        <div className="flex justify-center">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-800 rounded-full text-sm font-bold border border-blue-200 shadow-sm">
            #{row.id}
          </span>
        </div>
      ),
    },
    {
      header: 'Incentivo',
      accessor: 'incentivo',
      className: 'font-medium w-64',
      cell: (row) => (
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full flex items-center justify-center border border-purple-200">
              <Gift size={18} className="text-purple-600" />
            </div>
          </div>
          <div className="ml-3">
            <div className="font-bold text-gray-900 text-sm">
              {row.incentivo}
            </div>
            <div className="text-xs text-gray-500 mt-1 flex items-center">
              <Building size={12} className="mr-1" />
              {row.area}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Área',
      accessor: 'area',
      className: 'w-48',
      cell: (row) => (
        <div className="flex items-center p-2 bg-gray-50 rounded-lg">
          <Building size={16} className="text-gray-500 mr-2" />
          <span className="font-medium text-gray-700">
            {row.area}
          </span>
        </div>
      ),
    },
    {
      header: 'Cantidad',
      accessor: 'cantidad',
      className: 'w-32 text-center',
      cell: (row) => {
        let cantidadColor = 'text-green-600';
        let cantidadLabel = 'Normal';
        
        if (row.cantidad > 30) {
          cantidadColor = 'text-purple-600';
          cantidadLabel = 'Alta';
        } else if (row.cantidad < 5) {
          cantidadColor = 'text-amber-600';
          cantidadLabel = 'Baja';
        }
        
        return (
          <div className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
            <div className="flex items-center">
              <Package size={20} className="text-emerald-600 mr-2" />
              <span className={`text-2xl font-bold ${cantidadColor}`}>
                {row.cantidad}
              </span>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {cantidadLabel}
            </div>
          </div>
        );
      },
    },
    {
      header: 'Fecha de Creación',
      accessor: 'fechaCreacion',
      className: 'w-36',
      cell: (row) => (
        <div className="flex items-center justify-center p-2 bg-blue-50 rounded-lg">
          <Calendar size={16} className="text-blue-500 mr-2" />
          <div className="text-center">
            <div className="font-medium text-gray-700">
              {formatFecha(row.fechaCreacion)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              ID: {row.id}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Estado',
      accessor: 'estado',
      className: 'w-40 text-center',
      cell: (row) => (
        <div className={`flex flex-col items-center justify-center p-3 rounded-xl border ${getEstadoColor(row.estado)}`}>
          <div className="flex items-center mb-1">
            {getEstadoIcon(row.estado)}
            <span className="font-bold text-lg">
              {getEstadoText(row.estado)}
            </span>
          </div>
          <div className="text-xs opacity-75 mt-1">
            {formatFecha(row.fechaCreacion)}
          </div>
        </div>
      ),
    },
    {
      header: 'Acciones',
      className: 'w-44',
      cell: (row) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => handleViewDetails(row.id)}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:from-blue-100 hover:to-blue-200 transition duration-150 border border-blue-200 shadow-sm"
            title="Ver detalles"
          >
            <Eye size={16} className="inline mr-1" />
            Ver
          </button>
          <button 
            onClick={() => handleEditSolicitud(row.id)}
            className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:from-gray-100 hover:to-gray-200 transition duration-150 border border-gray-200 shadow-sm"
            title="Editar"
          >
            <Edit size={16} className="inline mr-1" />
            Editar
          </button>
          {row.estado === 'pendiente' && (
            <button 
              onClick={() => alert(`Enviar solicitud ${row.id}`)}
              className="px-2 py-1.5 bg-gradient-to-r from-green-50 to-green-100 text-green-700 text-xs font-medium rounded-lg hover:from-green-100 hover:to-green-200 transition duration-150 border border-green-200 shadow-sm"
              title="Enviar"
            >
              <Send size={14} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Gestión de Solicitudes
                </span>
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Seguimiento de solicitudes de incentivos por áreas
              </p>
            </div>
            
            <button
              onClick={handleAddSolicitud}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-150 shadow-lg w-full sm:w-auto"
            >
              <Plus size={20} className="mr-2" />
              Nueva Solicitud
            </button>
          </div>
          
          {/* Filtros */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Filter size={16} className="mr-2" />
                Filtrar solicitudes:
              </label>
              <span className="text-xs text-gray-500">
                {filteredSolicitudes.length} solicitudes encontradas
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Filtro por estado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Por estado:
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterEstado('todos')}
                    className={`px-4 py-2 rounded-lg border transition duration-150 ${
                      filterEstado === 'todos'
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setFilterEstado('pendiente')}
                    className={`px-4 py-2 rounded-lg border transition duration-150 ${
                      filterEstado === 'pendiente'
                        ? 'bg-amber-500 text-white border-transparent shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="inline-flex items-center">
                      <Clock size={14} className="mr-1" />
                      Pendiente
                    </span>
                  </button>
                  <button
                    onClick={() => setFilterEstado('enviada')}
                    className={`px-4 py-2 rounded-lg border transition duration-150 ${
                      filterEstado === 'enviada'
                        ? 'bg-blue-500 text-white border-transparent shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="inline-flex items-center">
                      <Send size={14} className="mr-1" />
                      Enviada
                    </span>
                  </button>
                  <button
                    onClick={() => setFilterEstado('aceptada')}
                    className={`px-4 py-2 rounded-lg border transition duration-150 ${
                      filterEstado === 'aceptada'
                        ? 'bg-green-500 text-white border-transparent shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="inline-flex items-center">
                      <CheckCircle size={14} className="mr-1" />
                      Aceptada
                    </span>
                  </button>
                  <button
                    onClick={() => setFilterEstado('cancelada')}
                    className={`px-4 py-2 rounded-lg border transition duration-150 ${
                      filterEstado === 'cancelada'
                        ? 'bg-red-500 text-white border-transparent shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="inline-flex items-center">
                      <XCircle size={14} className="mr-1" />
                      Cancelada
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Filtro por área */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Por área:
                </label>
                <select
                  value={filterArea}
                  onChange={(e) => setFilterArea(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                >
                  <option value="todas">Todas las áreas</option>
                  {areasUnicas.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <FileText size={16} className="mr-2 text-blue-500" />
                Total Solicitudes
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalSolicitudes}</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <CheckCircle size={16} className="mr-2 text-green-500" />
                Aceptadas
              </div>
              <div className="text-2xl font-bold text-green-600">{solicitudesAceptadas}</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Clock size={16} className="mr-2 text-amber-500" />
                Pendientes
              </div>
              <div className="text-2xl font-bold text-amber-600">{solicitudesPendientes}</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Package size={16} className="mr-2 text-emerald-500" />
                Total Unidades
              </div>
              <div className="text-2xl font-bold text-emerald-600">{totalCantidad}</div>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <GenericTable<Solicitud>
            data={filteredSolicitudes}
            columns={columns}
            loading={loading}
            rowsPerPage={8}
          />
        </div>

        {/* Pie de página informativo */}
        <div className="mt-6 text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-start">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-lg mr-3">
              <BarChart3 size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-blue-800 mb-2 text-lg">Estados de las Solicitudes</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                <div className="bg-white p-3 rounded-lg border border-amber-200">
                  <div className="font-semibold text-amber-700 mb-1 flex items-center">
                    <Clock size={14} className="mr-1" />
                    Pendiente
                  </div>
                  <p className="text-xs text-gray-600">Solicitud creada, en espera de revisión</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-700 mb-1 flex items-center">
                    <Send size={14} className="mr-1" />
                    Enviada
                  </div>
                  <p className="text-xs text-gray-600">Solicitud enviada para aprobación</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <div className="font-semibold text-green-700 mb-1 flex items-center">
                    <CheckCircle size={14} className="mr-1" />
                    Aceptada
                  </div>
                  <p className="text-xs text-gray-600">Solicitud aprobada y en proceso</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-red-200">
                  <div className="font-semibold text-red-700 mb-1 flex items-center">
                    <XCircle size={14} className="mr-1" />
                    Cancelada
                  </div>
                  <p className="text-xs text-gray-600">Solicitud rechazada o cancelada</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200 mt-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Tasa de Aceptación:</span>
                  <span className="font-bold text-green-600">{porcentajeAceptacion.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="h-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{ width: `${porcentajeAceptacion}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen por área */}
        <div className="mt-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2 text-indigo-500" />
            Distribución de Solicitudes por Área
          </h3>
          <div className="space-y-4">
            {areasUnicas.map((area) => {
              const solicitudesArea = filteredSolicitudes.filter(s => s.area === area);
              const totalArea = solicitudesArea.length;
              const aceptadasArea = solicitudesArea.filter(s => s.estado === 'aceptada').length;
              const porcentajeArea = totalArea > 0 ? (aceptadasArea / totalArea) * 100 : 0;
              
              return (
                <div key={area} className="flex items-center">
                  <div className="w-48">
                    <span className="font-medium text-gray-700">{area}</span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">Total: {totalArea} solicitudes</span>
                      <span className="text-gray-500">Aceptadas: {aceptadasArea}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{ width: `${porcentajeArea}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-32 text-right">
                    <span className="font-bold text-gray-900">{porcentajeArea.toFixed(1)}%</span>
                    <span className="text-gray-500 ml-2">aceptación</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolicitudListPage;