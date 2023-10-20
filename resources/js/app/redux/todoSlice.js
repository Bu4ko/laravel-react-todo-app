import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { todoListApiSlice } from "./api/todoListApiSlice"

const initialState = {
    lists: [],
    status: 'idle',
    error: null
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        todoListAdded: (state, action) => {
            state.lists.push(action.payload.list)
        },
        removeTodoList(state, action) {
            state.lists = state.lists.filter(list => list.id !== action.payload.id);
        },
        todoListItemAdded: (state, action) => {
            let listIndex = state.lists.findIndex(list => list.id === action.payload.item.list_id)
            Array.isArray(state.lists[listIndex].todo_list_items)
                ? state.lists[listIndex].todo_list_items.push(action.payload.item)
                : state.lists[listIndex].todo_list_items = [action.payload.item]
        },
        todoListItemDeleted: (state, action) => {
            let listIndex = state.lists.findIndex(list => list.id === action.payload.listId)
            state.lists[listIndex].todo_list_items =
                state.lists[listIndex].todo_list_items.filter(item => item.id !== action.payload.id)
        },
        todoListItemStatusChanged: (state, action) => {
            let listIndex = state.lists.findIndex(list => list.id === action.payload.listId)
            let todoItemIndex = state.lists[listIndex].todo_list_items.findIndex(item => item.id === action.payload.id)
            state.lists[listIndex].todo_list_items[todoItemIndex].status = action.payload.status
        },
        clearListsState: () => initialState
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            isAnyOf(todoListApiSlice.endpoints.getTodoLists.matchFulfilled), //updated
            (state, action) => {
                state.lists = action.payload.lists
            }
        )
        builder.addMatcher(
            isAnyOf(todoListApiSlice.endpoints.getList.matchFulfilled), //updated
            (state, action) => {
                let list = state.lists.find(list => list.id === action.payload.list.id)
                list ? state.lists = state.lists.map(item =>
                    item.id === action.payload.list.id
                        ? action.payload.list
                        : item
                ) : state.lists.push(action.payload.list)
            }
        )
    },
})

export const {
    todoListAdded,
    removeTodoList,
    todoListItemAdded,
    todoListItemDeleted,
    todoListItemStatusChanged,
    clearListsState
} = todoSlice.actions

export default todoSlice.reducer
