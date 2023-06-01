import React, {useContext} from 'react';
import {Navigation} from "./components/Navigation";
import {Route, Routes} from "react-router-dom";
import {HomePage} from './pages/HomePage';
import {TodoCategoriesPage} from "./pages/TodoCategoriesPage";
import {AuthContext} from "./context/AuthContext";
import {NotFoundPage} from "./pages/NotFoundPage";

function App() {
    const {authorized} = useContext(AuthContext)

    return (
        <>
            <Navigation />

            <Routes>
                <Route path='*' element={<NotFoundPage/>}/>
                <Route path='/' element={<HomePage/>}/>
                {authorized && <Route path='/todoCategories' element={<TodoCategoriesPage/>}/>}
            </Routes>
        </>
  );
}

export default App;
