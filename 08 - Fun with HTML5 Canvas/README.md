# 08  Fun with HTML5 Canvas

## 內容
滑鼠按下後，可以透過拖曳在畫面上畫畫。

## key point
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Mother-effing hsl](https://mothereffinghsl.com/)
- 繪圖疊放（`ctx.globalCompositeOperation = 'multiply'`）：[ctx.globalCompositeOperation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)


## 任務拆解

### HTML5 Canvas  設定

### HTML5 Canvas 繪圖功能
### 滑鼠事件綁定
#### 1. `mousedown`
- **描述**：當用戶按下鼠標按鍵時觸發。
- **用途**：檢測開始動作，例如拖動。
  
#### 2. `mousemove`
- **描述**：當鼠標在元素上移動時觸發。
- **用途**：實現拖拽或顯示提示資訊。

#### 3. `mouseup`
- **描述**：當用戶釋放鼠標按鍵時觸發。
- **用途**：結束動作，例如完成拖動。

#### 4. `mouseout`
- **描述**：當鼠標指標移出一個元素時觸發此事件。
- **用途**：可用於隱藏提示資訊、改變元素的樣式或執行其他互動行為。



## HTML5 Canvas 

### 1. 選取 Canvas 元素
- 使用 `querySelector()` 方法選取 `<canvas>` 元素，並將其儲存在變數中。
- 須確保 HTML 中存在該 `<canvas>` 元素，以便進行後續操作。

### 2. 取得 2D 繪圖上下文
- 使用原生方法 `getContext('2d')` 來獲取 2D 繪圖上下文。這是 HTML5 Canvas 提供的內建方法，可以從 `<canvas>` 元素中獲取繪圖環境。
- **`getContext()`** 支援多種繪圖模式，如 `2d` 用於 2D 繪圖，`webgl` 用於 3D 繪圖等。常用的 `2d` 繪圖上下文包含各種方法，用於繪製線條、形狀、文字和圖片。
- 所有繪圖操作都通過此上下文物件進行。



### 2. 設定 Canvas 的寬度和高度
- 將 `canvas.width` 和 `canvas.height` 設置為 `window.innerWidth` 和 `window.innerHeight`，使畫布填滿整個視窗，實現全屏顯示效果。

```javascript
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

```

### 3. 常用的 2D 繪圖context屬性

```javascript
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
```

- **`strokeStyle`**：
  - **描述**：設定線條的顏色或樣式。
  - **用法**：可以使用顏色代碼、顏色名稱或漸變等來設置線條的顏色。
  
- **`fillStyle`**：
  - **描述**：設定填充顏色或樣式，用於填充形狀內部。
  - **用法**：同樣可以使用顏色代碼、顏色名稱或漸變等來設置填充的顏色。
  
- **`lineJoin`**：
  - **描述**：設定線條交匯處的樣式。
  - **選項**：
    - `'round'`：圓角連接。
    - `'bevel'`：斜角連接。
    - `'miter'`：尖角連接（默認值）。
    
- **`lineCap`**：
  - **描述**：設定線條末端的樣式。
  - **選項**：
    - `'butt'`：平直末端。
    - `'round'`：圓形末端。
    - `'square'`：方形末端。
    
- **`lineWidth`**：
  - **描述**：設定線條的寬度，數值越大線條越粗。

- **`globalAlpha`**：
  - **描述**：設定全局透明度，範圍從 `0.0`（完全透明）到 `1.0`（完全不透明）。這會影響所有後續繪製操作的透明度。

### 4. 繪圖方法
- **`beginPath()`**：開始一條新路徑。必須在繪製形狀之前調用此方法。
- **`moveTo(x, y)`**：將筆觸移動到指定的 `(x, y)` 坐標。
- **`lineTo(x, y)`**：從當前位置繪製一條線到指定的 `(x, y)` 坐標。
- **`stroke()`**：根據當前樣式繪製路徑的邊框。
- **`fill()`**：根據當前填充樣式填充路徑內部。
- **`arc(x, y, radius, startAngle, endAngle, anticlockwise)`**：繪製圓弧，指定圓心 `(x, y)`、半徑、起始角度和結束角度。

### 5. 總結
- 使用 `querySelector()` 選取 `<canvas>`，並利用原生的 `getContext('2d')` 取得 2D 繪圖上下文進行繪圖。
- 調整畫布的寬度和高度使其適應視窗大小。
- 設定繪圖的顏色、填充顏色、全局透明度、線條轉角、末端樣式以及線條寬度等，以準備進行繪圖操作。

這些設置為畫布繪製做好了基本準備，使得線條繪製顯得圓潤且粗細適中，並且能夠靈活地使用各種繪圖方法。


## HSL 色彩模式筆記

HSL 代表 **Hue（色相）**、**Saturation（飽和度）** 和 **Lightness（亮度）**，是一種表示顏色的方式，通常用於設計和圖形編輯中。這種表示法比傳統的 RGB 色彩模式更直觀，特別是在處理顏色的變化時。

### 1. 色相 (Hue)
- **定義**：色相表示顏色的類型，通常用度數（0° 到 360°）來表示。
- **顏色對應**：
  - 0° 或 360°：紅色
  - 120°：綠色
  - 240°：藍色
  - 60°：黃色
  - 180°：青色
  - 300°：紫色

### 2. 飽和度 (Saturation)
- **定義**：飽和度表示顏色的強度或純度，範圍從 0% 到 100%。
  - 0%：無飽和度（灰色，沒有顏色）
  - 100%：完全飽和（純顏色）
- 飽和度越低，顏色看起來越灰，越高則顏色越鮮豔。

### 3. 亮度 (Lightness)
- **定義**：亮度表示顏色的明亮程度，範圍也從 0% 到 100%。
  - 0%：完全黑色
  - 100%：完全白色
- 50% 的亮度通常表示顏色的正常顯示，低於 50% 則顏色變暗，高於 50% 則顏色變亮。

### 4. HSL 的語法
HSL 的表示方式通常是這樣的：
**hsl(hue, saturation, lightness)**

- 範例：
  - `hsl(0, 100%, 50%)` 代表純紅色。
  - `hsl(120, 100%, 50%)` 代表純綠色。
  - `hsl(240, 100%, 50%)` 代表純藍色。
  - `hsl(0, 0%, 50%)` 代表灰色，因為飽和度是 0%。

### 小結
HSL 色彩模式提供了一種更直觀的方式來選擇和調整顏色，尤其適合於設計和藝術創作中。相比於 RGB 模式，HSL 更容易理解顏色的變化，特別是在需要調整顏色的強度和亮度時。這使得 HSL 在許多設計工具和網頁設計中廣泛使用。
