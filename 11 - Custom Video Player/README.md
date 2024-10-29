# 11 - Custom Video Player

## 重點
- HTML5 Video API 
- 步驟拆解
  - 取得DOM
    - 影片
    - 進度條
    - 按鈕：播放、快進快退、和音量
    - 播放速度滑動條
  - 事件觸發類型
    1. 影片播放與控制
       - **`viewer.addEventListener('click', togglePlay)`**：
         - 當你點擊影片時，會觸發 `togglePlay` 函數。該函數會切換影片的播放和暫停狀態。
       - **`viewer.addEventListener('play', updateButton)`**：
         - 當影片開始播放時，會觸發 `updateButton` 函數，更新播放按鈕的圖示為暫停符號。
       - **`viewer.addEventListener('pause', updateButton)`**：
         - 當影片暫停時，會再次觸發 `updateButton` 函數，更新播放按鈕的圖示為播放符號。
       - **`viewer.addEventListener('timeupdate', handleProgress)`**：
         - 每當影片播放進度更新時，會觸發 `handleProgress` 函數，以更新進度條顯示的百分比。

    2. 控制按鈕事件
       - **`toggleBtn.addEventListener('click', togglePlay)`**：
         - 當你點擊播放/暫停按鈕時，會觸發 `togglePlay` 函數，切換影片的播放狀態。
       - **`skipButtons.forEach(skipBtn =>skipBtn.addEventListener('click', skip))`**：
         - 每個跳過按鈕（例如快退或快進）點擊時，會觸發 `skip` 函數，根據按鈕的設定跳過相應的秒數。

    3. 調整音量和播放速度
       - **`ranges.forEach(rangeItem => rangeItem.addEventListener('change', handleRange))`**：
         - 當你改變音量或播放速度滑桿的值時，會觸發 `handleRangeUpdate` 函數，更新影片的音量或播放速度。
       - **`ranges.forEach(rangeItem => rangeItem.addEventListener('mousemove', handleRangeUpdate))`**：
         - 當你在滑桿上移動滑鼠時，也會觸發 `handleRange` 函數，及時更新音量或播放速度。

    4. 進度條的滑動
       - **`progress.addEventListener('click', scrub)`**：
         - 當你點擊進度條時，會觸發 `scrub` 函數，將影片的播放時間設定為你點擊的位置。
       - **`progress.addEventListener('mousedown', () => scrubMouseDown = true)`**：
         - 當你按下滑鼠時，將 `mousedown` 設為 `true`，表示你正在拖動進度條。
       - **`progress.addEventListener('mouseup', () => scrubMouseDown = false)`**：
         - 當你放開滑鼠時，將 `mousedown` 設為 `false`，表示停止拖動進度條。
       - **`progress.addEventListener('mousemove', (e) => scrubMouseDown && scrub(e))`**：
         - 當滑鼠在進度條上移動時，程式會檢查 scrubMouseDown 的值。如果它是 true，就執行 scrub(e)，這樣影片的進度才會更新。





## HTML5 Video API 
HTML5 提供了一個內建的多媒體 API，允許開發者在網頁中嵌入、播放和控制影片。

### `<video>` 元素
`<video>` 是 HTML5 中用來播放影片的元素，內建許多屬性與方法來控制影片播放。

``<video src="example.mp4" controls></video>``

- **`src`**：影片的來源路徑。
- **`controls`**：顯示播放控制面板（如播放、暫停、音量等）。

### 常用屬性
1. **`currentTime`**：返回或設置影片的當前播放時間，單位為秒。
   ``video.currentTime = 10;  // 將影片跳轉到第 10 秒``

2. **`duration`**：影片的總時長，單位為秒。
   ``console.log(video.duration);  // 輸出影片總時長``

3. **`paused`**：表示影片是否在暫停狀態，返回 `true` 或 `false`。
   ``if (video.paused) { video.play();  // 如果影片是暫停狀態，就播放 }``

4. **`volume`**：設置或返回影片的音量，範圍為 0（靜音）到 1（最大音量）。
   ``video.volume = 0.5;  // 將音量設置為 50%``

5. **`playbackRate`**：設置影片的播放速度，1 是正常速度。
   ``video.playbackRate = 1.5;  // 影片以 1.5 倍速度播放``

### 常用方法
1. **`play()`**：開始播放影片。
   ``video.play();``

2. **`pause()`**：暫停影片播放。
   ``video.pause();``

3. **`load()`**：重新加載影片並從頭開始播放。


### 此案例為什麼不需要 new 建立實體？
在 HTML 中，當瀏覽器解析到 `<video>` 標籤時，它會自動將這個標籤轉換成一個 JavaScript 對象，也就是我們所說的 DOM 元素。這個過程不需要我們手動使用 `new` 運算子來創建實例。

**原因如下：**
1. **瀏覽器自動實例化：** 瀏覽器會為 HTML 文檔中的每個元素創建一個對應的 DOM 對象。當你使用 `document.querySelector('.viewer')` 選取到 `<video>` 元素時，得到的其實就是瀏覽器已經創建好的這個 DOM 對象。
2. **DOM 元素是內建對象：** `<video>` 元素對應的 DOM 對象屬於 `HTMLMediaElement` 類型。這個類別是瀏覽器內建提供的，它定義了所有媒體元素（如 `<audio>`、`<video>`）共有的屬性和方法。
3. **直接使用屬性和方法：** 因為 DOM 元素已經被實例化，所以我們可以直接使用它的屬性（如 `currentTime`、`volume`）和方法（如 `play()`、`pause()`），而不需要額外創建實例。

**舉例來說：**
```javascript
const video = document.querySelector('.viewer');
video.play(); // 直接呼叫 play() 方法開始播放影片
```

**這就好比：**
你走進一家餐廳，看到桌子上已經擺好了餐具。你不需要自己去工廠生產餐具，而是可以直接拿起餐具使用。同樣地，瀏覽器已經為我們準備好了 `<video>` 元素的對象，我們可以直接使用它。

**總結：**
* `<video>` 元素在瀏覽器中已經是現成的 JavaScript 對象。
* 我們不需要使用 `new` 運算子來創建它的實例。
* 可以直接通過 DOM 操作來獲取這個對象並使用它的屬性和方法。


## `document.querySelector` 與 `player.querySelector` 的區別

1. **`document.querySelector`**：
   - 這個方法會在整個文檔中查找符合選擇器的第一個元素。這意味著如果你使用 `document.querySelector('.viewer')`，它會在整個 HTML 文件中查找類別為 `viewer` 的第一個元素。

2. **`player.querySelector`**：
   - 當你已經選取了一個特定的元素（在這裡是 `.player`），你可以使用該元素的 `querySelector` 方法來查找它的子元素。這樣做的好處是只會在這個特定的 `player` 元素內部查找符合條件的元素，而不會在整個文檔中查找。

### 為什麼選擇 `player.querySelector`

- **提高效率**：當你知道元素的結構時，使用 `player.querySelector` 可以提高查找效率，因為瀏覽器只需要在 `player` 元素內查找，而不是在整個文件中。
- **避免衝突**：如果檔案中有多個相同類別的元素（例如，可能有多個 `.viewer`），使用 `player.querySelector` 可以確保你獲得的是與 `.player` 相關的那一個子元素，而不是其他地方的元素。


## parseFloat() 和 Number() 的差異

### 1. 功能
- **parseFloat()**: 這個函數會把字串中的數字部分轉換成浮點數（小數）。它會從字串的開頭開始讀，直到遇到不是數字的字符為止。
- **Number()**: 這個函數會把任何值轉換成數字，包括字串、布林值和其他類型。如果字串不是有效的數字，則會返回 `NaN`（不是數字）。

### 2. 如何運作
- **parseFloat()**: 如果字串的開頭有數字，`parseFloat()` 會把它們轉換成浮點數。如果開頭不是數字，則返回 `NaN`。例如，`parseFloat("3.14abc")` 會得到 `3.14`。
- **Number()**: 它會檢查整個字串。如果字串包含任何非數字字符（除了空白字符），就會返回 `NaN`。例如，`Number("3.14abc")` 會得到 `NaN`。

### 3. 使用情境
- **parseFloat()**: 當你需要從一個可能包含其他文字的字串中提取數字時，使用 `parseFloat()` 會比較合適。
- **Number()**:  當你想要更全面地轉換任何東西為數字，但要記得它會回傳 0 代表無法轉換的情況。

### 4. 結論
總的來說，`parseFloat()` 更專注於從字串中提取數字，而 `Number()` 則是用來將值轉換成數字。在使用這兩個函數時，要根據你的需要選擇合適的函數。
