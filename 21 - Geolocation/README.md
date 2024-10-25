# Geolocation based Speedometer and Compass

## 重點

1. **`navigator` 的全域特性**
   - `navigator` 是 JavaScript 的內建全域物件，無需宣告，所有瀏覽器環境中均可直接使用，不需要宣告。
   - 常用於取得裝置資訊，如地理位置、瀏覽器的 user-agent、語言設定等。
   - 例如：
      - `navigator.geolocation`：提供地理位置功能。
      - `navigator.userAgent`：取得用戶端的瀏覽器資訊。
      - `navigator.language`：取得使用者的語言設定。

2. **地理位置追蹤**
   - `navigator.geolocation.watchPosition` 用於持續監控裝置的即時地理位置變化。
   - 該方法接收兩個參數：位置更新的 `successCallback(data)` 回調函數和可選的 `errorCallback(error)` 錯誤回調函數。

3. **元素操作**
   - 使用 `document.querySelector` 選取 `.arrow` 和 `.speed-value` 元素，分別用於顯示裝置方向及速度。
   - 範例：
     ```javascript
     const arrow = document.querySelector('.arrow');
     const speed = document.querySelector('.speed-value');
     ```

4. **成功回調函數**
   - 當位置更新時，自動調用 `successCallback` 函數並傳入位置物件 `data`。
   - 使用 `data.coords` 物件獲取速度 (`speed`) 和方向 (`heading`) 資訊，並更新頁面顯示：
     ```javascript
     speed.textContent = data.coords.speed;  // 顯示當前速度
     arrow.style.transform = `rotate(${data.coords.heading}deg)`;  // 旋轉箭頭以指示方向
     ```

5. **錯誤回調函數**
   - 當獲取位置失敗時，`errorCallback` 將接收錯誤訊息 `err`，並輸出到控制台以便除錯。
     ```javascript
     (err) => {
       console.error(err);
     }
     ```

6. **開發提示**
   - 使用地理位置功能需用戶授權，測試或開發時應考慮位置權限處理。
   - `watchPosition` 持續監控裝置位置；若僅需單次更新，使用 `getCurrentPosition` 更合適。

---

### 簡要示例
```javascript
const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

navigator.geolocation.watchPosition(
  (data) => {
    console.log(data);
    speed.textContent = data.coords.speed;
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
  }, 
  (err) => {
    console.error(err);
  }
);
```