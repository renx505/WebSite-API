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

在JavaScript中修改 `footerConfig` 对象来自定义：

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
