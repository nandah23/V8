import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  backgroundColor: string;
}

const Card: React.FC<CardProps> = ({ image, title, description, link, backgroundColor }) => {
  return (
    <div
      className={`
        w-[280px] flex-shrink-0 
        bg-white rounded-2xl overflow-hidden 
        shadow-xl 
        transition-all duration-500 ease-in-out 
        hover:shadow-2xl 
        hover:translate-y-[-6px] 
        group
      `}
    >
      <div 
        className={`
          h-[200px] 
          ${backgroundColor} 
          flex items-center justify-center p-6 
          rounded-t-2xl 
          relative
        `}
      >
        <Link to={link} className="block w-full h-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </Link>
      </div>

      <div className="p-8 bg-white flex flex-col items-center text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 tracking-wider">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed text-justify px-2">
          {description}
        </p>

        <Link 
          to={link}
          className="
            inline-block px-8 py-3 
            bg-blue-600 text-white font-semibold 
            rounded-full text-sm 
            shadow-md 
            transition-all duration-300 ease-in-out 
            hover:bg-blue-700 hover:shadow-lg
          "
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default Card;