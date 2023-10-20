import { apiSlice } from "./apiSlice"

export const todoListApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodoLists: builder.query({
            query: () => '/list'
        }),
        createTodoList: builder.mutation({
            query: (listData) => ({
                url: '/list',
                method: 'POST',
                body: { ...listData }
            })
        }),
        getList: builder.query({
            query: (id) => `list/${id}`
        }),
        deleteTodoList: builder.mutation({
            query: (id) => ({
                url: `list/${id}`,
                method: 'DELETE'
            })
        }),
        createTodoListItem: builder.mutation({
            query(data) {
                const { id, itemData } = data
                return {
                    url: `list/${id}/item`,
                    method: 'POST',
                    body: { ...itemData, status: 'not_complete' }
                }
            }
        }),
        setTodoListItemStatus: builder.mutation({
            query(data) {
                const { id, status } = data
                return {
                    url: `list-item/${id}/set-status`,
                    method: 'POST',
                    body: { status: status }
                }
            }
        }),
        deleteListItem: builder.mutation({
            query: (id) => ({
                url: `list-item/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useGetTodoListsQuery,
    useCreateTodoListMutation,
    useGetListQuery,
    useDeleteTodoListMutation,
    useCreateTodoListItemMutation,
    useSetTodoListItemStatusMutation,
    useDeleteListItemMutation
} = todoListApiSlice
