//设置 todolist 的本地存储 LocalStroage

const LOCAL_KEY = 'todoList';

/**
 * 用于获取所有的todo数组，直接执行
 * [{},{},{}]
 */
export function getList() {
    const result = localStorage.getItem(LOCAL_KEY);
    if (result) {
        //如果存在已经存储的本地todoList，则 将结果转变为 普通数组
        return JSON.parse(result);
    }

    return [];

}
/**
 * @param { array } todos 传入新的任务列表，保存所有任务
 */
export function saveList(todos) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos))
}


/**
 * 执行后获得一个唯一id值，以区分每个todo
 */
export function generate() {
    //采用时间戳+16进制随机数小数点后四位为 ID 值
    return Date.now() + Math.random().toString(16).substr(2, 4);
}

/**
 * 
 * @param {*} todoList todosRef.value
 * @param {*} option options.value or all,active and completed
 * @returns 
 */
export function filter(todoList, option = "all") {
    if (option === "all") {
        return todoList;
    } else if (option === "active") {
        return todoList.filter((item) => !item.completed);
    } else if (option === "completed") {
        return todoList.filter((item) => item.completed);
    } else {
        throw new Error("please choose true option , like : all,active and completed")
    }
}

/**
 * 从列表中删除指定todo
 * @param {*} todosRef 待办列表
 * @param {*} todo 待办Dom
 */
export function removeOne(todosRef, todo) {
    const index = todosRef.value.indexOf(todo);
    console.log('----------');
    if (index >= 0) {
        todosRef.value.splice(index, 1);
    }
}