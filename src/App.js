import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import ShoppingListsPage from "./pages/ShoppingListsPage";
import ShoppingListComponent from "./components/ShoppingListComponent";
import UserComponent from "./components/UserComponent";
import HomeButtonComponent from "./components/HomeButtonComponent";
import "./App.css"

function ShoppingListPage() {
  const { id } = useParams();

  return (
    <div>
      <div className="header">
        <HomeButtonComponent />
        <UserComponent role="Owner" name="Amanda" />
      </div>

      <ShoppingListComponent listId={id} role="Owner" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShoppingListsPage />} />
        <Route path="/list/:id" element={<ShoppingListPage />} />
      </Routes>
    </Router>
  );
}

export default App;




