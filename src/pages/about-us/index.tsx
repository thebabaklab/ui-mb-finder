import { AppFooter, AppHeader } from "@containers";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

import mainPhoto from "@assets/img/main-photo.svg";
import cisplatinIcon from "@assets/img/cisplatin-icon.svg";
import roundedDecorator from "@assets/img/right-round-decorator.svg";
import whiteCircle from "@assets/img/white-circle.svg";
import goldCircle from "@assets/img/gold-circle.svg";
import silveCircle from "@assets/img/silver-circle.svg";
import photo1 from "@assets/img/photo-1.svg";
import photo2 from "@assets/img/photo-2.svg";
import photo3 from "@assets/img/photo-3.svg";
import photo4 from "@assets/img/photo-4.svg";
import photo5 from "@assets/img/photo-5.svg";

export const AboutPage = () => {
    return (
        <>
            <AppHeader />

            <main className="px-8 pt-50 sm:px-30 mb-29">
                {/* Who we are */}
                <section className="max-w-[1284px] mx-auto flex items-center justify-between gap-30 mb-29">
                    <div className="max-w-[500px]">
                        <h1 className="uppercase text-primary sub-heading font-black mb-11">
                            WHO WE ARE
                        </h1>

                        <p className="text-white font-light">
                            We are the Drug Discovery Lab at City University of Hong Kong,
                            an international, multidisciplinary team of young researchers
                            united by a shared mission: to advance metal-based anticancer therapy.
                            <br />
                            <br />
                            Since 2021, we have focused on designing, testing, and optimizing
                            complexes of different metals with anticancer potential.
                            Building on this foundation, we are now leveraging AI-powered tools
                            to pioneer the next generation of metallodrug discovery.
                            <br />
                            <br />
                            Collaboration lies at the core of our work. By partnering with
                            overseas research groups and drawing on Hong Kong’s vibrant,
                            globally connected scientific environment, we expand our perspectives
                            and explore cutting-edge strategies in anticancer therapy.
                            <br />
                            <br />
                            Guided by principles of scientific rigor, creativity, and
                            an interdisciplinary approach, we strive to translate fundamental science
                            into practical medical solutions, bridging the gap between
                            molecular discovery and real-world application, and pushing
                            the boundaries of metal-based therapy into a new era.
                        </p>
                    </div>

                    <div className="relative">
                        <img src={mainPhoto} className="min-w-[500px]" aria-hidden="true" />

                        <article className="absolute bg-gunmetal left-0 bottom-0 text-white w-[97%] h-[108px] rounded-r-full pl-8 pt-8 pb-5">
                            <img src={cisplatinIcon} className="absolute left-3 top-1 w-[20px]" aria-hidden="true" />

                            <p className="text-2xl font-bold">
                                MB FINDER is
                            </p>

                            <p className="photo-text font-normal">
                                determined, enthusiastic and innovative
                            </p>

                            <img src={roundedDecorator} className="absolute right-0 top-0 h-[108px]" aria-hidden="true" />
                        </article>
                    </div>
                </section>

                {/* Decorators */}
                <section className="flex items-center justify-between">
                    <img className="w-[80px]" src={whiteCircle} aria-hidden="true" />
                    <img className="w-[80px]" src={goldCircle} aria-hidden="true" />
                    <img className="w-[80px]" src={silveCircle} aria-hidden="true" />
                </section>
            </main>

            {/* Photo gallery */}
            <Splide aria-label="Photo Gallery" options={{
                type: 'loop',
                arrows: false,
                autoWidth: true,
                pagination: false,
                gap: 20,
                autoScroll: {
                    speed: 1,
                    autoStart: true,
                    pauseOnHover: false,
                    pauseOnFocus: false,
                    rewind: false,
                }
            }} extensions={{ AutoScroll }}>
                <SplideSlide>
                    <img src={photo1} aria-hidden="true" />
                </SplideSlide>

                <SplideSlide>
                    <img src={photo2} aria-hidden="true" />
                </SplideSlide>

                <SplideSlide>
                    <img src={photo3} aria-hidden="true" />
                </SplideSlide>

                <SplideSlide>
                    <img src={photo4} aria-hidden="true" />
                </SplideSlide>

                <SplideSlide>
                    <img src={photo5} aria-hidden="true" />
                </SplideSlide>
            </Splide>

            <AppFooter />
        </>
    );
};