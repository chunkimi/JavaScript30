# 17 - Sorting Band Names without articles

## 內容
先移除冠詞，在幫樂隊名稱依首字字母排序

## 重點
- **`bands` 陣列**: 包含所有需要排序的樂隊名稱，一些名稱包含冠詞（如 "a", "an", "the"）。

- **`sortBands` 變數**: 使用 `Array.sort()` 方法對 `bands` 進行排序。排序時，透過 `removeArticles()` function 移除冠詞來進行比較。

  ```javascript
  const sortBands = bands.sort((previous, next) =>
    removeArticles(previous) > removeArticles(next) ? 1 : -1
  );
  ```

- **`removeArticles()` function**: 定義一個用來移除字符串中冠詞的函數，適用於 "a", "an", "the"。使用正則表達式來匹配並去掉這些冠詞。

  - **正則表達式**: `data.replace(/^(a |the |an )/i, "").trim()` 
    - `^`: 表示只匹配字符串開頭。
    - `(a |the |an )`: 匹配 "a", "the", "an" 三個冠詞。
    - `i`：表示不區分大小寫。
    - `trim()`: 去除開頭冠詞後，移除兩邊的空白。

  ```javascript
  function removeArticles(data) {
    return data.replace(/^(a |the |an )/i, "").trim();
  }
  ```

- **`rawHtml` 變數**: 使用 `Array.map()` 生成每個排序後樂隊名稱的 `<li>` HTML 字符串，並透過 `.join("")` 將它們組合成單一字符串。

  ```javascript
  const rawHtml = sortBands.map((item) => `<li>${item}</li>`).join("");
  ```

- **`document.querySelector()`**: 選擇 `#bands` 元素，並使用 `innerHTML` 將生成的 `rawHtml` 插入到頁面中，顯示排序後的結果。

  ```javascript
  document.querySelector("#bands").innerHTML = rawHtml;
  ```