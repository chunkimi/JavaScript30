# 07 - Array Cardio Day 2

## 
陣列方法練習

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


---

## 實例

#### **1. `Array.prototype.some()`**

- **用途**：檢查陣列中是否有**至少一個元素**符合條件。
- **回傳值**：如果找到至少一個符合條件的元素，則回傳 `true`，否則回傳 `false`。
- **運作方式**：需要傳入一個測試函式，`some()` 方法會對每個元素執行該測試函式，直到找到符合條件的元素為止。
- **適用情境**：可用於快速檢查資料，例如確認是否存在符合條件的資料項目。
  
  ```javascript
  const ages = [18, 25, 30];
  const hasAdult = ages.some(age => age >= 18); // true
  ```

---

#### **2. `Array.prototype.every()`**

- **用途**：檢查陣列中是否**每個元素**都符合條件。
- **回傳值**：如果所有元素都符合條件，則回傳 `true`，否則回傳 `false`。
- **運作方式**：同樣需要傳入一個測試函式，`every()` 會對每個元素執行該測試函式，一旦有元素不符合條件即停止並回傳 `false`。
- **適用情境**：用於檢查所有元素是否符合某一條件，例如驗證所有使用者皆已滿 18 歲。
  
  ```javascript
  const scores = [85, 90, 78];
  const allPassed = scores.every(score => score >= 60); // true
  ```

---

#### **3. `Array.prototype.find()`**

- **用途**：回傳**第一個**符合測試函式條件的元素。
- **回傳值**：如果找到符合條件的元素，則回傳該元素；否則回傳 `undefined`。
- **運作方式**：`find()` 會逐一測試陣列中的每個元素，直到找到符合條件的第一個元素並立即回傳。
- **適用情境**：適合尋找特定條件的單一元素，例如尋找符合條件的唯一物件。
  
  ```javascript
  const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const user = users.find(user => user.id === 2); // { id: 2 }
  ```

---

#### **4. `Array.prototype.findIndex()`**

- **用途**：找出**第一個**符合條件的元素索引。
- **回傳值**：若找到符合條件的元素，則回傳其索引；若無符合條件的元素，則回傳 `-1`。
- **運作方式**：`findIndex()` 會遍歷陣列並測試每個元素，直到找到符合條件的第一個元素的索引並立即回傳。
- **適用情境**：適合用於需要知道符合條件元素的位置而非元素本身。
  
  ```javascript
  const numbers = [1, 3, 5, 8];
  const index = numbers.findIndex(num => num % 2 === 0); // 3
  ```

---

#### **5. `Array.prototype.splice()`**

- **用途**：**修改原陣列**內容，能夠增加、移除或替換陣列中的元素。
- **回傳值**：回傳被移除的元素（若未移除則回傳空陣列）。
- **運作方式**：接受三個參數：`start`（起始索引）、`deleteCount`（刪除數量）及可選的`item(s)`（要新增的元素）。
- **適用情境**：適合用於需要直接修改陣列的情境，例如移除特定位置的元素或在陣列中插入新元素。
  
  ```javascript
  const colors = ['red', 'green', 'blue'];
  colors.splice(1, 1, 'yellow'); // ['red', 'yellow', 'blue']
  ```

---

#### **6. `Array.prototype.slice()`**

- **用途**：提取陣列中的**部分元素**形成一個新陣列，不會改變原陣列。
- **回傳值**：返回一個新的子陣列，包含從 `start` 到 `end`（不含 `end` 索引）之間的元素。
- **運作方式**：接受兩個參數 `start` 和 `end`，若不提供 `end`，則提取從 `start` 到陣列末尾的所有元素。
- **適用情境**：適合需要複製或提取部分陣列而不影響原陣列的情境。
  
  ```javascript
  const fruits = ['apple', 'banana', 'cherry', 'date'];
  const citrus = fruits.slice(1, 3); // ['banana', 'cherry']
  ```

