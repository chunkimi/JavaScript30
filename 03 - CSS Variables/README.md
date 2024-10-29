# 03 - Playing with CSS Variables and JS

## 內容
滑動三種圖片效果的設定拉軸，調整畫面中圖片區域的渲染效果。

## key point

- CSS :root and variable
- CSS3 Filter [MDN] (https://developer.mozilla.org/en-US/docs/Web/CSS/filter)
- 確保 HTML 中的 input 標簽使用的 name 屬性值、CSS 和 JS 中使用的變量名保持一致，比如 spacing, blur, base 對應 --spacing, --blur, --color。

## 開發筆記
1. **CSS `:root` 與 CSS 變數**：
   - 在 CSS 中，`:root` 是全域選擇器，用於定義全局的 CSS 變數。
   - 使用 `--variableName` 的格式來定義變數，例如 `--spacing`, `--blur`, `--base`，可以讓變數在整個 CSS 中使用並更新樣式。

2. **動態控制 CSS3 Filter**：
   - 圖片樣式的 `filter` 屬性透過 `blur()` 函數應用模糊效果，使用 CSS 變數 (`--blur`) 控制。
   - MDN 上關於 [CSS Filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) 的文件解釋了不同的過濾器效果（模糊、亮度等），允許我們創建動態和視覺吸引力的效果。


3. **JavaScript 事件綁定與動態樣式更新**：
   - 使用 `querySelectorAll('.controls input')` 選取所有控制範圍的輸入欄，並使用 `Array.from` 轉成陣列以方便後續操作。
   - `inputList.forEach((inputItem) => inputItem.addEventListener('change', updateSetting))` 及 `inputList.forEach((inputItem) => inputItem.addEventListener('mousemove', updateSetting))` 將 `change` 和 `mousemove` 事件綁定到每個輸入欄，使變數可以即時更新。

4. **JavaScript 更新 CSS 變數的邏輯**：
   - `updateSetting` 函式動態更新 CSS 變數：
     - `this.dataset.sizing || '';` 獲取單位（`px` 或空字串）以確保變數值帶有適當單位。
     - `document.documentElement.style.setProperty` 用於設定根元素 `:root` 的 CSS 變數，`--${type}` 為目標變數名，而 `${value}${unit}` 為更新後的值。
