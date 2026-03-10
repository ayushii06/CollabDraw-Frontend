'use client'

import list from '../../../public/toolbar/list.svg'
import Image from 'next/image'
import { useState } from 'react'
import { CanvaBg } from '../../utils/constants/colors'
import { setBackground, setIsDownload, setIsReset } from '../../store/slice/optionsSlice'
import { useDispatch } from 'react-redux'
import deletesvg from '../../../public/toolbar/delete.svg'
import download from '../../../public/toolbar/download.svg'
import question from '../../../public/toolbar/question.svg'
import Link from 'next/link'

export default function Options() {

    const dispatch = useDispatch()

    const [isHidden, setIsHidden] = useState(true)
    const [current, setCurrent] = useState('#ffffff')
    const [help, setHelp] = useState(false)

    const handleClick = () => {
        setIsHidden(!isHidden)
    }

    const handleBackground = (color) => {
        dispatch(setBackground(color))
        setCurrent(color)
        setIsHidden(true)
    }

    const handleDownload = () => {
        dispatch(setIsDownload(true))
        setIsHidden(true)
    }

    const handleReset = () => {
        dispatch(setIsReset(true))
        setIsHidden(true)
    }

    return (
        <>
            {/* Menu Button */}
            <div
                onClick={handleClick}
                className="fixed top-4 left-4 z-40
                backdrop-blur-md bg-white/70
                shadow-lg hover:shadow-xl
                transition-all duration-200
                rounded-xl p-2 cursor-pointer"
            >
                <Image src={list} alt='list' height={24} width={24} />
            </div>

            {/* Options Panel */}
            <div
                className={`fixed left-6 top-16 w-64
                backdrop-blur-xl bg-white/80
                border border-gray-200
                rounded-xl shadow-xl
                text-black
                p-4 space-y-3 z-50
                transition-all duration-200
                ${isHidden ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}
                `}
            >

                {/* Download */}
                <div
                    onClick={handleDownload}
                    className="flex items-center gap-3
                    p-2 rounded-lg
                    hover:bg-gray-100
                    cursor-pointer"
                >
                    <Image alt='image' width={18} src={download} />
                    <p className="text-sm font-medium">Download Image</p>
                </div>

                {/* Reset */}
                <div
                    onClick={handleReset}
                    className="flex items-center gap-3
                    p-2 rounded-lg
                    hover:bg-gray-100
                    cursor-pointer"
                >
                    <Image alt='image' width={18} src={deletesvg} />
                    <p className="text-sm font-medium">Reset Canvas</p>
                </div>

                {/* Help */}
                <div
                    onClick={() => {
                        setHelp(true)
                        setIsHidden(true)
                    }}
                    className="flex items-center gap-3
                    p-2 rounded-lg
                    hover:bg-gray-100
                    cursor-pointer"
                >
                    <Image alt='image' width={18} src={question} />
                    <p className="text-sm font-medium">Help</p>
                </div>

                <hr />

                {/* Background */}
                <p className="text-sm font-semibold">
                    Canvas Background
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                    {Object.keys(CanvaBg).map((color) => (
                        <button
                            key={color}
                            onClick={() => handleBackground(CanvaBg[color])}
                            className={`w-6 h-6 rounded-full border
                            transition-transform hover:scale-110
                            ${current === CanvaBg[color] ? 'ring-2 ring-black' : ''}
                            `}
                            style={{ backgroundColor: CanvaBg[color] }}
                        />
                    ))}
                </div>

                <hr />

                {/* Links */}
                <div className="flex flex-col text-sm">

                    <Link
                        target='_blank'
                        href='https://linkedin.com/in/ayushi-pal-99965b249/'
                        className="p-2 rounded hover:bg-gray-100"
                    >
                        LinkedIn
                    </Link>

                    <Link
                        target='_blank'
                        href='https://github.com/ayushii06/drawTool'
                        className="p-2 rounded hover:bg-gray-100"
                    >
                        Github
                    </Link>

                    <Link
                        target='_blank'
                        href='https://drive.google.com/file/d/1263gzWPcWP8AbBrr6K7JR91WYV33tVRE/view'
                        className="p-2 rounded hover:bg-gray-100"
                    >
                        Contact Me
                    </Link>

                </div>

                <hr />

                <p className="text-xs text-gray-900 text-center">
                    © Ayushi Pal
                </p>

            </div>

            {/* Help Modal */}
            {help && (

                <div
                    onClick={() => setHelp(false)}
                    className="fixed inset-0 z-50
                    flex items-center justify-center
                    bg-black/40 backdrop-blur-sm"
                >

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white
                        w-[700px] max-w-[90%]
                        rounded-2xl shadow-2xl
                        p-6
                        max-h-[80vh]
                        overflow-y-auto"
                    >

                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold">Help</h1>

                            <Link
                                target='blank'
                                href='https://github.com/ayushii06/drawTool'
                                className='text-sm font-semibold
                                bg-gray-100 px-4 py-2
                                rounded-lg hover:bg-gray-200'
                            >
                                Contribute on Github
                            </Link>
                        </div>

                        <hr className="my-4" />

                        <p className="text-gray-900">
                            This is a simple drawing app. You can draw, erase,
                            write text, move shapes, and change canvas
                            background colors.
                        </p>

                        <h2 className="text-lg font-bold mt-6 mb-2">
                            How to use?
                        </h2>

                        <p className="text-gray-700">
                            Select a tool from the toolbar and draw on the canvas.
                            You can change colors, download the canvas image,
                            or reset it anytime.
                        </p>

                        <h2 className="text-lg font-bold mt-6 mb-3">
                            Keyboard Shortcuts
                        </h2>

                        <div className="space-y-2 text-sm">

                            {[
                                ["Undo", "Ctrl + Z"],
                                ["Redo", "Ctrl + Y"],
                                ["Pan", "1"],
                                ["Zoom In", "Ctrl + Scroll"],
                                ["Zoom Out", "Ctrl + -"]
                            ].map((item, i) => (

                                <div
                                    key={i}
                                    className="flex justify-between
                                    border rounded-md px-3 py-2"
                                >
                                    <span>{item[0]}</span>
                                    <span className="font-semibold">{item[1]}</span>
                                </div>

                            ))}

                        </div>

                        <div className="text-center mt-6">

                            <button
                                onClick={() => setHelp(false)}
                                className="bg-red-500
                                hover:bg-red-600
                                text-white
                                px-6 py-2
                                rounded-lg"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </>
    )
}