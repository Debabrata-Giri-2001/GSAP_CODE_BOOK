"use client";

import React from 'react'
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import "./style.css"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const ImageComparison = () => {

    useGSAP(() => {
        gsap.utils.toArray(".comparisonSection").forEach((section: any) => {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "center center",
                    // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
                    end: () => "+=" + section.offsetWidth,
                    scrub: true,
                    pin: true,
                    anticipatePin: 1
                },
                defaults: { ease: "none" }
            });
            // animate the container one way...
            tl.fromTo(section.querySelector(".afterImage"), { xPercent: 100, x: 0 }, { xPercent: 0 })
                // ...and the image the opposite way (at the same time)
                .fromTo(section.querySelector(".afterImage img"), { xPercent: -100, x: 0 }, { xPercent: 0 }, 0);
        });
    }, [])

    return (
        <div className='h-[400vh] overflow-hidden'>
            <section className="panel">
                <h4 className="font-medium text-lg text-orange-100">Scroll to see the before/after</h4>
            </section>

            <section className="comparisonSection">
                <div className="comparisonImage beforeImage">
                    <img src="https://assets.codepen.io/16327/before.jpg" alt="before" />
                </div>
                <div className="comparisonImage afterImage">
                    <img src="https://assets.codepen.io/16327/after.jpg" alt="after" />
                </div>
            </section>
            <section className="panel">
                <h4 className="font-medium text-lg text-orange-100">Keep scrolling</h4>
            </section>
        </div>
    )
}

export default ImageComparison