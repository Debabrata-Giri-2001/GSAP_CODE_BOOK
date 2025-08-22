import React from 'react'
import './style.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'


const ImageHoverEffect = () => {

  useGSAP(() => {
    const cursor = document.querySelector(".cursor");
    const cursorMedias = document.querySelectorAll(".cursor__media");
    const navLinks = document.querySelectorAll(".nav__link");

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      scale: 0
    });

    const setCursorX = gsap.quickTo(cursor, "x", {
      duration: 0.6,
      ease: "expo"
    });

    const setCursorY = gsap.quickTo(cursor, "y", {
      duration: 0.6,
      ease: "expo"
    });

    window.addEventListener("mousemove", (e) => {
      setCursorX(e.pageX);
      setCursorY(e.pageY);
    });

    const tl = gsap.timeline({
      paused: true
    });

    tl.to(cursor, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "expo.inOut"
    });

    navLinks.forEach((navLink, i) => {
      navLink.addEventListener("mouseover", () => {
        cursorMedias[i].classList.add("active");
        tl.play();
      });
    });

    navLinks.forEach((navLink, i) => {
      navLink.addEventListener("mouseout", () => {
        tl.reverse();
        cursorMedias[i].classList.remove("active");
      });
    });

  }, [])

  return (
    <>
      <div className="cursor">
        <img src="https://images.unsplash.com/photo-1646303746488-3927e8bf81a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" className="cursor__media" />

        <img src="https://images.unsplash.com/photo-1609314491503-a864b0abf611?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" className="cursor__media" />

        <img src="https://images.unsplash.com/photo-1643125978288-7c7c8babc5fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" className="cursor__media" />
      </div>

      <nav className="nav">
        <a href="#" className="nav__link">Studio</a>
        <a href="#" className="nav__link">Showcase</a>
        <a href="#" className="nav__link">Contact</a>
      </nav>
    </>
  )
}

export default ImageHoverEffect