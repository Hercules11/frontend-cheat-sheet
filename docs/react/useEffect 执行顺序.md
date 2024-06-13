```js
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

function App() {
  const [state, setState] = useState(0)
  console.log(1)

  useEffect(() => {
    console.log(2)
  }, [state])

  Promise.resolve().then(() => console.log(3))

  setTimeout(() => console.log(4), 0)

  const onClick = () => {
    console.log(5)
    setState(num => num + 1)
    console.log(6)
  }
  return <div>
    <button onClick={onClick}>click me</button>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)

setTimeout(() => userEvent.click(screen.getByText('click me')), 100)
```

打印结果：
```js
1 // render component
2 // commit phase , dom updates and effects execution
3 // macro task
4 // macro task
5 // click events
6 // click events
1 // rerender component
2 // effects execution
3 // macro task
4 // macro task
```