import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Logo + Description */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              CollabDraw
            </h3>

            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              A collaborative whiteboard where teams brainstorm, design,
              and turn ideas into visual diagrams together.
            </p>

            {/* Socials */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-black">
                <Github size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-black">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-black">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-medium text-gray-900">Product</h4>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/docs">Docs</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/features">Features</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-medium text-gray-900">Resources</h4>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/support">Support</Link>
              </li>
              <li>
                <Link href="/community">Community</Link>
              </li>
              <li>
                <Link href="/roadmap">Roadmap</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium text-gray-900">Legal</h4>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookies">Cookie Policy</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

          <p>
            © {new Date().getFullYear()} CollabDraw. All rights reserved.
          </p>

          <p className="mt-2 md:mt-0">
            Built for collaborative visual thinking.
          </p>

        </div>

      </div>
    </footer>
  )
}