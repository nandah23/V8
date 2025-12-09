import React, { useState, useEffect } from 'react';
import GenericTable, { type ColumnDef } from '../../../global/GenericTable';
import { Gift, DollarSign,Package,TrendingUp,Plus,Eye,Edit,ShoppingBag,Percent,BarChart3,Tag} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Interface para los incentivos
interface Incentivo {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  precio: number; // en unidades monetarias
  [key: string]: unknown;
}

// Datos de ejemplo
const mockIncentivos: Incentivo[] = [
  { id: 1, nombre: 'Bono de Productividad', descripcion: 'Recompensa por cumplimiento de metas trimestrales', cantidad: 150, precio: 500 },
  { id: 2, nombre: 'Vale de Compras', descripcion: 'Tarjeta de regalo para supermercados asociados', cantidad: 300, precio: 250 },
  { id: 3, nombre: 'Día Libre Remunerado', descripcion: 'Día adicional de descanso con pago completo', cantidad: 80, precio: 350 },
  { id: 4, nombre: 'Curso de Capacitación', descripcion: 'Acceso a plataforma de cursos online premium', cantidad: 200, precio: 150 },
  { id: 5, nombre: 'Equipo Tecnológico', descripcion: 'Tablet o dispositivo electrónico de última generación', cantidad: 45, precio: 1200 },
  { id: 6, nombre: 'Viaje de Incentivo', descripcion: 'Fin de semana todo incluido en resort vacacional', cantidad: 25, precio: 2500 },
  { id: 7, nombre: 'Certificado de Reconocimiento', descripcion: 'Certificado profesional con marco personalizado', cantidad: 500, precio: 75 },
  { id: 8, nombre: 'Cheque Regalo', descripcion: 'Cheque canjeable en múltiples establecimientos', cantidad: 400, precio: 300 },
  { id: 9, nombre: 'Suscripción Streaming', descripcion: 'Suscripción anual a plataforma de entretenimiento', cantidad: 180, precio: 100 },
  { id: 10, nombre: 'Kit de Bienestar', descripcion: 'Set de productos para cuidado personal y salud', cantidad: 220, precio: 180 },
  { id: 11, nombre: 'Membresía Gimnasio', descripcion: 'Membresía anual en red de gimnasios premium', cantidad: 120, precio: 400 },
  { id: 12, nombre: 'Cena Ejecutiva', descripcion: 'Cena para dos en restaurante de alta cocina', cantidad: 90, precio: 600 },
  { id: 13, nombre: 'Experiencia Cultural', descripcion: 'Entradas para eventos culturales y conciertos', cantidad: 150, precio: 200 },
  { id: 14, nombre: 'Asesoría Financiera', descripcion: 'Sesiones personalizadas con asesor financiero', cantidad: 60, precio: 450 },
  { id: 15, nombre: 'Paquete Familiar', descripcion: 'Actividades recreativas para toda la familia', cantidad: 75, precio: 800 }
];

export const IncentivoListPage: React.FC = () => {
  const navigate = useNavigate();
  const [incentivos, setIncentivos] = useState<Incentivo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategoria, setFilterCategoria] = useState<string>('todos');

  useEffect(() => {
    const fetchIncentivos = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setIncentivos(mockIncentivos);
      setLoading(false);
    };

    fetchIncentivos();
  }, []);

  // Categorizar incentivos por precio
  const categorizarIncentivo = (precio: number) => {
    if (precio < 100) return 'bajo';
    if (precio < 500) return 'medio';
    if (precio < 1000) return 'alto';
    return 'premium';
  };

  // Filtrar incentivos por categoría
  const filteredIncentivos = filterCategoria === 'todos' 
    ? incentivos 
    : incentivos.filter(item => categorizarIncentivo(item.precio) === filterCategoria);

  // Handlers
  const handleViewDetails = (id: number) => {
    console.log('Ver detalles del incentivo:', id);
    alert(`Ver detalles del incentivo ID: ${id}`);
  };

  const handleEditIncentivo = (id: number) => {
    console.log('Editar incentivo:', id);
    alert(`Editar incentivo ID: ${id}`);
  };

  const handleAddIncentivo = () => {
    navigate('/incentivo/ig/nuevo');
  };

  // Función para formatear precio
  const formatPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(precio);
  };

  // Función para obtener el color según la categoría de precio
  const getCategoriaColor = (precio: number) => {
    const categoria = categorizarIncentivo(precio);
    switch (categoria) {
      case 'bajo': return 'bg-green-100 text-green-800 border-green-200';
      case 'medio': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'alto': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Función para obtener el icono según la categoría de precio
  const getCategoriaIcon = (precio: number) => {
    const categoria = categorizarIncentivo(precio);
    switch (categoria) {
      case 'bajo': return <Tag size={16} className="mr-1" />;
      case 'medio': return <Gift size={16} className="mr-1" />;
      case 'alto': return <TrendingUp size={16} className="mr-1" />;
      case 'premium': return <ShoppingBag size={16} className="mr-1" />;
      default: return <Gift size={16} className="mr-1" />;
    }
  };

  // Calcular estadísticas
  const totalIncentivos = filteredIncentivos.length;
  const stockTotal = filteredIncentivos.reduce((sum, item) => sum + item.cantidad, 0);
  const valorTotalStock = filteredIncentivos.reduce((sum, item) => sum + (item.cantidad * item.precio), 0);
  const precioPromedio = filteredIncentivos.length > 0 
    ? filteredIncentivos.reduce((sum, item) => sum + item.precio, 0) / filteredIncentivos.length
    : 0;

  // Columnas de la tabla
  const columns: ColumnDef<Incentivo>[] = [
    {
      header: 'ID',
      accessor: 'id',
      className: 'w-20 text-center',
      cell: (row) => (
        <div className="flex justify-center">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-800 rounded-full text-sm font-bold border border-emerald-200 shadow-sm">
            #{row.id}
          </span>
        </div>
      ),
    },
    {
      header: 'Nombre',
      accessor: 'nombre',
      className: 'font-medium w-56',
      cell: (row) => (
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full flex items-center justify-center border border-emerald-200">
              <Gift size={18} className="text-emerald-600" />
            </div>
          </div>
          <div className="ml-3">
            <div className="font-bold text-gray-900 text-base">
              {row.nombre}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              ID: {row.id}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Descripción',
      accessor: 'descripcion',
      className: 'w-96',
      cell: (row) => (
        <div className="py-2">
          <p className="text-gray-700 text-sm leading-relaxed">
            {row.descripcion}
          </p>
          <div className={`inline-flex items-center mt-2 px-2 py-1 rounded text-xs ${getCategoriaColor(row.precio)}`}>
            {getCategoriaIcon(row.precio)}
            <span className="font-medium">{categorizarIncentivo(row.precio).toUpperCase()}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Cantidad',
      accessor: 'cantidad',
      className: 'w-32 text-center',
      cell: (row) => {
        let stockColor = 'text-green-600';
        let stockLabel = 'Alto';
        
        if (row.cantidad < 50) {
          stockColor = 'text-red-600';
          stockLabel = 'Bajo';
        } else if (row.cantidad < 150) {
          stockColor = 'text-amber-600';
          stockLabel = 'Medio';
        }
        
        return (
          <div className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
            <div className="flex items-center">
              <Package size={20} className="text-blue-600 mr-2" />
              <span className={`text-2xl font-bold ${stockColor}`}>
                {row.cantidad}
              </span>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Stock: {stockLabel}
            </div>
            {/* Indicador visual de stock */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div 
                className={`h-1.5 rounded-full ${stockColor.replace('text-', 'bg-')}`}
                style={{ width: `${Math.min((row.cantidad / 500) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        );
      },
    },
    {
      header: 'Precio',
      accessor: 'precio',
      className: 'w-40 text-center',
      cell: (row) => (
        <div className={`flex flex-col items-center justify-center p-3 rounded-xl border ${getCategoriaColor(row.precio)}`}>
          <div className="flex items-center mb-1">
            <DollarSign size={20} className="mr-2" />
            <span className="text-2xl font-bold">
              {formatPrecio(row.precio)}
            </span>
          </div>
          <div className="text-xs opacity-75 mt-1">
            Valor unitario
          </div>
          <div className="text-xs font-semibold mt-2">
            Total: {formatPrecio(row.cantidad * row.precio)}
          </div>
        </div>
      ),
    },
    {
      header: 'Acciones',
      className: 'w-36',
      cell: (row) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => handleViewDetails(row.id)}
            className="px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 text-sm font-medium rounded-lg hover:from-emerald-100 hover:to-emerald-200 transition duration-150 border border-emerald-200 shadow-sm"
            title="Ver detalles"
          >
            <Eye size={16} className="inline mr-1" />
            Ver
          </button>
          <button 
            onClick={() => handleEditIncentivo(row.id)}
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-emerald-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Sistema de Incentivos
                </span>
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Catálogo de recompensas y beneficios para el personal
              </p>
            </div>
            
            <button
              onClick={handleAddIncentivo}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-medium rounded-lg hover:from-emerald-700 hover:to-green-700 transition duration-150 shadow-lg w-full sm:w-auto"
            >
              <Plus size={20} className="mr-2" />
              Nuevo Incentivo
            </button>
          </div>
          
          {/* Filtro por categoría de precio */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Tag size={16} className="mr-2" />
                Filtrar por categoría:
              </label>
              <span className="text-xs text-gray-500">
                {filteredIncentivos.length} incentivos encontrados
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterCategoria('todos')}
                className={`px-4 py-2 rounded-lg border transition duration-150 ${
                  filterCategoria === 'todos'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white border-transparent shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterCategoria('bajo')}
                className={`px-4 py-2 rounded-lg border transition duration-150 ${
                  filterCategoria === 'bajo'
                    ? 'bg-green-500 text-white border-transparent shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="inline-flex items-center">
                  <Tag size={14} className="mr-1" />
                  Bajo
                </span>
              </button>
              <button
                onClick={() => setFilterCategoria('medio')}
                className={`px-4 py-2 rounded-lg border transition duration-150 ${
                  filterCategoria === 'medio'
                    ? 'bg-blue-500 text-white border-transparent shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="inline-flex items-center">
                  <Gift size={14} className="mr-1" />
                  Medio
                </span>
              </button>
              <button
                onClick={() => setFilterCategoria('alto')}
                className={`px-4 py-2 rounded-lg border transition duration-150 ${
                  filterCategoria === 'alto'
                    ? 'bg-amber-500 text-white border-transparent shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="inline-flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  Alto
                </span>
              </button>
              <button
                onClick={() => setFilterCategoria('premium')}
                className={`px-4 py-2 rounded-lg border transition duration-150 ${
                  filterCategoria === 'premium'
                    ? 'bg-purple-500 text-white border-transparent shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="inline-flex items-center">
                  <ShoppingBag size={14} className="mr-1" />
                  Premium
                </span>
              </button>
            </div>
          </div>
          
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Gift size={16} className="mr-2 text-emerald-500" />
                Total de Incentivos
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalIncentivos}</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Package size={16} className="mr-2 text-blue-500" />
                Stock Total
              </div>
              <div className="text-2xl font-bold text-blue-600">{stockTotal}</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <DollarSign size={16} className="mr-2 text-amber-500" />
                Valor Total Stock
              </div>
              <div className="text-2xl font-bold text-amber-600">
                {formatPrecio(valorTotalStock)}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Percent size={16} className="mr-2 text-purple-500" />
                Precio Promedio
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {formatPrecio(precioPromedio)}
              </div>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <GenericTable<Incentivo>
            data={filteredIncentivos}
            columns={columns}
            loading={loading}
            rowsPerPage={8}
          />
        </div>

        {/* Pie de página informativo */}
        <div className="mt-6 text-sm text-gray-600 bg-gradient-to-r from-emerald-50 to-green-50 p-5 rounded-xl border border-emerald-200 shadow-sm">
          <div className="flex items-start">
            <div className="bg-gradient-to-br from-emerald-100 to-green-100 p-2 rounded-lg mr-3">
              <BarChart3 size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="font-bold text-emerald-800 mb-2 text-lg">Categorías de Incentivos por Precio</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <div className="font-semibold text-green-700 mb-1 flex items-center">
                    <Tag size={14} className="mr-1" />
                    Bajo (menos de $100)
                  </div>
                  <p className="text-xs text-gray-600">Incentivos básicos y de bajo costo</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200">
                  <div className="font-semibold text-blue-700 mb-1 flex items-center">
                    <Gift size={14} className="mr-1" />
                    Medio ($100 - $499)
                  </div>
                  <p className="text-xs text-gray-600">Incentivos estándar y populares</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-amber-200">
                  <div className="font-semibold text-amber-700 mb-1 flex items-center">
                    <TrendingUp size={14} className="mr-1" />
                    Alto ($500 - $999)
                  </div>
                  <p className="text-xs text-gray-600">Incentivos significativos y motivadores</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-700 mb-1 flex items-center">
                    <ShoppingBag size={14} className="mr-1" />
                    Premium ($1000+)
                  </div>
                  <p className="text-xs text-gray-600">Incentivos exclusivos y de alto valor</p>
                </div>
              </div>
              <p className="text-gray-700">
                Los incentivos son clasificados por precio para facilitar la selección según el presupuesto disponible. 
                Filtra por categoría para ver incentivos específicos. 
                Usa el buscador para encontrar incentivos por nombre o descripción.
              </p>
            </div>
          </div>
        </div>

        {/* Resumen de valor */}
        <div className="mt-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <BarChart3 size={20} className="mr-2 text-emerald-500" />
            Valoración del Inventario de Incentivos
          </h3>
          <div className="space-y-4">
            {filteredIncentivos.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center">
                <div className="w-56">
                  <span className="font-medium text-gray-700">{item.nombre}</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500">Stock: {item.cantidad} unidades</span>
                    <span className="text-gray-500">Valor total: {formatPrecio(item.cantidad * item.precio)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
                      style={{ width: `${Math.min((item.cantidad * item.precio / valorTotalStock) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-32 text-right">
                  <span className="font-bold text-gray-900">{formatPrecio(item.precio)}</span>
                  <span className="text-gray-500 ml-2">/unidad</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncentivoListPage;