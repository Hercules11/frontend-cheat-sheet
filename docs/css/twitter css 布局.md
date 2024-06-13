```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    .container {
      height: 150px;
      display: flex;
      /* 让子元素撑满容器 */
      text-align: center;
      justify-content: center;
      line-height: 150px;
    }
    .left {
      background-color: #eee;
      width: 40px;
    }
    .middle {
      background-color: #ddd;
      flex: 1;
      /* 让子元素撑满容器 */
      max-width: 240px;
      width: 100%;
    }
    .right {
      background-color: #eee;
      display: none;
    }

    @media screen and (min-width: 420px) {
      .right {
        width: 120px;
        display: block;
      }
    }

    @media screen and (min-width: 460px) {
      .left {
        width: 80px;
      }
    }
  </style>
  <body>
    <div class="container">
      <div class="left">left</div>
      <div class="middle">middle</div>
      <div class="right">right</div>
    </div>
  </body>
</html>


```
要求如下：

    1. when viewport width is not enough, set left column to 40px wide and middle column to stretching.
    2. middle column has maximum width of 240px
    3. when there is enough space, show right column which has width of 120px
    4. if there is more space, set left column to 80px
    5. when right column is visible, set minimum 10px space horizontally to the viewport border
