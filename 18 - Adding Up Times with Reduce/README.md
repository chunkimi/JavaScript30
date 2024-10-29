# 18 - Tally String Times with Reduce

## 內容
時間算法應用，加總所有的影片時間，並轉換時間格式

## 筆記

- **將 NodeList 轉換成陣列**：使用 `Array.from()` 將選取到的 DOM 節點轉換為 JavaScript 陣列，方便後續操作。

- **使用 `Array.prototype.map()` 方法**：將每個 `data-time` 的時間轉換為秒數，返回包含所有秒數的陣列。

- **將時間格式轉換成秒**：
  - 使用 `String.prototype.split(':')` 方法將時間字串切割成分鐘和秒數，並將分鐘轉換為秒數再加上秒數。
  - 例如：對於時間字串 `"2:30"`，使用 `split(':')` 將其轉換為 `["2", "30"]`，然後計算 `2 * 60 + 30` 得到總秒數。

- **使用 `Array.prototype.reduce()` 方法**：這個方法用於將陣列中的所有元素累加成一個單一值。
  - **運作原理**：
    - `reduce()` 接受一個回調函數作為參數，該回調函數會對陣列的每一個元素執行指定的操作。
    - 回調函數接受兩個主要參數：累加器（accumulator）和當前值（current value）。
    - 在每次迭代中，回調函數會返回新的累加值，這個值會在下一次迭代中成為累加器。
    - 最後，`reduce()` 返回最終的累加結果，通常用於計算總和或其他聚合結果。
  - **示例**：
    - 假設有一個包含秒數的陣列 `[120, 90, 150]`，使用 `reduce()` 可以將這些秒數加總：
      ```javascript
      const totalSeconds = secondsArray.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
      }, 0);
      ```
    - 這裡，`accumulator` 初始值為 `0`，然後依次加上陣列中的每個秒數，最終得到總秒數。

- **將總秒數轉換成時、分、秒**：使用 `Math.floor()` 計算小時與分鐘，並用 `%` 餘數運算得到剩餘的秒數。
