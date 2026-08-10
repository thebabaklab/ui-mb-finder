import { useStore } from "@store";
import axios from "axios";

/**
 * Registers a single global axios response interceptor so that any 429
 * (rate-limited) response surfaces the server's message to the user via the
 * dismissible ThrottleBanner. Every API call uses the default axios instance,
 * so one registration covers them all. The error is still re-thrown so each
 * caller's existing catch/finally continues to run.
 */
let registered = false;

export const setupHttpInterceptors = (): void => {
  if (registered) return;
  registered = true;

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 429) {
        const data = error.response.data ?? {};
        useStore.getState().setThrottleNotice({
          message:
            data.message ??
            "You've made too many requests in a short time. Please wait a moment and try again.",
          contactUrl: data.contact_url ?? "/contact",
        });
      }
      return Promise.reject(error);
    },
  );
};
