import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const MainLayout = lazy(() => import("../layout/MainLayout"));
const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Personal = lazy(() => import("../pages/Personal"));
const PersonalForm = lazy(() => import("../components/modules/personal/pages/PersonalFormPage"));
const Area = lazy(() => import("../pages/Area"));
const AreaForm = lazy(() => import("../components/modules/area/pages/AreaFormPage"));
const Condecoracion = lazy(() => import("../pages/Condecoracion"));
const CondecoracionForm = lazy(() => import("../components/modules/condecoracion/pages/CondecoracionFormPage"));
const IncentivoIG = lazy(() => import("../pages/IncentivoIG"));
const IncentivoIGForm = lazy(() => import("../components/modules/incentivo/pages/IncentivoFormPage"));
const IncentivoSolicitud = lazy(() => import("../pages/IncentivoSolicitud"));
const IncentivoSolicitudForm = lazy(() => import("../components/modules/solicitud/pages/SolicitudFormPage"));
const IncentivoDistribucion = lazy(() => import("../pages/IncentivoDistribucion"));
const IncentivoDistribucionForm = lazy(() => import("../components/modules/distribucion/pages/DistribucionFormPage"));
const Claustro = lazy(() => import("../pages/Claustro"));

export function AppRouter() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          Cargando…
        </div>
      }
    >
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />

        <Route path="personal" element={<Personal />} />
          <Route path="personal/nuevo" element={<PersonalForm />} />

          <Route path="area" element={<Area />} />
          <Route path="area/nuevo" element={<AreaForm />} />

          <Route path="condecoracion" element={<Condecoracion />} />
          <Route path="condecoracion/nuevo" element={<CondecoracionForm />} />

          <Route path="claustro" element={<Claustro />} />
         
          <Route path="incentivo/ig" element={<IncentivoIG />} />
          <Route path="incentivo/ig/nuevo" element={<IncentivoIGForm />} />
          <Route path="incentivo/solicitud" element={<IncentivoSolicitud />} />
          <Route path="incentivo/solicitud/nuevo" element={<IncentivoSolicitudForm />} />
          <Route path="incentivo/distribucion" element={<IncentivoDistribucion />} />
          <Route path="incentivo/distribucion/nuevo" element={<IncentivoDistribucionForm />} />

        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}