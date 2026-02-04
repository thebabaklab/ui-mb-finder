import { AppFooter, AppHeader } from "@containers";
import goldDecorator from "@assets/img/gold-frame.svg";

export const ContactPage = () => {
    return (
        <>
            <AppHeader />

            <main className="px-8 lg:px-16 xl:px-8 pt-20 lg:pt-30 pb-40 md:pb-80 relative">
                <img src={goldDecorator} aria-hidden="true" className="absolute w-[700px] -z-1 -left-[15%] bottom-0" />

                {/* Contact form */}
                <section className="flex flex-col lg:flex-row max-w-[1284px] mx-auto items-center lg:items-start lg:justify-between gap-20 md:gap-30 lg:gap-50">
                    <div className="lg:max-w-[330px]">
                        <h1 className="uppercase text-primary sub-heading font-black mb-11">
                            NEED MORE?
                        </h1>

                        <p className="text-lg text-white font-light">
                            For additional information about our company or partnership opportunities, please contact us. Our team will review your request and respond promptly with the details you need.
                        </p>
                    </div>

                    <form action="" className="flex flex-col gap-4 w-full lg:w-[550px]">
                        <div className="flex flex-col gap-4">
                            <label className="pl-4 text-primary font-semibold section-title text-xl">
                                Name:
                            </label>

                            <input type="text" name="name" className="bg-platinum-silver rounded-full p-4" />
                        </div>

                        <div className="flex flex-col gap-4">
                            <label className="pl-4 text-primary font-semibold section-title text-xl">
                                Email:
                            </label>

                            <input type="email" name="email" className="bg-platinum-silver rounded-full p-4" />
                        </div>

                        <div className="flex flex-col gap-4">
                            <label className="pl-4 text-primary font-semibold section-title text-xl">
                                How can we help you?
                            </label>

                            <textarea name="message" className="bg-platinum-silver rounded-4xl p-4 resize-none" rows={8}></textarea>
                        </div>

                        <button className="transition-colors cursor-pointer border-1 border-secondary bg-secondary text-white font-light text-xl py-5 px-10 rounded-full self-end hover:bg-transparent hover:text-primary hover:border-primary">
                            Submit
                        </button>
                    </form>
                </section>
            </main>

            <AppFooter />
        </>
    );
};