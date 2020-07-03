//  节流
export const throttle = function(fn, interval) {
  let _self = fn, timer, firstTime = true;
  return function() {
    let args = arguments, _me = this;
    if (firstTime) {
      console.log(_self)
      _self.apply(_me, args);
      return firstTime = false;
    }
    if (timer) {
      return false;
    }
    timer = setTimeout(function() {
      clearTimeout(timer);
      timer = null;
      _self.apply(_me, args);
    }, interval || 500)
  }
}
//  单例
export const Singleton = function(name) {
  this.name = name;
  this.instance = null;
}
Singleton.prototype.getName = function() {
  alert(this.name);
}
Singleton.getInstance = function(name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
}

//  适配器
//  原来的东西
export class Adaptee {
  specificRequest(option) {
    return {
      url: option.url,
      data: option.data
    }
  };
}
//  通过适配器模式更新一些数据再调用
export class Target {
  constructor() {
    this.adaptee = new Adaptee();
  }
  request(option) {
    let info = this.adaptee.specificRequest(option);
    info.head = option.head;
    return info
  }
}
//  代理模式
const star = {
  name: '小浣熊',
  age: 14,
  phone: '13400000000'
}
export let agent = new Proxy(star, {
  get: function(target, key) {
    if (key === 'phone') {
      return '18600000000'
    }
    if (key === 'price') {
      return 12000
    }
    return target[key]
  },
  set: function(target,key,val) {
    if (key === 'customPrice') {
      if (val < 10000) {
        throw new Error(`价格太低,不考虑`)
      } else if (val >= 10000 && val < 12000) {
        throw new Error(`考虑考虑`)
      } else {
        target[key] = val;
        return true
      }
    }
  }
})
