'use client'

import { useDispatch,  } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { ToolBar } from '../../models/types'
import { useAppSelector } from '../../hooks/reduxHooks'
import { setTool } from '../../store/slice/toolbarSlice'
import { icons } from '../../utils/constants/tools'

export default function Toolbar() {
  const dispatch = useDispatch<AppDispatch>()
  
  const selectedTool = useAppSelector((state: RootState) => state.toolbar.tool)

  // 2. Explicitly type the ID as ToolBar
  const handleClick = (id: ToolBar) => {
    dispatch(setTool(id))
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200" style={{ zIndex: 1000 }}>
      {icons.map((icon) => {
        const Icon = icon.src

        return (
          <div 
            key={icon.id} 
            // 3. Pass icon.id (the string) instead of the whole icon object
            onClick={() => handleClick(icon.id)}
            className={`relative group flex items-center justify-center
              h-10 w-10 rounded-lg cursor-pointer
              transition-all duration-150
              hover:bg-gray-100 ${selectedTool === icon.id ? "bg-blue-500 text-white" : "text-gray-700"}`}
          >
            <Icon size={20} />

            {/* Tooltip */}
            <span className="absolute -top-9 opacity-0 group-hover:opacity-100 transition text-xs bg-black text-white px-2 py-1 rounded whitespace-nowrap pointer-events-none">
              {icon.alt}
            </span>
          </div>
        )
      })}
    </div>
  )
}