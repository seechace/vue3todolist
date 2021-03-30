<template>
  <!-- <link rel="stylesheet" href="./index.css" /> -->

  <div id="app">
    <!-- <h1>todosRef :{{ todosRef }}</h1> -->
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          @keyup.enter="addTodo"
          v-model="newTodoRef"
        />
      </header>
      <section class="main" v-show="todosRef.length">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox" 
          v-model="allDoneRef"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            :class="{
              completed: todo.completed,
              editing: todo === editingTodoRef,
            }"
            v-for="todo in filteredTodosRef"
            :key="todo.id"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="remove(todo)"></button>
            </div>
            <input 
              class="edit" 
              type="text"
              v-model="todo.title"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.esc="cancleEdit(todo)"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todosRef.length">
        <span class="todo-count">
          <strong>{{ remainingRef }}</strong>
          <span>item{{ remainingRef === 0 ? "" : "s" }} left</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: optionRef === 'all' }">All</a>
          </li>
          <li>
            <a href="#/active" :class="{ selected: optionRef === 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: optionRef === 'completed' }"
              >Completed</a
            >
          </li>
        </ul>
        <button
          class="clear-completed"
          style="display: none"
          v-show="completedRef"
          @click="removeCompleted"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import usetodoList from "./composition/usetodoList";
import useNewTodo from "./composition/useNewTodo";
import useFilter from "./composition/useFilter";
import useEditTodo from "./composition/useEditTodo";
import useRemoveTodo from './composition/useRemoveTodo';

export default {
  setup() {
    // const todosRef = ref(todoStorage.getList());
    // window.todosRef = todosRef;
    // watchEffect(()=>{
    //   //如果其中的响应式数据有改动，将重新运行该函数。
    //     todoStorage.saveList(todosRef.value);
    // })
    // 上述已使用 composition API 抽离。
    const { todosRef } = usetodoList();
    // const { newTodoRef,addTodo } = useNewTodo(todosRef);
    // console.log(useNewTodo(todosRef));

    return {
      todosRef,
      // newTodoRef,
      // addTodo
      ...useNewTodo(todosRef),
      ...useFilter(todosRef),
      ...useEditTodo(todosRef),
      ...useRemoveTodo(todosRef),
    };
  },
};
</script>
