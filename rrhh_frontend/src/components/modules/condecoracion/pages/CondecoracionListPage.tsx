import React, { useState, useEffect } from 'react';
import GenericTable, { type ColumnDef } from '../../../global/GenericTable';
import { Loader2, Trophy, Award, Star,Calendar,Plus,Eye,Edit,Clock,Medal} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Interface para las condecoraciones
interface Condecoracion {
  id: number;
  nombre: string;
  descripcion: string;
  anosExperiencia: number;
  [key: string]: unknown;
}

// Datos de ejemplo
const mockCondecoraciones: Condecoracion[] = [
  { id: 1, nombre: 'Excelencia en Innovación', descripcion: 'Reconocimiento por contribuciones innovadoras en proyectos tecnológicos', anosExperiencia: 5 },
  { id: 2, nombre: 'Liderazgo Ejemplar', descripcion: 'Premio al liderazgo excepcional en equipos de alto rendimiento', anosExperiencia: 8 },
  { id: 3, nombre: 'Servicio al Cliente', descripcion: 'Reconocimiento por servicio al cliente excepcional y dedicación', anosExperiencia: 3 },
  { id: 4, nombre: 'Mentor del Año', descripcion: 'Premio al mejor mentor por guía y desarrollo de nuevos talentos', anosExperiencia: 10 },
  { id: 5, nombre: 'Innovación Sostenible', descripcion: 'Reconocimiento por proyectos que promueven la sostenibilidad ambiental', anosExperiencia: 6 },
  { id: 6, nombre: 'Excelencia Técnica', descripcion: 'Premio a la excelencia técnica y habilidades especializadas', anosExperiencia: 7 },
  { id: 7, nombre: 'Colaborador Destacado', descripcion: 'Reconocimiento por colaboración excepcional en equipos multidisciplinarios', anosExperiencia: 4 },
  { id: 8, nombre: 'Pionero Digital', descripcion: 'Premio por implementación exitosa de transformación digital', anosExperiencia: 9 },
  { id: 9, nombre: 'Gestión Eficiente', descripcion: 'Reconocimiento por gestión eficiente de recursos y proyectos', anosExperiencia: 12 },
  { id: 10, nombre: 'Innovación en Producto', descripcion: 'Premio por desarrollo de productos innovadores exitosos', anosExperiencia: 5 },
  { id: 11, nombre: 'Compromiso Social', descripcion: 'Reconocimiento por participación activa en responsabilidad social', anosExperiencia: 2 },
  { id: 12, nombre: 'Excelencia en Ventas', descripcion: 'Premio al mejor desempeño en ventas y crecimiento comercial', anosExperiencia: 6 },
  { id: 13, nombre: 'Calidad Total', descripcion: 'Reconocimiento por mantenimiento de altos estándares de calidad', anosExperiencia: 8 },
  { id: 14, nombre: 'Transformación Cultural', descripcion: 'Premio por contribución a la transformación cultural organizacional', anosExperiencia: 15 },
  { id: 15, nombre: 'Talento Emergente', descripcion: 'Reconocimiento a talentos prometedores con menos de 3 años en la empresa', anosExperiencia: 1 }
];

export const CondecoracionListPage: React.FC = () => {
  const navigate = useNavigate();
  const [condecoraciones, setCondecoraciones] = useState<Condecoracion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCondecoraciones = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setCondecoraciones(mockCondecoraciones);
      setLoading(false);
    };

    fetchCondecoraciones();
  }, []);

  // Handlers
  const handleViewDetails = (id: number) => {
    console.log('Ver detalles de la condecoración:', id);
    alert(`Ver detalles de la condecoración ID: ${id}`);
  };

  const handleEditCondecoracion = (id: number) => {
    console.log('Editar condecoración:', id);
    alert(`Editar condecoración ID: ${id}`);
  };

  const handleAddCondecoracion = () => {
    navigate('/condecoracion/nuevo');
  };

  // Función para obtener el color según años de experiencia
  const getExperienciaColor = (anos: number) => {
    if (anos >= 10) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (anos >= 5) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (anos >= 3) return 'bg-green-100 text-green-800 border-green-200';
    return 'bg-amber-100 text-amber-800 border-amber-200';
  };

  // Función para obtener el icono según años de experiencia
  const getExperienciaIcon = (anos: number) => {
    if (anos >= 10) return <Trophy size={16} className="mr-1" />;
    if (anos >= 5) return <Award size={16} className="mr-1" />;
    if (anos >= 3) return <Star size={16} className="mr-1" />;
    return <Medal size={16} className="mr-1" />;
  };

  // Función para obtener la etiqueta de nivel
  const getNivelLabel = (anos: number) => {
    if (anos >= 10) return 'Maestría';
    if (anos >= 5) return 'Experto';
    if (anos >= 3) return 'Avanzado';
    return 'Principiante';
  };

  // Columnas de la tabla
  const columns: ColumnDef<Condecoracion>[] = [
    {
      header: 'ID',
      accessor: 'id',
      className: 'w-20 text-center',
      cell: (row) => (
        <div className="flex justify-center">
          <span className="inline-flex items-center justify-center w-10 h-10 from-amber-100 to-amber-50 text-amber-800 rounded-full text-sm font-bold border border-amber-200 shadow-sm">
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
            <div className="w-8 h-8  from-yellow-100 to-yellow-50 rounded-full flex items-center justify-center border border-yellow-200">
              <Trophy size={16} className="text-yellow-600" />
            </div>
          </div>
          <div className="ml-3">
            <div className="font-bold text-gray-900 text-base">
              {row.nombre}
            </div>
            <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">
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
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <Clock size={12} className="mr-1" />
            <span>Requiere experiencia demostrable</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Años de Experiencia',
      accessor: 'anosExperiencia',
      className: 'w-48 text-center',
      cell: (row) => {
        const anos = row.anosExperiencia;
        return (
          <div className={`flex flex-col items-center justify-center p-3 rounded-xl border ${getExperienciaColor(anos)}`}>
            <div className="flex items-center mb-1">
              {getExperienciaIcon(anos)}
              <span className="text-2xl font-bold">{anos}</span>
              <span className="text-sm ml-1">años</span>
            </div>
            <div className="text-xs font-semibold mt-1">
              {getNivelLabel(anos)}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Experiencia mínima
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
            className="px-3 py-1.5 bg-blue-100 from-blue-50 to-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:from-blue-100 hover:to-blue-200 transition duration-150 border border-blue-200 shadow-sm"
            title="Ver detalles"
          >
            <Eye size={16} className="inline mr-1" />
            Ver
          </button>
          <button 
            onClick={() => handleEditCondecoracion(row.id)}
            className="px-3 py-1.5 bg-blue-100 from-gray-50 to-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:from-gray-100 hover:to-gray-200 transition duration-150 border border-gray-200 shadow-sm"
            title="Editar"
          >
            <Edit size={16} className="inline mr-1" />
            Editar
          </button>
        </div>
      ),
    },
  ];

  // Estadísticas
  const totalCondecoraciones = condecoraciones.length;
  const promedioExperiencia = condecoraciones.length > 0 
    ? (condecoraciones.reduce((sum, c) => sum + c.anosExperiencia, 0) / condecoraciones.length).toFixed(1)
    : '0';
  
  const condecoracionesAvanzadas = condecoraciones.filter(c => c.anosExperiencia >= 5).length;
  const condecoracionesElite = condecoraciones.filter(c => c.anosExperiencia >= 10).length;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 bg-blue-600 from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Sistema de Condecoraciones
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Reconocimientos por méritos y años de experiencia en la organización
              </p>
            </div>
            
            <button
              onClick={handleAddCondecoracion}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 from-amber-500 to-yellow-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-yellow-600 transition duration-150 shadow-lg w-full sm:w-auto"
            >
              <Plus size={20} className="mr-2" />
              Nueva Condecoración
            </button>
          </div>
          
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Trophy size={16} className="mr-2 text-amber-500" />
                Total de Condecoraciones
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalCondecoraciones}</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Calendar size={16} className="mr-2 text-blue-500" />
                Experiencia Promedio
              </div>
              <div className="text-2xl font-bold text-blue-600">{promedioExperiencia} años</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Award size={16} className="mr-2 text-green-500" />
                Nivel Avanzado+
              </div>
              <div className="text-2xl font-bold text-green-600">{condecoracionesAvanzadas}</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Star size={16} className="mr-2 text-purple-500" />
                Nivel Élite
              </div>
              <div className="text-2xl font-bold text-purple-600">{condecoracionesElite}</div>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-100">
          <GenericTable<Condecoracion>
            data={condecoraciones}
            columns={columns}
            loading={loading}
            rowsPerPage={8}
          />
        </div>

        {/* Pie de página informativo */}
        <div className="mt-6 text-sm text-gray-600  from-amber-50 to-yellow-50 p-5 rounded-xl border border-amber-200 shadow-sm">
          <div className="flex items-start">
            <div className="from-amber-100 to-yellow-100 p-2 rounded-lg mr-3">
              <Loader2 size={20} className="text-amber-600 animate-pulse" />
            </div>
            <div>
              <p className="font-bold text-amber-800 mb-2 text-lg">Información sobre los niveles de condecoración</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                <div className="bg-white p-2 rounded-lg border border-amber-200 text-center">
                  <div className="text-xs text-gray-500 mb-1">Nivel Principiante</div>
                  <div className="text-sm font-bold text-amber-600">1-2 años</div>
                  <Medal size={16} className="mx-auto mt-1 text-amber-400" />
                </div>
                <div className="bg-white p-2 rounded-lg border border-green-200 text-center">
                  <div className="text-xs text-gray-500 mb-1">Nivel Avanzado</div>
                  <div className="text-sm font-bold text-green-600">3-4 años</div>
                  <Star size={16} className="mx-auto mt-1 text-green-400" />
                </div>
                <div className="bg-white p-2 rounded-lg border border-blue-200 text-center">
                  <div className="text-xs text-gray-500 mb-1">Nivel Experto</div>
                  <div className="text-sm font-bold text-blue-600">5-9 años</div>
                  <Award size={16} className="mx-auto mt-1 text-blue-400" />
                </div>
                <div className="bg-white p-2 rounded-lg border border-purple-200 text-center">
                  <div className="text-xs text-gray-500 mb-1">Nivel Maestría</div>
                  <div className="text-sm font-bold text-purple-600">10+ años</div>
                  <Trophy size={16} className="mx-auto mt-1 text-purple-400" />
                </div>
              </div>
              <p className="text-gray-700">
                Las condecoraciones representan niveles de logro basados en años de experiencia. 
                Cada nivel tiene requisitos específicos y otorga diferentes beneficios y reconocimientos. 
                Usa el buscador para encontrar condecoraciones específicas por nombre o nivel.
              </p>
            </div>
          </div>
        </div>

        {/* Sección de beneficios */}
        <div className="mt-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center">
            <Star size={18} className="mr-2 text-amber-500" />
            Beneficios de las Condecoraciones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-800 mb-1">Reconocimiento Profesional</div>
              <p className="text-gray-600">Certificación oficial y reconocimiento público en la organización</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-800 mb-1">Oportunidades de Crecimiento</div>
              <p className="text-gray-600">Acceso preferencial a promociones y proyectos especiales</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-semibold text-purple-800 mb-1">Beneficios Adicionales</div>
              <p className="text-gray-600">Bonificaciones, capacitaciones especiales y otros incentivos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CondecoracionListPage;