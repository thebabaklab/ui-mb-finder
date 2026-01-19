import { ContactPage } from "@pages";
import { createLazyRoute } from "@tanstack/react-router";

export const Route = createLazyRoute("/contact")({
  component: ContactPage,
});
