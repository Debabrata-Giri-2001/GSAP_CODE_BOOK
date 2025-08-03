"use client";

import Image from 'next/image'
import React, { useRef } from 'react'
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "./style.css"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


const SmoothScrolly = () => {
    const wrapper = useRef<HTMLDivElement>(null);
    const content = useRef<HTMLElement>(null);

    useGSAP(() => {
        const skewSetter = gsap.quickTo(".imgSc", "skewY");
        const clamp = gsap.utils.clamp(-20, 20);

        ScrollSmoother.create({
            wrapper: wrapper.current,
            content: content.current,
            smooth: 2,
            speed: 3,
            effects: true,
            onUpdate: (self) => {
                const velocity = self.getVelocity();
                skewSetter(clamp(velocity / -50));
            },
            onStop: () => skewSetter(0)
        });
    }, []);


    return (
        <section className='m-0 bg-[#1a1721] overscroll-none p-0 overflow-hidden'>
            <h1 className="textImage">Scrolly Images</h1>
            <h1 aria-hidden="true" className="textImage outline-text ">Scrolly Images</h1>
            <h1 aria-hidden="true" className="textImage filter-text">Scrolly Images</h1>

            <div ref={wrapper} id="wrapper" className='overflow-hidden fixed h-full w-full top-0 left-0 right-0 bottom-0'>
                {/* Ensure the 'content' section has sufficient height to enable scrolling */}
                <section ref={content} id="content" className='w-full overflow-visible'>
                    <section className="imagesSlide grid grid-cols-20 grid-rows-[repeat(30,minmax(0,1fr))] gap-4">
                        {/* Always provide meaningful alt text for accessibility */}
                        <div style={{ position: 'relative', width: '100%', height: '100%', gridArea: '3 / 12 / 8 / 20' }}>
                            <Image className='imgSc object-cover' fill data-speed="0.9" src="https://images.unsplash.com/photo-1520271348391-049dd132bb7c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Abstract blue light trails" />
                        </div>
                        <div style={{ position: 'relative', width: '100%', height: '100%', gridArea: '1 / 1 / 6 / 8' }}>
                            <Image className='imgSc object-cover' fill data-speed="0.8" src="https://images.unsplash.com/photo-1556856425-366d6618905d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" alt="Vibrant neon pink and blue sign" />
                        </div>
                        <div style={{ position: 'relative', width: '100%', height: '100%', gridArea: '9 / 5 / 13 / 15' }}>
                            <Image className='imgSc object-cover' fill data-speed="1" src="https://images.unsplash.com/photo-1609166214994-502d326bafee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Glowing purple and orange light tubes" />
                        </div>
                        <div style={{ position: 'relative', width: '100%', height: '100%', gridArea: '14 / 1 / 18 / 8' }}>
                            <Image className='imgSc object-cover' fill data-speed="1.1" src="https://images.unsplash.com/photo-1589882265634-84f7eb9a3414?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=434&q=80" alt="Bright abstract neon sign on a building" />
                        </div>
                        <div style={{ position: 'relative', width: '100%', height: '100%', gridArea: '16 / 12 / 20 / 19' }}>
                            <Image className='imgSc object-cover' fill data-speed="0.9" src="https://images.unsplash.com/photo-1514689832698-319d3bcac5d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=434&q=80" alt="Geometric neon light art installation" />
                        </div>
                        <div style={{ position: 'relative', width: '100%', height: '100%', gridArea: '20 / 2 / 25 / 9' }}>
                            <Image className='imgSc object-cover' fill data-speed="1.2" src="https://images.unsplash.com/photo-1535207010348-71e47296838a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Dynamic colorful light streaks" />
                        </div>
                        <div style={{ position: 'relative', width: '100%', height: '100%', gridArea: '22 / 11 / 24 / 20' }}>
                            <Image className='imgSc object-cover' fill data-speed="0.8" src="https://images.unsplash.com/photo-1588007375246-3ee823ef4851?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" alt="Close-up of a blue neon sign" />
                        </div>
                        <div style={{ position: 'relative', width: '100%', height: '100%', gridArea: '26 / 5 / 30 / 15' }}>
                            <Image className='imgSc object-cover' fill data-speed="1" src="https://images.unsplash.com/photo-1571450669798-fcb4c543f6a4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" alt="Red neon sign glowing in the dark" />
                        </div>
                    </section>
                </section>
            </div>
        </section>
    )
}

export default SmoothScrolly


