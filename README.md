# 环境准备

+ 安装Node.js
+ 安装VisualStudio Code/WebStorm

# 建立一个React项目

## 普通模板

```bash
npx create-react-app my-app
cd my-app
npm start
```

> 这里面使用的是npx而并不是npm

## TypeScript模板

> ts简介

```
npx create-react-app my-app-ts --template typescript
cd my-app-ts
npm start
```

# React UI库

+ Antd
+ Material Design
+ Semantic UI

# 编写我们的第一个控件

## JSX

### JSX是什么

> JSX是一种JavaScript的语法扩展，运用于React架构中，其格式比较像是模版语言，但事实上完全是在JavaScript内部实现的。元素是构成React应用的最小单位，JSX就是用来声明React当中的元素，React使用JSX来描述用户界面。
> ——摘自百度百科

其实他类似于JSP或者Asp.Net MVC，**本质是利用JS拼接Html**

所以在写页面之前可以先想一下这个页面如果单纯用html去写，代码大概是什么的样子的
然后在根据哪些地方需要变化来进行编写代码

### 返回形式

**返回值一定只有一个父节点！**

#### 合法

```javascript
function foo(){
	return (<></>);
}
function foo(){
	return (<div></div>);
}
```

#### 非法

```javascript
function foo(){
	return (<div></div><div></div>);
}
```

#### 修改

```javascript
function foo(){
	return (
        <>
			<div></div><div></div>
    	</>
    );
}
```



## 函数组件

### 最简单的方式

```typescript
import { FC } from 'react';
export const FormLogin: FC = () => {
    return (<></>);
}
```

注：FC是FunctionComponent的缩写，反之，可以使用```import { FunctionComponent } from 'react';```

## 带有参数的控件

### 定义参数

首先我们需要定义一个接口用于声明我们需要的参数列表，例如下面我们就定义了一个接口，里面包含了我们可能需要的参数

```typescript
interface IProps {
    action: string;
    name: string;
}
```

### 修改方法签名

首先修改FC的泛型 ```FC```==>```FC<IProps>```

之后在参数列表中加入我们需要的参数，我们定义在IProps中的属性可以不全写入参数列表中

> children是我们控件的子项，类似于```<div>children</div>```

```typescript
export const FormLogin: FC<IProps> = ({ name, children }) => {}
```

下面是完整的变化

```typescript
import { FC } from 'react';
interface IProps {
    action: string;
    name: string;
}

export const FormLogin: FC<IProps> = ({ name, children }) => {
    return (
        <div>
            <input name={name} type="text"></input>
            {children}
        </div>
    );
}
```

## class控件

## 还是最原始的方式

```typescript
import React from 'react';
export class Login extends React.Component {
    render() {
        return (<></>);
    }
}
```

> 和函数式的区别是，这里面用```render()```返回JSX

## 如何传参？

### 还是先定义一个参数集合

```typescript
interface IProps {
    action: string;
    name: string;
}
```

然后为继承的`React.Component`添加泛型参数即可
修改后的效果如下`export class Login extends React.Component<IProps>`

完整代码

```typescript
import React from 'react';

interface IProps {
    name: string;
    action: string;
}

export class Login extends React.Component<IProps> {
    render() {
        return (<></>);
    }
}
```

# 引用控件
## 使用Lambda表达式简化方法

如果我们的方法只有一个语句，那么我们可以使用Lambda表达式来进行简化

原方法

```typescript
function foo() {
	reutrn "1"
}
```

简化后

```typescript
function foo() => "1"
```

## 所以该如何引用

我们现有如下文件结构

```bash
src
└─components
	└─FormLogin.tsx
└─pages
	└─Login.tsx
```

现在我们需要在Login.tsx里面引用FormLogin.tsx

```tsx
import React, { FC } from 'react';
import { FormLogin } from '../components/formLogin';

export const Login: FC = () =>
    (<FormLogin action="/login" name="login"></FormLogin>);
```

+ 任何页面都可以理解成为一个component，所以我们要新建一个component
+ import我们需要引用的子组件
+ 使用`<组件名></组件名>`来进行调用，注意**一定要给所有子组件的属性赋值**，否则编译会报错

# 组件的State

## State声明

### 函数组件

首先声明一个接口，里面是我们要控制的属性

```typescript
interface IState {
    num: number;
}
```

然后在方法开始使用`useState`进行声明

```tsx
import { FC, MouseEvent, useState } from 'react';
export const FCButton: FC = () => {

	// 通过这里声明
    const [state, setstate] = useState<IState>({ num: 0 })
	
    let clickFoo = (e: MouseEvent<HTMLInputElement>) => {
        setstate({
            num: state.num + 1
        });
        e.preventDefault();
    }
    
    // 通过这里使用
    return (
        <input type="button" value={state.num} onClick={clickFoo} />
    );
}
interface IState {
    num: number;
}
```

### class组件

同样先声明属性

```typescript
interface IState {
    num: number;
}
```

和参数不同的是，这次我们把`IState`写进`React.Component`的泛型中

```tsx
import React, { MouseEvent } from 'react';

// 通过这里声明
export class ClassButton extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            num: 0
        }
        this.clickFoo = this.clickFoo.bind(this);
    }
    render() {
        return (
            // 这次多了this.
            <input type="button" onClick={this.clickFoo} value={this.state.num} />
        )
    }
    clickFoo(e: MouseEvent<HTMLInputElement>) {
        this.setState({
            num: this.state.num + 1
        })
        e.preventDefault();
    }
}

interface IProps { }
interface IState {
    num: number;
}
```

## 改变State的值

State和Props不同，State是组件内部的属性，和外界无关。~~每次State变化都有可能触发界面刷新~~

还有很重要的一点——**在构造函数之外的方法中，如果要更改State的值，请通过SetState方法，而不是直接赋值**

正确方法

```tsx
this.setState({ name : "name" })
```

错误方法（~~事实上这么写会报错~~）

```tsx
this.state.name = "name"
```

#### class组件和函数组件的区别

假如我们有如下state定义

```typescript
interface IState {
    name: string;
    area: string;
    comment: string;
}
```

如果我们要修改`name`的值

##### class组件

```tsx
this.setState({
    name: '123'
})
```

##### 函数组件

```tsx
setState({
    ...state,
    name: 'value',
})
```

**函数组件必须对于整个state重新赋值，但是class组件不需要**

# React的事件

## 和普通HTML的区别

### 定义

Html

```html
<input type="button" onclick="clickFoo()" value="button"/>
```

React

```tsx
<SimpleButton onClick={clickFoo}>button</SimpleButton>
```

### 阻止冒泡

与普通Html不同，React中我们必须手动调用```preventDefault```方法阻止冒泡

Html

```html
<input type="button" onclick="doSomething();return false;" value="button"/>
```

React

```tsx
let clickFoo = (e: MouseEvent<HTMLInputElement>) => {
    doSomething();
    e.preventDefault();
}
```

## React事件绑定

### 函数组件

函数式组件比较简单，不用考虑this的问题

```tsx
import React, { MouseEvent } from 'react';

export class ClassButton extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            num: 0
        }
        this.clickFoo = this.clickFoo.bind(this);
    }
    render() {
        return (
            <input type="button" onClick={this.clickFoo} value={this.state.num} />
        )
    }
    clickFoo(e: MouseEvent<HTMLInputElement>) {
        this.setState({
            num: this.state.num + 1
        })
        e.preventDefault();
    }
}

interface IProps { }
interface IState {
    num: number;
}
```

### class组件

#### 传统方法

现React通过两步来在组件中访问`this`

1. 在构造函数中使用bind
2. 对onClick进行绑定

```tsx
import React, { MouseEvent } from 'react';

export class ClassButton extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            num: 0
        }
        // 一定要添加这一行，否则在clickFoo中this会是undefined
        this.clickFoo = this.clickFoo.bind(this);
    }
    render() {
        return (
            <input type="button" onClick={this.clickFoo} value={this.state.num} />
        )
    }
    clickFoo(e: MouseEvent<HTMLInputElement>) {
        // 这样this.setState()可以正常工作
        this.setState({
            num: this.state.num + 1
        })
        e.preventDefault();
    }
}
```

### 实验性语法

我们可以把一个Lambda表达式付给一个变量，这样在这个lambda表达式中可以直接访问this`

```tsx
import React, { MouseEvent } from 'react';

export class ClassButtonNew extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            num: 0
        }
    }
    render() {
        return (
            <input type="button" onClick={this.clickFoo} value={this.state.num} />
        )
    }
    
    // 我们直接把原clickFoo方法转换为lambda表达式，这样省去绑定的过程
    clickFoo = (e: MouseEvent<HTMLInputElement>) => {
        this.setState({
            num: this.state.num + 1
        })
        e.preventDefault();
    }
}

interface IProps { }
interface IState {
    num: number;
}
```

# 条件渲染

字面理解就是根据不同的状态渲染不同的内容

## 在代码中用使用if

因为我们在`render`方法或者函数组件中，可以预先根据`props`等元素的值计算出我们相应的结果

下面举一个栗子，根据我们传入的num显示不同的内容

```tsx
interface IProps {
    num: number;
}

export class ClassOddOrEven extends React.Component<IProps>{
    render() {
        let message = "";
        if (this.props.num % 2 === 0) {
            message = `${this.props.num} is an even number`;
        }
        else {
            message = `${this.props.num} is an odd number`;
        }
        return (
            <label>{message}</label>
        )
    }
}
```

## 在JSX中使用&&或者问号表达式

### &&运算符

类似于在JS中在使用&&进行bool逻辑运算时，如果第一个值为false，那么程序将跳过后面的表达式，直接放回false
这里面我们就使用了这个性质

下面的例子，如果isLogin为true，我们返回"您已经登录的"label，反之为空

```tsx
import { FC } from "react";
interface IProps {
    isLogin: boolean
}
export const FCIsLogin: FC<IProps> = ({ isLogin }) => {
    return (
        <>
            {isLogin && <label>您已经登录</label>}
        </>
    );
}
```

### 问号表达式

#### 问号表达式语法

```c#
表达式 ? 表达式为true执行 : 表达式为false执行;
foo() ? ifFooIsTrue() : isFooIsFalse();
```

#### 在JSX中使用

记住我们使用问号表达式的地方需要用大括号包裹就好

```tsx
import { FC } from "react";

interface IProps {
    num: number;
}

export const FCOddOrEven: FC<IProps> = ({ num }) => {
    return (
        <>
            {
                num % 2 === 0 ?
                    <label>{num} is an even number</label> :
                    <label>{num} is an odd number</label>
            }
        </>
    )
}
```

#### 其他作用

问号表达式同样可以用来判断state对象的状态

例如我们在打开一个页面的时候需要请求后台，这个时候state对象是空或者没有内容，如果直接显示一个空页面会造成客户体验很差
这个时候我们就可以判断state对象的内容，如果为空则显示loading动画，如果不为空则显示内容

# 列表和Key

在代码中我们经常遇到需要循环的地方，例如根据一个数组去生成列表，table，重复调用组件等等

## map

js中的map，通常是用于把一个数组中的元素转化成另外一个元素，用法大致如下

```javascript
let nums = [1, 2, 3, 4, 5]
let strs = nums.map(n => n.toString())
```

这样我们就把一个数字的数组转化成了一个字符串数组

## 在JSX中使用

和上面类似，我们可以理解为生成的对象是一个html组件

#### 列表

列表中有一个总的`<ol>`元素和若干个`<li>`子元素，因为子元素的个数取决于我们的数组，所以我们循环的对象就是生成`<li>`

```tsx
import React from "react";

interface IProps {
    infos: string[]
}

export class ClassMapToLi extends React.Component<IProps>{
    render() {
        return (<ol>
            {this.props.infos.map(info => <li key={info}>{info}</li>)}
        </ol>);
    }
}
```

### Table

同理，在table中`<thead>`都是固定的，所以我们可以用html直接写`<thead>`的内容，然后循环`<tbody>`中的`<tr>`

```tsx
import { Table } from "antd";
import { FC } from "react";

interface Info {
    name: string;
    email: string;
}

interface IProps {
    infos: Info[];
}

export const FCMapToTable: FC<IProps> = ({ infos }) => {
    return (
        <Table>
            <thead>
                <tr><th>name</th><th>email</th></tr>
                {
                    infos.map(item =>
                        <tr key={item.email}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                        </tr>
                    )
                }
            </thead>
        </Table>
    )
}
```

## Key

我们发现在上面的循环中我们加入了key

> key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。
>
> ——摘自React中文网

### 使用

最简单粗暴的理解就是，在我们上面的map方法中，给每个顶级元素加一个key就可以

```tsx
// 正确
infos.map(item =>
    <tr key={item.email}>
        <td>{item.name}</td>
        <td>{item.email}</td>
    </tr>
          
// 错误
infos.map(item =>
    <tr>
        <td key={item.name}>{item.name}</td>
        <td key={item.email}>{item.email}</td>
    </tr>
```

### 其他限制

+ 在一个map中，key必须是唯一的，所以对于全局而言，key可以重复
+ key的类型有string和number
+ 当我们使用数组的index作为key时，一定要保证数组的顺序不会改变，否则会对性能造成影响[参考React的协调](https://react.docschina.org/docs/reconciliation.html#recursing-on-children)

# 表单

React中表单组件分为`受控组件`和`非受控组件`，这里面只介绍受控组件

## 使用State

在上文曾经说过，props是外界传入组件的值，State是组件内部的值，所以我们在使用表单的时候要使用State来存储表单值

和`MVVM`不同，由于State只能通过SetState来设置值，这让组件绑定变得有些麻烦

## 绑定组件

可以简单理解为两步

1. 给组件的value设置为我们想要取值的State
2. 绑定组件的`OnChange`方法，并在方法内部通过`SetState`进行设置值

举个🌰

```tsx
import React, { ChangeEvent } from "react";

interface IProps { }
interface IState {
    name: string;
    area: string;
    comment: string;
}

export class ClassFormSimple extends React.Component<IProps, IState>{
    setName = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: e.target.value
        })
    }

    setArea = (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            area: e.target.value
        })
    }

    setComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            comment: e.target.value
        })
    }

    render() {
        return (
            <form>
                <input type="text" value={this.state.name} onChange={this.setName} />
                <select value={this.state.area} onChange={this.setArea}>
                    <option>中山区</option>
                    <option>沙河口区</option>
                    <option>西岗区</option>
                    <option>甘井子区</option>
                </select>
                <textarea value={this.state.comment} onChange={this.setComment}></textarea>
            </form>
        )
    }
}
```

## 公用方法

上面的例子中，`setName`方法中调用`setState`方法，固定修改`name`字段的值，这样我们就得为每一个字段写一个`onChange`方法

我们可以使用下面的方法来实现对一类控件`onChange`事件的处理

```tsx
import { ChangeEvent, FC, useState } from "react";

interface IState {
    name: string;
    email: string;
    address: string;
}

export const FCFormRegister: FC = () => {
    const [state, setState] = useState<IState>({
        name: "",
        email: "",
        address: ""
    });

    let txtChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setState({
            ...state,
            [name]: value,
        })
    }

    return (
        <form>
            <input type="text" value={state.name} onChange={txtChange}></input>
            <input type="text" value={state.email} onChange={txtChange}></input>
            <input type="text" value={state.address} onChange={txtChange}></input>
        </form >
    );
}
```

# 生命周期简述

## constructor

顾名思义，构造函数

## componentDidMount

类似与`JQuery`里面的`$(document).ready(fuction())`，页面显示后调用的事件，推荐在这里加载数据

## componentWillUnmount

页面被销毁时调用的方法，用于清理用，比如页面上加载了定时器，在这个事件里面我们可以解除定时器

# react-router
![router history 核心流程](https://www.zoo.team/images/upload/upload_fc4d71102131b3c8094572ecd4641111.jpg)
## router和route
react-router主要是用于Url跳转，其核心概念即为Router和Route。

Router相当于一个容器，用于包裹Route，一个Route即为一个Url。Route里面会包裹一个组件。当在浏览器里输入Url时，就会跳转到相应的Route并显示相关组件。<br>
一个Router里面可以包含多个Route的伪代码为：
```
<Router>
  <div>
      <Route />
      <Route />
      <Route />
  </div
<Router>
```
> Router要求子组件只能有一个。

Router和History有三个种类型：
* HashHistory和HashRouter
* BrowerHistory和BrowerRouter
* createMemoryHistory和MemoryRouter

BrowerHistory和HashHistory主要区别在于Url格式：

使用hashHistory,浏览器的url是这样的：/#/user/liuna?_k=adseis
使用browserHistory,浏览器的url是这样的：/user/liuna

这样看起来当然是browerHistory更好一些，但是它需要server端支持。

使用hashHistory时，因为有 # 的存在，浏览器不会发送request，react-router 自己根据 url 去 render 相应的模块。



* hashroter
一个`<Router>`使用该URL（即哈希部分window.location.hash），以确保URL与页面UI保持同步。
并且官网推荐使用`<BrowserHistory>`

> IMPORTANT NOTE: Hash history does not support location.key or location.state. In previous versions we attempted to shim the behavior but there were edge-cases we couldn’t solve. Any code or plugin that needs this behavior won’t work. As this technique is only intended to support legacy browsers, we encourage you to configure your server to work with <BrowserHistory> instead.

eg:
```js
<HashRouter
  basename={optionalString}
  getUserConfirmation={optionalFunc}
  hashType={optionalString}
>
  <App />
</HashRouter>

```

### 为什么react-router的官方文档推荐使用browserHistory？
首先 browserHistory 其实使用的是 HTML5 的 History API，浏览器提供相应的接口来修改浏览器的历史记录；而 hashHistory 是通过改变地址后面的 hash 来改变浏览器的历史记录；

History API 提供了 pushState() 和 replaceState() 方法来增加或替换历史记录。而 hash 没有相应的方法，hash 仅仅是通过使用hashchange方法来监听hash的变化，所以并没有替换历史记录的功能。

另一个原因是 hash 部分并不会被浏览器发送到服务端，也就是说不管是请求 http://domain.com/index.html#foo 还是 http://domain.com/index.html#bar ，服务只知道请求了 index.html 并不知道 hash 部分的细节。而 History API 需要服务端支持，这样服务端能获取请求细节。

*BrowserRouter
基于H5 History接口的路由
eg
``` jsx
<BrowserRouter
  basename={optionalString}    
  forceRefresh={optionalBool}   
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}  
>
  <App />
</BrowserRouter>
```

* Link
声明式路由组件
``` jsx
<Link to="/about">About</Link>
```
* to 导向哪个路由，可以为字符串，也可以为一个对象或者函数
``` jsx
<Link to="/courses?sort=name" />

<Link
   to={{
     pathname: "/courses",    // 路径
     search: "?sort=name",  // 查询参数
     hash: "#the-hash",   // hash值
     state: { fromDashboard: true }  // 持久化到location的状态数据
   }}
 />
```
一个函数，当前位置作为参数传递给它，并且应该以字符串或对象的形式返回位置表示
```jsx
<Link to={location => ({ ...location, pathname: "/courses" })} />

<Link to={location => `${location.pathname}?sort=name`} />
```
其他可用属性

* replace: 当为true时，单击该链接将替换历史堆栈中的当前条目，而不是添加一个新条目。
* innerRef 值为函数
```jsx
<Link
  to="/"
  innerRef={node => {
    // node指向挂载的dom元素, 卸载时候为null
  }}
/>
```
值为Ref对象
```jsx
let anchorRef = React.createRef()

<Link to="/" innerRef={anchorRef} />
```
* component 定制化自己的导航组件
```jsx
const FancyLink = React.forwardRef((props, ref) => (
  <a ref={ref} {...props}>  {props.children}</a>
))

<Link to="/" component={FancyLink} />

```

* NavLink
是 Link 的一个特殊版本，当呈现的元素与当前URL匹配时，它将向该元素添加样式属性。

activeClassName 当元素处于active状态时，类将提供该class。默认的给定class是active。这将与className样式叠加

activeStyle 内嵌方式声明active状态样式

exact 布尔类型， 为true是路径完全匹配才会添加active class

strict 路径匹配是否严格， 为true的话结尾的斜杠会被考虑

isActive函数， 可以自定义active class添加逻辑

```jsx
<NavLink
  to="/events/123"
  isActive={(match, location) => {
    if (!match) {
      return false;
    }

    // only consider an event active if its event id is an odd number
    const eventID = parseInt(match.params.eventID);
    return !isNaN(eventID) && eventID % 2 === 1;
  }}
>
  Event 123
</NavLink>
```

* Redirect
重定向
```jsx
<Route exact path="/">
  {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
</Route>
```
to也可以为对象
```jsx
<Redirect
  to={{
    pathname: "/login",
    search: "?utm=your+face",
    state: { referrer: currentLocation }
  }}
/>
```
push属性: 当为真时，重定向将把一个新的条目推送到历史中，而不是取代当前的条目。 from属性: 要重定向的路径名。路径-regexp@^1.7.0能够理解的任何有效URL路径。在to中为模式提供了所有匹配的URL参数。必须包含to中使用的所有参数。不被to使用的其他参数将被忽略。
```jsx
<Switch>
  <Redirect from="/old-path" to="/new-path" />
  <Route path="/new-path">
    <Place />
  </Route>
</Switch>

// Redirect with matched parameters
<Switch>
  <Redirect from="/users/:id" to="/users/profile/:id" />
  <Route path="/users/profile/:id">
    <Profile />
  </Route>
</Switch>
```
exact属性， 路径是否完全匹配
strict属性： 路径匹配是否严格，区分斜杠
sensitive属性: 路径匹配是否大小写敏感

* route
path（string）: 路由匹配路径。（没有path属性的Route 总是会 匹配）；
exact（bool）：为true时，则要求路径与location.pathname必须完全匹配；
strict（bool）：true的时候，有结尾斜线的路径只能匹配有斜线的location.pathname；

``` js
<Router>
  <div>
    <Route exact path="/" component={Home}/>
    <Route path="/news" component={NewsFeed}/>
  </div>
</Router>

// 如果应用的地址是/,那么相应的UI会类似这个样子：
<div>
  <Home/>
</div>

// 如果应用的地址是/news,那么相应的UI就会成为这个样子：
<div>
  <NewsFeed/>
</div>
```

* Switch
* 使用场景: 只要有一个 `path`匹配上了对应的组件, 后续就不会再进行匹配了
* 我们来看下面的路由规则：
  * 当我们匹配到某一个路径时，我们会发现有一些问题
  * 比如 /about 路径匹配到的同时，/:userid也被匹配到了，并且最后的一个NoMatch组件总是被匹配到
  ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/741d953942e14e3787c7353fbfa79f70~tplv-k3u1fbpfcp-zoom-1.image)

* 原因是什么呢？默认情况下，react-router中只要是路径被匹配到的Route对应的组件「都会被渲染」

  * 但是实际开发中, 我们希望有一种排他的思想
  * 只要匹配到了第一个, 后面就不应该继续匹配了
  * 这个时候我们可以使用Switch来将所有Route组件进行包裹
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ed2ff8df0a4438c9de616e3e34f1126~tplv-k3u1fbpfcp-zoom-1.image)

# Redux

# Fetch & Axios

如果熟悉JQuery，可能会了解，如果我们需要请求API数据，可以使用`$.Ajax`，在React中，我们可以是用`fetch`和`axios`库向后台请求数据

## Fetch

> Fetch API 提供了一个获取资源的接口（包括跨域请求）提供了对 Request 和 Response （以及其他与网络请求有关的）对象的通用定义。使之今后可以被使用到更多地应用场景中：无论是 service worker、Cache API、又或者是其他处理请求和响应的方式，甚至是任何一种需要你自己在程序中生成响应的方式。
>
> 它同时还为有关联性的概念，例如CORS和HTTP原生头信息，提供一种新的定义，取代它们原来那种分离的定义。
>
> 发送请求或者获取资源，需要使用 WindowOrWorkerGlobalScope.fetch() 方法。它在很多接口中都被实现了，更具体地说，是在 Window 和 WorkerGlobalScope 接口上。因此在几乎所有环境中都可以用这个方法获取到资源。

fetch 是浏览器自带的，所以不需要引用任何包

### Get

```typescript
function get() {
    fetch('www.baidu.com').then(res => console.log(res));
}
```

#### 如果有参数，并且返回的是json

假定我们的接口大概会返回

```json
{
	"errno": 2
}
```

然后我们可以通过如下方式去获取数据

```typescript
function getParamInUrl() {
    fetch('http://baike.baidu.com/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key=csgo&bk_length=600').then(res => res.json()).then(json => console.log(json));
}

function getParamInParam() {
    let url = new URL("http://baike.baidu.com/api/openapi/BaikeLemmaCardApi");
    var params = [["scope", "103"], ["format", "json"], ["appid", "379020"], ["bk_key", "csgo"], ["bk_length", "600"]];
    url.search = new URLSearchParams(params).toString();

    fetch(url.toString()).then(res => res.json()).then(json => console.log(json));
}
```

## Post

这个算是比较完整的fetch使用方法

```typescript
function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    })
        .then(response => response.json()) // parses response to JSON
}
```



## axios

> Axios 是一个基于 promise 网络请求库，作用于node.js 和浏览器中。 它是 isomorphic 的(即同一套代码可以运行在浏览器和node.js中)。在服务端它使用原生 node.js http 模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests。

他和fetch的区别是：fetch只适用于现代浏览器，对于IE这种上古神兽比较无奈。但是axios对于各种浏览器的支持比较好，同时它还可以用于node.js的开发，但是fetch就不行

### Get

```typescript
const axios = require('axios');

// 向给定ID的用户发起请求
axios.get('/user?ID=12345')
    .then(function (response) {
        // 处理成功情况
        console.log(response);
    })
    .catch(function (error) {
        // 处理错误情况
        console.log(error);
    })
    .then(function () {
        // 总是会执行
    });

// 上述请求也可以按以下方式完成（可选）
axios.get('/user', {
    params: {
        ID: 12345
    }
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // 总是会执行
    });

// 支持async/await用法
async function getUser() {
    try {
        const response = await axios.get('/user?ID=12345');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

```



# 异步方法

## Promise

如果我们看一下fetch或者axios的返回值会发现他们都会返回一个Promise，这代表这个方法是个异步方法。

## 异步和同步

>同步：发送方发出数据后，等接收方发回响应以后才发下一个数据包的通讯方式 
>
>异步：发送方发出数据后，不等接收方发回响应，接着发送下一个数据包

比如说我们有如下的代码

```typescript
function foo() {
    bar();
    console.log("foo");
}

function bar() {
    console.log("bar");
}
```

因为两个方法是同步的执行的，所以输出就是 bar foo

如果说我们把`bar`方法改成异步的

```typescript
function foo() {
    bar();
    console.log("foo");
}

async function bar() {
    await new Promise(resolve => {
        setTimeout(resolve, 1000);
    });
    console.log("bar");
}
```

由于我们的`bar`方法是一个异步方法，我们不会等待这个方法执行完，而是开始执行下面的`console.log`

所以结果就是bar foo

### Promise.then

字面意思就是当Promise执行完的回调方法，我们要在Promise之后做的事情都可以写在then里面

```typescript
function foo() {
    bar().then(
        () => console.log("foo")
    );
    console.log("foo done");
}

function bar() {
    return new Promise(resolve => {
        console.log("bar");
        resolve();
    });
}
```

这样的话输出结果就变成了

```
bar
foo done
foo
```

bar 和 foo按照我们约定的顺序输出

### async await

除了使用Promise.then之外，我们还有一种把异步方法变成同步的方法

```typescript
async function foo() {
    await bar()
    console.log("foo");
    console.log("foo done");
}

async function bar() {
    await new Promise(resolve => {
        console.log("bar");
        resolve();
    });

```
我们观察一下输出结果

```
bar
foo
foo done
```

这样的话输出结果仍然是`bar` `foo`，但是我们可以发现```foo done```的位置变化了

> **注意：async表示这个方法里面可能会用到await，所以说一个方法有async并不代表他里面会有await，但是反过来，如果想在方法体里面使用await，那么一定要给方法标记为async**

### 异步变同步带来的问题

就像我们上面说明同步方法和异步方法的区别，同步方法会阻塞方法继续执行，而异步方法不会.假如我们有一个方法需要调用接口

用`Promise.then`我们会这样写

```typescript
function foo() {
	fetch('api').then(res=>console.log(res))
}
```

而用async和await

```typescript
async function foo() {
    let res = await fetch('api');
    console.log(res);
}
```

变成同步的后果是整个函数执行时间变长
`Promise.then`的方式我们不需要等待API返回结果整个方法就可以结束
但是如说我们使用同步的方式，那么我们就必须等待API有返回值才可以

### 常见错误举例

```typescript
function foo() {
    let msg = null;
    fetch('').then(res => msg = res);
    console.log(msg);
}
```

这种情况，因为我们并不会等到API有返回值的时候再去打印msg，所以我们要么把打印放到then的方法里面，要么使用await等到fetch方法的返回值

## 扩展

异步VS同步 阻塞VS非阻塞 并发 & 多线程
