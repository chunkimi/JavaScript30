# 10 - Hold Shift and Check Checkboxes
## 重點

- **事件處理** ：使用 `click` 事件來捕捉用戶對復選框的操作，當用戶點擊復選框時觸發自定義邏輯。

-  **Shift 鍵檢測** ：使用 `e.shiftKey`來檢測用戶是否按下了 Shift 鍵，從事件對象中讀取屬性以實現條件判斷。

-  **範圍選擇邏輯**  
   使用 `forEach` ：迴圈和條件語句來實現多選功能，遍歷所有復選框，確定範圍並設定中間區域的復選框狀態。
- **isBetween** : `isBetween`在點擊復選框時，用來標記當前迴圈遍歷的復選框，是否位於最後一次選中的復選框與當前選中的復選框之間。
  - 初始狀態：`isBetween` 的初始值為 `false`，表示當前沒有處於兩個選中復選框之間的狀態。
  - 迴圈中遍歷復選框的過程中，當遇到 `lastChecked`（上次選中的復選框）或當前點擊的復選框時，`isBetween` 會切換它的狀態：
   - 當遇到其中之一時，`isBetween = !isBetween`，表示開始或結束標記範圍。
   - 如果 `isBetween` 為 `true`，則表示當前復選框在這兩個選中框之間，需要將它設置為選中狀態。