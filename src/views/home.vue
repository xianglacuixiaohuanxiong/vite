<template>
  <div class="main">
    <div v-for="(item, index) in 4" :key="index" class="grid-center">
      <div :id="'box'+ index">{{ item }}</div>
      <code :refs="'box'+index"></code>
    </div>
  </div>
  <button ref="lightBtn" class="button" hidden="">按钮</button>
</template>

<script>
  const isElementNotInViewport = function(el) {
    let rect = el.getBoundingClientRect();
    return (rect.top >= (window.innerHeight || document.documentElement.clientHeight) || rect.bottom <= 0);
  };
  export default {
    data() {
      return {
        isFixed: false,
        list: []
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.handleViewPort();
        window.onscroll = this.debounce(this.handleScroll, 500)
      })
    },
    methods: {
      //  计算元素距离顶部的位置
      handleViewPort() {
        const list = document.getElementsByTagName('code');
        let lists = [];
        for (let i = 0; i < list.length; i++) {
          let item = {};
          item.id = i;
          item.yuansu = list[i].offsetTop;
          lists.push(item)
        }
        this.list = lists;
      },
      //  方法
      handleScroll() {
        //  执行间隔为两秒.
        //  获取可视窗口的大小
        const viewport = window.innerHeight || document.documentElement.clientHeight;
        //  通过可视窗口的大小计算出元素和滚动条相差的位置
        const list = this.list.map(v => {
          let item = { ...v };
          item.yuansu = item.yuansu - viewport;
          return item
        })
        //  筛选出没用看过的日志,拿出来进行判断
        const unread = list.filter(v => !v.read)
        //  获取当前滚动条所在的位置
        const scoll = document.documentElement.scrollTop || document.body.scrollTop;
        //  如果有没看的日志再执行
        if (unread.length) {
          //  找出和当前滚动条最接近的元素
          const recent = this.findCloseNum(unread, scoll, 'yuansu');
          if (scoll >= recent.yuansu) {
            console.log(`阅读了日志${recent.id}`);
            this.list[recent.id]['read'] = true;
          } else {
            console.log(`还没看到该日志${recent.id}`)
          }
        }
        // const isAjax = scoll > ;
        //  将未读的数据显示出来
        // console.log(unread)
        // console.log(scoll)
        // console.log(viewport)
        // if (viewport >= )
      },
      //  防抖
      debounce(fn, delay) {
        let timer = null;
        return (...args) => {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            fn.apply(this, args)
          }, delay)
        }
      },
      //  找出与目标值最接近的
      findCloseNum(arr, num, key) {
        let index = 0; // 保存最接近数值在数组中的索引
        let d_value = Number.MAX_VALUE; // 保存差值绝对值，默认为最大数值
        for (let i = 0; i < arr.length; i++) {
          let new_d_value = Math.abs(arr[i][key] - num); // 新差值
          if (new_d_value <= d_value) { // 如果新差值绝对值小于等于旧差值绝对值，保存新差值绝对值和索引
            if (new_d_value === d_value && arr[i][key] < arr[index][key]) { // 如果数组中两个数值跟目标数值差值一样，取大
              continue;
            }
            index = i;
            d_value = new_d_value;
          }
        }
        return arr[index] // 返回最接近的数值
      }
    }
  };
</script>

<style>
  .main {
    height: 5000px;
    display: grid;
    grid-template-rows: repeat(4, 1fr);

  }
  .grid-center {
    align-self: center;
  }

  .button {
    position: fixed;
    bottom: 50px;
  }
</style>
