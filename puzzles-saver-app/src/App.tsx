import './App.css'

function App() {
  return (
    <div><Test msg="test message"/></div>
  )
}

type TestProps = {
    msg: string
}

export function Test(props: TestProps) {
    return <h1>{props.msg}</h1>
}

export default App
