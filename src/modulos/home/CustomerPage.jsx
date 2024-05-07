import { Navigate, Route, Routes } from "react-router-dom/dist"
import { Sidebar } from "../../components/sidebar/Sidebar"
import { HomePage } from "../customer/HomePage";
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import { CatalogPage } from "../customer/CatalogPage";
import { categorias } from "../../mocks/data";
import { FavoritesPage } from "../customer/FavoritesPage";
import { LoginPage } from "../customer/LoginPage";

export const CustomerPage = () => {
    return (
        <div className="flex h-screen bg-primary-light dark:bg-primary-dark dark:text-white">
            <Sidebar />
            <section id="primary-container" className="w-full">
                <Navbar />
                <Routes>
                    <Route path="inicio" element={<HomePage />} />
                    <Route path="catalogo" element={<CatalogPage />} />
                    {/* Generar rutas dinámicas para cada categoría */}
                    {categorias.map((categoria) => (
                        <Route
                            key={categoria.value}
                            path={`catalogo/${categoria.value}`}
                            element={<CatalogPage categoria={categoria.value} />}
                        />
                    ))}
                    <Route path="favoritos" element={<FavoritesPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="inicio" />} />
                </Routes>
                <Footer/>
            </section>
        </div>
    );
}
