import { AppContainer, AppFooter, AppHeader, AppSidebar } from "@containers";
import { Outlet } from "@tanstack/react-router";
import { SearchHeader } from "../../containers/app-header/search-header";

export const RootLayout = () => {
  return (
    <>
      <AppHeader />

      <SearchHeader />

      <main className="min-h-[calc(100vh_-_185px)] grow py-20">
        <AppContainer>
          <div className="flex items-start gap-25">
            <AppSidebar />

            <div className="grow">
              <Outlet />
            </div>
          </div>
        </AppContainer>
      </main>

      <AppFooter />
    </>
  );
};
