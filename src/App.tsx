import { router } from "@routes";
import { setupHttpInterceptors } from "@utils";
import { RouterProvider } from "@tanstack/react-router";

import "./global.css";
import '@splidejs/splide/dist/css/splide.min.css';

// Register the global 429 interceptor once, before any request is made.
setupHttpInterceptors();

function App() {
  return <RouterProvider router={router} />;
}

export default App;
