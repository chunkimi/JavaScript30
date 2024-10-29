# Whack A Mole Game

## 內容
打地鼠遊戲

## 重點
### 1. **初始化元素選擇與遊戲設定**
   - `const holes = document.querySelectorAll('.hole')`: 選取所有洞口元素，存入 `holes`。
   - `const scoreBoard = document.querySelector('.score')`: 選取分數顯示區塊，用來更新分數。
   - `const moles = document.querySelectorAll('.mole')`: 選取所有地鼠元素，以便對地鼠點擊進行事件監聽。
   - `const timeSetting`: 設定地鼠出現的時間範圍 (`min` 和 `max`) 與遊戲的總時長 (`end`)。
   - `let timeUp = false`: 用來表示遊戲是否結束，當時間到時設定為 `true`，以停止地鼠出現。
   - `let score = 0`: 分數初始化為 `0`，每次擊中地鼠會增加分數。
   - `let lastHoleIndex = null`: 用來記錄上一個地鼠出現的洞口，避免重複出現。

### 2. **遊戲開始 (`startGame`)**
   - `scoreBoard.textContent = 0`: 重設分數顯示為 `0`。
   - `timeUp = false`: 遊戲重新開始時設為 `false`，確保地鼠繼續出現。
   - `score = 0`: 重設分數。
   - `showMole()`: 啟動第一隻地鼠出現的循環函數。
   - `setTimeout(() => { timeUp = true; alert('time is up!') }, timeSetting.end)`: 設定遊戲總時長，倒數 `timeSetting.end` 毫秒後將 `timeUp` 設為 `true` 並彈出提醒「time is up!」。

### 3. **控制地鼠出現 (`showMole`)**
   - `const hole = randomHole(holes)`: 隨機選擇一個洞口讓地鼠出現。
   - `const time = randomTime(timeSetting)`: 計算地鼠顯示的時間範圍 (根據 `timeSetting`)。
   - `hole.classList.add('up')`: 地鼠顯示在隨機選擇的洞口。
   - `setTimeout(() => { hole.classList.remove('up'); if (!timeUp) showMole() }, time)`: 在指定 `time` 時間後隱藏地鼠，若 `timeUp` 仍為 `false`，則再次執行 `showMole()`，讓地鼠不斷出現。

### 4. **隨機選擇洞口 (`randomHole`)**
   - `const holeIndex = Math.floor(Math.random() * holes.length)`: 生成 0 到 `holes.length - 1` 的隨機索引，以選擇地鼠出現的洞口。
   - `if (holeIndex === lastHoleIndex)`: 若隨機索引與 `lastHoleIndex` 相同 (即上一次地鼠的洞口相同)，則重新選擇。
   - `lastHoleIndex = holeIndex`: 更新 `lastHoleIndex` 為新的洞口索引，避免重複。
   - `return holes[holeIndex]`: 返回隨機選中的洞口。

### 5. **隨機計算時間 (`randomTime`)**
   - `const { min, max } = timeSetting`: 解構 `timeSetting`，取得最小與最大時間。
   - `return Math.round(Math.random() * (max - min) + min)`: 隨機選擇一個在 `min` 和 `max` 範圍內的時間，使地鼠出現的時間多變化。

### 6. **地鼠點擊事件 (`whackMole`)**
   - `moles.forEach((mole) => mole.addEventListener('click', whackMole))`: 為每隻地鼠增加點擊事件，點擊地鼠時執行 `whackMole` 函數。
   - `if (!e.isTrusted) return`: 檢查事件來源是否為用戶真實點擊 (避免模擬點擊)。
   - `score++`: 每次點擊地鼠時增加分數。
   - `this.parentNode.classList.remove('up')`: 隱藏被點擊的地鼠。
   - `scoreBoard.textContent = score`: 更新分數顯示。


## `setTimeout`

### **原理**

`setTimeout` 是一個 JavaScript 函數，用於在指定的延遲時間（以毫秒計）後執行一個指定的函數或一段程式碼。它返回一個定時器 ID，該 ID 可以用來取消定時器（使用 `clearTimeout`）。在延遲時間到期後，函數會被放入事件隊列，等待主執行緒空閒時執行。這使得 `setTimeout` 可以實現非同步操作，讓其他程式碼在等待期間繼續執行。

### **在本專案的作用**

- **控制遊戲時間**：在 `startGame` 函數中，`setTimeout` 被用來設定遊戲的時間限制。在 10 秒後，遊戲將結束，並且觸發一個警告框提示用戶「時間到！」。
  
- **顯示地鼠**：在 `showMole` 函數中，`setTimeout` 用於控制地鼠的顯示時間。地鼠在隨機選擇的時間內顯示，之後會自動隱藏。這個過程會不斷重複，直到遊戲結束。

### **在本專案執行順序**

1. **開始計時**：
   - 在 `startGame` 中，`setTimeout` 開始計時，10 秒後會觸發。

2. **地鼠消失與重複**：
   - 呼叫 `showMole()` 函數，隨機選擇一個地鼠並顯示。
   - 使用第二個 `setTimeout`，設定地鼠顯示的持續時間，根據隨機生成的 `time` 毫秒，當 `time` 到達時，觸發第二個 `setTimeout`，隱藏地鼠。
   - 如果遊戲未結束（`timeUp` 為 `false`），則再次呼叫 `showMole()` 顯示下一隻地鼠。

3. **結束遊戲**：
   -  `startGame`的 `setTimeout` 觸發後，將 `timeUp` 設為 `true`，並彈出警告框。
   - 停止所有地鼠的顯示，結束遊戲。