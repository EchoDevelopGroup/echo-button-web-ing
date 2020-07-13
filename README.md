# 桃按钮前端

## 摘要

版本: v0.1.1  
主要工程师: 疯狂的小智  
次要工程师: FinnTenzor  
日期: 2020-06-24  
仓库: [https://gitee.com/echodevelopgroup/echo-button-web-ing](https://gitee.com/echodevelopgroup/echo-button-web-ing)  

## 框架

框架: Vue 2.x  
模板: 官方标准模板  
UI库: element-UI  
其他依赖: mockjs axios  
vue文档: [https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/)  
vuex文档: [https://vuex.vuejs.org/zh/](https://vuex.vuejs.org/zh/)  
vue-router文档: [https://router.vuejs.org/zh-cn/](https://router.vuejs.org/zh-cn/)  
ElementUI文档: [https://element.eleme.cn/#/zh-CN/component/layout](https://element.eleme.cn/#/zh-CN/component/layout)  
axios文档: [https://www.kancloud.cn/yunye/axios/234845](https://www.kancloud.cn/yunye/axios/234845)  
Mock.js文档: [https://github.com/nuysoft/Mock/wiki](https://github.com/nuysoft/Mock/wiki)  

## 目录结构

1. api 接口相关的函数、拦截器、类型定义等
2. assets LOGO等图片、音频、视频资源 不包括按钮音频
3. components 组件库，组件规范见项目规范
4. layouts 布局库，布局规范见项目规范
5. mock 后端接口模拟，用于后端接口还不能用的时候用来模拟后端返回，写法见官方文档和已写好的部分模拟接口
6. router 前端路由，描述前端所有的页面和定义
7. store 前端全局状态，用于跨页面、跨组件传递状态
8. views 前端各页面
9. 如果某些东西放不到合适的地方，就新建一个文件夹

## 项目规范

__规范是用来提高大家效率的，如果反而降低效率，那么修改调整规范是最好的办法。__

### IDE

使用VSCode或WebStorm或其他

IDE插件：

1. eslint （WS好像自带）
2. editorconfig （WS好像自带）
3. vetur （WS不需要）

### 缩进规范

具体见.editorconfig，主要为2空格缩进和LF换行符

### 代码规范

具体见.eslintrc.js，大部分规范同官方标准，部分特别规则见文件内的设置和注释

### 类型标注

1. 原则上api和util中的所有函数都应该对参数和返回值进行类型标注，类型标注方法见api文件夹内的类型标注。
2. 组件内的函数、方法，若根据组件参数声明可以直接确定，则不必说明类型，否则原则上都应该标注。
3. 上面这个原则，在函数仅被依赖一次，仅被调用一次的时候可以打破。

### 注释

1. 要么不写，要么保证写的注释对其他人有帮助
2. 函数方法上方应该写他的主要功能，`/* */`或`//`都可以
3. 触发性函数、方法 __必须__ 说明触发方法，一般是监听器，触发方法例如`用户按下XX按钮时`
4. 注释引用不要复制，写引用的文件和位置。（防止复制以后，改天别人改了原注释位置导致注释错误，坑别人）
5. 函数体内注释看情况写，简单的不必写，复杂的分块写，不要每行都写。“简单”的标准如下（满足其一）：
    * if/for小于3个
    * 函数功能你能15个字以内说完
    * 变量少于3个
    * 最晚使用的变量距离函数体开头少于10行

### 命名规范

#### html

1. 标签名小写，组件名小写中划线

#### css

1. 类名小写中划线
2. 状态性类名在基础类后加两个下划线，再加状态名，基础类名和状态名都时小写中划线
3. 避免采用复杂的选择器，最好只有类选择器+伪类/伪元素
4. 避免采用容易冲突的命名，最好无scoped全项目类名不冲突

#### js

1. 变量名、函数名、参数名小驼峰
2. 类名大驼峰

#### 文件名

1. vue文件名都采用大驼峰，index除外
2. js文件名都采用小写中划线

### 组件库规范

1. 组件库不嵌套
2. 组件应该是多例的或者未来可能转为多例的
3. 简单组件单文件，复杂组件单个文件夹
4. 如果组件复杂，应该分到其他组件中

### 布局库规范

1. 应该总是仅被router中引用，不要被直接引用

### views

1. 允许嵌套
2. 嵌套结构跟URL的结构走

## 开发和部署

### 开发

```sh
yarn serve
```

开发时反向代理配置在`vue.config.js`中，已经配置好。

### 部署

```sh
yarn build
```

把dist目录复制到网站根目录即可，需要nginx对`/echo-api`和`/echo-static`做反向代理。

## 设计图相关

### 尺寸

1. 设计图PSD水平宽度为4000，页面内部主内容宽度为1110。
2. 对照设计图估计尺寸时，建议在PS里将“图像大小”中的宽度设置为1290，等比缩放，内容部分宽度即为1110。

## 开发历程

1. [ ] 播放的页面
2. [ ] 上传的页面
3. [ ] 管理页面
4. [ ] 序列播放
5. [ ] 自定义播放器
6. [ ] 自定义控制台

## 任务

接任务请把自己的名字写在后面，方便他人确认哪些没人做。

1. [ ] 导航栏
2. [ ] 按钮组
3. [x] 上传页面框 FinnTenzor
4. [x] 自定义组件 FinnTenzor
5. [ ] 上传审核按钮
6. [ ] 导航组
7. [ ] 页面布局
