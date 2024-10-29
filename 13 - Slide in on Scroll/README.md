# 13 - Slide In on Scroll

## 內容
圖片隨頁面滑動，依序漸入漸出

## 重點
### 1. Debounce 函數 (原始提供)
- 用於控制觸發`handleSlide`事件的頻率，以避免滾動事件頻繁觸發導致性能問題。
- **參數**：
  - `func`: 要執行的函數。
  - `wait`: 等待的毫秒數（預設為 20ms）。
  - `immediate`: 是否立即執行（預設為 `true`）。

### 2. 選取 `slideImages` 元素
- 使用 `document.querySelectorAll` 選取所有需要滑入的元素。

### 3. 添加事件監聽
- 在 `window` 上添加滾動事件監聽器，當滾動時調用`handleSlide`事件。

### 4. 滑動事件 `handleSlide`判斷元素是否進入視窗
- 每個元素的狀態依賴於：
  - **滑入位置**：元素的上邊界與視窗的下邊界是否重疊。
  - **滑出位置**：元素的下邊界是否仍在視窗內。
-  `window.scrollY` 獲取當前滾動位置，計算出何時該元素滑入視野。
  - `visiblePosition = (window.scrollY + window.innerHeight) - imageItem.height / 2;` 
    - `window.scrollY + window.innerHeight` 計算的是目前視窗的底部位置，這是使用者正在查看的內容的最下方
    - `減掉 imageItem.height / 2` 是為了確保在圖片的中間部分進入視窗時觸發效果。也就是說，當圖片的中心點到達視窗底部的時候，圖片將開始滑入視野。
-  `visibleBottom = imageItem.offsetTop + imageItem.height;` : 計算圖片的下邊界位置，判斷圖片是否已經完全滾出視窗。
- `isImageHalfVisible` : 即檢查圖片是否有一半在視窗內可見。
- `isImageStillInView` : 檢查圖片是否仍然在視窗中可見，且未被滾過去。

### CSS 設定
- 目標
  - 使元素最初透明且偏移。
  - 當元素進入視野時，變為不透明並回到原位。
- 設定
  - `opacity`：控制元素的透明度。在此案例中，當圖片進入視窗時，透明度從 `0`（完全透明）過渡到 `1`（完全不透明），實現淡入效果。
  - `transition`：平滑過渡屬性的變化，使得圖片的透明度和變形在改變時不會突然發生，而是以指定的時間（如 `0.5s`）平滑過渡。
  - `transform`：對元素進行變形操作，當圖片進入視窗時，使用 `transform` 使其初始狀態向左平移並縮小（`scale(0.95)`），然後在變為可見時恢復到原始位置和大小（`translateX(0)` 和 `scale(1)`），創造出滑入的視覺效果。

### 整合流程
1. 定義並選取需要滑入的元素。
2. 在滾動時，檢查這些元素的位置。
3. 根據元素的位置添加或移除 `.active` 類別，實現滑入效果。
