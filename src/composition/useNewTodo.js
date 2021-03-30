//创建一个新的todo项，在此获得一个包装后的todo

//包装： todo标题，todo id，todo 完成情况


import { generate } from '../util/todoStorage';
import { ref } from 'vue';

//返回新todo 的标题以及一个增加todo的方法。
export default function useNewTodo(todosRef){
    const newTodoRef = ref('');
    //以上变量返回后做双向数据绑定的存储使用。

    /**
     * 新增一个todo，需要传入原toloList
     */
    function addTodo (){
        //获取新增的todo标题
        const value = newTodoRef.value && newTodoRef.value.trim();//去掉首尾空格
        if(!value){
            return ;
        }
        const todo = {
            id: generate(),
            title: value,
            completed: false,
        }
        todosRef.value.push(todo);
        newTodoRef.value = '';
        console.log(todosRef.value);
    }
    return {
        newTodoRef,
        addTodo
    }
}
