import { useStore } from "@store";
import { Link } from "@tanstack/react-router";

/**
 * Fixed, dismissible banner shown when the API rate-limits the user (HTTP 429).
 * Displays the server's message and a link to the Contact page. Populated by the
 * global axios interceptor (see setupHttpInterceptors).
 */
export const ThrottleBanner = () => {
  const throttleNotice = useStore((s) => s.throttleNotice);
  const setThrottleNotice = useStore((s) => s.setThrottleNotice);

  if (!throttleNotice) return null;

  const dismiss = () => setThrottleNotice(null);

  return (
    <div className="fixed inset-x-0 top-0 z-[200] flex justify-center px-4 pt-4">
      <div className="pointer-events-auto flex w-full max-w-2xl items-start gap-4 rounded-2xl border border-primary bg-[#242424] px-5 py-4 shadow-xl">
        <div className="flex-1 text-sm font-light text-white">
          <p className="mb-2 font-semibold text-primary">Too many requests</p>
          <p>{throttleNotice.message}</p>
          <Link
            to="/contact"
            onClick={dismiss}
            className="mt-3 inline-block font-semibold text-primary underline underline-offset-4 hover:opacity-80"
          >
            Go to the Contact page →
          </Link>
        </div>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={dismiss}
          className="shrink-0 cursor-pointer text-2xl leading-none text-white/60 transition-colors hover:text-white"
        >
          ×
        </button>
      </div>
    </div>
  );
};
