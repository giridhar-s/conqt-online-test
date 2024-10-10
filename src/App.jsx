import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Body from "./pages/Body";

function App() {
 const router = createBrowserRouter([
  {
   path: "/",
   element: <Body />,
  },
 ]);

 return (
  <div>
   <Header />
   <RouterProvider router={router} />
  </div>
 );
}

export default App;
