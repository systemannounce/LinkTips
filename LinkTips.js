// ==UserScript==
// @name        Link Open Mode Tooltip Enhancer
// @name:zh-CN  链接打开方式提示增强器
// @name:zh-TW  連結開啟方式提示增強器
// @name:ja リンクオープンモードツールチップエンハンサー
// @namespace   https://github.com/systemannounce/LinkTips
// @version     0.0.2
// @description Displays tooltips showing link open modes with color coding: blue for new tab, red for current page, supports Chinese and English.
// @description:ja リンクの開き方に応じてツールチップを表示します。新しいタブは青色、同じタブは赤色で表示され、言語は中英に対応します。
// @description:zh-CN 根据链接打开方式显示提示，新标签页蓝色提示，当前页面红色提示，支持中英文切换。
// @description:zh-TW 根據鏈接打開方式顯示提示，新標籤頁藍色提示，當前頁面紅色提示，支援中英文切換。
// @author       Felix_SANA
// @license     MIT
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const userLang = navigator.language || navigator.userLanguage;
    const isChinese = userLang.includes('zh');

    const messages = {
        newTab: isChinese ? "新标签页打开" : "New tab",
        currentTab: isChinese ? "当前页面覆盖" : "Current page"
    };

    const tooltip = document.createElement("div");
    tooltip.className = "link-tooltip";
    document.body.appendChild(tooltip);

    const style = document.createElement('style');
    style.textContent = `
        .link-tooltip {
            position: fixed;
            bottom: 30px;
            left: 10px;
            padding: 5px 10px;
            color: white;
            border-radius: 5px;
            font-size: 12px;
            display: none;
            pointer-events: none;
            z-index: 1000;
        }
        .link-tooltip.new-tab {
            background-color: blue;
        }
        .link-tooltip.current-tab {
            background-color: red;
        }
    `;
    document.head.appendChild(style);

    document.addEventListener("mouseover", function(event) {
        const link = event.target.closest("a");
        if (link) {
            const isNewTab = link.target === "_blank";
            tooltip.textContent = isNewTab ? messages.newTab : messages.currentTab;

            tooltip.className = `link-tooltip ${isNewTab ? 'new-tab' : 'current-tab'}`;

            tooltip.style.display = "block";
        } else {
            tooltip.style.display = "none";
        }
    });

    document.addEventListener("mouseout", function(event) {
        if (event.target.tagName === "A") {
            tooltip.style.display = "none";
        }
    });
})();
