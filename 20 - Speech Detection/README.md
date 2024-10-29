# 20 - Speech Detection

## 重點

- **語音識別初始化**：使用 `SpeechRecognition` 初始化語音識別對象，並設置語言和即時結果支持。
- **即時結果**：設置 `recognition.interimResults = true` 來啟用即時的語音識別結果。
- **監聽語音識別結果事件**：
  - 監聽 `result` 事件來處理語音識別的輸出。當語音識別結果出現時，會觸發這個事件。
  - **`e.results`** 是一個多維數組，包含每次語音輸入的識別結果（即便輸入仍在進行中）。每個元素代表一個語音片段，包含多個可能的識別結果，其中 `result[0]` 是最有可能的轉錄文本。
 - 使用 `Array.from(e.results)` 將識別結果轉換為數組。
  - 提取每個語音結果的 `transcript`，即語音識別的轉錄文本，並使用 `join('')` 將所有文本連接成一個字串。

- **段落動態創建**：每次識別到完整的語音段落時（當 `e.results[0].isFinal` 為 `true`），動態創建新的 `<p>` 元素並將其添加到 `.words` 容器中，為後續的語音識別結果做準備。
- **自動重啟語音識別**：在語音識別結束後，監聽 `end` 事件並調用 `recognition.start()` 重新啟動語音識別，保持識別功能持續運行。

---
## 語音結果提取與處理

```javascript
const transcript = Array.from(e.results)
  .map((resultArray) => resultArray[0])  // 從每個結果中提取最有可能的語音轉錄
  .map((resultItem) => resultItem.transcript)  // 提取出每個結果的轉錄文本
  .join("");  // 將多個片段拼接成一個完整的字串
```

- **轉換語音結果為數組**：`Array.from(e.results)` 將語音結果的類數組物件轉換為一個標準的數組，方便使用陣列的各種方法進行處理。
- **提取最可信的結果**：
  - 使用 `.map(resultArray => resultArray[0])` 從每個語音片段的結果中提取 `resultArray[0]`，這代表每個片段中最有可能的語音識別結果。
  - `resultArray[0]` 包含 `transcript` 屬性，它是這次語音片段的文本轉錄結果。
- **提取轉錄文本**：
  - 使用 `.map(resultItem => resultItem.transcript)` 提取每個最有可能的語音結果的 `transcript` 屬性，這裡的 `transcript` 是具體的轉錄文本。
- **文本拼接**：
  - `join('')` 將提取的轉錄文本數組合併成一個單一的字串，將多個語音片段的結果合併成一個完整的句子或段落，便於在網頁上顯示。


---
## **SpeechRecognition 
- **SpeechRecognition** 是 Web Speech API 中的介面，用來進行語音識別。它允許網頁應用程式接收用戶的語音輸入，將其轉換為文本，並且提供多種事件和方法來處理語音識別的過程和結果。
- **語音識別引擎**：大多數現代瀏覽器支持 `window.SpeechRecognition`，而部分舊版的 Chrome 瀏覽器則使用 `window.webkitSpeechRecognition`。

### **SpeechRecognition 設定屬性**
1. **`interimResults`**：設定為 `true` 時，語音識別結果會即時傳回（即使語音輸入還未結束）。這讓應用能夠動態地處理輸入。
2. **`lang`**：設定語音識別的語言。默認情況下為瀏覽器的語言設定，這裡使用 `en-US` 來指定美式英語。

### **SpeechRecognition 主要原型方法**
1. **`start()`**：
   - 開始語音識別。當調用此方法後，應用程式會開始錄音並識別語音輸入。
   - 語法：`recognition.start();`
   - 當 `recognition.end` 事件被觸發後，可以再次調用 `start()` 來重新啟動語音識別。

2. **`stop()`**：
   - 結束語音識別並停止錄音。此方法不會觸發語音識別的結果事件。
   - 語法：`recognition.stop();`

3. **`abort()`**：
   - 停止語音識別，但會取消已識別的結果，語音識別結束後不會返回結果。
   - 語法：`recognition.abort();`

### **SpeechRecognition 事件監聽**
1. **`result`** 事件：
   - 當語音識別引擎接收到語音並識別為文本時，會觸發 `result` 事件。
   - 監聽範例：
     ```javascript
     recognition.addEventListener('result', (e) => {
       const transcript = Array.from(e.results)
         .map(result => result[0])
         .map(result => result.transcript)
         .join('');
     });
     ```
   - **e.results** 是語音識別的結果對象，包含所有被識別的文本片段和相應的置信度。

2. **`end`** 事件：
   - 當語音識別過程結束時（語音輸入停止或語音識別遇到錯誤）觸發。
   - 可用來在語音識別結束後自動重啟語音識別，例如：
     ```javascript
     recognition.addEventListener('end', recognition.start);
     ```

3. **`error`** 事件：
   - 當語音識別過程中出現錯誤時觸發。可用於處理錯誤情況，如無法識別語音、網絡問題等。

4. **`start`** 事件：
   - 語音識別過程開始時觸發，可以用來更新 UI 狀態或提示用戶開始語音輸入。

5. **`speechstart`** 事件：
   - 當語音輸入檢測到語音時觸發，表示用戶開始說話。

6. **`speechend`** 事件：
   - 當語音輸入結束時（檢測到用戶停止說話）觸發。

### **SpeechRecognition 設定範例**
```javascript
const recognition = new SpeechRecognition();
recognition.interimResults = true;  // 開啟即時結果
recognition.lang = 'en-US';  // 設置語言為美式英語

// 開始語音識別
recognition.start();

// 當語音識別結束時重新啟動
recognition.addEventListener('end', () => {
  recognition.start();
});

// 處理語音識別結果
recognition.addEventListener('result', (e) => {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
  
  console.log(transcript);
});
```

### **其他重要屬性**
1. **`maxAlternatives`**：設置返回的語音識別結果數量，默認為 1，表示僅返回最有可能的結果。
2. **`continuous`**：如果設置為 `true`，則允許在語音識別過程中進行長時間的語音輸入，而不會在偵測到暫停時結束。