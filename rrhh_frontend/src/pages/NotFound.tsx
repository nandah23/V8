import { Wrench } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold flex items-center gap-2">
        404 - Not Found <Wrench />
      </h1>
    </div>
  );
};

export default NotFound;