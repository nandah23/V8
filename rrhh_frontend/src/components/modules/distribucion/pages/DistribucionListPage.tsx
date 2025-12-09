import React, { useState, useEffect } from 'react';
import GenericTable, { type ColumnDef } from '../../../global/GenericTable';
import {Package,Building,Gift,User,UserCheck,Users,Plus,Eye,Edit,TrendingUp,BarChart3,Filter,Calendar,CheckCircle,Clock} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Interface para las distribuciones
interface Distribucion {
  id: number;
  area: string;
  incentivo: string;
  cantidad: number;
  usuarioSolicitante: string;
  usuarioDistribuidor: string;
  fechaDistribucion: string;
  estado: 'pendiente' | 'en_proceso' | 'completada' | 'cancelada';
  [key: string]: unknown;
}

// Datos de ejemplo
const mockDistribuciones: Distribucion[] = [
  { id: 1, area: 'Desarrollo de Software', incentivo: 'Bono de Productividad', cantidad: 25, usuarioSolicitante: 'Ana García', usuarioDistribuidor: 'Carlos Rodríguez', fechaDistribucion: '2024-01-15', estado: 'completada' },
  { id: 2, area: 'Recursos Humanos', incentivo: 'Vale de Compras', cantidad: 15, usuarioSolicitante: 'María López', usuarioDistribuidor: 'Pedro Sánchez', fechaDistribucion: '2024-01-14', estado: 'en_proceso' },
  { id: 3, area: 'Marketing Digital', incentivo: 'Día Libre Remunerado', cantidad: 8, usuarioSolicitante: 'Juan Martínez', usuarioDistribuidor: 'Sofía González', fechaDistribucion: '2024-01-13', estado: 'pendiente' },
  { id: 4, area: 'Contabilidad', incentivo: 'Curso de Capacitación', cantidad: 12, usuarioSolicitante: 'Laura Fernández', usuarioDistribuidor: 'Diego Hernández', fechaDistribucion: '2024-01-12', estado: 'completada' },
  { id: 5, area: 'Soporte Técnico', incentivo: 'Equipo Tecnológico', cantidad: 3, usuarioSolicitante: 'Elena Díaz', usuarioDistribuidor: 'Miguel Torres', fechaDistribucion: '2024-01-11', estado: 'cancelada' },
  { id: 6, area: 'Ventas', incentivo: 'Viaje de Incentivo', cantidad: 5, usuarioSolicitante: 'Isabel Ramírez', usuarioDistribuidor: 'Roberto Castro', fechaDistribucion: '2024-01-10', estado: 'en_proceso' },
  { id: 7, area: 'Operaciones', incentivo: 'Certificado de Reconocimiento', cantidad: 30, usuarioSolicitante: 'Patricia Romero', usuarioDistribuidor: 'Fernando Navarro', fechaDistribucion: '2024-01-09', estado: 'completada' },
  { id: 8, area: 'Calidad', incentivo: 'Cheque Regalo', cantidad: 20, usuarioSolicitante: 'Carmen Molina', usuarioDistribuidor: 'David Ortega', fechaDistribucion: '2024-01-08', estado: 'pendiente' },
  { id: 9, area: 'Desarrollo de Software', incentivo: 'Suscripción Streaming', cantidad: 18, usuarioSolicitante: 'Ana García', usuarioDistribuidor: 'Carlos Rodríguez', fechaDistribucion: '2024-01-07', estado: 'en_proceso' },
  { id: 10, area: 'Recursos Humanos', incentivo: 'Kit de Bienestar', cantidad: 22, usuarioSolicitante: 'María López', usuarioDistribuidor: 'Pedro Sánchez', fechaDistribucion: '2024-01-06', estado: 'completada' },
  { id: 11, area: 'Marketing Digital', incentivo: 'Membresía Gimnasio', cantidad: 10, usuarioSolicitante: 'Juan Martínez', usuarioDistribuidor: 'Sofía González', fechaDistribucion: '2024-01-05', estado: 'pendiente' },
  { id: 12, area: 'Contabilidad', incentivo: 'Cena Ejecutiva', cantidad: 6, usuarioSolicitante: 'Laura Fernández', usuarioDistribuidor: 'Diego Hernández', fechaDistribucion: '2024-01-04', estado: 'completada' },
  { id: 13, area: 'Soporte Técnico', incentivo: 'Experiencia Cultural', cantidad: 14, usuarioSolicitante: 'Elena Díaz', usuarioDistribuidor: 'Miguel Torres', fechaDistribucion: '2024-01-03', estado: 'en_proceso' },
  { id: 14, area: 'Ventas', incentivo: 'Asesoría Financiera', cantidad: 7, usuarioSolicitante: 'Isabel Ramírez', usuarioDistribuidor: 'Roberto Castro', fechaDistribucion: '2024-01-02', estado: 'pendiente' },
  { id: 15, area: 'Operaciones', incentivo: 'Paquete Familiar', cantidad: 9, usuarioSolicitante: 'Patricia Romero', usuarioDistribuidor: 'Fernando Navarro', fechaDistribucion: '2024-01-01', estado: 'completada' }
];

export const DistribucionListPage: React.FC = () => {
  const navigate = useNavigate();
  const [distribuciones, setDistribuciones] = useState<Distribucion[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [filterArea, setFilterArea] = useState<string>('todas');

  useEffect(() => {
    const fetchDistribuciones = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setDistribuciones(mockDistribuciones);
      setLoading(false);
    };

    fetchDistribuciones();
  }, []);

  // Obtener áreas únicas
  const areasUnicas = [...new Set(distribuciones.map(item => item.area))].sort();

  // Filtrar distribuciones por estado y área
  const filteredDistribuciones = distribuciones.filter(item => {
    const estadoMatch = filterEstado === 'todos' || item.estado === filterEstado;
    const areaMatch = filterArea === 'todas' || item.area === filterArea;
    return estadoMatch && areaMatch;
  });

  // Handlers
  const handleViewDetails = (id: number) => {
    console.log('Ver detalles de la distribución:', id);
    alert(`Ver detalles de la distribución ID: ${id}`);
  };

  const handleEditDistribucion = (id: number) => {
    console.log('Editar distribución:', id);
    alert(`Editar distribución ID: ${id}`);
  };

  const handleAddDistribucion = () => {
     navigate('/incentivo/distribucion/nuevo');
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
      case 'en_proceso': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completada': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelada': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Función para obtener el icono según el estado
  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'pendiente': return <Clock size={14} className="mr-1" />;
      case 'en_proceso': return <Package size={14} className="mr-1" />;
      case 'completada': return <CheckCircle size={14} className="mr-1" />;
      case 'cancelada': return <Clock size={14} className="mr-1 rotate-45" />;
      default: return <Clock size={14} className="mr-1" />;
    }
  };

  // Función para obtener el texto del estado
  const getEstadoText = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'Pendiente';
      case 'en_proceso': return 'En Proceso';
      case 'completada': return 'Completada';
      case 'cancelada': return 'Cancelada';
      default: return estado;
    }
  };

  // Calcular estadísticas
  const totalDistribuciones = filteredDistribuciones.length;
  const distribucionesCompletadas = filteredDistribuciones.filter(d => d.estado === 'completada').length;
  const distribucionesEnProceso = filteredDistribuciones.filter(d => d.estado === 'en_proceso').length;
  const totalCantidad = filteredDistribuciones.reduce((sum, item) => sum + item.cantidad, 0);

  // Calcular porcentaje de completación
  const porcentajeCompletacion = filteredDistribuciones.length > 0
    ? (distribucionesCompletadas / filteredDistribuciones.length) * 100
    : 0;

  // Columnas de la tabla
  const columns: ColumnDef<Distribucion>[] = [
    {
      header: 'ID',
      accessor: 'id',
      className: 'w-20 text-center',
      cell: (row) => (
        <div className="flex justify-center">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-100 to-cyan-50 text-cyan-800 rounded-full text-sm font-bold border border-cyan-200 shadow-sm">
            #{row.id}
          </span>
        </div>
      ),
    },
    {
      header: 'Área',
      accessor: 'area',
      className: 'w-56',
      cell: (row) => (
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center border border-blue-200">
              <Building size={18} className="text-blue-600" />
            </div>
          </div>
          <div className="ml-3">
            <div className="font-bold text-gray-900 text-sm">
              {row.area}
            </div>
            <div className="text-xs text-gray-500 mt-1 flex items-center">
              <Calendar size={12} className="mr-1" />
              {formatFecha(row.fechaDistribucion)}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Incentivo',
      accessor: 'incentivo',
      className: 'w-64',
      cell: (row) => (
        <div className="flex items-center p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
          <Gift size={16} className="text-purple-600 mr-2" />
          <div>
            <span className="font-medium text-gray-900">{row.incentivo}</span>
            <div className="text-xs text-gray-500 mt-1">
              Cantidad: {row.cantidad}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Cantidad',
      accessor: 'cantidad',
      className: 'w-32 text-center',
      cell: (row) => {
        let cantidadColor = 'text-emerald-600';
        let cantidadLabel = 'Normal';
        
        if (row.cantidad > 20) {
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
      header: 'Solicitante',
      accessor: 'usuarioSolicitante',
      className: 'w-56',
      cell: (row) => (
        <div className="flex items-center p-2 bg-gray-50 rounded-lg">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full flex items-center justify-center border border-amber-200">
              <User size={16} className="text-amber-600" />
            </div>
          </div>
          <div className="ml-3">
            <div className="font-medium text-gray-900 text-sm">
              {row.usuarioSolicitante}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Solicitante
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Distribuidor',
      accessor: 'usuarioDistribuidor',
      className: 'w-56',
      cell: (row) => (
        <div className="flex items-center p-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-100">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-full flex items-center justify-center border border-cyan-200">
              <UserCheck size={16} className="text-cyan-600" />
            </div>
          </div>
          <div className="ml-3">
            <div className="font-medium text-gray-900 text-sm">
              {row.usuarioDistribuidor}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Distribuidor
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
        <div className={`flex flex-col items-center justify-center p-2 rounded-lg border ${getEstadoColor(row.estado)}`}>
          <div className="flex items-center mb-1">
            {getEstadoIcon(row.estado)}
            <span className="font-bold text-sm">
              {getEstadoText(row.estado)}
            </span>
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
            className="px-3 py-1.5 bg-gradient-to-r from-cyan-50 to-cyan-100 text-cyan-700 text-sm font-medium rounded-lg hover:from-cyan-100 hover:to-cyan-200 transition duration-150 border border-cyan-200 shadow-sm"
            title="Ver detalles"
          >
            <Eye size={16} className="inline mr-1" />
            Ver
          </button>
          <button 
            onClick={() => handleEditDistribucion(row.id)}
            className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:from-gray-100 hover:to-gray-200 transition duration-150 border border-gray-200 shadow-sm"
            title="Editar"
          >
            <Edit size={16} className="inline mr-1" />
            Editar
          </button>
          {row.estado === 'pendiente' && (
            <button 
              onClick={() => alert(`Iniciar distribución ${row.id}`)}
              className="px-2 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs font-medium rounded-lg hover:from-blue-100 hover:to-blue-200 transition duration-150 border border-blue-200 shadow-sm"
              title="Iniciar"
            >
              <Package size={14} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-cyan-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Gestión de Distribuciones
                </span>
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Control y seguimiento de distribución de incentivos por áreas
              </p>
            </div>
            
            <button
              onClick={handleAddDistribucion}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-700 hover:to-blue-700 transition duration-150 shadow-lg w-full sm:w-auto"
            >
              <Plus size={20} className="mr-2" />
              Nueva Distribución
            </button>
          </div>
          
          {/* Filtros */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Filter size={16} className="mr-2" />
                Filtrar distribuciones:
              </label>
              <span className="text-xs text-gray-500">
                {filteredDistribuciones.length} distribuciones encontradas
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
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-md'
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
                    onClick={() => setFilterEstado('en_proceso')}
                    className={`px-4 py-2 rounded-lg border transition duration-150 ${
                      filterEstado === 'en_proceso'
                        ? 'bg-blue-500 text-white border-transparent shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="inline-flex items-center">
                      <Package size={14} className="mr-1" />
                      En Proceso
                    </span>
                  </button>
                  <button
                    onClick={() => setFilterEstado('completada')}
                    className={`px-4 py-2 rounded-lg border transition duration-150 ${
                      filterEstado === 'completada'
                        ? 'bg-green-500 text-white border-transparent shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="inline-flex items-center">
                      <CheckCircle size={14} className="mr-1" />
                      Completada
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-150"
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
                <Package size={16} className="mr-2 text-cyan-500" />
                Total Distribuciones
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalDistribuciones}</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <CheckCircle size={16} className="mr-2 text-green-500" />
                Completadas
              </div>
              <div className="text-2xl font-bold text-green-600">{distribucionesCompletadas}</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Users size={16} className="mr-2 text-blue-500" />
                En Proceso
              </div>
              <div className="text-2xl font-bold text-blue-600">{distribucionesEnProceso}</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <TrendingUp size={16} className="mr-2 text-emerald-500" />
                Total Unidades
              </div>
              <div className="text-2xl font-bold text-emerald-600">{totalCantidad}</div>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <GenericTable<Distribucion>
            data={filteredDistribuciones}
            columns={columns}
            loading={loading}
            rowsPerPage={8}
          />
        </div>

        {/* Pie de página informativo */}
        <div className="mt-6 text-sm text-gray-600 bg-gradient-to-r from-cyan-50 to-blue-50 p-5 rounded-xl border border-cyan-200 shadow-sm">
          <div className="flex items-start">
            <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-2 rounded-lg mr-3">
              <BarChart3 size={20} className="text-cyan-600" />
            </div>
            <div>
              <p className="font-bold text-cyan-800 mb-2 text-lg">Estados de las Distribuciones</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                <div className="bg-white p-3 rounded-lg border border-amber-200">
                  <div className="font-semibold text-amber-700 mb-1 flex items-center">
                    <Clock size={14} className="mr-1" />
                    Pendiente
                  </div>
                  <p className="text-xs text-gray-600">Distribución creada, pendiente de iniciar</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-700 mb-1 flex items-center">
                    <Package size={14} className="mr-1" />
                    En Proceso
                  </div>
                  <p className="text-xs text-gray-600">Distribución en curso, envío parcial</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <div className="font-semibold text-green-700 mb-1 flex items-center">
                    <CheckCircle size={14} className="mr-1" />
                    Completada
                  </div>
                  <p className="text-xs text-gray-600">Distribución finalizada exitosamente</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-red-200">
                  <div className="font-semibold text-red-700 mb-1 flex items-center">
                    <Clock size={14} className="mr-1 rotate-45" />
                    Cancelada
                  </div>
                  <p className="text-xs text-gray-600">Distribución cancelada o suspendida</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200 mt-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Tasa de Completación:</span>
                  <span className="font-bold text-green-600">{porcentajeCompletacion.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="h-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{ width: `${porcentajeCompletacion}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen por área */}
        <div className="mt-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2 text-cyan-500" />
            Distribución por Área
          </h3>
          <div className="space-y-4">
            {areasUnicas.map((area) => {
              const distribucionesArea = filteredDistribuciones.filter(d => d.area === area);
              const totalArea = distribucionesArea.length;
              const completadasArea = distribucionesArea.filter(d => d.estado === 'completada').length;
              const cantidadArea = distribucionesArea.reduce((sum, d) => sum + d.cantidad, 0);
              const porcentajeArea = totalArea > 0 ? (completadasArea / totalArea) * 100 : 0;
              
              return (
                <div key={area} className="flex items-center">
                  <div className="w-48">
                    <span className="font-medium text-gray-700">{area}</span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">Total: {totalArea} distribuciones</span>
                      <span className="text-gray-500">Unidades: {cantidadArea}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{ width: `${porcentajeArea}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-32 text-right">
                    <span className="font-bold text-gray-900">{porcentajeArea.toFixed(1)}%</span>
                    <span className="text-gray-500 ml-2">completadas</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resumen de distribuidores */}
        <div className="mt-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <UserCheck size={20} className="mr-2 text-purple-500" />
            Actividad de Distribuidores
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from(new Set(filteredDistribuciones.map(d => d.usuarioDistribuidor))).slice(0, 3).map((distribuidor) => {
              const distribucionesDist = filteredDistribuciones.filter(d => d.usuarioDistribuidor === distribuidor);
              const completadasDist = distribucionesDist.filter(d => d.estado === 'completada').length;
              const porcentajeDist = distribucionesDist.length > 0 ? (completadasDist / distribucionesDist.length) * 100 : 0;
              
              return (
                <div key={distribuidor} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                  <div className="font-semibold text-purple-800 mb-2">{distribuidor}</div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Total: {distribucionesDist.length}</span>
                    <span className="text-gray-600">Completadas: {completadasDist}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${porcentajeDist}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 text-center">
                    {porcentajeDist.toFixed(1)}% de efectividad
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

export default DistribucionListPage;