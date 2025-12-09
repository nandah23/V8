import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Loader2 } from 'lucide-react';
// Importa 'cn' si lo tienes disponible, si no, se usará una función dummy para que compile.

// --- 1. Utilidad de ClassName (cn) ---
// NOTA: Reemplaza esta función con tu implementación real si usas 'tailwind-merge' y 'clsx'.
// Para este ejemplo, actúa como un simple concatenador.
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');


// --- 2. Definición de Tipos (Exportables) ---

export interface ColumnDef<T> {
  // El texto que se mostrará en el encabezado
  header: string;
  // La clave (key) en el objeto T para acceder al valor
  accessor?: keyof T; 
  // Función de renderizado para celdas con contenido complejo (JSX)
  cell?: (row: T) => React.ReactNode; 
  // Opcional: Clases de Tailwind para aplicar a la columna (ej: 'text-right', 'w-1/4')
  className?: string; 
}

// Propiedades genéricas de la tabla
interface GenericTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  rowsPerPage?: number;
  loading?: boolean;
}


// --- 3. Componente Principal Genérico ---

// T extiende Record<string, any> asegura que T es un objeto
export function GenericTable<T extends Record<string, unknown>>({ 
    data, 
    columns, 
    rowsPerPage = 10, // Default a 10 filas
    loading = false 
}: GenericTableProps<T>) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // --- Lógica de Búsqueda y Filtrado (Memoizada) ---
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    const lowerCaseSearch = searchTerm.toLowerCase();
    
    return data.filter(row => {
      // Intenta encontrar la coincidencia en cualquier columna que tenga un 'accessor' definido
      return columns.some(col => {
        if (col.accessor) {
          const value = row[col.accessor];
          
          // Solo buscar en valores convertibles a string
          if (typeof value === 'string' || typeof value === 'number') {
            return String(value).toLowerCase().includes(lowerCaseSearch);
          }
        }
        return false;
      });
    });
  }, [data, columns, searchTerm]);

  // --- Lógica de Paginación ---
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  // Efecto para restablecer la página a 1 si el filtro o la cantidad de filas cambian
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, rowsPerPage]);


  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // --- Renderizado ---

  return (
    <div className="bg-white shadow-xl rounded-xl ring-1 ring-gray-100 overflow-hidden p-6">
      
      {/* 1. BUSCADOR */}
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-full max-w-xs">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar en la tabla..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-sm"
          />
        </div>
      </div>

      {/* 2. CUERPO DE LA TABLA (Responsivo con scroll horizontal) */}
      <div className="overflow-x-auto border rounded-lg border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={cn(
                    "px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600",
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
                <tr>
                    <td colSpan={columns.length} className="px-6 py-12 text-center text-sm text-gray-500">
                        <Loader2 className="h-5 w-5 animate-spin inline mr-2 text-blue-500" /> Cargando datos...
                    </td>
                </tr>
            ) : currentData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-sm text-gray-500">
                  {searchTerm 
                    ? `No hay resultados para "${searchTerm}".` 
                    : "No hay datos disponibles para mostrar."
                  }
                </td>
              </tr>
            ) : (
              currentData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-blue-50/50 transition duration-100">
                  {columns.map((column, colIndex) => (
                    <td 
                        key={colIndex} 
                        className={cn(
                            "px-6 py-4 whitespace-nowrap text-sm text-gray-800",
                            column.className
                        )}
                    >
                      {/* Prioriza la función cell, si no usa el accessor */}
                      {column.cell 
                        ? column.cell(row) 
                        : (column.accessor ? String(row[column.accessor]) : null)
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 3. PAGINACIÓN (Solo se muestra si hay más de una página) */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-500">
            Mostrando {startIndex + 1} a {Math.min(startIndex + rowsPerPage, filteredData.length)} de {filteredData.length} resultados
          </p>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Página Anterior"
              className="p-2 border rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={20} />
            </button>
            
            {/* Indicador de página actual */}
            <span className="px-3 py-1 bg-blue-600 text-white font-bold rounded-full text-sm shadow-md">
              {currentPage} / {totalPages}
            </span>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Página Siguiente"
              className="p-2 border rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default GenericTable;