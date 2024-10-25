# Follow Along Links

## 重點

1. **選取元素 (`document.querySelectorAll`)**
   - `const links = document.querySelectorAll('a')`：選取頁面中所有 `<a>` 標籤，返回一個 NodeList。
   - `links.forEach` 用於遍歷 NodeList，為每個 `<a>` 標籤綁定 `mouseenter` 事件。

2. **新增並設置 Spotlight 元素**
   - `const spotlight = document.createElement('span')`：創建一個新的 `span` 元素，用於在選取的連結上添加聚光效果。
   - `spotlight.classList.add('highlight')`：為該元素新增一個 CSS 類別 `highlight`，用於設置聚光效果的樣式。
   - `document.body.append(spotlight)`：將 `spotlight` 元素添加到文件的 `body` 中。

3. **`turnOnLight` 函數 - 位置計算與樣式更新**
   - **`this.getBoundingClientRect()`**：取得元素相對於視窗的位置和尺寸（返回物件包含 `width`、`height`、`top`、`left` 等屬性），這裡的 `this` 代表觸發事件的 `<a>` 標籤。
   - **解構賦值**：將 `position` 中的 `width`、`height`、`top`、`left` 直接解構，便於後續操作。

4. **位置坐標轉換**
   - **滾動位置補償**：
     - `top: top + window.scrollY`：將 `top` 加上頁面垂直滾動距離，取得元素在整個頁面中的垂直位置。
     - `left: left + window.scrollX`：將 `left` 加上頁面水平滾動距離，取得元素在整個頁面中的水平位置。

5. **更新 Spotlight 樣式**
   - `spotlight.style.width = `${coords.width}px`` 和 `spotlight.style.height = `${coords.height}px``：設定 spotlight 的寬高以匹配目標元素。
   - `spotlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`：透過 CSS `transform` 設置 spotlight 的位置，使其與 `<a>` 標籤對齊。

6. **`mouseenter` 事件綁定**
   - `links.forEach((linkItem) => linkItem.addEventListener('mouseenter', turnOnLight))`：為每個 `<a>` 標籤綁定 `mouseenter` 事件，當滑鼠移入時執行 `turnOnLight` 函數，使 spotlight 追隨滑鼠指向的連結。

