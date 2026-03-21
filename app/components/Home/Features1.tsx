import Image from "next/image"
import demo from "./demo.png"
import { Zap, Pencil, Share2, Globe } from "lucide-react"

export function Features() {
  return (
    <section className="bg-gray-50 overflow-hidden py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6 space-y-16">

        {/* Heading */}
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            Draw together. Think better.
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Bring ideas to life faster with a collaborative whiteboard designed
            for brainstorming, planning, and visual thinking.
          </p>
        </div>

        {/* Canvas Demo */}
        <div className="relative">

          <div className="[perspective:1200px]">
            <div className="[transform:rotateX(4deg)_rotateZ(-1deg)]">

              <div className="relative aspect-[16/9] ">

                {/* Screenshot */}
                <Image
                  src={demo}
                  alt="collaborative canvas demo"
                  className="absolute inset-0 rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.25)] object-cover"
                />

                {/* Fade overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/70 to-transparent"></div> */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#f9fafb_100%)] z-20"></div>

              </div>

            </div>
          </div>

        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">

          {/* Highlighted Feature */}
          <div className="space-y-3 opacity-70 hover:opacity-100 transition">
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-gray-900" />
              <h3 className="text-sm font-semibold text-gray-900">
                Real-time Collaboration
              </h3>
            </div>

            <p className="text-sm text-gray-600">
              Work together on the same canvas with live cursors and instant
              updates so everyone stays in sync.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="space-y-3 opacity-70 hover:opacity-100 transition">
            <div className="flex items-center gap-2">
              <Pencil className="size-4 text-gray-900" />
              <h3 className="text-sm font-semibold text-gray-900">
                Powerful Drawing Tools
              </h3>
            </div>

            <p className="text-sm text-gray-600">
              Sketch freely with shapes, arrows, text and freehand drawing to
              clearly express your ideas.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="space-y-3 opacity-70 hover:opacity-100 transition">
            <div className="flex items-center gap-2">
              <Share2 className="size-4 text-gray-900" />
              <h3 className="text-sm font-semibold text-gray-900">
                Easy Sharing
              </h3>
            </div>

            <p className="text-sm text-gray-600">
              Share your board with a simple link and collaborate with teammates
              from anywhere.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="space-y-3 opacity-70 hover:opacity-100 transition">
            <div className="flex items-center gap-2">
              <Globe className="size-4 text-gray-900" />
              <h3 className="text-sm font-semibold text-gray-900">
                Infinite Canvas
              </h3>
            </div>

            <p className="text-sm text-gray-600">
              Never run out of space. Expand your board as your ideas grow and
              explore concepts freely.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}