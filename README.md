# WebSite-API

一个智能响应式的网页API服务源代码，提供高颜值与自定义的高复用性选项。

## 功能特性
### v1.0.0 copyright
- **响应式布局**：自动适应不同屏幕尺寸
- **平滑动画**：精心调校的显示/隐藏动画效果
- **动态年份**：自动更新版权年份
- **多状态效果**：悬停、激活状态样式
- **智能隐藏**：窗口调整时自动隐藏，避免布局闪烁

- 配置选项：在/v1/copyright.js - JavaScript中修改 `footerConfig` 对象来自定义：

```javascript

const footerConfig = {
    copyright: {
        blandcre: "©️",
        year: "2024",
        owner: "朝云忆梦 | AuroMuze",
        text: "All rights reserved unless otherwise specified.",
        chpoor: "···"
    },
    links: [
        { name: "协议条款", url: "http://doc.auromuze.com" },
    ],
    colors: {
        normal: "#6a6a6a",
        hover: "#8a8a8a",
        active: "#a0a0a0"
    }
};

```
- 项目应用：在现有项目中引用：

```html

<noscript><div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.95); z-index: 1000; display: flex; justify-content: center; align-items: center; flex-direction: column; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);" oncontextmenu="return false;"><h1 style="font-size: 24px; color: #333; margin-bottom: 10px;">请启用JavaScript以使用本页面</h1><p style="font-size: 16px; color: #666; text-align: center; max-width: 400px;">您的浏览器已禁用JavaScript。请在浏览器设置中启用JavaScript以继续使用本页面的功能。</p></div></noscript><script src="https://api.yourname.com/copyright.js"></script>

```

## 许可证

MIT许可证可自由商业或非商业使用，可根据需要任意修改，建议保留原作者信息。

---

> 提示：如需进一步自定义动画时间，请修改CSS中的transition属性和JavaScript中的定时器参数。
