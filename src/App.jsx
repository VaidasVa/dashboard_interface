import './App.css'
import Nav from './components/Nav.jsx'
import Todos from './components/Todos.jsx'
import Notes from "./components/Notes.jsx";
// import styles from "./App.css"

function App() {

  return (
    <>
      <div className="App">
          <Nav/>
          <div className="personalContainer">
          {/*<img src={"./src/assets/dashb_icon.svg"}  alt={"Dashboard logo"}/>*/}
              <div><Todos/></div>
              <div><Notes/></div>
          </div>
      </div>
    </>
  )
}

export default App
