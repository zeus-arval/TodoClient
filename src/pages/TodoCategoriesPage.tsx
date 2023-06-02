import {TodoCategoriesTable} from "../components/todoCategories/TodoCategoriesTable";
import {useContext, useState} from "react";
import {Modal} from "../components/Modal";
import {AddTodoCategory} from "../components/todoCategories/modals/AddTodoCategory";
import {ITodoCategory} from "../model/todoCategory";
import {ModalContext} from "../context/ModalContext";
import {useTodoCategories} from "../hooks/todoCategory";
import {UpdateTodoCategory} from "../components/todoCategories/modals/UpdateTodoCategory";
import {GreenButton} from "../components/common/Button";

export function TodoCategoriesPage() {
    const {modal, open, close} = useContext(ModalContext)
    const {todoCategories, addCategory, deleteCategory, updateCategory} = useTodoCategories()
    const [updateDialogIsOpened, setUpdateDialogIsOpened] = useState(false)
    const [updatableCategory, setUpdatableCategory] = useState<ITodoCategory>({
        categoryName: '',
        categorySort: 1,
    })

    const openUpdateDialog = (todoCategory: ITodoCategory) => {
        setUpdatableCategory(todoCategory)
        setUpdateDialogIsOpened(true)
        open()
    }

    const closeHandler = () => {
        setUpdateDialogIsOpened(false)
        close()
    }

    const createHandler = async (todoCategory: ITodoCategory) => {
        await addCategory(todoCategory)
    }

    const updateHandler = async (todoCategory: ITodoCategory) => {
        await updateCategory(todoCategory)
        setUpdateDialogIsOpened(false)
    }

    return (
        <div className='h-full'>
            <TodoCategoriesTable todoCategories={todoCategories} deleteCategory={deleteCategory} openUpdateCategoryDialog={openUpdateDialog}/>

            {modal && <Modal title={updateDialogIsOpened ? 'Update Todo Category' : 'Add Todo Category'} onClose={closeHandler}>
                {!updateDialogIsOpened && <AddTodoCategory onCreated={createHandler}/>}
                {updateDialogIsOpened && <UpdateTodoCategory onUpdated={updateHandler} todoCategory={updatableCategory}/>}
            </Modal>}

            <div className='w-full mx-auto flex justify-center mt-12'>
                <GreenButton type='button' text='Create new Category' onClick={() => open()}/>
            </div>
        </div>
    )
}