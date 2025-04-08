# 牛马每秒工资计算器

这是一个实时计算牛马工资的网页应用，可以根据您输入的月工资，实时显示您每秒赚取的金额以及从工作开始时间累计的收入。

## 功能特点

- 实时显示当前时间的数字时钟
- 根据月工资计算每秒收入
- 从指定的工作开始时间计算累计收入
- 显示工作时长（小时和分钟）
- 支持添加多个不同工资标准的计算器
- 响应式设计，适配移动设备

## 本地运行

您可以通过以下方式在本地运行此应用：

```bash
python3 -m http.server 8000
```

然后在浏览器中访问 http://localhost:8000

## 部署到GitHub Pages

要将此应用部署到GitHub Pages，使其可以通过公共URL访问，请按照以下步骤操作：

1. 创建一个GitHub账户（如果您还没有）
2. 创建一个新的仓库
   - 登录GitHub后，点击右上角的"+"按钮，选择"New repository"
   - 为仓库命名，例如"salary-calculator"
   - 选择"Public"可见性
   - 点击"Create repository"

3. 上传项目文件
   - 在仓库页面，点击"uploading an existing file"链接
   - 将所有项目文件（index.html, style.css, script.js, clock.css）拖拽到上传区域
   - 添加提交信息，如"Initial commit"
   - 点击"Commit changes"

4. 启用GitHub Pages
   - 在仓库页面，点击"Settings"选项卡
   - 在左侧菜单中，找到并点击"Pages"
   - 在"Source"部分，选择"main"分支和"/(root)"文件夹
   - 点击"Save"

5. 访问您的网站
   - 设置完成后，GitHub会显示您的网站URL，通常格式为：
     `https://[您的用户名].github.io/[仓库名]/`
   - 等待几分钟让GitHub完成部署
   - 使用提供的URL访问您的应用

## 其他部署选项

### Netlify

1. 创建一个Netlify账户
2. 点击"New site from Git"
3. 选择GitHub并授权Netlify访问您的仓库
4. 选择包含工资计算器的仓库
5. 保持默认设置并点击"Deploy site"

### Vercel

1. 创建一个Vercel账户
2. 点击"New Project"
3. 导入您的GitHub仓库
4. 保持默认设置并点击"Deploy"

## 注意事项

- 此应用完全在客户端运行，不需要服务器端处理
- 所有计算都在浏览器中进行，不会将您的牛马工资信息发送到任何服务器
- 应用使用本地时间进行计算，确保您的设备时间准确