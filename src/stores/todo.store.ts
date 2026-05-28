import { defineStore } from 'pinia'
import { ref } from 'vue'

import { apolloClient } from '@/apollo/client'

import {
    GET_TODOS,
    ADD_TODO,
    TOGGLE_TODO,
    DELETE_TODO,
} from '@/graphql/todos'

export type Todo = {
    id: string
    title: string
    is_done: boolean
    created_at: string
}

export const useTodoStore = defineStore('todo', () => {
    const todos = ref<Todo[]>([])

    async function fetchTodos() {
        const { data } = await apolloClient.query({
            query: GET_TODOS,
            fetchPolicy: 'network-only',
        })

        todos.value = data.todos
    }

    async function addTodo(title: string) {
        if (!title.trim()) return

        await apolloClient.mutate({
            mutation: ADD_TODO,
            variables: { title },
        })

        await fetchTodos()
    }

    async function toggleTodo(todo: Todo) {
        await apolloClient.mutate({
            mutation: TOGGLE_TODO,
            variables: {
                id: todo.id,
                done: !todo.is_done,
            },
        })

        await fetchTodos()
    }

    async function deleteTodo(id: string) {
        await apolloClient.mutate({
            mutation: DELETE_TODO,
            variables: { id },
        })

        await fetchTodos()
    }

    return {
        todos,
        fetchTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
    }
})