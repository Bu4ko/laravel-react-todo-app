import { useParams } from 'react-router-dom'
import { useState } from 'react'

import { useGetListQuery, useCreateTodoListItemMutation, useDeleteListItemMutation, useSetTodoListItemStatusMutation } from "../../app/redux/api/todoListApiSlice"
import { todoListItemAdded, todoListItemDeleted, todoListItemStatusChanged } from "../../app/redux/todoSlice"
import { useDispatch, useSelector } from "react-redux"
import NewTodoItemForm from "./NewTodoItemForm"
import TodoItem from "./TodoItem"

const TodoItems = () => {
    let { listId } = useParams();
    const list = useSelector(state => state.todo.lists.find(list => list.id === parseInt(listId)))
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()

    const {data = {list: {}}, isLoading} = useGetListQuery(listId)
    const [createTodoListItem] = useCreateTodoListItemMutation()
    const [deleteListItem] = useDeleteListItemMutation()
    const [setTodoListItemStatus] = useSetTodoListItemStatusMutation()

    const createTodo = async() => {
        try {
            const result = await createTodoListItem({id: listId, itemData: {title, description}}).unwrap()
            dispatch(todoListItemAdded({ ...result }))
            setTitle('')
            setDescription('')
        } catch (err) {
            alert(err)
        }
    }

    const deleteItem = async(id) => {
        try {
            const result = await deleteListItem(id).unwrap()
            if (result.message === 'Success') {
                dispatch(todoListItemDeleted({ id, listId: parseInt(listId) }))
            } else {
                alert('ToDo was not deleted')
            }
        } catch (err) {
            alert(err)
        }
    }

    const toggleItemStatus = async(id, status) => {
        try {
            const newStatus = status === 'not_complete' ? 'complete' : 'not_complete';
            const result = await setTodoListItemStatus({id, status: newStatus}).unwrap()
            if (result.message === 'Success') {
                dispatch(todoListItemStatusChanged({ id, listId: parseInt(listId), status: newStatus }))
            } else {
                alert('Status was not changed')
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
                        <NewTodoItemForm
                            title={title}
                            updateTitle={setTitle}
                            description={description}
                            updateDescription={setDescription}
                            handleAction={createTodo}
                        />
                        <div className="todo-list">
                            {list?.todo_list_items?.map((todoList) => (
                                <TodoItem
                                    key={todoList.id}
                                    {...todoList}
                                    deleteItem={deleteItem}
                                    toggleStatus={toggleItemStatus}
                                />
                            ))}
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )

    return content
}
export default TodoItems
