import { elementType } from "../../models/types";

function drawSelectionBox(ctx: CanvasRenderingContext2D, element: elementType) {
      if (element.tool == "pen") {
            return;
      }
      const { x1, y1, x2, y2 } = element;

      ctx.save()

      ctx.strokeStyle = "blue"
      ctx.lineWidth = 1

      ctx.setLineDash([6, 4])

      ctx.strokeRect(
            Math.min(x1, x2),
            Math.min(y1, y2),
            Math.abs(x2 - x1),
            Math.abs(y2 - y1)
      )

      ctx.restore()
}

function drawHandle(ctx:CanvasRenderingContext2D,element:elementType) {
      if (element.tool == "pen") {
            return;
      }
      const { x1, y1 } = element;
  ctx.fillStyle = "white"
  ctx.strokeStyle = "blue"

  ctx.beginPath()
  ctx.rect(x1 - 4, y1 - 4, 8, 8)
  ctx.fill()
  ctx.stroke()
}

export { drawSelectionBox,drawHandle }