```js
import React, { useState, useCallback } from 'react'

type UseArrayActions<T> = {
  push: (item: T) => void,
  removeByIndex: (index: number) => void
}

export function useArray<T>(initialValue: T[]): { value: T[] } & UseArrayActions<T> {
  const [state, setState] = useState(initialValue)

  const handlePush = useCallback((item: T) => {
    setState([...state, item]);
  }, [])
  const handleRemove = useCallback((index: number) => {
    const temp = [...state];
    temp.splice(index, 1)
    setState(temp)
  }, [])

  return {
    value: state,
    push: handlePush,
    removeByIndex: handleRemove,
  }
}
```

You'll notice that without the callback wrapper around push and removeByIndex we get a result of 2 where we "expect" 1. That's because without the callback wrapper, when a component gets re-rendered (or flushed, in the test), it creates a new instance of the function. So when the test collects the the push/remove functions into it's array, it's collecting two unique instance/objects of the functions in the test, which is why when you wrap it around a set, it sees that the two references are the same so it removes the dupe reference calls.

So when we wrap the push/removeByIndex functions around a callback, even when it's re-rendered, it'll retain the original function - so even while push_values has two values worth of the same-named function, it'll reduce it to 1 since they're identical in reference.

That said, I think just in general, if you're passing functions as callbacks between components/hooks, it's best to wrap it around the callback, for efficiency's sake?


为什么要使用 useCallback, 因为在组件重新渲染得到时候，函数会被再次创建，所以说，要使用 useCallback 保持对原始函数的引用。