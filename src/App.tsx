import { router } from "@routes";
import { RouterProvider } from "@tanstack/react-router";

import "./global.css";
import '@splidejs/react-splide/css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
