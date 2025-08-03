"use client";

import React from 'react'
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "./style.css";
gsap.registerPlugin(ScrollTrigger);


const SimpleParallax = () => {
    let getRatio = (el: any) => window.innerHeight / (window.innerHeight + el.offsetHeight);

    useGSAP(() => {
        gsap.utils.toArray(".sectionNine").forEach((section: any, i) => {
            const bg = section.querySelector(".bgNine");
            if (!bg) return;

            bg.style.backgroundImage = `url(https://assets.codepen.io/16327/portrait-pattern-${i + 1}.jpg)`;

            gsap.fromTo(bg, {
                backgroundPosition: () => i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px"}, {
                backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: () => i ? "top bottom" : "top top",
                    end: "bottom top",
                    scrub: true,
                    invalidateOnRefresh: true
                }
            });
        });
    }, []);



    return (
        <div>
            <section className='sectionNine'>
                <h1 className='text-[10vw] z-10 relative font-semibold text-center'>Simple parallax sections</h1>
            </section>
            <section className="sectionNine">
                <div className="bgNine"></div>
                <h1 className='text-[10vw] z-10 font-semibold text-center'>Hey look, a title</h1>
            </section>
            <section className="sectionNine">
                <div className="bgNine"></div>
                <h1 className='text-[10vw] z-10 font-semibold text-center'>So smooth</h1>
            </section>
            <section className="sectionNine">
                <div className="bgNine"></div>
                <h1 className='text-[10vw] z-10 font-semibold text-center'>Nice, right?</h1>
            </section>
        </div>
    )
}

export default SimpleParallax
