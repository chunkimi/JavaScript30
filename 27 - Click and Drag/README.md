# Click and Drag to Scroll

## 內容
手動選轉的燈箱


## 重點
1. **選取元素**
   - 使用 `const wrap = document.querySelector(".items")` 選取包含項目的主要容器 `.items`，將其儲存到 `wrap` 變數中，方便後續操作。

2. **滑鼠事件綁定與初始測試**
   - 綁定四個滑鼠事件：`mousedown`、`mouseleave`、`mouseup` 和 `mousemove`，用於實現點擊並拖曳滾動效果。
     - `mousedown`：當按下滑鼠按鍵時觸發，進入拖曳模式。
     - `mouseleave`：當滑鼠離開元素範圍時觸發，結束拖曳模式。
     - `mouseup`：當釋放滑鼠按鍵時觸發，結束拖曳模式。
     - `mousemove`：當滑鼠移動時觸發，根據滑鼠的移動距離滾動內容。

3. **設置拖曳狀態變數**
   - 使用 `let isDown = false` 變數，判斷是否正在拖曳。
   - **`handleDown` 函數**：當觸發 `mousedown` 時，將 `isDown` 設為 `true`，開始拖曳模式。
   - **`handleLeave`** 和 **`handleUp`** 函數：觸發時將 `isDown` 設為 `false`，結束拖曳模式。
   - **`handleMove`** 函數：檢查 `isDown` 是否為 `true`，若為 `false` 則直接返回，避免在非拖曳模式中執行滾動操作。

4. **拖曳狀態的視覺效果**
   - 在拖曳開始和結束時，添加或移除 `.active` 類別來改變外觀：
     - **`handleDown`**：`wrap.classList.add("active")`，當開始拖曳時加入 `.active` 類別。
     - **`handleLeave`** 和 **`handleUp`**：`wrap.classList.remove("active")`，在結束拖曳時移除 `.active` 類別。

5. **記錄起始位置和初始滾動位置**
   - **`handleDown`** 函數中記錄初始位置：
     - `startX = e.pageX - wrap.offsetLeft`：計算滑鼠點擊位置相對於 `wrap` 的起始點。
     - `screenLeft = wrap.scrollLeft`：記錄當前滾動位置，用於計算移動距離。

6. **`mouseup` 和 `handleUp` 的功能**
   - **`mouseup` 事件**：當釋放滑鼠按鍵時觸發，呼叫 `handleUp` 函數，結束拖曳模式。
   - **`handleUp` 函數**：將 `isDown` 設為 `false` 並移除 `.active` 類別，這樣滑鼠即使在容器上方，仍會終止滾動效果。

7. **計算滾動距離並更新滾動位置**
   - **`handleMove`** 函數中根據滑鼠移動距離調整滾動位置：
     - `e.preventDefault()`：防止預設行為，避免選取文字影響滾動體驗。
     - `const x = e.pageX - wrap.offsetLeft`：計算滑鼠當前位置的 X 座標相對於 `wrap`。
     - `const walk = (x - startX) * 3`：計算滑鼠移動距離，並放大倍率以增加滾動速度。
     - `wrap.scrollLeft = screenLeft - walk`：更新 `wrap` 的滾動位置，使內容隨著滑鼠移動而滾動。