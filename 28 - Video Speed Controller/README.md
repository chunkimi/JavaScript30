# Video Speed Controller UI

## 重點

### 1. 初始化元素選擇與事件監聽
- `const video = document.querySelector(".flex")`: 選取頁面上的 `video` 元素，讓 JavaScript 能控制影片播放速度。
- `const speedWarp = document.querySelector(".speed")`: 選取影片速率控制區塊的外框，用來偵測滑鼠移動。
- `const speedBar = document.querySelector(".speed-bar")`: 選取速率顯示條，用來顯示當前速率。
- `speedWarp.addEventListener('mousemove', handleMove)`: 當滑鼠在速率控制區塊 `speedWarp` 上移動時，觸發 `handleMove` 函數。

### 2. 設定速率範圍
- `const rateMin = 0.4`: 設定最低播放速率為 0.4 倍。
- `const rateMax = 4`: 設定最高播放速率為 4 倍。
- `const rateRange = rateMax - rateMin`: 計算播放速率的範圍，用於後續計算播放速率的比例。

### 3. 計算滑鼠位置與速率百分比
- `const y = e.pageY - this.offsetTop`: 計算滑鼠在 `speedWarp` 內部的 Y 座標，減去 `speedWarp` 的頂部偏移量。
- `const percent = y / this.offsetHeight`: 計算滑鼠位置在 `speedWarp` 中的相對比例（0~1），用於控制速率和顯示。

### 4. 計算並顯示速率資訊
- `const speedBarHeight = ${Math.round(percent * 100)}%`: 計算 `speedBar` 高度比例，以百分比形式顯示滑鼠位置的速率對應值。
- `const playbackRate = percent * rateRange + rateMin`: 計算播放速率，將滑鼠位置比例轉換成指定範圍內的速率，並加上最小速率偏移量。
- 計算出的高度比例套用到 `speedBar`，讓顯示條的高度與滑鼠位置相對應。
- 更新 `speedBar` 內文顯示播放速率，並四捨五入到小數點後兩位。

### 5. 更新影片播放速率
-  將計算出的播放速率 `playbackRate` 套用到 `video` 元素，使影片隨著滑鼠移動調整速率。


### 6. (個人新增) 當滑鼠點擊時，才啟動速率調整，反之則關閉速率調整
- 設置 `isChangeRate` 變數來控制速率調整狀態。
- 當滑鼠按下時（`mousedown`），將 `isChangeRate` 設為 `true`，啟動速率調整。
- 當滑鼠放開（`mouseup`）或移出控制區域（`mouseleave`）時，將 `isChangeRate` 設為 `false`，停止速率調整。