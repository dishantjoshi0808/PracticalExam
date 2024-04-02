import { Route, Routes } from "react-router-dom";
import "./App.css";

import MovieDetails from "./component/MovieDetails";
import MovieList from "./component/MovieList";
import NavbarComponent from "./component/NavbarComponent";

function App() {
  return (
    <div>
      {/* <MovieDetails /> */}
      <NavbarComponent />
      {/* <StudentForm /> */}
      <Routes>
        <Route path="/moviedetais" element={<MovieDetails />} />
        <Route path="/movielist" element={<MovieList />} />
      </Routes>
    </div>
  );
}

export default App;
