"use client";

import React, { useState, useRef } from 'react'
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import "./style.css";

gsap.registerPlugin(MorphSVGPlugin, Physics2DPlugin);


const MorphingPlayPause = () => {

    const [isPlaying, setIsPlaying] = useState(false);
    const mainSectionRef = useRef<HTMLElement>(null); // Ref for the main section to append dots to

    const playPath =
        "M3.5 5L3.50049 3.9468C3.50049 3.177 4.33382 2.69588 5.00049 3.08078L20.0005 11.741C20.6672 12.1259 20.6672 13.0882 20.0005 13.4731L17.2388 15.1412L17.0055 15.2759M3.50049 8L3.50049 21.2673C3.50049 22.0371 4.33382 22.5182 5.00049 22.1333L14.1192 16.9423L14.4074 16.7759";

    const pausePath =
        "M15.5004 4.05859V5.0638V5.58691V8.58691V15.5869V19.5869V21.2549M8.5 3.96094V10.3721V17V19L8.5 21";

    const buttonRef = useRef<HTMLButtonElement>(null);
    const pathView = useRef<SVGPathElement>(null); // More specific type for SVG path


    const buttonToggle = () => {

        gsap.to(pathView.current, {
            duration: 0.5,
            morphSVG: {
                type: "rotational",
                map: "complexity",
                shape: isPlaying ? playPath : pausePath
            },
            ease: "power4.inOut"
        });
        setIsPlaying(!isPlaying);
    };

    const initConfettiClick = (e: React.MouseEvent<HTMLElement>) => {
        const dotCount = gsap.utils.random(15, 30, 1);
        const colors = ["#0ae448", "#abff84", "#fffce1"];

        // Get the bounding rectangle of the main section to correctly offset dot positions
        const rect = mainSectionRef.current?.getBoundingClientRect();

        // Check if the section ref is valid before proceeding
        if (!mainSectionRef.current || !rect) {
            console.warn("Main section ref or its bounding client rect not available.");
            return;
        }

        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");

            // Append dot to the main section, not the body
            mainSectionRef.current.appendChild(dot);


            const startX = e.clientX - rect.left;
            const startY = e.clientY - rect.top;

            gsap.set(dot, {
                backgroundColor: gsap.utils.random(colors),
                position: "absolute",
                top: startY,
                left: startX,
                scale: 0,
                opacity: 1
            });


            gsap
                .timeline({
                    onComplete: () => dot.remove()
                })
                .to(dot, {
                    scale: gsap.utils.random(0.3, 1),
                    duration: 0.3,
                    ease: "power3.out"
                })
                .to(dot, {
                    duration: 2,
                    physics2D: {
                        velocity: gsap.utils.random(500, 1000),
                        angle: gsap.utils.random(0, 360),
                        gravity: 1500
                    },
                    autoAlpha: 0,
                    ease: "none"
                },
                    "<" // Start this tween at the same time as the previous one (scale animation)
                );
        }
    };


    return (
        <section
            onClick={initConfettiClick}
            ref={mainSectionRef}
            className='relative flex items-center justify-center h-[100vh] flex-col overflow-clip text-[1vw]'
        >

            <button onClick={buttonToggle} ref={buttonRef} data-play-pause="toggle" className="play-pause-button cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 25" fill="none" className="play-pause-icon">
                    <path
                        ref={pathView}
                        d="M3.5 5L3.50049 3.9468C3.50049 3.177 4.33382 2.69588 5.00049 3.08078L20.0005 11.741C20.6672 12.1259 20.6672 13.0882 20.0005 13.4731L17.2388 15.1412L17.0055 15.2759M3.50049 8L3.50049 21.2673C3.50049 22.0371 4.33382 22.5182 5.00049 22.1333L14.1192 16.9423L14.4074 16.7759" stroke="currentColor" stroke-width="2" stroke-miterlimit="16" data-play-pause="path" stroke-linecap="round"></path>
                </svg>
            </button>
        </section>
    );
};

export default MorphingPlayPause;