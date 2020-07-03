<template>
  <h1>{{ msg }}</h1>
  <button @click="handleCount">count is: {{ count }}</button>
  <button @click="createLoading">创建单例弹窗</button>
  <button @click="request">适配器</button>
  <button @click="handleProxy">代理</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script>
import { throttle, Singleton, Adaptee, Target, agent } from '/uilts/ulit';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0,
      customPrice: 9000
    }
  },
  mounted() {
    const that = this;
    window.onresize = throttle(function(){
      console.log(`一秒才能点一次!!`)
      that.count++
    }, 500 );
  },
  methods: {
    handleCount() {
      this.count++
    },
    //  单例
    createLoading() {
      const a = Singleton.getInstance('sven1').getName();
      const b = Singleton.getInstance('sven2').getName();
      console.log(a === b)
    },
    //  适配器
    request() {
      let adaptee = new Adaptee();
      let target = new Target();
      const option = {
        url: '/url',
        data: 123,
        head: 'tou'
      }
      console.log(`原:`, adaptee.specificRequest(option))
      console.log(`新:`, target.request(option))
    },
    //  代理
    handleProxy() {
      console.log(`出价:${this.customPrice}`)
      try {
        console.log(`名称: ${agent.name}  年龄: ${agent.age} 手机号: ${agent.phone} 价格:${agent.price}`);
        agent.customPrice = this.customPrice;
        console.log(`结果: ${agent.customPrice >= agent.price ? '可以合作' : '考虑考虑'}`)
      } catch (e) {
        console.log(e.message)
        this.customPrice += 1000;
      }
    }
  }
}
</script>
