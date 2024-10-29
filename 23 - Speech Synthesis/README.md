# Speech Synthesis

## 內容
利用 Web Speech API 製作文字的語音朗讀的功能，並可以選擇AP內建的不同人聲。

## 步驟拆解
#### Step 1: 加載語音
- **事件監聽器**: 
  ```javascript
  speechSynthesis.addEventListener('voiceschanged', populateVoices)
  ```
  - 這行代碼為 `speechSynthesis` 添加了一個事件監聽器，當可用的語音列表發生變化時（例如加載時），會觸發 `populateVoices` 函數。
  
- **函數 `populateVoices`**:
  ```javascript
  function populateVoices() {
      voices = speechSynthesis.getVoices();
      voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes('en'))
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
  }
  ```
  - **`speechSynthesis.getVoices()`**: 獲取所有可用的語音，並將其存儲到 `voices` 陣列中。
  - **更新下拉選單**: 使用 `filter` 過濾出語言包含英語的語音，並生成 `<option>` 標籤，最後將其填充到下拉選單中。

---

#### Step 2: 選擇語音
- **事件監聽器**:
  ```javascript
  voicesDropdown.addEventListener('change', selectVoice);
  ```
  - 當用戶從下拉選單中選擇不同語音時，觸發 `selectVoice` 函數。

- **函數 `selectVoice`**:
  ```javascript
  function selectVoice() {
      msg.voice = voices.find(voice => voice.name === this.value);
      toggleSpeech();
  }
  ```
  - 根據選中的語音名稱，將 `msg.voice` 設置為對應的語音對象。
  - 隨後調用 `toggleSpeech()` 函數開始語音播放。

- **函數 `toggleSpeech`**:
  ```javascript
  function toggleSpeech(restart = true) {
      speechSynthesis.cancel();
      if (restart) {
          speechSynthesis.speak(msg);
      }
  }
  ```
  - **取消當前播放**: 使用 `speechSynthesis.cancel()` 停止任何正在進行的語音播放。
  - **開始播放**: 如果 `restart` 為 `true`，則使用 `speechSynthesis.speak(msg)` 播放消息。

---

#### Step 3: 設置選項
- **事件監聽器**:
  ```javascript
  options.forEach(option => option.addEventListener('change', setOption));
  ```
  - 為所有範圍滑動條和文本區域添加 `change` 事件監聽器，當用戶更改設置時觸發 `setOption` 函數。

- **函數 `setOption`**:
  ```javascript
  function setOption() {
      msg[this.name] = this.value;
      toggleSpeech();
  }
  ```
  - 根據用戶選擇的設置（如速率或音調），更新 `msg` 的對應屬性，並調用 `toggleSpeech()` 函數以反映更改。

---

#### Step 4: 語音播放控制
- **播放和停止按鈕的事件監聽器**:
  ```javascript
  speakButton.addEventListener('click', toggleSpeech);
  stopButton.addEventListener('click', () => toggleSpeech(false));
  ```
  - 為「播放」按鈕添加 `click` 事件，調用 `toggleSpeech()` 開始播放語音。
  - 為「停止」按鈕添加 `click` 事件，傳遞 `false` 給 `toggleSpeech()`，以停止當前語音而不重新播放。

---

## Web Speech API 概述

Web Speech API 是一組讓網頁能夠使用語音識別和語音合成功能的工具。以下是一些關鍵概念，以淺顯易懂的方式解釋：

1. **語音合成 (Speech Synthesis)**:
   - 這是讓電腦生成語音的過程。
   - 你可以讓網頁讀出文字，像是用機器人的聲音來講話。

2. **語音識別 (Speech Recognition)**:
   - 這是讓電腦理解人類語言的過程。
   - 例如，你可以對著麥克風說話，然後電腦將你的話轉換為文字。

3. **speechSynthesis**:
   - 這是 Web Speech API 的一部分，它是一個全局對象，不需要在代碼中顯式宣告。
   - 它在瀏覽器中自動可用，您可以直接使用它來訪問語音合成的功能。
   - 你可以用這個對象來生成聲音，讀出網頁上的文字。

4. **SpeechSynthesisUtterance**:
   - 這是一個構造函數，用來創建要讀出的語音對象。
   - 你可以設置這個對象的屬性，例如要讀出的文本、聲音的速率、音調等。

5. **speechSynthesis.getVoices()**:
   - 這是一個方法，用來獲取可用的語音列表。
   - 當你呼叫這個方法時，它會返回一個包含所有可用語音的陣列。
   - 每個語音都有屬性，如名稱、語言和性別，你可以使用這些屬性來選擇合適的語音。

### 針對本次專案的詳細說明

#### 1. SpeechSynthesisUtterance
- **用途**: 這個對象代表一段要由電腦朗讀的文本。
- **屬性**:
  - `text`: 你想要朗讀的文本內容。
  - `voice`: 指定要使用的語音（例如，女性或男性的聲音）。
  - `rate`: 語速，數值範圍通常是 0 到 10，數值越高語速越快。
  - `pitch`: 音調，數值範圍通常是 0 到 2，數值越高音調越高。
- **示例**: 
  ```javascript
  const msg = new SpeechSynthesisUtterance();
  msg.text = "Hello! I'm learning about speech synthesis.";
  ```

#### 2. speechSynthesis.getVoices()
- **用途**: 獲取可用語音的列表。
- **使用方法**: 你可以在 `voiceschanged` 事件中呼叫這個方法，確保在獲取語音列表之前，語音資料已經載入。
- **返回結果**: 
  - 返回一個陣列，陣列中的每個元素都是一個語音對象，包含語音的各種屬性（例如名稱和語言）。
- **示例**:
  ```javascript
  const voices = speechSynthesis.getVoices();
  voices.forEach(voice => {
    console.log(voice.name, voice.lang);
  });
  ```