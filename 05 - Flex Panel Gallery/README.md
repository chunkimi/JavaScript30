# 05 - Flex Panels Image Gallery

## 內容
透過點選指定面板，讓該面板的區域與文字縮放。

## key point
- 開窗漸變動畫
- css 的 `flex: 1 0 auto`; 是 flex 縮寫屬性，它定義了彈性項目的 **彈性增長系數**、**彈性收縮系數**和**基礎大小**。這三個值對應於 flex-grow、flex-shrink 和 flex-basis 屬性。
  - `flex-grow: 1` : 這表示該元素在彈性容器（flex container）中能夠按比例「增長」來填滿可用的空間。具體來說，flex-grow 設為 1 意味著這個元素會根據可用的空間擴展，並且相對於其他兄弟元素的 flex-grow 值按比例增長。例如，若其他元素的 flex-grow 為 2，那麼這個元素會增長一半的空間。

  - `flex-shrink: 0` : 這表示該元素在容器空間不足時「不會縮小」。當父級容器的空間不足以容納所有子元素時，flex-shrink: 0 會保證這個元素保持它的原始大小，無論其他元素是否縮小。

  - `flex-basis: auto` : 這設定了該元素的初始大小，auto 意味著它會根據元素的內容、寬高或其他 CSS 規則來確定初始大小。在這個基礎上，元素再依照 flex-grow 或 flex-shrink 的值進行增長或縮小。

-  **transitionend** 事件 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event)

## 筆記
1. **彈性面板動畫**：
   - **關鍵 CSS**：`flex: 1 0 auto` 設置了每個面板的彈性增長、收縮和基礎大小，使面板能夠根據空間自動調整大小。
     - `flex-grow: 1`: 每個面板默認能夠均分空間，當面板被點擊時，`flex: 5` 使其增大五倍。
     - `flex-shrink: 0`: 當空間不足時，不會自動縮小。
     - `flex-basis: auto`: 基於內容大小設定初始尺寸。
   - **動畫效果**：點擊面板時，透過增加 `open` 類名的 `flex: 5`，使其彈性擴展；針對文本的位移效果（上下滑動）則是透過 `translateY` 和 `open-active` 類名完成。

2. **`transitionend` 事件**：
   - **運作方式**：當 `flex` 或 `font-size` 過渡動畫結束時觸發，為相應面板元素添加或移除 `open-active` 類名，實現文字的滑動效果。
   - **用途**：確保動畫效果僅在過渡完成後切換，避免快速點擊造成的動畫不連貫現象。
   - **範例說明**：
     ```javascript
     function toggleActive(e) {
       if (e.propertyName.includes('flex')) { // 確保只有 flex 過渡完成時才觸發
         this.classList.toggle('open-active');
       }
     }
     ```

3. **JavaScript 的運作方式**：
   - **面板點擊事件**：為每個 `.panel` 添加 `click` 事件監聽器，點擊時透過 `toggleOpen` 函式切換 `open` 類名，使面板擴展。
   - **文字動畫啟動**：在面板的 `transitionend` 事件中，通過 `toggleActive` 函式確認 `flex` 過渡是否完成，再啟動或結束文字的滑動動畫。