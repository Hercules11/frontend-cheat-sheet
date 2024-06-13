```ts
// wrong ans
type Filter<T extends any[], A> =
  T extends [infer F, ...infer R]
  ? F extends A ?  [F, ...Filter<R, A>] : Filter<R, A>
  : []
// For edge case: check with any, unknown and never type
// type C = Filter<[1,'BFE', 2, any, 'dev'], string>
// C = ['BFE', any, 'dev'] | ['BFE', 'dev']
// any is not sound in typescript. It is both intersection and union.
// first case: any extends string (union). So we get ['BFE', any, 'dev']
// second case: any not extends string (intersection). So we get ['BFE', 'dev']
// final result = union of both
// ---
// type D = Filter<[1,'BFE', 2, never, 'dev'], string> // ['BFE', any, 'dev']
// D = never.
// I think (my assumption): once typescript reaches never, it just stop everything and return never. because never is unreachable
// ---
// type E = Filter<[1,'BFE', 2, unknown, 'dev'], string> // ['BFE', any, 'dev']
// unknown is not assignable to anything.
// type F = unknown extends string ? 'y' : 'f'
// F = 'f'
// never is assignable to everything.
// type G = never extends string ? 'y' : 'f'
// G = 'y'
// ---
// when face with this type of cases, wrap types within []
type Filter<T extends any[], A> =
  T extends [infer F, ...infer R]
  ? [F] extends [A] ?  [F, ...Filter<R, A>] : Filter<R, A>
  : []
// [any] extends [string] will work as union
// C = ['BFE', any, 'dev']
// ---
// [never] extends [string] will not stop code from executing. This will become true
// because never is assignable to string
// D = ['BFE', never, 'dev']
// ---
// unkonwn case was already working
```