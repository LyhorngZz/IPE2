<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTodoStore } from './stores/todo.store'

const todoStore = useTodoStore()

const title = ref('')

onMounted(async () => {
  await todoStore.fetchTodos()
})

async function addTodo() {
  await todoStore.addTodo(title.value)

  title.value = ''
}
</script>

<template>
  <div class="container">
    <h1>Todo App</h1>

    <div class="add-form">
      <input
        v-model="title"
        placeholder="Enter todo..."
        @keyup.enter="addTodo"
      />

      <button @click="addTodo">
        Add
      </button>
    </div>

    <ul class="todo-list">
      <li
        v-for="todo in todoStore.todos"
        :key="todo.id"
        class="todo-item"
      >
        <div class="left">
          <input
            type="checkbox"
            :checked="todo.is_done"
            @change="todoStore.toggleTodo(todo)"
          />

          <span
            :class="{ done: todo.is_done }"
          >
            {{ todo.title }}
          </span>
        </div>

        <button
          class="delete-btn"
          @click="todoStore.deleteTodo(todo.id)"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 700px;
  margin: 40px auto;
  padding: 20px;

  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 20px;
}

.add-form {
  display: flex;
  gap: 10px;

  margin-bottom: 20px;
}

input[type='text'],
input {
  flex: 1;

  padding: 10px;

  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  padding: 10px 16px;

  border: none;
  border-radius: 6px;

  cursor: pointer;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px;

  border: 1px solid #eee;
  border-radius: 8px;

  margin-bottom: 10px;
}

.left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.done {
  text-decoration: line-through;
  opacity: 0.6;
}

.delete-btn {
  background: crimson;
  color: white;
}
</style>