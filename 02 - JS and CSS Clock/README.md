# 02 - CSS + JS Clock

## 內容
模擬一個運轉中的時鐘

## 內Key Point
- The `setInterval()` method [read MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval)
- `new Date()` : 獲得當前時間
- css 設定
   - `transform-origin` : 指針初始位置與圓心
   - `transform: rotate()` : 旋轉角度
   - `transition` : 動畫過渡效果
   - `transition-timing-function: cubic-bezier(x, x, x, x)`

- 指針角度
   - 每秒鐘，秒針旋轉 6 度 (360度 / 60秒)
   - 每分鐘，分針旋轉 6 度 ( = 每秒分針轉轉0.1度（6度 / 60秒）)
   - 每小時，時針旋轉 30 度 ( = 每分鐘時針 0.5 度（30度 / 60分鐘） = 每秒時針轉動 1/120 度（0.5度 / 60秒）。)

- 需要考慮指針的角度連動：分針與秒針，時針與分針
- 注意1+n圈後，指針角度問題，[參考](https://github.com/soyaine/JavaScript30/tree/master/02%20-%20JS%20%2B%20CSS%20Clock)

