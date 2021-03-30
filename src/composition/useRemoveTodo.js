//删除指定项或者当前整个已完成列表
import {
    removeOne
} from '../util/todoStorage';

export default function useRemoveTodo(todosRef) {
    const remove = (todo) => {
        removeOne(todosRef, todo);
    };
    const removeCompleted = () => {
        todosRef.value = todosRef.value.filter((todo)=>{
            return !todo.completed;
        })
    };
    return {
        remove,
        removeCompleted,
    }
};