import React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import "./style.css"

gsap.registerPlugin(Observer);

const ScrollWaves = () => {
  useGSAP(() => {
    const lines = document.querySelectorAll("polyline");
    const width = 100;
    const freq = 20;
    const damp = 60;
    let drift = 0;

    function setPoints(amp = 0) {
      let x, y, step = 0;
      const pts: number[] = [];
      for (x = 0; x <= width; x++) {
        x < width / 2 ? step++ : step--;
        y = (step / damp) * amp * Math.sin(((x + drift) / damp) * freq);
        pts.push(x, y);
      }

      return pts.join(" ");
    }

    function updatePolylinePoints(amp = 0) {
      lines.forEach((line, i) => {
        const yOffset = 10 + i * 10;
        const basePoints = setPoints(amp);
        // Offset all y-coordinates by yOffset
        const transformed = basePoints
          .split(" ")
          .map((val, idx) => (idx % 2 ? parseFloat(val) + yOffset : val)) // add y offset
          .join(" ");

        line.setAttribute("points", transformed);
      });
    }

    // Init with straight lines
    updatePolylinePoints(0);

    Observer.create({
      type: "wheel,touch,scroll,pointer",
      onChangeY({ velocityY }) {
        drift += velocityY * 0.0002;
        updatePolylinePoints(velocityY * 0.0005);
      },
      onStop() {
        gsap.to({}, {
          duration: 0.4,
          onUpdate: () => updatePolylinePoints(0.1),
          onComplete: () => updatePolylinePoints(0),
          ease: "power2.out"
        });
      }
    });
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="mb-8 text-3xl font-bold">Scroll Waves</h1>
      <div className="border border-white p-10 rounded-2xl">
        <svg
          className="w-[40vmin] overflow-visible"
          viewBox="0 0 100 70"
          width={400}
          height={200}
        >
          {[...Array(6)].map((_, i) => (
            <polyline
              key={i}
              className="wave"
              stroke="#fff"
              strokeWidth="1"
              fill="none"
              points="" // points set by JS
            />
          ))}
        </svg>
      </div>
    </main>
  );
};

export default ScrollWaves;
