# 体检项目

### 开发模式启动
`npm run dev`
### 打包部署
`npm run build`
### 代码格式修复
`npm run build`
### 不要执行 eject 命令

> windows 用户在拉取代码前应该 git config --global core.autocrlf input
## 开发规范
1. 前端开发人员应该保证交互的合理性。
2. 所有Modal上下左右居中。
3. 常规分页页面新增之后跳转到第一页，修改或删除之后刷新当前页。
4. 所有删除必须有二次确认弹窗。
5. 所有页面必须兼容到1250尺寸的屏幕，不能出现严重变形。
6. 常规分页每页10条，分页组件格式为：共 - 条 分页器 showQuickJumper
7. 合理利用字典（`dict-select`和`dict-show`），除了逻辑判断，不应该在代码写死字典。
8. 提交代码之前删除`console`语句，保持线上控制台干净。
9. 必须写注释。
10. 定时代码评审。
11. 文件名使用`-`分割，js变量驼峰命名，css中划线分割。
12. 禁止随意添加公共组件和全局css。必须通过评审之后才能使用。
13. 禁止出现代码量超过1000行的组件。
14. 非全局css文件必须使用`module`。
15. 禁止滥用插件，package里的任何插件都应该可追溯。
16. 合理使用别名`@`，禁止出现`../../../`。
17. 批量选中操作在切换分页时清空，只能批量操作某一页的数据。批量操作按钮在未选中时保持禁用状态。
18. 常规分页页面点击分页时使用上次点击搜索产生的条件查询。