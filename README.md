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

其实他类似于JSP或者Asp.Net MVC，本质是利用JS拼接Html.

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





# React的路由

## BrowserRouter

