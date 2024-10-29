# Stripe Follow Along Dropdown

## 內容
製作縮放下拉選單，並提供與選單尺寸對應的白色底框。

## 重點

1. **選取元素**
   - `const nav = document.querySelector("#top")`：取得頂部導航欄元素，供後續計算位置。
   - `const dropdownBackground = document.querySelector(".dropdownBackground")`：選取背景元素，用於顯示下拉選單的背景。
   - `const navItemArr = document.querySelectorAll(".cool>li")`：選取所有主要導航項目（`<li>`），後續將綁定事件。

2. **設定事件監聽**
   - `navItemArr.forEach((navItem) => navItem.addEventListener('mouseenter', handleEnter))`：為每個導航項目綁定 `mouseenter` 事件，滑鼠進入時觸發 `handleEnter` 函數。
   - `navItemArr.forEach((navItem) => navItem.addEventListener('mouseleave', handleLeave))`：為每個導航項目綁定 `mouseleave` 事件，滑鼠離開時觸發 `handleLeave` 函數。

3. **進入與離開效果的控制**
   - `handleEnter()`：
     - `this.classList.add("trigger-enter")`：當滑鼠進入時，為導航項目添加 `trigger-enter` 類別，準備啟動進入效果。
     - `setTimeout(() => this.classList.add('trigger-enter-active'), 150);`：延遲 150 毫秒啟動效果。
     - `dropdownBackground.classList.add('open')`：顯示下拉背景，使背景可見。
   - `handleLeave()`：
     - `this.classList.remove("trigger-enter", "trigger-enter-active")`：移除 `trigger-enter` 和 `trigger-enter-active` 類別，重置效果。
     - `dropdownBackground.classList.remove('open')`：隱藏背景元素。

4. **計算與設定背景位置**
   - `const dropdown = this.querySelector('.dropdown')`：選取對應的下拉選單元素。
   - `const dropdownCoords = dropdown.getBoundingClientRect()`：取得下拉選單位置與尺寸（相對於視窗）。
   - `const navCoords = nav.getBoundingClientRect()`：取得頂部導航欄的位置和尺寸。
   - 計算下拉背景的位置：
     - `top: dropdownCoords.top - navCoords.top`
     - `left: dropdownCoords.left - navCoords.left`
   - 設定背景樣式，使其與下拉選單對齊：
     - `dropdownBackground.style.width` 與 `dropdownBackground.style.height` 設置為選單的寬高。
     - `dropdownBackground.style.transform = translate(...)` 設置背景的位置。

5. **修改啟動效果，使用 `&&` 簡化條件判斷的寫法**
   - 將原本的寫法 `setTimeout(() => this.classList.add('trigger-enter-active'), 150);`，改為 `setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);`。
   - **原因**：使用 `&&` 是一種「短路評估」的寫法，確保 `trigger-enter` 類別仍存在時才添加 `trigger-enter-active`，避免在 `mouseleave` 事件快速觸發時產生延遲執行的錯誤效果。
   - 這種寫法相當於：
     ```javascript
     if (this.classList.contains('trigger-enter')) {
       this.classList.add('trigger-enter-active');
     }
     ```