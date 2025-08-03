"use client";

import React from 'react'
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

import * as THREE from 'three';
import Scene from '../../utils/Scene';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import "./style.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin);

const Airplanes = () => {

    useGSAP(() => {
        gsap.set('#line-length', { drawSVG: 0 })
        gsap.set('#line-wingspan', { drawSVG: 0 })
        gsap.set('#circle-phalange', { drawSVG: 0 })

        var object: any;

        function onModelLoaded() {
            object.traverse(function (child: any) {
                let mat = new THREE.MeshPhongMaterial({
                    color: 0xaaaaaa,
                    specular: 0xffffff,
                    shininess: 30,
                    flatShading: false
                });
                child.material = mat;
            });

            setupAnimation(object);
        }
        var manager = new THREE.LoadingManager(onModelLoaded);
        manager.onProgress = (item, loaded, total) => console.log(item, loaded, total);

        var loader = new OBJLoader(manager);
        loader.load('/models/plane.obj', function (obj) {
            object = obj;
        });

        function setupAnimation(model: any) {
            const scene = new Scene(model);
            const plane = scene.modelGroup;

            gsap.fromTo('canvas', {
                x: "50%", autoAlpha: 0
            }, {
                duration: 1, x: "0%", autoAlpha: 1

            });
            gsap.to('.loading', {
                autoAlpha: 0
            })
            gsap.to('.scroll-cta', {
                opacity: 1
            })
            gsap.set('svg', {
                autoAlpha: 1
            })

            let tau = Math.PI * 2;

            gsap.set(plane.rotation, { y: tau * -.25 });
            gsap.set(plane.position, { x: 80, y: -32, z: -60 });

            scene.render();

            var sectionDuration = 1;
            gsap.fromTo(scene.views[1],
                { height: 1, bottom: 0 },
                {
                    height: 0, bottom: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: ".blueprint",
                        scrub: true,
                        start: "bottom bottom",
                        end: "bottom top"
                    }
                })
            gsap.fromTo(scene.views[1],
                { height: 0, bottom: 0 },
                {
                    height: 1, bottom: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: ".blueprint",
                        scrub: true,
                        start: "top bottom",
                        end: "top top"
                    }
                })

            gsap.to('.ground', {
                y: "30%",
                scrollTrigger: {
                    trigger: ".ground-container",
                    scrub: true,
                    start: "top bottom",
                    end: "bottom top"
                }
            })

            gsap.from('.clouds', {
                y: "25%",
                scrollTrigger: {
                    trigger: ".ground-container",
                    scrub: true,
                    start: "top bottom",
                    end: "bottom top"
                }
            })

            gsap.to('#line-length', {
                drawSVG: 100,
                scrollTrigger: {
                    trigger: ".length",
                    scrub: true,
                    start: "top center",
                    end: "top top",
                }
            })

            gsap.to('#line-wingspan', {
                drawSVG: 100,
                scrollTrigger: {
                    trigger: ".wingspan",
                    scrub: true,
                    start: "top 25%",
                    end: "bottom 50%",

                }
            })

            gsap.to('#circle-phalange', {
                drawSVG: 100,
                scrollTrigger: {
                    trigger: ".phalange",
                    scrub: true,
                    start: "top 30%",
                    end: "bottom 100%",
                    markers: false
                }
            })

            gsap.to('#line-length', {
                opacity: 0,
                drawSVG: 0,
                scrollTrigger: {
                    trigger: ".length",
                    scrub: true,
                    start: "top top",
                    end: "bottom top",
                }
            })

            gsap.to('#line-wingspan', {
                opacity: 0,
                drawSVG: 0,
                scrollTrigger: {
                    trigger: ".wingspan",
                    scrub: true,
                    start: "top top",
                    end: "bottom top",
                }
            })

            gsap.to('#circle-phalange', {
                opacity: 0,
                drawSVG: 0,
                scrollTrigger: {
                    trigger: ".phalange",
                    scrub: true,
                    start: "top top",
                    end: "bottom top",
                    markers: false
                }
            })

            let tl = gsap.timeline({
                onUpdate: scene.render,
                scrollTrigger: {
                    trigger: ".content",
                    scrub: true,
                    start: "top top",
                    end: "bottom bottom",
                },
                defaults: { duration: sectionDuration, ease: 'power2.inOut' }
            })

            let delay = 0;

            tl.to('.scroll-cta', { duration: 0.25, opacity: 0 }, delay)
            tl.to(plane.position, { x: -10, ease: 'power1.in' }, delay)

            delay += sectionDuration;

            tl.to(plane.rotation, { x: tau * .25, y: 0, z: -tau * 0.05, ease: 'power1.inOut' }, delay)
            tl.to(plane.position, { x: -40, y: 0, z: -60, ease: 'power1.inOut' }, delay)

            delay += sectionDuration;

            tl.to(plane.rotation, { x: tau * .25, y: 0, z: tau * 0.05, ease: 'power3.inOut' }, delay)
            tl.to(plane.position, { x: 40, y: 0, z: -60, ease: 'power2.inOut' }, delay)

            delay += sectionDuration;

            tl.to(plane.rotation, { x: tau * .2, y: 0, z: -tau * 0.1, ease: 'power3.inOut' }, delay)
            tl.to(plane.position, { x: -40, y: 0, z: -30, ease: 'power2.inOut' }, delay)

            delay += sectionDuration;

            tl.to(plane.rotation, { x: 0, z: 0, y: tau * .25 }, delay)
            tl.to(plane.position, { x: 0, y: -10, z: 50 }, delay)

            delay += sectionDuration;
            delay += sectionDuration;

            tl.to(plane.rotation, { x: tau * 0.25, y: tau * .5, z: 0, ease: 'power4.inOut' }, delay)
            tl.to(plane.position, { z: 30, ease: 'power4.inOut' }, delay)

            delay += sectionDuration;

            tl.to(plane.rotation, { x: tau * 0.25, y: tau * .5, z: 0, ease: 'power4.inOut' }, delay)
            tl.to(plane.position, { z: 60, x: 30, ease: 'power4.inOut' }, delay)

            delay += sectionDuration;

            tl.to(plane.rotation, { x: tau * 0.35, y: tau * .75, z: tau * 0.6, ease: 'power4.inOut' }, delay)
            tl.to(plane.position, { z: 100, x: 20, y: 0, ease: 'power4.inOut' }, delay)

            delay += sectionDuration;

            tl.to(plane.rotation, { x: tau * 0.15, y: tau * .85, z: -tau * 0, ease: 'power1.in' }, delay)
            tl.to(plane.position, { z: -150, x: 0, y: 0, ease: 'power1.inOut' }, delay)

            delay += sectionDuration;

            tl.to(plane.rotation, { duration: sectionDuration, x: -tau * 0.05, y: tau, z: -tau * 0.1, ease: 'none' }, delay)
            tl.to(plane.position, { duration: sectionDuration, x: 100, y: 20, z: 140, ease: 'power1.in' }, delay)

            tl.to(scene.light.position, { duration: sectionDuration, x: 0, y: 0, z: 0 }, delay)
        }
    }, [])

    return (
        <section className="airplanes">
            <div className="content text-black">
                <div className="loading">Loading</div>
                <div className="trigger absolute top-0 h-[100%]"></div>
                <div className="section relative p-[10vmin] w-[100vw-(10vmin*2)] h-[100vh-(10vmin*2)] m-0 z-[2]">

                    <h1 className="text-[8vw] my-0 mr-0 mb-[2vmin] ml-0 font-bold inline">Airplanes.</h1>
                    <h3 className="text-[4vw] font-normal m-0">The beginners guide.</h3>
                    <p>You've probably forgotten what these are.</p>
                    <div className="phonetic">/ ˈɛərˌpleɪn /</div>
                    <div className="scroll-cta font-medium -mb-[25vh]">Scroll</div>
                </div>

                <div className="section right">
                    <h2 className='headingh2'>They're kinda like buses...</h2>
                </div>

                <div className="ground-container">
                    <div className="parallax ground"></div>
                    <div className="section right">
                        <h2 className='headingh2'>..except they leave the ground.</h2>
                        <p>Saaay what!?.</p>
                    </div>

                    <div className="section">
                        <h2 className='headingh2'>They fly through the sky.</h2>
                        <p>For realsies!</p>
                    </div>

                    <div className="section right">
                        <h2 className='headingh2'>Defying all known physical laws.</h2>
                        <p>It's actual magic!</p>
                    </div>
                    <div className="parallax clouds"></div>
                </div>

                <div className="blueprint">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <line id="line-length" x1="10" y1="80" x2="90" y2="80" stroke="white" strokeWidth="0.5" />
                        <path id="line-wingspan" d="M10 50 L40 35 M60 35 L90 50" stroke="white" strokeWidth="0.5" fill="none" />
                        <circle id="circle-phalange" cx="60" cy="60" r="15" fill="transparent" stroke="white" strokeWidth="0.5" />
                    </svg>
                    <div className="section dark ">
                        <h2 className='headingh2'>The facts and figures.</h2>
                        <p>Lets get into the nitty gritty...</p>
                    </div>
                    <div className="section dark length">
                        <h2 className='headingh2'>Length.</h2>
                        <p>Long.</p>
                    </div>
                    <div className="section dark wingspan">
                        <h2 className='headingh2'>Wing Span.</h2>
                        <p>I dunno, longer than a cat probably.</p>
                    </div>
                    <div className="section dark phalange">
                        <h2 className='headingh2'>Left Phalange</h2>
                        <p>Missing</p>
                    </div>
                    <div className="section dark">
                        <h2 className='headingh2'>Engines</h2>
                        <p>Turbine funtime</p>
                    </div>
                    <div className="section"></div>
                </div>
                <div className="sunset">
                    <div className="section"></div>
                    <div className="section -bottom-[10vh]">
                        <h2 className='headingh2'>/ Fin ˈɛərˌ.</h2>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Airplanes