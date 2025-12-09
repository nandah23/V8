import React from 'react';

const Footer: React.FC = () => {
  return (
    // Contenedor principal del footer: fondo claro, padding vertical sutil
    <footer className="w-full bg-gray-50 py-4 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-6">
        
        {/* Contenido centrado, siguiendo el estilo de la imagen */}
        <div className="text-center">
          <p className="text-sm text-blue-700 font-medium">
            © 2025 Universidad de las Ciencias Informicias
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;