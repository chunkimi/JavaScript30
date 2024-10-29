# 19 - Unreal Webcam Fun

## 內容
客製視訊畫面，以及提供不同的影像特效

## 步驟拆解

### 1. 取得影像
- **選取元素**：
  - 使用 `document.querySelector` 選取網頁中的元素，分別將攝影機影像的 `<video>` 標籤、畫布 `<canvas>`、畫布的繪圖上下文、顯示快照的區域 `<div>` 和快照聲音的 `<audio>` 標籤存入變數。
  
- **請求媒體流**：
  - 定義 `getVideo` 函數，透過 `navigator.mediaDevices.getUserMedia` 請求使用者的媒體裝置（攝影機）訪問權限。
  - 當用戶同意後，將返回的媒體流 (`localMediaStream`) 設定為 `<video>` 元素的 `srcObject`，這樣就可以在頁面中播放即時影像。
  - 調用 `video.play()` 開始播放影像。
  - 如果用戶拒絕訪問，則在 `.catch` 中捕捉錯誤並輸出錯誤信息。

### 2. 渲染視訊畫面
- **設定畫布大小**：
  - 定義 `renderToCanvas` 函數，取得 `<video>` 元素的寬度和高度，以便將其設置為 `<canvas>` 的大小。
  
- **繪製影像**：
  - 使用 `setInterval` 每 16 毫秒執行一次繪圖操作，這個間隔相當於約 60 幀每秒。
  - 在每次繪圖時，使用 `ctx.drawImage(video, 0, 0, width, height)` 將當前的視頻影像繪製到畫布上，從而實現實時渲染效果。

### 3. 事件監聽
- **添加事件監聽器**：
  - 在調用 `getVideo()` 之後，為 `<video>` 元素添加 `canplay` 事件的監聽器。
  - 當視頻可以開始播放時（即媒體流已經準備好），觸發 `renderToCanvas` 函數、，進行畫布的渲染。這確保視頻在準備好後立即開始繪製影像到畫布上。 

### 4. 取得畫面快照與下載
- **函數定義**：
  - 定義 `takePhoto` 函數，這個函數用於從畫布中捕獲當前影像並將其下載。

- **播放快照音效**：
  - 設定 `snap.currentTime` 為 `0`，以便在每次拍照時重新播放快照音效。
  - 調用 `snap.play()` 播放音效，提供即時的反饋。

- **獲取畫布數據**：
  - 使用 `canvas.toDataURL('image/jpeg')` 將畫布的當前內容轉換為 JPEG 格式的數據 URL，並將其存入變數 `data`。

- **創建下載連結**：
  - 使用 `document.createElement('a')` 創建一個新的 `<a>` 標籤元素，該元素將作為下載連結。
  - 將 `data` 設定為連結的 `href` 屬性，這樣點擊連結時就可以下載畫布中的影像。
  - 使用 `link.setAttribute('download', 'screen-images')` 設定下載文件的名稱為 "screen-images"。

- **插入快照**：
  - 設定連結的 `innerHTML` 為一個包含快照影像的 `<img>` 標籤，這樣可以在頁面上顯示剛拍攝的影像。
  - 使用 `strip.insertBefore(link, strip.firstChild)` 將新創建的下載連結插入到 `<div class="strip">` 的第一個子元素之前，從而將其顯示在網頁上。

- **與其他功能的集成**：
  - 此函數在按下 "Take Photo" 按鈕時被觸發，配合 `getVideo()` 和 `renderToCanvas()` 的功能，形成了一個完整的影像捕獲和下載流程，允許用戶輕鬆地從網頁攝影機拍照並下載影像。


以下是針對您提供的 JavaScript 程式碼，從第 5 個步驟開始的步驟拆解筆記：

### 5. 定義濾鏡效果函數
- **`redEffect(pixels)`**：
  - 遍歷 `pixels.data` 陣列，每 4 個元素（代表一個像素的 RGBA 值）進行處理。
  - 將紅色通道值增加 200，綠色和藍色通道值各減少 50，實現紅色效果。
  - 返回處理後的像素資料。

- **`blueEffect(pixels)`**：
  - 遍歷 `pixels.data` 陣列，每 4 個元素進行處理。
  - 將藍色通道值增加 200，紅色和綠色通道值各減少 50，實現藍色效果。
  - 返回處理後的像素資料。

- **`greenEffect(pixels)`**：
  - 遍歷 `pixels.data` 陣列，每 4 個元素進行處理。
  - 將綠色通道值增加 200，紅色和藍色通道值各減少 50，實現綠色效果。
  - 返回處理後的像素資料。

- **`rgbSplit(pixels, redOffset, greenOffset, blueOffset)`**：
  - 使用預設的偏移值（-150, 500, -550）來對像素的 RGB 通道進行分割。
  - 對每個像素，根據偏移值改變其 RGB 值，創建色彩分裂效果。
  - 返回處理後的像素資料。

- **`greenScreen(pixels)`**：
  - 創建一個空物件 `levels`，用於存儲 RGB 通道的最小值和最大值。
  - 從 RGB 控制器的輸入元素中獲取這些值並賦予 `levels` 物件。
  - 遍歷 `pixels.data`，根據每個像素的 RGB 值與 `levels` 中的最小值和最大值進行比較。
  - 若該像素的顏色落在指定範圍內，將該像素的 alpha 值設置為 0（透明）。
  - 返回處理後的像素資料。

### 6. 修改原始html，增加濾鏡選單

### 7. 處理濾鏡變更事件
- **`handleFilterChange(event)`**：
  - 透過 `event.target.value` 獲取當前選擇的濾鏡名稱，並將其賦值給 `selectedFilter`。
  - 如果選擇的濾鏡為 `greenScreen`，將 RGB 控制器的顯示樣式設置為顯示（`block`）。
  - 否則，將 RGB 控制器的顯示樣式設置為隱藏（`none`）。

### 8. 整理事件監聽與調用function 
- **調用 `getVideo()`**：
  - 透過 `getVideo()` 函數啟動攝影機並開始播放視頻流。

- **添加事件監聽**：
  - 為 `<video>` 元素添加 `canplay` 事件監聽器，當視頻可以開始播放時，調用 `renderToCanvas()` 函數進行畫布的渲染。
  - 為濾鏡選擇器添加 `change` 事件監聽器，當選擇的濾鏡變更時，調用 `handleFilterChange()` 函數以更新顯示狀態。

### 9. 整合濾鏡效果與畫布渲染
  - 在 `renderToCanvas` 函數中，根據當前選擇的濾鏡效果，對每個繪製到畫布上的像素進行處理。
  - 將處理後的像素資料通過 `ctx.putImageData(pixels, 0, 0)` 放回畫布中以實現即時濾鏡效果。

--- 

## navigator.mediaDevices.getUserMedia 
`navigator.mediaDevices.getUserMedia` 是一個 Web API，用於請求使用者的媒體裝置（如攝影機和麥克風）的訪問權限。它的主要作用如下：

1. **請求媒體流**：
   - `getUserMedia` 方法接收一個物件作為參數，指定所需的媒體類型。例如，使用 `{ video: true, audio: false }` 僅請求視頻流。
   - 當用戶允許訪問後，該方法返回一個 Promise，解決為 `MediaStream` 對象，可用於顯示或處理媒體流。

2. **支持即時通訊和影像捕獲**：
   - 獲取的媒體流可用於即時通訊、錄音、錄影等功能。例如，在視頻聊天應用中，使用 `getUserMedia` 捕獲用戶視頻並顯示於網頁上。

3. **隱私和安全性**：
   - 調用 `getUserMedia` 時，瀏覽器會要求用戶授權以保護隱私。用戶必須明確同意才能獲得媒體裝置訪問權限。
   - 若用戶拒絕授權，將返回被拒絕的 Promise，開發者可在 `.catch` 區塊中處理此情況。

### 直接調用的原因

- **全局對象**：
  - `navigator` 是全局對象，表示用戶的瀏覽器，是訪問瀏覽器和操作系統相關資訊的接口。
  - `mediaDevices` 是 `navigator` 對象的一部分，專門用於訪問媒體裝置。

- **無需事先宣告**：
  - 因為 `navigator` 和 `mediaDevices` 已由瀏覽器實現，開發者無需自行宣告或初始化這些對象，這使得訪問媒體裝置更為便捷，可以直接調用 `getUserMedia` 方法。

--- 

## `pixels.data` 改變的色彩效果與迴圈設計
透過對 `pixels.data` 的逐個像素遍歷與修改，可以靈活控制圖像的色彩效果，實現各種視覺處理效果，如色彩增強或綠幕效果。此過程的核心在於利用迴圈來逐步調整每個像素的顏色分量，從而達成所需的效果。

1. **來源與結構**：
   - `pixels` 透過 `ctx.getImageData(0, 0, canvas.width, canvas.height)` 獲取，包含了從 `<canvas>` 提取的所有像素數據。
   - `pixels.data` 是一個 `Uint8ClampedArray` 陣列，每個像素由四個分量（R, G, B, A）組成。

2. **遍歷像素數據**：
   - 使用 `for` 迴圈遍歷 `pixels.data`，每次增加 4（`i += 4`），以獲取一個像素的四個分量。
   - 在迴圈中，`i` 代表當前像素的起始索引。
  
   ```javascript
   for (let i = 0; i < pixels.data.length; i += 4) {
       const red = pixels.data[i + 0];
       const green = pixels.data[i + 1];
       const blue = pixels.data[i + 2];
       const alpha = pixels.data[i + 3];
   }
   ```

3. **顏色調整**：
   - 在迴圈中，可以對每個像素的 RGB 值進行調整：
     - 增加或減少特定顏色的分量以達到想要的效果。
     - 通常調整值應在合理範圍內（如 `-50` 至 `+200`）以避免出現不正確的顏色。

   ```javascript
   pixels.data[i + 0] = Math.min(255, red + redAdjustment);   // 調整紅色
   pixels.data[i + 1] = Math.min(255, green + greenAdjustment); // 調整綠色
   pixels.data[i + 2] = Math.min(255, blue + blueAdjustment);   // 調整藍色
   ```

4. **透明度處理**：
   - 使用條件判斷來檢查每個像素的 RGB 值是否在設定的範圍內（例如，特定的綠色範圍）。
   - 如果符合條件，將該像素的 alpha 值設為 `0`，使其變為透明。

   ```javascript
   if (green >= levels.gmin && green <= levels.gmax && 
       red >= levels.rmin && red <= levels.rmax && 
       blue >= levels.bmin && blue <= levels.bmax) {
       pixels.data[i + 3] = 0; // 設為透明
   }
   ```

5. **結果應用**：
   - 修改後的 `pixels.data` 可以透過 `ctx.putImageData(pixels, 0, 0)` 方法將更新的數據寫回到 `<canvas>`，從而在畫布上顯示變更後的圖像。
