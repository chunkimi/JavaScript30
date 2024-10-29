# 29 Countdown Clock

## 內容
倒數計時器

## 重點
### 設定按鈕事件

- **`document.querySelectorAll('[data-time]')`**：選取帶有 `data-time` 屬性的所有按鈕元素。
- **`forEach`**：遍歷每個按鈕，並添加 `click` 事件，當被點擊時執行 `handleStart` 函數。
- **`parseInt(this.dataset.time)`**：將 `data-time` 屬性中的值轉為整數，以作為倒數的秒數傳入 `timer` 函數。

### 建立倒數計時器
- **`let countdown`**：宣告一個全域變數，用於儲存計時器的 ID。
- **`Date.now()`**：取得當前時間的時間戳（毫秒）。
- **`end = now + seconds * 1000`**：計算倒數結束時間（以毫秒為單位）。
- **`setInterval`**：每秒執行一次，用來更新倒數的時間。

### 顯示剩餘時間

- **`document.querySelector`**：選取顯示倒數時間的 HTML 元素。
- **`Math.floor`將數字取整，返回小於或等於該數字的最大整數。
- **`seconds % 60`**：取餘數，為剩餘秒數。
- **`timerDisplay.textContent`**：更新頁面顯示的倒數時間（格式為「分鐘:秒」）。

### 更新計時器並顯示時間

- **`displayTimeLeft(seconds)`**：初次執行倒數時，立即顯示剩餘的時間。
- **`countdown = setInterval`**：每秒更新一次，顯示最新的倒數時間。

### 顯示結束時間
- **`new Date(timeStamp)`**：使用倒數結束的時間戳建立日期物件。
- **`getHours` 和 `getMinutes`**：取得 24 小時制的小時和分鐘。
- **`endTime.textContent`**：顯示倒數結束時間，格式為「Be Back At HH:MM」。

### 顯示時間與結束時間
- **`displayEndTime(end)`**：根據倒數結束時間顯示確切的回來時間。

### 停止與清除計時器
- **`if (secondsLeft < 0)`**：當剩餘時間小於 0 時，清除計時器以停止倒數。
- **`clearInterval(countdown)`**：清除先前的計時器，以防止重疊運行。

### 表單自訂倒數時間
- **`addEventListener('submit', handleCusTimer)`**：監聽自訂表單的提交，觸發 `handleCusTimer`。
- **`e.preventDefault()`**：阻止表單的預設提交行為。
- **`parseInt(this.minutes.value)`**：將使用者輸入的分鐘數轉為整數並傳入 `timer`


##  `setInterval` 和 `clearInterval`
- **`setInterval`**：用於設定一個重複執行的計時器，每隔指定的時間（以毫秒為單位）執行一次給定的回呼函數。
  - 用法：`setInterval(callback, delay)`，其中 `callback` 是要執行的函數，`delay` 是執行間隔。
  - 當 `setInterval` 執行時，會返回一個唯一的 **`timerId`**（計時器 ID），用於識別這個計時器。在倒數計時器中，`setInterval` 每秒（1000 毫秒）更新一次剩餘時間。例如這段程式碼中：

```javascript
  let countdown;
  countdown = setInterval(() => {
    // 計時器邏輯
}, 1000);
```

  - **`countdown`** 就是 `timerId`。它儲存 `setInterval` 的返回值。
  - 當需要停止這個計時器時，便可以用 `clearInterval(countdown)`，透過傳入這個 `timerId` 來識別並清除對應的計時器。

- **`clearInterval`**：用於停止由 `setInterval` 設定的計時器。
  - 用法：`clearInterval(timerId)`，傳入 `setInterval` 返回的 `timerId` 以辨識並清除特定計時器。
  - 在倒數計時器中，`clearInterval` 用於在計時結束或重新啟動時停止計時器，避免多個計時器重疊運行。