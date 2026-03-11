import { createLazyRoute } from "@tanstack/react-router";
import { PredictActivityPage } from "../../pages/predict-activity";

export const Route = createLazyRoute("/predict-activity")({
  component: PredictActivityPage,
});
