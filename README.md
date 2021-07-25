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

顾名思义，构造函数，~~页面执行完这个方法才会显示~~

~~所以不要在这里面掉后台加载数据~~

## componentDidMount

类似与`JQuery`里面的`$(document).ready(fuction())`，页面显示后调用的事件，推荐在这里加载数据

## componentWillUnmount

页面被销毁时调用的方法，用于清理用，比如页面上加载了定时器，在这个事件里面我们可以解除定时器

# React的路由

## BrowserRouter

# Redux

