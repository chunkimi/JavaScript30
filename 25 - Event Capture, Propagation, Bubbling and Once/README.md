# Event Capture, Propagation, Bubbling and Once

## 內容
事件捕獲Capture、冒泡Bubbling、一次性Once與各種設定

## 重點
### 1: 基本事件綁定
1. **選取所有 `div` 元素**：
   - 使用 `document.querySelectorAll("div")` 選取頁面中所有的 `div`，並儲存到 `boxes` 變數中。
2. **定義 `triggerBox` 函數**：
   - 當事件被觸發時，印出被點擊的 `div` 元素的 `class` 屬性值。
3. **綁定 `click` 事件**：
   - `boxes.forEach((boxItem) => boxItem.addEventListener('click', triggerBox));`
   - 當 `div` 被點擊時，事件從內層 `div` 向外層 `div` 傳遞（冒泡模式）。

### 2: 啟用捕獲模式
1. **修改事件綁定為捕獲模式**：
   - 使用 `{ capture: true }` 設定，改為由外而內的捕獲模式。
2. **效果**：
   - 事件從最外層的 `div` 開始觸發，再傳遞到內層。

### 3: 停止事件冒泡
1. **使用 `e.stopPropagation()`**：
   - 在 `triggerBox` 函數中加入 `e.stopPropagation()`，用來停止事件繼續冒泡。
2. **效果**：
   - 點擊某一層 `div` 時，事件只會在該層觸發，不會再傳遞到其他層。

### 4: 捕獲模式與一次性觸發
1. **設定 `capture` 和 `once` 為 `true`**：
   - 使用 `{ capture: true, once: true }`，觸發後事件監聽器會自動移除。
2. **效果**：
   - 每個 `div` 的 `click` 事件只會觸發一次，且由外到內依次觸發。


### 5: 按鈕一次性事件觸發
1. **設定按鈕的 `click` 事件**：
   - 使用 `{ once: true }`，按鈕的 `click` 事件只會觸發一次。
2. **效果**：
   - 點擊按鈕後，事件觸發並顯示 "this is button"，之後該事件監聽器自動移除。


---

## `addEventListener()` 與其第三個參數 `useCapture` 
### 1. `addEventListener()` 概述
   - **功能**：用於在目標元素上註冊事件監聽器，當指定事件觸發時會執行對應的處理函數。
   - **適用對象**：DOM 元素（如 `Element`、`Document`、`Window` 等），以及支持事件的其他物件。
   - **優勢**：
      - 可以為同一個事件註冊多個監聽器。
      - 提供事件處理階段的控制（捕獲 vs. 冒泡）。
      - 適用於所有事件目標，不僅限於 HTML 或 SVG 元素。

### 2. `addEventListener` 語法
   ```javascript
   addEventListener(type, listener, useCapture);
   ```
   - **type**：事件類型（如 `"click"`、`"keyup"`），大小寫敏感。
   - **listener**：事件處理函數（可以是函數或實作 `handleEvent()` 方法的物件）。
   - **useCapture**（或 **options**）：可選的第三個參數，控制事件處理的階段（默認為 `false`，即使用冒泡模式）。

### 3. `useCapture` 參數詳解
   - **定義**：
      - 是一個布林值 (`boolean`)。
      - **`true`**：啟用捕獲模式 (`capture`)。
      - **`false`**：啟用冒泡模式 (`bubbling`)。

   - **捕獲模式（`capture`）**：
      - 事件的傳遞從**外層元素**向**內層元素**進行。
      - 使用捕獲模式時，祖先元素會先收到事件通知，之後才是子元素。
      - 例如：假設外層紅色 `div` 和內層藍色 `div` 都綁定 `click` 事件，當點擊內層藍色元素時，先觸發紅色元素的 `click` 事件，再觸發藍色元素的 `click` 事件。

   - **冒泡模式（`bubbling`）**：
      - 事件的傳遞從**內層元素**向**外層元素**進行。
      - 使用冒泡模式時，事件會先傳遞到最內層的目標元素，再逐層向外傳遞到其父層元素。
      - 例如：點擊內層藍色 `div`，會先觸發藍色的 `click` 事件，再觸發紅色的 `click` 事件。

   - **不同層元素的 `useCapture` 設置不一致時**：
      - 瀏覽器會從最外層元素開始，依次查找捕獲模式的事件，達到目標元素後，執行目標元素的事件。
      - 然後沿原路返回，依次執行冒泡模式的事件處理函數。

### 4. 捕獲與冒泡模式的應用範例
   ```javascript
   // 捕獲模式示例：會先處理外層事件，再處理內層事件
   element.addEventListener("click", handler, true);

   // 冒泡模式示例：會先處理內層事件，再處理外層事件
   element.addEventListener("click", handler, false);
   ```

### 5. 其他`addEventListener` 的選項（擴展選項用法）
   - **options**：可選的物件形式的參數，可指定以下選項：
      - **capture**：同 `useCapture`，決定事件是否在捕獲階段觸發。
      - **once**：`true` 時，監聽器會在第一次執行後自動移除。
      - **passive**：`true` 時，禁止 `preventDefault()` 的調用，可提升滾動效能。
      - **signal**：使用 `AbortSignal` 來中止事件監聽器。

### 總結
- `addEventListener()` 的 `useCapture` 提供了控制事件傳遞順序的能力。
- 默認使用冒泡模式（`false`），建議僅在需要時使用捕獲模式