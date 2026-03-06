'use client'

import { icons } from '../../constant'
import { useDispatch } from 'react-redux'
import { setTool } from '../../slice/toolbarSlice'
import { useState } from 'react'
import { AppDispatch } from '../../store'

export default function Toolbar() {

  const dispatch = useDispatch<AppDispatch>()
  const [selected, setSelected] = useState<string>("pen")

  const handleClick = (id:string) => {
    dispatch(setTool(id))
    setSelected(id)
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2  bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200" style={{ zIndex: 1000 }}>

      {icons.map((icon) => {

        const Icon = icon.src

        return (
          <div key={icon.id} onClick={() => handleClick(icon.id)}
            className={`relative group flex items-center justify-center
              h-10 w-10 rounded-lg cursor-pointer
              transition-all duration-150
              hover:bg-gray-100 ${selected === icon.id ? "bg-blue-500 text-white" : "text-gray-700"}`}
          >

            <Icon size={20} />

            {/* Tooltip */}
            <span
              className="
              absolute -top-9
              opacity-0 group-hover:opacity-100
              transition
              text-xs
              bg-black text-white
              px-2 py-1 rounded
              whitespace-nowrap
              pointer-events-none
              "
            >
              {icon.alt}
            </span>

          </div>
        )
      })}
    </div>
  )
}