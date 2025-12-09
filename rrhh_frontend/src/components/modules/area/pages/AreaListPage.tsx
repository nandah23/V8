import React, { useState, useEffect } from 'react';
import GenericTable, {type ColumnDef } from '../../../global/GenericTable';
import { Loader2, Users, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Solución: Agregar índice de cadena o usar tipo más específico
interface Area {
  id: number;
  nombre: string;
  cantidadTrabajadores: number;
  [key: string]: unknown; // Esto soluciona el error
}

// Datos de ejemplo
const mockAreas: Area[] = [
  { id: 1, nombre: 'Desarrollo de Software', cantidadTrabajadores: 15 },
  { id: 2, nombre: 'Recursos Humanos', cantidadTrabajadores: 8 },
  { id: 3, nombre: 'Marketing Digital', cantidadTrabajadores: 12 },
  { id: 4, nombre: 'Contabilidad', cantidadTrabajadores: 6 },
  { id: 5, nombre: 'Soporte Técnico', cantidadTrabajadores: 10 },
  { id: 6, nombre: 'Ventas', cantidadTrabajadores: 14 },
  { id: 7, nombre: 'Operaciones', cantidadTrabajadores: 9 },
  { id: 8, nombre: 'Calidad', cantidadTrabajadores: 7 },
  { id: 43, nombre: 'Desarrollo de Software', cantidadTrabajadores: 15 },
  { id: 52, nombre: 'Recursos Humanos', cantidadTrabajadores: 8 },
  { id: 73, nombre: 'Marketing Digital', cantidadTrabajadores: 12 },
  { id: 84, nombre: 'Contabilidad', cantidadTrabajadores: 6 },
  { id: 95, nombre: 'Soporte Técnico', cantidadTrabajadores: 10 },
  { id: 106, nombre: 'Ventas', cantidadTrabajadores: 14 },
  { id: 117, nombre: 'Operaciones', cantidadTrabajadores: 9 },
  { id: 128, nombre: 'Calidad', cantidadTrabajadores: 7 },
];

export const AreaListPage: React.FC = () => {
  const navigate = useNavigate();
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setAreas(mockAreas);
      setLoading(false);
    };

    fetchAreas();
  }, []);

  // Handlers
  const handleViewDetails = (id: number) => {
    console.log('Ver detalles del área:', id);
    alert(`Ver detalles del área ID: ${id}`);
  };

  const handleEditArea = (id: number) => {
    console.log('Editar área:', id);
    alert(`Editar área ID: ${id}`);
   //  useNavigate('/area/nuevo');
  };

  const handleAddArea = () => {
   navigate('/area/nuevo');
  };

  // Columnas de la tabla
  const columns: ColumnDef<Area>[] = [
    {
      header: 'ID',
      accessor: 'id',
      className: 'w-20 text-center',
      cell: (row) => (
        <div className="flex justify-center">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
            {row.id}
          </span>
        </div>
      ),
    },
    {
      header: 'Nombre del Área',
      accessor: 'nombre',
      className: 'font-medium',
      cell: (row) => (
        <div>
          <span className="font-semibold text-gray-900">{row.nombre}</span>
          <div className="text-xs text-gray-500 mt-1">
            ID: {row.id} • {row.cantidadTrabajadores} trabajadores
          </div>
        </div>
      ),
    },
    {
      header: 'Cantidad de Trabajadores',
      accessor: 'cantidadTrabajadores',
      className: 'text-right w-48',
      cell: (row) => {
        const trabajadores = row.cantidadTrabajadores;
        let colorClass = 'text-blue-600';
        let bgClass = 'bg-blue-50';
        let sizeLabel = 'Mediano';
        
        if (trabajadores > 12) {
          colorClass = 'text-green-600';
          bgClass = 'bg-green-50';
          sizeLabel = 'Grande';
        } else if (trabajadores < 5) {
          colorClass = 'text-amber-600';
          bgClass = 'bg-amber-50';
          sizeLabel = 'Pequeño';
        }
        
        return (
          <div className={`flex items-center justify-end ${bgClass} p-2 rounded-lg`}>
            <Users size={18} className={`${colorClass} mr-2`} />
            <div className="text-right">
              <div className={`font-bold text-lg ${colorClass}`}>
                {trabajadores}
              </div>
              <div className="text-xs text-gray-500">{sizeLabel}</div>
            </div>
          </div>
        );
      },
    },
    {
      header: 'Acciones',
      className: 'w-40',
      cell: (row) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => handleViewDetails(row.id)}
            className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition duration-150 border border-blue-100"
          >
            Ver
          </button>
          <button 
            onClick={() => handleEditArea(row.id)}
            className="flex-1 px-3 py-1.5 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition duration-150 border border-gray-200"
          >
            Editar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Áreas</h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Gestión de departamentos y distribución del personal
              </p>
            </div>
            
            <button
              onClick={handleAddArea}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 shadow-sm w-full sm:w-auto"
            >
              <Plus size={20} className="mr-2" />
              Nueva Área
            </button>
          </div>
          
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total de Áreas</div>
              <div className="text-2xl font-bold text-gray-900">{areas.length}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total de Trabajadores</div>
              <div className="text-2xl font-bold text-green-600">
                {areas.reduce((sum, area) => sum + area.cantidadTrabajadores, 0)}
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Promedio por Área</div>
              <div className="text-2xl font-bold text-blue-600">
                {areas.length > 0 
                  ? Math.round(areas.reduce((sum, area) => sum + area.cantidadTrabajadores, 0) / areas.length)
                  : 0
                }
              </div>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <GenericTable<Area>
            data={areas}
            columns={columns}
            loading={loading}
            rowsPerPage={8}
          />
        </div>

        {/* Pie de página informativo */}
        <div className="mt-6 text-sm text-gray-500 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-start">
            <Loader2 size={18} className="mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
            <div>
              <p className="font-medium text-blue-800 mb-1">Información sobre las áreas</p>
              <p className="text-gray-600">
                Las áreas se clasifican por tamaño: <span className="text-amber-600">Pequeño</span> (menos de 5), 
                <span className="text-blue-600"> Mediano</span> (5-12), <span className="text-green-600"> Grande</span> (más de 12).
                Usa el buscador para filtrar áreas específicas por nombre.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaListPage;