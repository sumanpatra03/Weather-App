import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CitysTable from "./Components/CitysTable";
import WatherPage from "./Components/WatherPage";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CitysTable />} />
            <Route path="/weather/:cityName" element={<WatherPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
