# 01 - JavaScript Drum Kit

## 內容
透過敲擊鍵盤指定鍵，達成模擬的打鼓效果，播放對應的聲音與畫面變化。

## 關鍵
- keydown 鍵盤事件綁定 
- 鍵盤觸發完成後，需要移除互動變化
- 使用dataset來結合keycode
- forEach 和 箭頭函式
- Array.from 將類陣列建立成一個 Array

## 開發筆記
### JavaScript Drum Kit 開發重點筆記

1. **綁定 Keydown 鍵盤事件**：
   - 使用 `window.addEventListener("keydown", playKeyboard);` 對整個視窗綁定 `keydown` 事件。
   - 當任何按鍵被按下時，會觸發 `playKeyboard` 函式，負責偵測按鍵並播放相應的聲音。

2. **使用 Key Code 來對應聲音**：
   - 每個鍵盤按鈕在 HTML 中都有一個 `data-key` 屬性，代表對應的鍵盤 `keyCode`。
   - 在 `playKeyboard(e)` 中透過 `const keycode = e.keyCode;` 取得按下的鍵碼，並利用該鍵碼去查找對應的音頻與視覺元素來觸發正確的聲音和動畫。

3. **播放聲音**：
   - `const specifyAudio = document.querySelector(`audio[data-key="${keycode}"]`);` 選取按鍵所對應的 audio 元素。
   - 使用 `specifyAudio.currentTime = 0; specifyAudio.play();` 確保每次按下按鍵都從頭開始播放聲音，即使快速重複按鍵也能連續播放。

4. **添加視覺效果**：
   - 在 `playKeyboard` 函式中，使用 `const specifyKeyboard = document.querySelector(`div[data-key="${keycode}"]`);` 選取對應的視覺按鍵元素，並添加 `"playing"` 類別，從而觸發按鍵的視覺效果（如邊框顏色和縮放變化）。

5. **動畫結束後移除效果**：
   - 使用 `removeTransform(e)` 函式在 CSS 動畫結束時移除 `"playing"` 類別。
   - `allKeys.forEach((item) => { item.addEventListener("transitionend", removeTransform); });` 將 `transitionend` 事件綁定到每個 `.key` 按鈕上，以確保動畫效果完成後才移除。

6. **`Array.from` 與箭頭函式的使用**：
   - `const allKeys = Array.from(document.querySelectorAll(".key"));` 將 `.key` 元素的 NodeList 轉換為真正的陣列，以便使用 `forEach` 等陣列方法。
   - 使用箭頭函式 `(item) => { ... }`，讓程式碼在 `forEach` 迴圈中更簡潔，方便綁定 `transitionend` 事件。
   - 在現代瀏覽器中，`NodeList` 本身已經包含了 `forEach` 方法，所以嚴格來說，不需要將它轉換為陣列才能使用 `forEach`。`Array.from` 的使用在這裡並非必要，而是出於對 `NodeList` 的進一步控制，比如在不支持 `forEach` 的舊環境中，才會有轉換的需求。