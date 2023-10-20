import { useState } from 'react'

import TodoListItem from "./TodoListItem"
import { useGetTodoListsQuery, useCreateTodoListMutation, useDeleteTodoListMutation } from "../../app/redux/api/todoListApiSlice";
import NewTodoListItemForm from "./NewTodoListItemForm"
import { todoListAdded, removeTodoList } from "../../app/redux/todoSlice"
import { useDispatch, useSelector } from "react-redux"

const TodoLists = () => {
    const lists = useSelector(state => state.todo.lists)
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const {data = {lists: []}, isLoading} = useGetTodoListsQuery()
    const [createTodoList] = useCreateTodoListMutation()
    const [deleteTodoList] = useDeleteTodoListMutation()

    const createList = async() => {
        try {
            const result = await createTodoList({name}).unwrap()
            if (result.errors) {
                alert(result.message)
            } else {
                dispatch(todoListAdded({ ...result }))
                setName('')
            }
        } catch (err) {
            alert(err)
        }
    }

    const deleteList = async(id) => {
        try {
            const result = await deleteTodoList(id).unwrap()
            if (result?.message === 'Success') {
                dispatch(removeTodoList({ id }))
            } else {
                alert('Item was not deleted')
            }
        } catch (err) {
            alert(err)
        }
    }

    const content = isLoading ? <h1>Loading...</h1> : (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <ul>
                        <NewTodoListItemForm
                            value={name}
                            updateText={setName}
                            handleAction={createList}
                        />
                        {lists.map((todoList) => (
                            <TodoListItem
                                key={todoList.id}
                                {...todoList}
                                deleteList={deleteList}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )

    return content
}
export default TodoLists
