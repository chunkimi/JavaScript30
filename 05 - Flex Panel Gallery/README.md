# 05 - Flex Panel Gallery

## key point
- 開窗漸變動畫
- css 的 `flex: 1 0 auto`; 是 flex 縮寫屬性，它定義了彈性項目的 **彈性增長系數**、**彈性收縮系數**和**基礎大小**。這三個值對應於 flex-grow、flex-shrink 和 flex-basis 屬性。
  - `flex-grow: 1` : 這表示該元素在彈性容器（flex container）中能夠按比例「增長」來填滿可用的空間。具體來說，flex-grow 設為 1 意味著這個元素會根據可用的空間擴展，並且相對於其他兄弟元素的 flex-grow 值按比例增長。例如，若其他元素的 flex-grow 為 2，那麼這個元素會增長一半的空間。

  - `flex-shrink: 0` : 這表示該元素在容器空間不足時「不會縮小」。當父級容器的空間不足以容納所有子元素時，flex-shrink: 0 會保證這個元素保持它的原始大小，無論其他元素是否縮小。

  - `flex-basis: auto` : 這設定了該元素的初始大小，auto 意味著它會根據元素的內容、寬高或其他 CSS 規則來確定初始大小。在這個基礎上，元素再依照 flex-grow 或 flex-shrink 的值進行增長或縮小。

-  **transitionend** 事件 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event)