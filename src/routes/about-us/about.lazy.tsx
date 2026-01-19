import { AboutPage } from "@pages";
import { createLazyRoute } from "@tanstack/react-router";

export const Route = createLazyRoute("/about")({
  component: AboutPage,
});
