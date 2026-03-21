import line from '../../assets/doodles/curvedLine.svg'
import arrow from '../../assets/doodles/arrow.svg'
import circle from '../../assets/doodles/circle.svg'
import dots from '../../assets/doodles/dots.svg'
import rectangle from '../../assets/doodles/rectangle.svg'
import scribble from '../../assets/doodles/scribble.svg'
import squiggle from '../../assets/doodles/squiggle.svg'
import star from '../../assets/doodles/star.svg'
import triangle from '../../assets/doodles/triangle.svg'
import zigzag from '../../assets/doodles/zigzag.svg'
import Image from 'next/image'
import FloatingDoodles from './FloatingDoodle'


export default function Hero() {
  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-gray-50">

      {/* Floating doodles */}
      <div className="absolute inset-0 pointer-events-none">
            <FloatingDoodles/>

      
      </div>

      {/* Main Content */}
      <div className="relative text-center max-w-3xl">

        <h1 className="text-5xl md:text-6xl font-semibold text-indigo-900">
          Turn your <span className="bg-green-200 px-3 rounded-lg">Ideas</span> into Sketches.
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Brainstorm, diagram, and sketch ideas together instantly.
        </p>

      </div>

    </section>
  );
}