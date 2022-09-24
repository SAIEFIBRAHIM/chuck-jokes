import "./App.scss";
import Categories from "./components/Categories";
import Header from "./components/Header";
import Search from "./components/Search";
import JokesList from "./components/JokesList";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import JokeDetails from "./components/JokeDetails";

function App() {
  return (
    <div>
      <Header />
      <Search />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Categories />
              <JokesList />
            </>
          }
        />
        <Route path="/joke/:id" element={<JokeDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
