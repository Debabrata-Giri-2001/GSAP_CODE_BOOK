import React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

const GSAPObserver = () => {
    useGSAP(() => {

        const images = document.querySelectorAll('.carousel-image')
        const radius = 242
        const progress = {
            value: 0
        }
        const carousel = document.querySelector('.carousel') as HTMLElement

        Observer.create({
            target: carousel,
            type: "wheel,pointer",
            onPress: (self) => {
                carousel.style.cursor = 'grabbing'
            },
            onRelease: (self) => {
                carousel.style.cursor = 'grab'
            },
            onChange: (self) => {
                gsap.killTweensOf(progress)
                const p = self.event.type === 'wheel' ? self.deltaY * -.0005 : self.deltaX * .05
                gsap.to(progress, {
                    duration: 2,
                    ease: 'power4.out',
                    value: `+=${p}`
                })
            }
        })

        const animate = () => {
            images.forEach((image, index) => {
                const img = image as HTMLElement;
                const theta = index / images.length - progress.value
                const x = -Math.sin(theta * Math.PI * 2) * radius
                const y = Math.cos(theta * Math.PI * 2) * radius
                img.style.transform = `translate3d(${x}px, 0px, ${y}px) rotateY(${360 * -theta}deg)`
                const c = Math.floor(index / images.length * 360)
                img.style.background = `hsla(${c}, 90%, 20%, .5)`
            })
        }

        gsap.ticker.add(animate);
    }, []);
    return (
        <main className='bg-white'>
            {/* Choose one of the options below to adjust the angle */}
            <div className="carousel w-full flex justify-center items-center h-[100vh] cursor-grab perspective-midrange rotate-x-[10] rotate-y-[0] transform-3d">
                <div className="carousel-image absolute top-1/2 left-1/2 h-52 w-52 flex justify-center items-center -mt-[100px] -ml-[100px] transform translate-z-[-10px] origin-center">1</div>
                <div className="carousel-image absolute top-1/2 left-1/2 h-52 w-52 flex justify-center items-center -mt-[100px] -ml-[100px] transform translate-z-[-10px] origin-center">2</div>
                <div className="carousel-image absolute top-1/2 left-1/2 h-52 w-52 flex justify-center items-center -mt-[100px] -ml-[100px] transform translate-z-[-10px] origin-center">3</div>
                <div className="carousel-image absolute top-1/2 left-1/2 h-52 w-52 flex justify-center items-center -mt-[100px] -ml-[100px] transform translate-z-[-10px] origin-center">4</div>
                <div className="carousel-image absolute top-1/2 left-1/2 h-52 w-52 flex justify-center items-center -mt-[100px] -ml-[100px] transform translate-z-[-10px] origin-center">5</div>
                <div className="carousel-image absolute top-1/2 left-1/2 h-52 w-52 flex justify-center items-center -mt-[100px] -ml-[100px] transform translate-z-[-10px] origin-center">6</div>
                <div className="carousel-image absolute top-1/2 left-1/2 h-52 w-52 flex justify-center items-center -mt-[100px] -ml-[100px] transform translate-z-[-10px] origin-center">7</div>
                <div className="carousel-image absolute top-1/2 left-1/2 h-52 w-52 flex justify-center items-center -mt-[100px] -ml-[100px] transform translate-z-[-10px] origin-center">8</div>
            </div>
        </main>
    )
}

export default GSAPObserver