import { Route, Routes } from "react-router-dom"
import { CustomerPage } from "../home/CustomerPage";

export const CustomerRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<CustomerPage />} />
            </Routes>
        </>
    )
}
