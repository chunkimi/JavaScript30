# Sticky Nav

## 內容
固定導覽列

## 步驟與重點
### 1. 設定固定導覽列
- **選取頁面元素**
  - `const body = document.body`：將 `body` 儲存至變數以便於後續操作。
  - `const nav = document.querySelector("#main")`：選取頁面中的 `#main` 導覽列。
  - `const topOfNav = nav.offsetTop`：獲取導覽列距離頁面頂端的初始偏移值。

- **監聽滾動事件**
  - `window.addEventListener('scroll', fixedNav)`：當滾動時，執行 `fixedNav` 函數，檢查滾動位置是否達到條件。

### 2. 定義固定導覽列功能 (fixedNav)
- **條件判斷與樣式更新**
  - 當 `window.scrollY >= topOfNav` 時，添加 `fix-nav` 類別並設定 `padding-top`：
    ```javascript
    body.style.paddingTop = `${nav.offsetHeight}px`
    body.classList.add(fixClass)
    ```
  - 若滾動位置小於 `topOfNav`，移除 `fix-nav` 類別並重設 `padding-top`：
    ```javascript
    body.classList.remove(fixClass)
    body.style.paddingTop = 0
    ```

### 3. CSS 新增固定導覽列
- **固定導覽列樣式**
  ```css
  body.fixed-nav nav {
    position: fixed;
    box-shadow: 0 5px 0 rgba(0, 0, 0, 0.1);
  }
  ```

### 4. CSS 新增過渡效果
- **內容區塊縮放效果**
  ```css
  body.fixed-nav .site-wrap {
    transform: scale(1);
  }
  ```

### 5. CSS 新增調整 Logo 最大寬度
- **導覽列 Logo**
  ```css
  .fixed-nav li.logo {
    max-width: 500px;
  }
  ```