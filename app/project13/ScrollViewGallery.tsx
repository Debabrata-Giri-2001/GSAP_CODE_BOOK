"use client";

import React from 'react';
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import "./style.css"
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const ScrollViewGallery = () => {
    useGSAP(() => {
        if (typeof window === 'undefined') return;

        const size = Math.max(window.innerWidth, window.innerHeight);

        // ✅ Initialize ScrollSmoother
        ScrollSmoother.create({
            smooth: 1, // seconds it takes to "catch up"
            effects: true, // look for data-speed attributes
            normalizeScroll: true,
            smoothTouch: 0.1,
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
        });

        // Set background images for all gridBlocks
        gsap.set('.gridBlock', {
            backgroundImage: i => `url(https://picsum.photos/${size}/${size}?random=${i})`
        });

        const bigImg = new Image();
        bigImg.addEventListener("load", () => {
            gsap.to(".centerPiece .gridBlock", { autoAlpha: 1, duration: 0.5 });
        });
        bigImg.src = `https://picsum.photos/${size}/${size}?random=50`;

        gsap.timeline({
            scrollTrigger: {
                trigger: ".grid-container",
                start: "top top",
                end: () => window.innerHeight * 3,
                scrub: true,
                pin: ".grid",
                anticipatePin: 1
            }
        })
            .set(".gridBlock:not(.centerBlock)", { autoAlpha: 0 })
            .to(".gridBlock:not(.centerBlock)", { duration: 0.1, autoAlpha: 1 }, 0.001)
            .from(".gridLayer", {
                scale: 3.3333,
                ease: "none",
            });

    }, []);


    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                <div className='m-0 p-0 overflow-x-hidden'>
                    <h1 className="header-section text-4xl text-amber-100">
                        Scroll down to see a photo gallery being revealed
                    </h1>

                    <div className="grid-container">
                        <div className="grid">
                            <div className="gridLayer"><div className="gridBlock" /></div>
                            <div className="gridLayer"><div className="gridBlock" /></div>
                            <div className="gridLayer"><div className="gridBlock" /></div>
                            <div className="gridLayer centerPiece"><div className="gridBlock centerBlock" /></div>
                            <div className="gridLayer"><div className="gridBlock" /></div>
                            <div className="gridLayer"><div className="gridBlock" /></div>
                            <div className="gridLayer"><div className="gridBlock" /></div>
                            <div className="gridLayer"><div className="gridBlock" /></div>
                            <div className="gridLayer"><div className="gridBlock" /></div>
                        </div>
                    </div>

                    <section className='h-[100vh] bg-gray-900'></section>
                </div>
            </div>
        </div>
    );

};

export default ScrollViewGallery;
