```js
import { Ref, useState, useRef } from 'react'

export function useHover<T extends HTMLElement>(): [Ref<T>, boolean] {
  // your code here
  const [hovering, setHovering] = useState(false);
  const custormRef = useRef<T>();

  const handleMouseEnter = () => {
    setHovering(true);
  }
  const handleMouseLeave = () => {
    setHovering(false);
  }
const handler = (node: T) => {
// remove previous node event
if(custormRef.current?.nodeType === Node.ELEMENT_NODE) {
  custormRef.current.removeEventListener("mouseenter", handleMouseEnter)
  custormRef.current.removeEventListener("mouseleaver", handleMouseLeave)
}


  if(node?.nodeType === Node.ELEMENT_NODE) {
    node.addEventListener("mouseenter", handleMouseEnter)
    node.addEventListener("mouseleave", handleMouseLeave)
    custormRef.current = node;
  }
}

  return [
    handler,
    hovering
  ]
}
```
实现参考的是 https://github.com/uidotdev/usehooks/blob/main/index.js useHover 的实现
利用 ref 回调，对特定的元素，进行事件绑定
要注意的一点是，在对元素进行事件绑定的时候，要移除之前存在的绑定。

```js
  function App() {
    const [ref, isHovered] = useHover<HTMLDivElement>()
    const [refTarget, setRefTarget] = useState<number>(0)
    return (
      <div>
        <p>{isHovered ? 'hovered' : 'not hovered'}</p>
        <button
          data-testid="change-ref-target-button"
          onClick={() => {
            setRefTarget((target) => (target + 1) % 2)
          }}
        >
          toggle ref target
        </button>
        <div ref={refTarget === 0 ? ref : null} data-testid="hover-target0">
          target 0
        </div>
        <div ref={refTarget === 1 ? ref : null} data-testid="hover-target1">
          target 1
        </div>
      </div>
    )
  }
```