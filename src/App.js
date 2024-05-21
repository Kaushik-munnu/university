// import './App.css'
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import MyPerformance from "./components/MyPerformance";
import MyProfile from "./components/MyProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/sujects" element={<MyPerformance/>}/>
          <Route path="/marks" element={<MyPerformance/>}/>
          <Route path="/students" element={<MyProfile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;