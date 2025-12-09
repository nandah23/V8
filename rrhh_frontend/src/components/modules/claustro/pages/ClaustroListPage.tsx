import React, { useState, useEffect } from 'react';
import GenericTable, { type ColumnDef } from '../../../global/GenericTable';
import { GraduationCap, Calendar, Percent, Users, Plus, Eye, Edit, BookOpen, TrendingUp, BarChart3} from 'lucide-react';

// Interface para los datos del claustro
interface Claustro {
  id: number;
  categoriaDocente: 'Profesor Titular' | 'Profesor Auxiliar' | 'Profesor Asistente' | 'Profesor Instructor';
  fecha: string;
  cantidad: number;
  porciento: number; // decimal (ej: 0.25 = 25%)
  [key: string]: unknown;
}

// Datos de ejemplo
const mockClaustro: Claustro[] = [
  { id: 1, categoriaDocente: 'Profesor Titular', fecha: '2024-01-15', cantidad: 45, porciento: 0.20 },
  { id: 2, categoriaDocente: 'Profesor Auxiliar', fecha: '2024-01-15', cantidad: 68, porciento: 0.30 },
  { id: 3, categoriaDocente: 'Profesor Asistente', fecha: '2024-01-15', cantidad: 52, porciento: 0.23 },
  { id: 4, categoriaDocente: 'Profesor Instructor', fecha: '2024-01-15', cantidad: 60, porciento: 0.27 },
  { id: 5, categoriaDocente: 'Profesor Titular', fecha: '2023-07-10', cantidad: 42, porciento: 0.19 },
  { id: 6, categoriaDocente: 'Profesor Auxiliar', fecha: '2023-07-10', cantidad: 65, porciento: 0.29 },
  { id: 7, categoriaDocente: 'Profesor Asistente', fecha: '2023-07-10', cantidad: 50, porciento: 0.22 },
  { id: 8, categoriaDocente: 'Profesor Instructor', fecha: '2023-07-10', cantidad: 58, porciento: 0.26 },
  { id: 9, categoriaDocente: 'Profesor Titular', fecha: '2023-01-20', cantidad: 40, porciento: 0.18 },
  { id: 10, categoriaDocente: 'Profesor Auxiliar', fecha: '2023-01-20', cantidad: 62, porciento: 0.28 },
  { id: 11, categoriaDocente: 'Profesor Asistente', fecha: '2023-01-20', cantidad: 48, porciento: 0.21 },
  { id: 12, categoriaDocente: 'Profesor Instructor', fecha: '2023-01-20', cantidad: 55, porciento: 0.24 },
  { id: 13, categoriaDocente: 'Profesor Titular', fecha: '2022-07-05', cantidad: 38, porciento: 0.17 },
  { id: 14, categoriaDocente: 'Profesor Auxiliar', fecha: '2022-07-05', cantidad: 60, porciento: 0.27 },
  { id: 15, categoriaDocente: 'Profesor Asistente', fecha: '2022-07-05', cantidad: 45, porciento: 0.20 },
  { id: 16, categoriaDocente: 'Profesor Instructor', fecha: '2022-07-05', cantidad: 52, porciento: 0.23 }
];

export const ClaustroListPage: React.FC = () => {
  const [claustroData, setClaustroData] = useState<Claustro[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('2024-01-15');

  useEffect(() => {
    const fetchClaustroData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setClaustroData(mockClaustro);
      setLoading(false);
    };

    fetchClaustroData();
  }, []);

  // Filtrar datos por fecha seleccionada
  const filteredByDate = claustroData.filter(item => item.fecha === selectedDate);
  
  // Obtener fechas únicas para el filtro
  const uniqueDates = [...new Set(claustroData.map(item => item.fecha))].sort().reverse();

  // Handlers
  const handleViewDetails = (id: number) => {
    console.log('Ver detalles del registro:', id);
    alert(`Ver detalles del registro ID: ${id}`);
  };

  const handleEditClaustro = (id: number) => {
    console.log('Editar registro:', id);
    alert(`Editar registro ID: ${id}`);
  };

  const handleAddClaustro = () => {
    console.log('Agregar nuevo registro');
    alert('Funcionalidad para agregar nuevo registro');
  };

  // Función para formatear fecha
  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Función para obtener el color según la categoría docente
  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'Profesor Titular': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Profesor Auxiliar': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Profesor Asistente': return 'bg-green-100 text-green-800 border-green-200';
      case 'Profesor Instructor': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Función para obtener el icono según la categoría docente
  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'Profesor Titular': return '👨‍🏫';
      case 'Profesor Auxiliar': return '👩‍🏫';
      case 'Profesor Asistente': return '📚';
      case 'Profesor Instructor': return '✏️';
      default: return '👨‍💼';
    }
  };

  // Función para formatear porcentaje
  const formatPorcentaje = (decimal: number) => {
    return `${(decimal * 100).toFixed(1)}%`;
  };

  // Calcular estadísticas
  const totalDocentes = filteredByDate.reduce((sum, item) => sum + item.cantidad, 0);
  const porcentajePromedio = filteredByDate.length > 0 
    ? filteredByDate.reduce((sum, item) => sum + item.porciento, 0) / filteredByDate.length
    : 0;

  // Columnas de la tabla
  const columns: ColumnDef<Claustro>[] = [
    {
      header: 'ID',
      accessor: 'id',
      className: 'w-20 text-center',
      cell: (row) => (
        <div className="flex justify-center">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-800 rounded-full text-sm font-bold border border-indigo-200 shadow-sm">
            #{row.id}
          </span>
        </div>
      ),
    },
    {
      header: 'Categoría Docente',
      accessor: 'categoriaDocente',
      className: 'font-medium w-56',
      cell: (row) => (
        <div className={`flex items-center p-3 rounded-lg border ${getCategoriaColor(row.categoriaDocente)}`}>
          <span className="text-xl mr-3">{getCategoriaIcon(row.categoriaDocente)}</span>
          <div>
            <div className="font-bold text-base">
              {row.categoriaDocente}
            </div>
            <div className="text-xs opacity-75 mt-1">
              {formatFecha(row.fecha)}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Fecha',
      accessor: 'fecha',
      className: 'w-36',
      cell: (row) => (
        <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg">
          <Calendar size={16} className="text-gray-500 mr-2" />
          <span className="font-medium text-gray-700">
            {formatFecha(row.fecha)}
          </span>
        </div>
      ),
    },
    {
      header: 'Cantidad',
      accessor: 'cantidad',
      className: 'w-32 text-center',
      cell: (row) => (
        <div className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
          <div className="flex items-center">
            <Users size={20} className="text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-blue-700">
              {row.cantidad}
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-1">
            docentes
          </div>
        </div>
      ),
    },
    {
      header: 'Porcentaje',
      accessor: 'porciento',
      className: 'w-40 text-center',
      cell: (row) => {
        const porcentaje = row.porciento * 100;
        let barColor = 'bg-green-500';
        let textColor = 'text-green-700';
        
        if (porcentaje < 20) {
          barColor = 'bg-amber-500';
          textColor = 'text-amber-700';
        } else if (porcentaje > 30) {
          barColor = 'bg-purple-500';
          textColor = 'text-purple-700';
        }
        
        return (
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-2">
              <Percent size={18} className="text-gray-500 mr-2" />
              <span className={`text-2xl font-bold ${textColor}`}>
                {porcentaje.toFixed(1)}%
              </span>
            </div>
            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${barColor}`}
                style={{ width: `${Math.min(porcentaje, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {row.cantidad} / {totalDocentes}
            </div>
          </div>
        );
      },
    },
    {
      header: 'Acciones',
      className: 'w-36',
      cell: (row) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => handleViewDetails(row.id)}
            className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 text-sm font-medium rounded-lg hover:from-indigo-100 hover:to-indigo-200 transition duration-150 border border-indigo-200 shadow-sm"
            title="Ver detalles"
          >
            <Eye size={16} className="inline mr-1" />
            Ver
          </button>
          <button 
            onClick={() => handleEditClaustro(row.id)}
            className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:from-gray-100 hover:to-gray-200 transition duration-150 border border-gray-200 shadow-sm"
            title="Editar"
          >
            <Edit size={16} className="inline mr-1" />
            Editar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Claustro Docente
                </span>
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Distribución por categorías académicas y evolución temporal
              </p>
            </div>
            
            <button
              onClick={handleAddClaustro}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-150 shadow-lg w-full sm:w-auto"
            >
              <Plus size={20} className="mr-2" />
              Nuevo Registro
            </button>
          </div>
          
          {/* Filtro de fecha */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Calendar size={16} className="mr-2" />
                Seleccionar período:
              </label>
              <span className="text-xs text-gray-500">
                {filteredByDate.length} registros encontrados
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {uniqueDates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded-lg border transition duration-150 ${
                    selectedDate === date
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-transparent shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {formatFecha(date)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <GraduationCap size={16} className="mr-2 text-indigo-500" />
                Total Docentes ({formatFecha(selectedDate)})
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalDocentes}</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Percent size={16} className="mr-2 text-green-500" />
                Porcentaje Promedio
              </div>
              <div className="text-2xl font-bold text-green-600">
                {(porcentajePromedio * 100).toFixed(1)}%
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <TrendingUp size={16} className="mr-2 text-blue-500" />
                Categorías Registradas
              </div>
              <div className="text-2xl font-bold text-blue-600">4</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <BarChart3 size={16} className="mr-2 text-purple-500" />
                Períodos Disponibles
              </div>
              <div className="text-2xl font-bold text-purple-600">{uniqueDates.length}</div>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <GenericTable<Claustro>
            data={filteredByDate}
            columns={columns}
            loading={loading}
            rowsPerPage={8}
          />
        </div>

        {/* Pie de página informativo */}
        <div className="mt-6 text-sm text-gray-600 bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-200 shadow-sm">
          <div className="flex items-start">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-2 rounded-lg mr-3">
              <BookOpen size={20} className="text-indigo-600" />
            </div>
            <div>
              <p className="font-bold text-indigo-800 mb-2 text-lg">Información sobre las categorías docentes</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                <div className="bg-white p-3 rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-700 mb-1">👨‍🏫 Profesor Titular</div>
                  <p className="text-xs text-gray-600">Máxima categoría académica, experiencia y liderazgo</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-700 mb-1">👩‍🏫 Profesor Auxiliar</div>
                  <p className="text-xs text-gray-600">Amplia experiencia docente, apoyo a titulares</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <div className="font-semibold text-green-700 mb-1">📚 Profesor Asistente</div>
                  <p className="text-xs text-gray-600">Docentes en desarrollo, con experiencia media</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-amber-200">
                  <div className="font-semibold text-amber-700 mb-1">✏️ Profesor Instructor</div>
                  <p className="text-xs text-gray-600">Docentes iniciales, formación y capacitación</p>
                </div>
              </div>
              <p className="text-gray-700">
                Los porcentajes representan la distribución del claustro docente por categoría en cada período. 
                Selecciona diferentes fechas para comparar la evolución temporal. 
                Usa el buscador para filtrar por categoría específica.
              </p>
            </div>
          </div>
        </div>

        {/* Resumen de distribución */}
        <div className="mt-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <BarChart3 size={20} className="mr-2 text-indigo-500" />
            Distribución del Claustro ({formatFecha(selectedDate)})
          </h3>
          <div className="space-y-4">
            {filteredByDate.map((item) => (
              <div key={item.id} className="flex items-center">
                <div className="w-48">
                  <span className="font-medium text-gray-700">{item.categoriaDocente}</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      style={{ width: `${item.porciento * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-32 text-right">
                  <span className="font-bold text-gray-900">{item.cantidad} docentes</span>
                  <span className="text-gray-500 ml-2">({formatPorcentaje(item.porciento)})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaustroListPage;