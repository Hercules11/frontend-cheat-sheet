```js
type Slice<
  A extends any[],
  S extends number = 0,
  E extends number = A['length'],
  Discard extends any[] = [],
  Result extends any[] = []
> =
  A extends [infer Head, ...infer Tail]
    ? Discard['length'] extends S
      ? Result['length'] extends E
        ? Result
        : Slice<Tail, S, E, Discard, [...Result, Head]>
      : Slice<Tail, S, E, [...Discard, Head], Result>
  : Result
```

利用递归和 ts 数组的特性，真是太妙了