'use client'

import Image from 'next/image';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { cardsData, cyber_risk_assessment, dotcard, dotheader } from '../../utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



const Highlights = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardButtonRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);


    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
        
    })


    const handleClick = (index: number) => {
        const card = cardRefs.current[index];

        if (card) {
            const top = card.getBoundingClientRect().top + window.scrollY - 200;
            gsap.to(window, {
                duration: 1,
                ease: "power2.inOut",
                scrollTo: {
                    y: top,
                    autoKill: false,
                },
            });
        }
    };


    return (
        <section ref={containerRef} className="py-20">
            <div
                ref={cardButtonRef}
                className="sticky top-20 z-10 bg-background border-y border-gray-200 flex justify-center"
            >
                {cardsData.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => handleClick(i)}
                        className="scramble h-full w-[15rem] px-10 py-5 overflow-hidden border-x border-gray-200 relative group text-gray hover:text-white duration-300"
                    >
                        {/* Background */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:bg-[#f3f3f31f] transition-opacity duration-300">
                            <Image src={dotheader} alt="dot" fill className="object-cover" />
                        </div>

                        {/* Button wrapper - full height & flex center */}
                        <button className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                            <p>{i + 1}</p>
                            <p className="scramble-text text-sm uppercase truncate">Cyber risk assessment</p>
                        </button>
                    </div>
                ))}
            </div>

            <div className="relative z-0">
                {cardsData.map((_, i) => {
                    const targetScale = 1 - ((cardsData.length - i) * 0.05);
                    return <Card key={`p_${i}`} i={i} {...cardsData} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale} />
                })
                }
            </div>
        </section>
    );
};

export default Highlights;



const Card = ({ i, progress, range, targetScale, }: any) => {

    const container = useRef(null);

    const scale = useTransform(progress, range, [1, targetScale]);


    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-32">
            <motion.div
                style={{scale, top: `calc(-5vh + ${i * 25}px)` }}
                className="relative flex flex-col h-[700px] w-[1300px] p-[20px] origin-top bg-black  border border-gray-200 rounded-2xl"
            >
                <h2 className="text-center m-0 text-[28px]">Hello</h2>

                <div className="flex h-full mt-[50px] gap-[50px]">

                    <div className="w-[40%] relative top-[10%]">

                        <p className="text-[16px]">
                            shdfsryfgtsirfsgrdyf7sed
                        </p>

                        <span className="flex items-center gap-[5px]">

                            <a  target="_blank" className="text-[12px] underline cursor-pointer">See more</a>

                            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" fill="black" />
                            </svg>

                        </span>

                    </div>
                </div>
            </motion.div>

        </div>
    )
}