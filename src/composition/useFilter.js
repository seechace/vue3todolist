//负责控制筛选功能
//利用Hash值的改变来判断filter的选项

//挂载时机需要用到生命周期函数
import {
    ref,
    onMounted,
    onUnmounted,
    computed
} from 'vue';
import {
    filter
} from '../util/todoStorage';

//允许的hash值
const allowedHash = ["all", "active", "completed"]

/**
 * 根据hash值来改变过滤条件，完成筛选
 * @param {*} todosRef 全部的todo
 */
export default function useFilter(todosRef) {
    //初始过滤条件选项为 all
    const optionRef = ref('all');



    function onhashchange() {
        //获取hash值

        const hash = location.hash.replace(/#\/?/, "");

        //判断hash是否合规
        if (allowedHash.includes(hash)) {
            //如果合规
            optionRef.value = hash;
        } else {
            location.hash = "";
            optionRef.value = "all";
        }
    }

    //挂载hash改变事件
    onMounted(() => {
        location.hash = "all";//在每次页面刷新时强制修改url避免由于历史记录中hash值不改变但页面刷新了切换到其他fliter的bug
        window.addEventListener('hashchange', onhashchange);
    });
    onUnmounted(() => {
        window.removeEventListener('hashchange', onhashchange);
    });

    //计算过滤后的todo
    const filteredTodosRef = computed(() => {
        return filter(todosRef.value, optionRef.value);
    })
    //计算正在进行的todo个数
    const remainingRef = computed(()=>{
        return filter(todosRef.value, "active").length;
    })
    //计算已完成的todo个数
    const completedRef = computed(()=>{
        return filter(todosRef.value, "completed").length;
    })

    return {
        optionRef,
        filteredTodosRef,
        remainingRef,
        completedRef
    }
}