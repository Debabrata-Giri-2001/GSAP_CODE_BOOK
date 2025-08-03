"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { logo, dotheader, arrow } from "../../utils";
import { navLists } from "../../constants/index";
import { handleScrambleHover } from "../../utils/animations";

gsap.registerPlugin(); // if needed

const Navbar = () => {
    useGSAP(() => {
        const scrambleDivs = document.querySelectorAll(".scramble");
        scrambleDivs.forEach((div) => {
            div.addEventListener("pointerenter", () => {
                const textEl = div.querySelector(".scramble-text");
                if (textEl) handleScrambleHover(textEl as HTMLParagraphElement);
            });
        });

        // Cleanup
        return () => {
            scrambleDivs.forEach((div) => {
                div.removeEventListener("pointerenter", () => { });
            });
        };
    }, []);

    return (
        <header className="fixed top-0 w-full z-50 border-b border-gray-200 h-20 sm:px-20 flex items-center justify-center bg-background">
            <nav className="w-full flex items-center justify-between h-full">
                {/* Left Section */}
                <div className="flex items-center h-full border-x border-gray-200">
                    {/* Logo */}
                    <div className="h-full flex items-center border-r border-gray-200 transition-all duration-300 relative group px-10">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:bg-[#f3f3f31f] transition-opacity duration-300">
                            <Image src={dotheader} alt="dot" fill className="object-cover" />
                        </div>
                        <Image src={logo} alt="logo" className="h-5 w-auto relative z-10" />
                    </div>

                    {/* Use Cases */}
                    <div className="scramble h-full w-[200px] px-10 overflow-hidden relative group text-gray hover:text-white duration-300">
                        {/* Background */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:bg-[#f3f3f31f] transition-opacity duration-300">
                            <Image src={dotheader} alt="dot" fill className="object-cover" />
                        </div>

                        {/* Button wrapper - full height & flex center */}
                        <button className="relative z-10 w-full h-full flex items-center justify-center">
                            <p className="scramble-text text-sm uppercase truncate">Use Cases</p>
                        </button>
                    </div>


                </div>

                {/* Center Navigation */}
                <div className="hidden sm:flex justify-center items-center">
                    {navLists.map((nav, index) => (
                        <div
                            key={index}
                            className="scramble text-sm uppercase px-5 cursor-pointer relative group flex items-center w-[100px] text-gray hover:text-white duration-300"
                        >
                            <p className="scramble-text ">{nav.label}</p>
                        </div>
                    ))}
                </div>

                {/* Right Section */}
                <div className="flex items-center h-full border-x border-gray-200">
                    {/* Gartner Report */}
                    <div className="scramble h-full w-[200px] overflow-hidden relative group scramble flex items-center border-r border-gray-200 transition-all group px-10 text-gray hover:text-white duration-300">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:bg-[#f3f3f31f] transition-opacity duration-300">
                            <Image src={dotheader} alt="dot" fill className="object-cover" />
                        </div>
                        <button className="relative z-10">
                            <p className="scramble-text text-sm uppercase truncate">Gartner Report</p>
                        </button>
                    </div>

                    {/* Join the hub */}
                    <div className="scramble w-[220px] overflow-hidden group scramble h-full flex items-center border-r border-gray-200 transition-all relative group px-10 text-gray hover:text-white duration-300">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:bg-[#f3f3f31f] transition-opacity duration-300">
                            <Image src={dotheader} alt="dot" fill className="object-cover" />
                        </div>
                        <button className="relative z-10 flex">
                            <p className="scramble-text text-sm uppercase truncate">Join the hub</p>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
