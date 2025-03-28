When creating a react component or typescript keep in mind
avoiding the following (and try to refactor if possible, ask questions if something seems not clear):

- Using lambdas directly in props using JSX or TSX
- Exporting the creation of an instance instead of the class (a.k.a singleton)
- Creating a very big object with too much responsibility and domains
- The following pattern is not acceptable in any case

```tsx
const Component = ({someStateValue})=>{
  const [state, setState] = useState()

  useEffect(()=>{
    setState(someStateValue)
  }, [someStateValue])

  /** some visual related code */
}
```
