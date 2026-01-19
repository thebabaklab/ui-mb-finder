import { AppFooter, AppHeader } from "@containers";
import goldDecorator from "@assets/img/gold-frame.svg";

export const ContactPage = () => {
    return (
        <>
            <AppHeader />

            <main className="px-8 pt-50 sm:px-30 pb-110 relative">
                <img src={goldDecorator} aria-hidden="true" className="absolute w-[700px] -left-[15%] bottom-[10%]" />

                {/* Contact form */}
                <section className="flex items-start justify-between gap-50">
                    <div className="max-w-[330px]">
                        <h1 className="uppercase text-primary sub-heading font-black mb-11">
                            NEED MORE?
                        </h1>

                        <p className="text-white font-light">
                            For additional information about our company
                            or partnership opportunities, please contact us.Our team will review your request and
                            respond promptly with the details you need.
                        </p>
                    </div>

                    <form action="" className="flex flex-col gap-4 w-[550px]">
                        <div className="flex flex-col gap-4">
                            <label className="pl-4 text-primary font-semibold section-title">
                                Name:
                            </label>

                            <input type="text" name="name" className="bg-platinum-silver rounded-full p-4" />
                        </div>

                        <div className="flex flex-col gap-4">
                            <label className="pl-4 text-primary font-semibold section-title">
                                Email:
                            </label>

                            <input type="email" name="email" className="bg-platinum-silver rounded-full p-4" />
                        </div>

                        <div className="flex flex-col gap-4">
                            <label className="pl-4 text-primary font-semibold section-title">
                                How can we help you?
                            </label>

                            <textarea name="message" className="bg-platinum-silver rounded-4xl p-4 resize-none" rows={8}></textarea>
                        </div>

                        <button className="transition-colors cursor-pointer border-1 border-secondary bg-secondary text-white font-light text-2xl py-5 px-10 rounded-full self-end hover:bg-transparent hover:text-primary hover:border-primary">
                            Submit
                        </button>
                    </form>
                </section>
            </main>

            <AppFooter />
        </>
    );
};