import React, {useContext} from 'react';
import {Navigation} from "./components/Navigation";
import {Route, Routes} from "react-router-dom";
import {HomePage} from './pages/HomePage';
import {TodoCategoriesPage} from "./pages/TodoCategoriesPage";
import {AuthContext} from "./context/AuthContext";
import {NotFoundPage} from "./pages/NotFoundPage";
import {TodoPriorityPage} from "./pages/TodoPriorityPage";
import {TodoTasksPage} from "./pages/TodoTasksPage";

function App() {
    const {authorized} = useContext(AuthContext)

    return (
        <>
            <Navigation />

            <Routes>
                <Route path='*' element={<NotFoundPage/>}/>
                <Route path='/' element={<HomePage/>}/>
                {authorized && <Route path='/todoCategories' element={<TodoCategoriesPage/>}/>}
                {authorized && <Route path='/todoPriorities' element={<TodoPriorityPage/>}/>}
                {authorized && <Route path='/todoTasks' element={<TodoTasksPage/>}/>}
            </Routes>
        </>
  );
}

export default App;
