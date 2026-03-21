"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const doodles = [
  "/doodles/curvedLine.svg",
  "/doodles/arrow.svg",
  "/doodles/circle.svg",
  "/doodles/dots.svg",
  "/doodles/rectangle.svg",
  "/doodles/scribble.svg",
  "/doodles/squiggle.svg",
  "/doodles/star.svg",
  "/doodles/triangle.svg",
  "/doodles/zigzag.svg",
];

export default function FloatingDoodles() {

  const [elements, setElements] = useState<any[]>([]);

  useEffect(() => {

    const generated = Array.from({ length: 20 }).map(() => {

      const randomIcon =
        doodles[Math.floor(Math.random() * doodles.length)];

      return {
        icon: randomIcon,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 10 + Math.random() * 60,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 5,
      };
    });

    setElements(generated);

  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {elements.map((el, i) => (
        <div
          key={i}
          className="absolute opacity-50"
          style={{
            top: `${el.top}%`,
            left: `${el.left}%`,
            animation: `float ${el.duration}s ease-in-out infinite`,
            animationDelay: `${el.delay}s`,
          }}
        >
          <Image
            src={el.icon}
            alt="doodle"
            width={el.size}
            height={el.size}
          />
        </div>
      ))}

    </div>
  );
}