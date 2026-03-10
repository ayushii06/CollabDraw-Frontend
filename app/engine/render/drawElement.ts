import getStroke from "perfect-freehand";
import { elementType } from "../../models/types";
import { getSvgPathFromStroke } from "../../utils/getPath/getSVGPathFromStroke";


interface drawElementType {
  ctx: CanvasRenderingContext2D;
  element: elementType;
}

const drawElement = ({ ctx, element }: drawElementType) => {
  // console.log("draw element ",element);
  switch (element.tool) {

    case "line":
      ctx.beginPath();
      ctx.moveTo(element.x1, element.y1);
      ctx.lineTo(element.x2, element.y2);
      ctx.strokeStyle = element.strokeColor;
      ctx.fillStyle = element.fillColor;
      ctx.fill();
      ctx.lineWidth = element.size;
      if (element.strokeStyle === "Solid") {
        ctx.setLineDash([]);
      }
      else if (element.strokeStyle === "Dashed") {
        ctx.setLineDash([10, 5]);
      }
      else if (element.strokeStyle === "Dotted") {
        ctx.setLineDash([2, 4]);
      }
      ctx.stroke();
      
      break;

    case 'rectangle':
      ctx.beginPath();
      ctx.rect(
        element.x1,
        element.y1,
        element.x2 - element.x1,
        element.y2 - element.y1
      );
      ctx.strokeStyle = element.strokeColor;
      ctx.lineWidth = element.size;
      ctx.fillStyle = element.fillColor;
      ctx.fill();
      if (element.strokeStyle === "Solid") {
        ctx.setLineDash([]);
      }
      else if (element.strokeStyle === "Dashed") {
        ctx.setLineDash([10, 5]);
      }
      else if (element.strokeStyle === "Dotted") {
        ctx.setLineDash([2, 4]);
      }
      ctx.stroke();
      break;

    case 'circle':


      const radius = Math.sqrt(
        (element.x2 - element.x1) ** 2 +
        (element.y2 - element.y1) ** 2
      );

      ctx.beginPath();
      ctx.arc(element.x1, element.y1, radius, 0, Math.PI * 2);
      ctx.strokeStyle = element.strokeColor;
      ctx.lineWidth = element.size;
      ctx.fillStyle = element.fillColor;
      ctx.fill();
      if (element.strokeStyle === "Solid") {
        ctx.setLineDash([]);
      }
      else if (element.strokeStyle === "Dashed") {
        ctx.setLineDash([10, 5]);
      }
      else if (element.strokeStyle === "Dotted") {
        ctx.setLineDash([2, 4]);
      }
      ctx.stroke();
      break;

    case 'pen':

      ctx.fillStyle = element.strokeColor;

      const stroke = getStroke(element.points, {
        size: element.size,
        smoothing: element.smoothing,
        thinning: element.thinning,
        streamline: element.streamline,
      });

      const path = getSvgPathFromStroke(stroke);
      const myPath = new Path2D(path);

      ctx.fill(myPath);
      break;

    case 'text':

      ctx.textBaseline = 'top';
      ctx.font = `bold ${element.size}px Comic Sans MS`;
      ctx.fillStyle = element.strokeColor;

      ctx.fillText(element.text, element.x1, element.y1);
      break;


  }
};

export { drawElement };