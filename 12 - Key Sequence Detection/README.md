# 12 - Key Sequence Detection (KONAMI CODE)

## 內容
猜密碼

## 重點
- **事件監聽類型** : 使用 `keyup` 事件更符合預期，因為按鍵釋放後才是完整的輸入動作。
- 移除字母邏輯的差異
  - `keyArr.splice(-(secretKey.length - 1), keyArr.length - secretKey.length)` : 無論是否偵測到密碼，都會移除一定數量的字母。這樣做的目的是避免在快速連續按鍵時，陣列中的字母數量過多。這樣可以避免過度消耗內存和處理過多的字母。
  - `keyArr.splice(-(secretKey.length), secretKey.length);` : 偵測到完整的密碼時，從 keyArr 的末尾移除剛好與密碼長度相等的字母數。
- 從陣列中移除字母的時間點
  - secretKey檢查前：在每次輸入後都移除多餘的字母，從而確保陣列不會無限制增長，這在處理快速連續輸入時表現更好。
  - secretKey檢查後：在確認有完整密碼後才進行移除，這樣邏輯清晰。
