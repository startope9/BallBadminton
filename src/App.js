
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Coach from "./pages/Coach";
import Umpire from "./pages/Umpire";
import Fan from "./pages/Fan";
import About from "./pages/About";
import ErrorPage from "./pages/effect/ErrorPage";

const App = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/coach',
    element: <Coach />
  },
  {
    path: '/umpire',
    element: <Umpire />
  },
  {
    path: '/fanbase',
    element: <Fan />
  },
  {
    path: '/about',
    element: <About />
  }
])

export default App;
