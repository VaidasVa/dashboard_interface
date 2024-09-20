import './App.css'
import Nav from './components/Nav.jsx'
import Todos from './components/Todos.jsx'
import Notes from "./components/Notes.jsx";
import NewsLrt from "./components/NewsLrt.jsx";

function App() {

    return (
            <div className="App">
                <Nav/>
                <div className="personalContainer">
                    <div className={"one"}><Todos/></div>
                    <div className={"two"}><Notes/></div>
                    <div className={"three"}><NewsLrt/></div>
                </div>
            </div>
    )
}

export default App
