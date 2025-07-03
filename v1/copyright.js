// 创建样式元素
const style = document.createElement('style');
style.textContent = `
footer {
    cursor: default !important;
    user-select: none !important;
}
.custom-footer {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 12px 10px;
    gap: 8px;
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.3s ease, transform 0.3s ease, filter 50ms ease;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
.custom-footer.hiding {
    filter: blur(5px);
    opacity: 0;
}
.custom-footer.loaded {
    opacity: 1;
    transform: translateY(0);
}
.footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    gap: 0 8px;
    line-height: 1;
    font-size: 12px;
}
.footer-module {
    color: var(--normal-color);
    transition: color 0.2s ease;
    text-decoration: none;
    white-space: nowrap;
    font-size: inherit;
    vertical-align: middle;
    display: inline-flex;
    align-items: center;
}
.footer-hover .footer-module {
    color: var(--hover-color);
}
.footer-module.active {
    color: var(--active-color) !important;
}

.footer-content.narrow-layout {
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
}
`;
document.head.appendChild(style);

// 创建页脚HTML结构
const footerDiv = document.createElement('div');
footerDiv.className = 'custom-footer';
footerDiv.innerHTML = `
    <footer>
        <div id="copyright" class="footer-content"></div>
    </footer>
`;
document.body.appendChild(footerDiv);

const footerConfig = {
    copyright: {
        blandcre: "©",
        year: "2025",
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

// 状态管理
const footerState = {
    isInitializing: true,
    isResizing: false,
    initialLoadComplete: false
};

// 设置颜色函数
function setColors() {
    const { normal, hover, active } = footerConfig.colors;
    document.documentElement.style.setProperty('--normal-color', normal);
    document.documentElement.style.setProperty('--hover-color', hover);
    document.documentElement.style.setProperty('--active-color', active);
}

// 动态获取当前年份
const currentYear = new Date().getFullYear();
const configYear = parseInt(footerConfig.copyright.year, 10);

// 生成年份显示文本
function getYearDisplay() {
    if (configYear === 0 || configYear === currentYear) {
        return currentYear.toString();
    } else if (configYear < currentYear) {
        return `${configYear}-${currentYear}`;
    }
    return "0000";
}

// 生成版权信息
function generateCopyright() {
    const yearDisplay = getYearDisplay();
    const copyrightBase = `${footerConfig.copyright.blandcre}${yearDisplay}「${footerConfig.copyright.owner}」`;
    
    const copyrightElement = document.getElementById('copyright');
    copyrightElement.innerHTML = '';
    
    // 判断屏幕布局
    const screenWidth = window.innerWidth;
    const useNarrowLayout = screenWidth < 480;
    
    // 创建内容容器
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'footer-content' + (useNarrowLayout ? ' narrow-layout' : '');
    
    // 第一部分：版权基础信息
    const part1 = document.createElement('span');
    part1.className = 'footer-module';
    part1.dataset.type = 'p1';
    part1.textContent = copyrightBase;
    contentWrapper.appendChild(part1);
    
    // 非窄屏模式下添加其他内容
    if (!useNarrowLayout) {
        // 第二部分：文本内容
        const part2 = document.createElement('span');
        part2.className = 'footer-module';
        part2.dataset.type = 'p2';
        
        // 中屏模式下显示省略号
        if (screenWidth <= 768) {
            part2.textContent = footerConfig.copyright.chpoor;
        } 
        // 宽屏模式下显示完整文本
        else {
            part2.textContent = footerConfig.copyright.text;
        }
        
        contentWrapper.appendChild(part2);
        
        // 分隔符
        const separator = document.createElement('span');
        separator.className = 'footer-module';
        separator.dataset.type = 'p2';
        separator.textContent = ' | ';
        contentWrapper.appendChild(separator);
    }
    
    // 第三部分：链接容器
    const linksContainer = document.createElement('div');
    linksContainer.className = 'links-container';
    
    // 添加所有链接
    footerConfig.links.forEach((link, index) => {
        const linkElement = document.createElement('a');
        linkElement.className = 'footer-module';
        linkElement.dataset.type = 'p3';
        linkElement.href = link.url;
        linkElement.textContent = link.name;
        linksContainer.appendChild(linkElement);
    });
    contentWrapper.appendChild(linksContainer);
    
    copyrightElement.appendChild(contentWrapper);
}

// 更新悬停状态
function updateFooterHoverState(isHovering) {
    const container = document.querySelector('.custom-footer');
    if (isHovering) {
        container.classList.add('footer-hover');
    } else {
        container.classList.remove('footer-hover');
        // 移除所有active状态
        document.querySelectorAll('.footer-module').forEach(m => {
            m.classList.remove('active');
        });
    }
}

// 添加响应式样式
const style = document.createElement('style');
style.textContent = `
.links-container {
    display: flex;
    flex-wrap: nowrap;
    gap: 12px;
    overflow-x: auto;
}
@media (max-width: 768px) {
    .custom-footer {
        flex-direction: column;
    }
    .links-container {
        margin-top: 8px;
        padding-top: 8px;
    }
}`;
document.head.appendChild(style);

// 设置事件监听器
function setupEventListeners() {
    const container = document.querySelector('.custom-footer');
    const copyright = document.getElementById('copyright');
    
    // 容器整体悬停状态
    container.addEventListener('mouseenter', () => updateFooterHoverState(true));
    container.addEventListener('mouseleave', () => updateFooterHoverState(false));
    
    // 模块悬浮事件
    copyright.addEventListener('mouseover', (e) => {
        const module = e.target.closest('.footer-module');
        if (module) {
            // 移除其他模块的active状态
            document.querySelectorAll('.footer-module').forEach(m => {
                if (m !== module) m.classList.remove('active');
            });
            // 添加当前模块的active状态
            module.classList.add('active');
        }
    });
}

// 控制页脚显示/隐藏的函数
function toggleFooterVisibility(show, isResizing = false) {
    const footer = document.querySelector('.custom-footer');
    
    // 设置适当的动画时间
    if (isResizing) {
            footer.classList.add('hiding');
            setTimeout(() => {
                footer.style.display = 'none';
                footer.classList.remove('hiding');
            }, 50);
        } else {
            footer.style.display = '';
        }
    
    if (show) {
        footer.classList.add('loaded');
    } else {
        footer.classList.remove('loaded');
    }
}

// 更新版权信息
function updateCopyright() {
    // 先隐藏页脚
    toggleFooterVisibility(false, footerState.isResizing);
    
    // 更新内容
    generateCopyright();
    setupEventListeners();
    
    // 如果不是在调整大小，延迟显示页脚
    if (!footerState.isResizing) {
        setTimeout(() => {
            toggleFooterVisibility(true);
        }, 50);
    }
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function() {
        // 标记正在调整大小
        footerState.isResizing = true;
        toggleFooterVisibility(false, true);
        
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            footerState.isResizing = false;
            func();
            setTimeout(() => {
                toggleFooterVisibility(true);
            }, 300); // 等待500ms后再显示
        }, wait);
    };
}

// 初始化
function initFooter() {
    setColors();
    generateCopyright();
    setupEventListeners();
    
    // 禁止选中文字
    document.addEventListener('selectstart', function(e) { e.preventDefault(); });
    
    // 禁止右键菜单
    document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
    
    // 禁止拖拽图片
    document.addEventListener('dragstart', function(e) { e.preventDefault(); });
    
    // 禁止复制、粘贴、剪切
    document.addEventListener('copy', function(e) { e.preventDefault(); });
    document.addEventListener('paste', function(e) { e.preventDefault(); });
    document.addEventListener('cut', function(e) { e.preventDefault(); });
    
    // 禁止F12调试
    document.addEventListener('keydown', function(e) {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'J') || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
      }
    });
    
    // 初始加载处理
    const checkInitialLoad = () => {
        if (!footerState.isResizing && footerState.isInitializing) {
            footerState.isInitializing = false;
            footerState.initialLoadComplete = true;
            toggleFooterVisibility(true);
        }
    };
    
    // 添加加载监听
    window.addEventListener('load', () => {
        checkInitialLoad();
    });
    
    // 初始检查
    setTimeout(checkInitialLoad, 100);
    
    // 响应式调整 - 使用防抖函数
    window.addEventListener('resize', debounce(updateCopyright, 300));
    
    // 初始显示处理
    if (!footerState.isResizing) {
        setTimeout(() => {
            if (!footerState.initialLoadComplete && !footerState.isResizing) {
                toggleFooterVisibility(true);
            }
        }, 100);
    }
}



// 立即执行初始化
initFooter();
