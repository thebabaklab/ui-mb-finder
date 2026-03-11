import { AppFooter, AppHeader } from "@containers";
import { mdiChevronLeft } from "@mdi/js";
import { useRouter } from "@tanstack/react-router";
import { Button, Icon } from "@ui-kit";

export const PredictActivityPage = () => {
    const {
        history: { back },
    } = useRouter();

    return (
        <>
            <AppHeader />


            <div className="max-w-[1284px] mx-auto px-8 lg:px-0 py-8 relative">
                <Button variant="back" size="small" className="w-fit text-base font-light pl-2 pr-4 py-2" onClick={() => back()}>
                    <Icon name={mdiChevronLeft} color="current" large />
                    Back
                </Button>
            </div>

            <iframe
                src="https://metalkano-predict.streamlit.app?embed=true"
                title="MetalKANO App"
                width="100%"
                height="800"
                className="px-8"
                style={{ border: "none" }}
            />

            <AppFooter />
        </>
    );
};