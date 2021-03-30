//用于编辑todo
//全选-全部完成/全部未完成；
//双击某个todo编辑，ESC取消编辑，失去焦点/回车键编辑完成

// 具备控制效果的CSS class ：  editing，正在编辑状态 ， 显示文本框，隐藏todo项

import {
    ref,
    computed
} from 'vue';
import { removeOne } from '../util/todoStorage';

/**
 * 返回全部 完成状态，编辑todo标题
 * @param {*} todosRef 全部todo列表
 */
export default function useEditTodo(todosRef) {
    //预设一个 正在编辑的todo 状态
    const editingTodoRef = ref(null);
    //记录一下编辑之前的值，以便于退出编辑
    let originTitle = null;
    //开始编辑
    const editTodo = (todo) => {
        //该参数由双击dom事件传入，要编辑的todo Dom
        originTitle = todo.title;
        editingTodoRef.value = todo;
    };
    //回车/失焦确认编辑
    const doneEdit = (todo) => {
        const val = todo.title.trim();
        if(val){
            todo.title = val;
        }
        else{
            removeOne(todosRef,todo);
        }
        editingTodoRef.value = null;
    }
    //ESC取消编辑
    const cancleEdit = (todo) => {
        editingTodoRef.value = null;
        todo.title = originTitle;
    }
    //全选按钮控制全部todo状态--根据复选框状态切换
    const allDoneRef = computed({
        get(){
            //判断每一项是否已经完成，如果有一个未完成就返回false
            return todosRef.value.every(item=>item.completed);
        },
        set(checked){
            //进入此项则说明用户点击了复选框
            todosRef.value.forEach(todo => {
                todo.completed = checked
            });
        }
    })
    return {
        editingTodoRef,
        editTodo,
        doneEdit,
        cancleEdit,
        allDoneRef
    }
}