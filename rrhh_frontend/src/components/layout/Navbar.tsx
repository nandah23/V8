import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// Usamos Menu (Hamburguesa), X (Cerrar), Home (Inicio), y User (Usuario) de Lucide
// Solo usaremos Home si el enlace es "Inicio"
import { Menu, X, Home, User } from "lucide-react";
import Logo from '../../assets/img/imglogo.jpg';
// Si tienes la utilidad cn, puedes descomentar:
// import { cn } from '@/lib/utils'; 

// --- Tipado de Datos ---
interface SubLink {
  name: string;
  to: string;
}

interface LinkItem {
  name: string;
  to?: string; 
  key: string;
  subMenu?: SubLink[];
}

const links: LinkItem[] = [
  // Mantenemos Home fuera de un submenú, pero estará en el Drawer
  { name: "Inicio", to: "/", key: "home" }, 
  {
    name: "Personal", 
    key: "personal", to: "/personal"
  },
  {
    name: "Áreas",
    key: "area", to: "/area" // Asumo un 'to' para que el NavLink funcione
  },
  {
    name: "Condecoraciones",
    key: "condecoracion", to: "/condecoracion"
  },
  {
    name: "Incentivos",
    key: "incentivo",
    subMenu: [
      { name: "Información General", to: "/incentivo/ig" },
      { name: "Solicitudes", to: "/incentivo/solicitud" },
      { name: "Distribuciones", to: "/incentivo/distribucion" },
    ]
  },
  {
    name: "Claustros",
    key: "claustro", to: "/claustro"
  },
];

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Almacena el 'key' del menú abierto para el despliegue
  const [subMenuOpen, setSubMenuOpen] = useState(null as string | null);

  const handleSubMenuToggle = (key: string) => {
    // Si ya está abierto, lo cierra. Si no, lo abre.
    setSubMenuOpen(subMenuOpen === key ? null : key);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSubMenuOpen(null); // Asegura que el submenú se cierre al cerrar el drawer
  };

  // Función para manejar el clic en el enlace y cerrar el menú
  const handleLinkClick = () => {
    closeDrawer();
  };

  return (
    <header className="w-full fixed top-0 z-50 bg-white shadow-lg">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between h-16">

        {/* 1. Botón Hamburguesa (Izquierda) */}
        <button 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors z-20" 
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Abrir Menú Principal"
        >
          <Menu size={24} className="text-gray-800" />
        </button>
        
        {/* 2. Logo (Segundo elemento) */}
        <Link to="/" onClick={closeDrawer} className="flex items-center gap-2">
          <img 
            src={Logo}
            alt="Logo Suite de herramientas de recursos humanos." 
            className="w-10 h-10 object-contain rounded-full border-2 border-blue-600"
          />
        </Link>

        {/* 3. Título (Centro - Expande) */}
        <Link to="/" onClick={closeDrawer} className="flex-grow text-center">
            <span className="text-xl font-extrabold text-blue-700 tracking-wider uppercase">
              Suite de herramientas de recursos humanos
            </span>
        </Link>
        
        {/* 4. Icono de Usuario (Derecha) */}
        <Link to="/profile" onClick={closeDrawer} className="p-2 rounded-full hover:bg-gray-100 transition-colors ml-auto">
          <User size={24} className="text-gray-600" />
        </Link>
      </nav>

      {/* --- Menú Desplegable (Side Drawer) --- */}

      {/* Overlay Oscuro */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* Contenedor del Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="main-menu-title"
      >
        <div className="p-6">
          {/* Header del Drawer: Logo y Botón de Cierre */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <h2 id="main-menu-title" className="text-lg font-bold text-blue-700">
              Menú
            </h2>
            <button 
              onClick={closeDrawer} 
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Cerrar Menú"
            >
              <X size={24} className="text-gray-700" />
            </button>
          </div>

          {/* Lista de Enlaces */}
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.key}>
                
                {/* Enlace o Toggle Principal */}
                {link.subMenu ? (
                  // --- Botón de Menú con Submenú ---
                  <>
                    <button
                      onClick={() => handleSubMenuToggle(link.key)}
                      // CORRECCIÓN 2: El botón principal NO debe tener clase 'active' solo por estar abierto. 
                      // Solo cambia de color si está abierto para indicar el estado del submenú.
                      className={`w-full text-left flex items-center justify-between py-2 px-3 rounded-lg font-semibold transition-colors ${
                        subMenuOpen === link.key ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                      }`}
                      aria-expanded={subMenuOpen === link.key}
                      aria-controls={`submenu-${link.key}`}
                    >
                      <span>{link.name}</span>
                      <svg 
                        className={`w-4 h-4 transform transition-transform ${subMenuOpen === link.key ? "rotate-180" : ""}`} 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Submenú Desplegable */}
                    <ul 
                      id={`submenu-${link.key}`}
                      className={`transition-all duration-300 ease-in-out overflow-hidden pl-4 border-l-2 border-blue-200 ml-3 ${
                        subMenuOpen === link.key ? "max-h-60 mt-2" : "max-h-0"
                      }`}
                    >
                      {link.subMenu.map((subLink) => (
                        <li key={subLink.to}>
                          <NavLink
                            to={subLink.to}
                            onClick={handleLinkClick}
                            className={({ isActive }) =>
                              `block py-2 px-3 text-sm rounded-lg transition-colors ${
                                isActive ? "bg-blue-100 text-blue-700 font-bold" : "text-gray-600 hover:bg-gray-50"
                              }`
                            }
                          >
                            {subLink.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  // --- Enlace Simple ---
                  <NavLink
                    to={link.to || '/'} 
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `w-full text-left flex items-center py-2 px-3 rounded-lg font-semibold transition-colors ${
                        isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                    end={link.key === 'home'} // Para 'Inicio' queremos 'end' para que no sea activo en todas las rutas
                  >
                    {/* CORRECCIÓN 1: Solo renderiza <Home /> si la key es "home" */}
                    {link.key === "home" && <Home size={18} className="mr-2" />}
                    {link.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;