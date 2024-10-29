# 15 - LocalStorage and Event Delegation

## 內容
to do list 待辦清單

## 重點

1. **事件：新增待辦事項**
   - **`event.preventDefault()`**:
     - 阻止表單的預設行為，網頁就不會因為`submit行為（提交表單）`因預設行為重新加載。
   - **`this.reset()`**:
     - 這是一個預設的方法，用於清空表單中的所有輸入字段，將它們恢復到初始狀態。
     - 在此案例中，`this` 指向觸發事件的表單元素，調用 `reset()` 方法會將所有的輸入框、選擇框和其他表單元素重設為它們的默認值。

2. **更新畫面渲染**
   - **`renderList()`**:
     - 此函數負責將待辦事項列表渲染到頁面上。
     - 它接收兩個參數：`listValue`（待辦事項Array）和 `listDom`（顯示待辦事項的 DOM 元素）。
     - 使用 `map` 方法生成每個待辦事項的 HTML ，再使用`join('')`將它們合併為一個字符串，然後更新 `listDom` 的 `innerHTML`。

3. **`localStorage`**:
   - `localStorage` 是一種 Web 存儲方法，可以在使用者的瀏覽器中持久保存資料。
   - 在這個程式中，使用 `localStorage.setItem()` 將待辦事項存儲為字符串，使用 `localStorage.getItem()` 讀取數據並解析為 JavaScript 對象。
   - 這使得待辦事項在頁面重新加載時仍然可以保留。

4. **事件：切換 checkbox 狀態**
   - **`e.target.matches(確認目標)`**:
     - 此方法用於檢查事件目標是否匹配指定的選擇器。在這裡，檢查 `e.target` 是否為 `input` 元素，這樣可以確保只有當使用者點擊 checkbox 時才會觸發後續的代碼。
     - `e.target.matches('.className')`，參數除html元素外，放'.className'也可以。
   
   - **更新狀態**:
     - 當 checkbox 被點擊時，通過 `data-index` 屬性獲取對應的待辦事項索引，然後切換該項目的 `done` 屬性（完成狀態）。
     - 最後，更新 `localStorage` 並重新渲染列表以反映變更。
