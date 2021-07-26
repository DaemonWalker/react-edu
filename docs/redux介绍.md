# redux介绍

## 简介
Redux 官方文档对 Redux 的定义是：一个可预测的 JavaScript 应用状态管理容器。是一个独立的状态管理库，可配合其它框架使用，比如React。引入Redux主要为了使JavaScript中数据管理的方便，易追踪，避免在大型的JavaScript应用中数据状态的使用混乱情况。Redux 试图让 state 的变化变得可预测，为此做了一些行为限制约定

## 基本概念
* 数据存储 - state
Redux就是用来管理状态数据，所以第一个概念就是状态数据，state就是存放数据的地方，根据应用需要，一般定义成一个对象，比如：
``` js
{
  num: 0,
  showType: 'ALL',
  lastUpdate: '2019-10-30 11:56:11'
}
```

* 行为触发 - action
在web应用中，所有的数据状态变更，都是由一个行为触发的，比如用户点击，网络加载完成，或者定时事件。在简单应用里面，一般都是在行为触发的时候，直接修改对应的数据状态，但是在大型复杂的应用里面，修改同一数据的地方可能很多，每个地方直接修改，会造成数据状态不可维护。Redux引入了action的概念，每个要改变数据状态的行为，都定义成一个action对象，用一个type来标志是什么行为，行为附带的数据，也都直接放在action对象，比如一个用户输入的行为：
``` js
{
    type: 'INPUT_TEXT',
    text: '今天下午6点活动碰头会议'
}
```
然后通过dispatch触发这个action，dispatch(action)

* 行为响应 - reducer
当action触发的时候，肯定要修改state数据，在讲解action的时候有说过，不能直接修改state，我们需要定义一个reducer来修改数据，这个reducer就是一个行为响应函数，他接收当前state，和对应的action对象，根据不同的action，做相应的逻辑判断和数据处理，然后返回一个新的state。注意，一定是返回一个新的state，不能直接修改参数传入的原state，这是redux的原则之一，后面会讲到。
```js
function reducer ( state = [], action ) {
    switch ( action.type ) {
        case 'INPUT_TEXT':
            return [...state, {text: action.text, id: Math.random() }]
        default:
            return state;
    }
}
```

* 数据监听 - subscribe
数据的更新已经在reducer中完成了，在一些响应式的web应用中，我们往往需要监听数据状态的变化，这个时候就可以用subscribe了redux内部保存一个监听队列，listeners，可以调用subscribe来往listeners里面增加新的监听函数，每次reducer修改完state之后，会逐个执行监听函数，而监听函数可以获取已经更新过的state数据了
```js
listeners = [];
subscrible( listener ) {
    listeners.push( listener );
    return function () {
        let index = listeners.index( listener );
        listeners.splice( index, 1 );
    }
}
dispatch( action ) // 触发 action
reducer(state, action)

listeners.map( ( listener ) => {
    listener()
} )

```
## 三大原则
* 单一数据源<br>
整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

* State 是只读的<br>
唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行，因此不用担心竞态条件（race condition）的出现。 Action 就是普通对象而已，因此它们可以被日志打印、序列化、储存、后期调试或测试时回放出来。

* 使用纯函数来执行修改<br>
为了描述 action 如何改变 state tree ，你需要编写 reducers。不能直接操作传入的state，需要把改变的数据以一个新的state方式返回.

> 什么是纯函数？<br>
纯函数是指不依赖于 且 不改变 它作用域之外的变量状态的函数。也就是说，纯函数的返回值只由它调用时的参数决定，它的执行不依赖于系统的状态

## redux 数据流
![redux数据流](https://user-gold-cdn.xitu.io/2019/12/15/16f09a0b5196a2dd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

View
视图层，就是展示给最终用户的效果

Store
 Store 从抽象意义上来说可以看做一个前端的 “数据库”，它保存着前端的状态（state），并且分发这些状View，使得 View 根据这些状态渲染不同的内容。
注意到，Redux 是一个可预测的 JavaScript 应用状态管理容器，这个状态容器就是这里的 Store

Reducers
在 Redux 框架中，Reducers 的作用就是响应不同的动作。更精确地说，Reducers 是负责更新 Store 中状态的 JavaScript 函数。

## Store: 数据的唯一真相来源

Store 在 Redux 中的作用是用来保存状态的，相当于我们在前端建立了一个简单的 ”数据库“
关联组建
![store](https://user-gold-cdn.xitu.io/2019/12/15/16f09bd996745d23?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

嵌套多层组建
![](https://user-gold-cdn.xitu.io/2019/12/15/16f09be8dd8053b5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

更加复杂情况
![](https://user-gold-cdn.xitu.io/2019/12/15/16f09beb5be3d5b4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

Store的出现让我们完全不需要让每个组件单独保持状态，直接抽离所有组件的状态，类比 React 组件树，构造一个中心化的状态树，这棵状态树与 React 组件树一一对应，相当于对 React 组件树进行了状态化建模：
![](https://user-gold-cdn.xitu.io/2019/12/15/16f09bee3f1283fd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
可以看到，我们将组件的 state 去掉，取而代之的是一棵状态树，它是一个普通的 JavaScript 对象。通过对象的嵌套来类比组件的嵌套组合，这棵由 JavaScript 对象建模的状态树就是 Redux 中的 Store。
当我们将组件的状态抽离出去之后，我们在使用组件 B 操作组件 C 就变得相当简单且高效。

![](https://user-gold-cdn.xitu.io/2019/12/15/16f09bf051ebff69?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


## Action: 改变 State 的唯一手段
![](https://user-gold-cdn.xitu.io/2019/12/15/16f09c46a41fe63e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

在 Redux 的概念术语中，更新 Store 的状态有且仅有一种方式：那就是调用 dispatch 函数，传递一个 action 给这个函数 。
一个 Action 就是一个简单的 JavaScript 对象：
```js
{ type: 'ADD_TODO', text: '我是一只小小小图雀' }
```

## Reducers: 响应 Action 的指令

![](https://user-gold-cdn.xitu.io/2019/12/15/16f09c0648e65dd6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

纯化的 Reducers
reducer 是一个普通的 JavaScript 函数，它接收两个参数：state 和 action，前者为 Store 中存储的那棵 JavaScript 对象状态树，后者即为我们在组件中 dispatch 的那个 Action。
```js
reducer(state, action) {
  // 对 state 进行操作
  return newState;
}
```
reducer 根据 action 的指示，对 state 进行对应的操作，然后返回操作后的 state，Redux Store 会自动保存这份新的 state。
>注意<br>
Redux 官方社区对 reducer 的约定是一个纯函数，即我们不能直接修改 state ，而是可以使用 {...} 等对象解构手段返回一个被修改后的新 state。
比如我们对 state = { a: 1, b: 2 }  进行修改，将 a 替换成 3，我们应该这么做：newState = { ...state, a: 3 }，而不应该 state.a = 3。 这种不直接修改原对象，而是返回一个新对象的修改，我们称之为 “纯化” 的修改。
