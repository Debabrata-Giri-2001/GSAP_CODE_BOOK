"use client"


import { animateWithGsap } from '@/app/utils/animations'
import { useGSAP } from '@gsap/react'
import React from 'react'

const OurResponses = () => {

    useGSAP(() => {
        animateWithGsap(
            '.g_text',
            { y: 0, opacity: 1, ease: 'power2.inOut', duration: 1 },
            null
        )
    }, [])

    return (
        <section className="px-32 py-32 flex-col">
            {/* Heading: 2 lines, opposite sides */}
            <div className="max-w-[750px] mb-8">
                <p className="g_text text-6xl opacity-0 translate-y-[100px]">
                    <span className="block">Our responses tailored to</span>
                    <span className="block">your cyber challenges</span>
                </p>
            </div>
            {/* Subheading: 4 lines, alternating sides */}
            <div className="max-w-[575px] ml-auto">
                <p className="g_text text-md text-gray-300 text-base/8 opacity-0 translate-y-[100px]">
                    <span className="block">Boost your growth with our customized cybersecurity solutions.</span>
                    <span className="block">Whether it's managing a crisis, ensuring regulatory compliance, or</span>
                    <span className="block">enhancing your protections, our expertise will help you overcome</span>
                    <span className="block">every challenge.</span>
                </p>
            </div>
        </section>
    )
}

export default OurResponses
