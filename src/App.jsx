import './App.css'
import Nav from './components/Nav.jsx'
import Todos from './components/Todos.jsx'

function App() {

  return (
    <>
      <div className="App">
          <Nav/>
          {/*<img src={"./src/assets/dashb_icon.svg"}  alt={"Dashboard logo"}/>*/}
          <Todos/>
      </div>
    </>
  )
}

export default App
