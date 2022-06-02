import "./css/app.css";
import EditIntern from "./EditIntern";
import InternList from "./InternList";
import { Routes, Route } from "react-router-dom";
import Logo from "./logo.svg";



function App() {
  return (
    <div className="app">
      <img src={Logo} alt="logo" className="logo" />
      <div className="grid-container">
        <main className="page">
          <Routes>
            <Route path="/" element={<InternList />} />
            <Route path="/interns/:id" exact element={<EditIntern  />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
