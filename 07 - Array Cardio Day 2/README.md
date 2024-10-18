# 07 - Array Cardio Day 2

## key point
- `Array.prototype.some()` ，用於檢查數組中是否有至少一個元素滿足條件。 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- `Array.prototype.every()` ，用於檢查數組中是否每個元素都滿足條件。 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- `Array.prototype.find() ` [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- `Array.prototype.findIndex()`  [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
- `Array.prototype.splice()`，會改變元陣列。[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
-`Array.prototype.slice()`，有回傳值 [MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)


## `slice` 和 `splice`

| 特性                | `slice()`                                           | `splice()`                                           |
|---------------------|-----------------------------------------------------|-----------------------------------------------------|
| **用途**            | 從陣列中返回一個新陣列（不改變原陣列）。            | 從陣列中移除或替換元素，會改變原陣列。               |
| **返回值**          | 返回選定部分的新陣列。                              | 返回被移除的元素（作為一個新陣列）。                |
| **是否改變原陣列**  | 不會改變原陣列。                                     | 會改變原陣列。                                       |
| **參數 1**          | 起始索引（包含）。                                   | 起始索引（包含）。                                   |
| **參數 2**          | 結束索引（不包含，為可選參數）。                     | 刪除的元素數量（為可選參數）。                      |
| **可選參數**        | 無法插入新元素。                                     | 可以在指定位置插入新元素。                           |
| **範例**            | `array.slice(1, 3)` 返回索引 1 到 3 之間的元素。     | `array.splice(1, 2, 'a', 'b')` 從索引 1 開始刪除兩個元素，並插入 `'a'` 和 `'b'`。 |
| **典型應用場景**    | 創建原陣列的子集，不改變原始數據。                   | 插入、刪除或替換陣列中的元素。                       |
