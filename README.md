# WebSite-HooterCopyRight

一个智能响应式的网页页脚组件，支持动态布局调整、平滑动画效果和多种自定义选项。

## 功能特性

- **响应式布局**：自动适应不同屏幕尺寸
- **平滑动画**：精心调校的显示/隐藏动画效果
- **动态年份**：自动更新版权年份
- **多状态效果**：悬停、激活状态样式
- **智能隐藏**：窗口调整时自动隐藏，避免布局闪烁

## 动画参数

| 动画类型 | 持续时间 | 触发条件 |
|---------|---------|---------|
| 初始显示 | 300ms | 页面加载完成 |
| 快速隐藏 | 50ms | 窗口大小变化时 |
| 延迟显示 | 300ms | 窗口停止调整后300ms |

## 配置选项

在copyright.js - JavaScript中修改 `footerConfig` 对象来自定义：

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
在现有项目中引用：

```html

<noscript><div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.95); z-index: 1000; display: flex; justify-content: center; align-items: center; flex-direction: column; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);" oncontextmenu="return false;"><h1 style="font-size: 24px; color: #333; margin-bottom: 10px;">请启用JavaScript以使用本页面</h1><p style="font-size: 16px; color: #666; text-align: center; max-width: 400px;">您的浏览器已禁用JavaScript。请在浏览器设置中启用JavaScript以继续使用本页面的功能。</p></div></noscript><script src="https://api.yourname.com/copyright.js"></script>

```

## 技术细节

- **响应式断点**：
  - 窄屏布局：<480px (垂直排列元素)
  - 中屏布局：480px-768px (显示省略文本)
  - 宽屏布局：>768px (显示完整文本)

- **智能显示逻辑**：
  - 如果页面加载时就在调整窗口大小，跳过初始动画
  - 窗口调整结束后等待500ms才重新显示
  - 使用防抖技术(300ms)检测窗口调整结束

## 浏览器兼容性

支持所有现代浏览器，包括：
- Chrome 最新版
- Firefox 最新版
- Safari 最新版
- Edge 最新版

## 许可证

MIT许可证可自由商业或非商业使用，可根据需要任意修改，建议保留原作者信息。

---

> 提示：如需进一步自定义动画时间，请修改CSS中的transition属性和JavaScript中的定时器参数。
