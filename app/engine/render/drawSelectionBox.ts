import { elementType } from "../../models/types";

function drawSelectionBox(ctx: CanvasRenderingContext2D, element: elementType) {
      if (element.tool == "pen") {
            return;
      }
      const { x1, y1, x2, y2 } = element;
      const padding = 4;


      ctx.save()

      ctx.strokeStyle = "#6965db"
      ctx.lineWidth = 1

      // ctx.setLineDash([6, 4])

      ctx.strokeRect(
            Math.min(x1, x2) - padding,
            Math.min(y1, y2) - padding,
            Math.abs(x2 - x1) + padding * 2,
            Math.abs(y2 - y1) + padding * 2
      )

      ctx.restore()
}

function drawHandle(ctx: CanvasRenderingContext2D, element: elementType) {
      if (element.tool == "pen") {
            return;
      }
      const { x1, y1,x2,y2 } = element;
      
      ctx.fillStyle = "white"
      ctx.strokeStyle = "#6965db"
      ctx.lineWidth=1;

      ctx.beginPath()
      ctx.rect(x1 - 5, y1 - 5, 8, 8)
      ctx.rect(x2 - 5, y1 - 5, 8, 8)
      ctx.rect(x1 - 5, y2 - 5, 8, 8)
      ctx.rect(x2 - 4, y2 - 4, 8, 8)
      ctx.fill()
      ctx.stroke()
}

export { drawSelectionBox, drawHandle }