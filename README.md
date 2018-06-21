## 技术栈

vue + vuex + vue-router + axios + element-ui + less + es6

## 项目运行

```
git clone https://github.com/lichuyuan/CNote.git  

cd CNote

npm install

npm run dev

```
## 另外

此项目有配套的 API，[API项目地址](https://github.com/lichuyuan/CNoteAPI)。

# 效果演示

[请戳这里](http://111.231.93.141)

# 功能
- [x] 登录注册注销
- [x] 笔记本添加，修改，删除
- [x] 笔记添加，修改实时保存，删除至回收站
- [x] 回收站恢复笔记，彻底删除笔记
- [ ] 修改头像


# 部分截图


### 登录注销

<img src="https://github.com/lichuyuan/CNote/blob/master/screenshots/login.gif" width="1202" height="444.74"/>

### 笔记本列表页

<img src="https://github.com/lichuyuan/CNote/blob/master/screenshots/notebook.gif" width="1202" height="444.74"/>

### 笔记页

<img src="https://github.com/lichuyuan/CNote/blob/master/screenshots/note.gif" width="1202" height="444.74"/>

### 回收站页

<img src="https://github.com/lichuyuan/CNote/blob/master/screenshots/trash.gif" width="1202" height="444.74"/>


# 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目环境配置数据
├── dist                                        // 打包后项目文件
├── screenshots                                 // 项目截图
├── src                                         // 源码目录
│   ├── api                                     
│   │   ├── auth.js                             // 用户相关接口
│   │   ├── notebooks.js                        // 笔记本相关接口
│   │   ├── notes.js                            // 笔记相关接口
│   │   ├── trash.js                            // 回收站相关接口
│   ├── components                              
│   │   ├── layout                              
│   │   │   ├── Avatar.vue                      // 用户信息组件
│   │   │   ├── MainFooter.vue                  // 页脚组件
│   │   │   ├── MainHeader.vue                  // 头部组件
│   │   │   ├── MainView.vue                    // 主页
│   │   │   ├── SiderBar.vue                    // 侧边栏组件
│   │   ├── note                                
│   │   │   ├── NoteDetail.vue                  // 笔记详情页
│   │   │   ├── NoteSiderBar.vue                // 笔记侧边栏
│   │   ├── notebook                            
│   │   │   ├── NotebookList.vue                // 笔记本列表页
│   │   ├── trash                               
│   │   │   ├── TrashDetail.vue                 // 回收站详情页
│   │   │   ├── TrashSiderBar.vue               // 回收站详情页
│   │   ├── Index.vue                           
│   │   ├── Login.vue                           // 登录注册组件
│   ├── helpers                                 // 辅助函数
│   │   ├── config-baseUrl.js                   // 生产环境和开发环境接口地址切换
│   │   ├── request.js                          // axios 封装
│   │   ├── utils.js                            // 工具函数封装
│   ├── router                                  
│   │   ├── index.js                            // 路由配置
│   ├── store                                   // 组件
│   │   ├── modules                             // 
│   │   │   ├── note.js                         // 笔记 store, getters, mutations, actions 配置
│   │   │   ├── notebooks.js                    // 笔记本 store, getters, mutations, actions 配置
│   │   │   ├── trash.js                        // 回收站 store, getters, mutations, actions 配置
│   │   │   ├── user.js                         // 用户 store, getters, mutations, actions 配置
│   │   ├── index.js                            // 引用vuex，创建store

│   │       │   ├── invoiceRecord.vue           // 购买记录
│   │       │   ├── useCart.vue                 // 使用卡号购买
│   │       │   └── vipDescription.vue          // 会员说明
│   │       └── vipcard.vue                     // 会员卡办理页
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件
├── index.html                                  // 入口html文件
.

```
