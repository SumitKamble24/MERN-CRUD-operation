import React from "react";
import TableGrid from "./components/tableGrid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PowerBIDash from "./components/powerBiDash";
import SignUpPage from "./components/signUpPage";
import LoginPage from "./components/loginPage";
import ProtectedRoute from "./components/ProtectedRout";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path={"/"}
            element={
              <ProtectedRoute>
                <TableGrid warn={true} />
              </ProtectedRoute>
            }
          />

          <Route
            path={"/powerBi"}
            element={
              <ProtectedRoute>
                <PowerBIDash />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
