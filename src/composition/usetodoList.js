import { ref,watchEffect } from 'vue';
import * as todoStorage from '../util/todoStorage' ;

export default function usetodoList(){

    const todosRef = ref(todoStorage.getList());
    // window.todosRef = todosRef;
    watchEffect(()=>{
      //如果其中的响应式数据有改动，将重新运行该函数。
        todoStorage.saveList(todosRef.value);
    })

    return { todosRef }
}