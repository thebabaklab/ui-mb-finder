import { router } from "@routes";
import { RouterProvider } from "@tanstack/react-router";

import "./global.css";
import '@splidejs/splide/dist/css/splide.min.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
