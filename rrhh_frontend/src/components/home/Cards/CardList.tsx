import React from "react";
import Card from "./Card";
import imgincentivo from "../../../assets/img/imgincentivo.jpg";
import imgcondecoracion from "../../../assets/img/imgcondecoracion.jpg";
import imgclaustro from "../../../assets/img/imgclaustro.jpg";
import { ClipboardPen } from "lucide-react";

const cardsData = [
  {
    image: imgincentivo,
    title: "Incentivos",
    description: "Reconoce y motiva el esfuerzo de tu equipo con un sistema transparente de incentivos.",
    link: "/incentivo/ig",
    backgroundColor: "bg-blue-600",
  },
  {
    image: imgcondecoracion,
    title: "Condecoraciones",
    description: "Celebra logros destacados y fortalece la cultura institucional con condecoraciones significativas.",
    link: "/condecoracion",
    backgroundColor: "bg-blue-500",
  },
  {
    image: imgclaustro,
    title: "Claustros",
    description: "Gestiona de forma organizada la información del claustro académico y administrativo en un solo lugar.",
    link: "/claustro",
    backgroundColor: "bg-blue-400",
  },
];

const CardsList: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50">
      <ClipboardPen size={40} className="mx-auto mb-3 text-blue-600" />
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-12">
        Gestión
      </h2>
      
  
      <div 
        className="
          flex overflow-x-auto snap-x snap-mandatory 
          space-x-6 px-6 pb-8 
          md:justify-center md:gap-8 
          md:overflow-x-visible md:snap-none 
          
        "
      >
        {cardsData.map((card, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 snap-start w-[280px]"
          >
            <Card
              image={card.image}
              title={card.title}
              description={card.description}
              link={card.link}
              backgroundColor={card.backgroundColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsList;