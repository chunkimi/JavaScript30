# 04 - Array Cardio Day 1

## 內容
陣列方法練習

## key point

- 陣列方法：`filter` , `map` , `reduce` , `sort` ，會返回新值。
- 箭頭函式
- `NodeList` 是類陣列物件，因此無法直接使用陣列的 `filter`、`map` 等方法。可以使用 `Array.from()` 或展開運算子 `...` 來將 `NodeList` 轉換為陣列，可以應用更多陣列方法，方便 DOM 元素集合的操作。
- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

## 陣列方法

1. **Array.prototype.filter()**：
   - **運作方式**：`filter` 方法會遍歷陣列中的每個元素，依據提供的條件函式來篩選出符合條件的元素。
   - **用途**：用於從一組元素中過濾出符合特定條件的子集。
   - **原理**：`filter` 不會改變原始陣列，而是返回一個包含所有符合條件的新陣列。
   - **範例**：
     ```javascript
     const numbers = [1, 2, 3, 4, 5];
     const evens = numbers.filter(num => num % 2 === 0); // [2, 4]
     ```

2. **Array.prototype.map()**：
   - **運作方式**：`map` 方法遍歷陣列中的每個元素，並依據回傳值創建一個新陣列。
   - **用途**：用於將陣列中的每個元素轉換成新的值，常用於資料格式的轉換。
   - **原理**：`map` 會返回一個新的陣列，長度與原始陣列相同，並且不會改變原始陣列。
   - **範例**：
     ```javascript
     const numbers = [1, 2, 3, 4, 5];
     const doubled = numbers.map(num => num * 2); // [2, 4, 6, 8, 10]
     ```

3. **Array.prototype.reduce()**：
   - **運作方式**：`reduce` 方法將陣列中的每個元素累加或累積至單一結果，根據提供的累加函式從左到右逐步運算。
   - **用途**：用於將陣列縮減為一個單一值，常用於加總、計算平均值或其他累計操作。
   - **原理**：`reduce` 接收兩個參數：累加函式（有兩個參數：累加器和當前值）和初始值，運算結果最終會返回累加器的值。
   - **範例**：
     ```javascript
     const numbers = [1, 2, 3, 4, 5];
     const sum = numbers.reduce((acc, num) => acc + num, 0); // 15
     ```

4. **Array.prototype.sort()**：
   - **運作方式**：`sort` 方法根據指定的比較函式來對陣列中的元素進行排序。沒有提供函式時會將元素轉為字串並依字母順序排序。
   - **用途**：用於對陣列進行升序或降序排列，適用於數值、字串等各類型數據。
   - **原理**：`sort` 是就地排序，會直接改變原始陣列順序，因此在不想影響原陣列時可以搭配 `slice()`。
   - **範例**：
     ```javascript
     const numbers = [5, 3, 8, 1, 4];
     const sortedNumbers = numbers.slice().sort((a, b) => a - b); // [1, 3, 4, 5, 8]
     ```