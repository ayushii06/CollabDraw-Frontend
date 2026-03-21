import { useContext } from "react"
import { CanvasContext } from "./CanvasContext"

export const useCanvas=()=>{
      return useContext(CanvasContext)
}