'use client';

import Image from 'next/image';
import { useTransform, motion, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';

// Assuming these are defined in your utils/index.js (or .ts)
import { cyber_risk_assessment, dotcard } from '../../utils';

export const Card = ({ i, data, progress, range, targetScale, setCardRef, isActive, animationTrigger }: any) => {

    const motionDivRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation(); // Framer Motion's useAnimation hook

    // Transforms the scroll progress into a scale value for the stacking effect
    const scale = useTransform(progress, range, [1, targetScale]);

    // This useEffect will now be the single source of truth for the card's animation.
    // It depends on `isActive` AND `animationTrigger`.
    useEffect(() => {
        if (isActive) {
            // Animate to active state.
            // Using a distinct, slightly larger scale (e.g., 1.05) when active
            // ensures it stands out and provides a clear target for the animation.
            controls.start({
                scale: 1.05,
                borderColor: '#1e90ff',
                boxShadow: '0px 0px 30px rgba(30, 144, 255, 0.5)',
                transition: { duration: 0.5, ease: "easeOut" }
            });
        } else {
            // Animate back to its non-active, stacked state.
            // The `targetScale` ensures it snaps back to its correct position in the stack.
            controls.start({
                scale: targetScale,
                borderColor: '#e5e7eb',
                boxShadow: 'none',
                transition: { duration: 0.3, ease: "easeIn" }
            });
        }
    }, [isActive, animationTrigger, controls, targetScale]); // Re-run effect if any of these change

    // The `combinedScale` transform is no longer needed here because `controls.start`
    // is directly setting the `scale` property. We rely entirely on `controls` for animation.

    return (
        <div ref={(el) => setCardRef(el, i)} className="h-screen flex items-center justify-center sticky top-32">
            <motion.div
                ref={motionDivRef}
                // We remove the `style={{ scale: combinedScale, ... }}` here
                // because `controls` will manage the scale directly.
                // However, `top` property still comes from `i * 25px` for initial positioning in the stack.
                style={{ top: `calc(-5vh + ${i * 25}px)` }}
                animate={controls} // Connect the motion.div to the useAnimation controls
                className="relative flex flex-col h-[700px] w-[1300px] p-[20px] origin-top bg-black border border-gray-200 rounded-2xl"
            >
                {/* Card Title (using data prop) */}
                <h2 className="text-center m-0 text-[28px] text-white">
                    {data?.title || `Card ${i + 1} Title`}
                </h2>

                <div className="flex h-full mt-[50px] gap-[50px]">
                    {/* Left Section: Description and Link */}
                    <div className="w-[40%] relative top-[10%] text-white">
                        <p className="text-[16px]">
                            {data?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                        </p>
                        <span className="flex items-center gap-[5px] mt-4">
                            <a target="_blank" className="text-[12px] underline cursor-pointer">See more</a>
                            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" fill="white" />
                            </svg>
                        </span>
                    </div>

                    {/* Right Section: Image */}
                    <div className="relative w-[60%] h-full rounded-[25px] overflow-hidden">
                        <motion.div className="w-full h-full">
                            <Image
                                fill
                                src={""}
                                // src={data?.image || "https://images.unsplash.com/photo-1510915228383-057088dd1a64?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                alt={data?.title || "Card image"}
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};