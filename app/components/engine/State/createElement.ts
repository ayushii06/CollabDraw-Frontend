import rough from 'roughjs/bundled/rough.esm';
import { elementType, Options, Tool } from '../../../lib/types';
const generator = rough.generator();

interface createElementsPropsType {
  id: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  tool: string,
  options:Options
  ctx:CanvasRenderingContext2D|null;
}


const adjustmentRequired = (tool: Tool) => ["line", "rectangle"].includes(tool);


const adjustElementCoordinates = (element: elementType): { x1: number; y1: number; x2: number; y2: number } => {
  const { tool } = element;
  if (tool == "pen" || tool == "text") {
    return;
  }
  const { x1, y1, x2, y2 } = element;
  if (tool === "rectangle") {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  } else {
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return { x1, y1, x2, y2 };
    } else {
      return { x1: x2, y1: y2, x2: x1, y2: y1 };
    }
  }
};


const createElements = ({ id, x1, y1, x2, y2, tool, options,ctx }: createElementsPropsType): elementType => {
  
  // Based on the type of tool, we will create the element

  if(!ctx){
    return ;
  }

  switch (tool) {
    case 'line':
      ctx.beginPath();
      ctx.moveTo(x1,y1);
      ctx.lineTo(x2,y2);
      ctx.stroke();
      // const roughElementline = generator.line(x1, y1, x2, y2, { stroke: options.color, strokeWidth: options.size, strokeLineDash: options.style == 'Dashed' ? [5, 5] : options.style === 'Dotted' ? [2, 2] : [] });
      // return { id, x1, y1, x2, y2, tool, roughElement: roughElementline, color:options.color, size:options.size, fill:options.fill, style:options.style, fillStyle:options.fillStyle };
      return { id, x1, y1, x2, y2, tool, color:options.color, size:options.size, fill:options.fill, style:options.style, fillStyle:options.fillStyle };


    case 'rectangle':
        ctx.strokeRect(x1,y1,x2-x1,y2-y1);

      // const roughElementrect = generator.rectangle(x1, y1, x2 - x1, y2 - y1, { stroke: options.color, strokeWidth: options.size, fill: options.fill, strokeLineDash: options.style === 'Dashed' ? [5, 5] : options.style === 'Dotted' ? [2, 2] : [], fillStyle: options.fillStyle });

      // return { id, x1, y1, x2, y2, tool, roughElement: roughElementrect, color:options.color, size:options.size, fill:options.fill, style:options.style, fillStyle:options.fillStyle };
      return { id, x1, y1, x2, y2, tool, color:options.color, size:options.size, fill:options.fill, style:options.style, fillStyle:options.fillStyle };


    case 'circle':

      const roughElementcircle = generator.circle((x1 + x2) / 2, (y1 + y2) / 2, Math.max(Math.abs(x2-x1), Math.abs(y2-y1)), { stroke: options.color, strokeWidth: options.size, fill: options.fill, strokeLineDash: options.style === 'Dashed' ? [5, 5] : options.style === 'Dotted' ? [2, 2] : [], fillStyle: options.fillStyle });

      return { id, x1, y1, x2, y2, tool, color:options.color, size:options.size, fill:options.fill,style: options.style, fillStyle:options.fillStyle };


    case 'pen':

      return { id, tool, points: [{ x: x1, y: y1 }], color:options.color, size:options.size, thinning:options.thinning, smoothing:options.smoothing,streamline: options.streamline };


    case 'text':
      return { id, tool, x1, y1, x2, y2, color:options.color, size:options.size, text: '' };

      
    default:
      break;
  }
}

export { createElements, adjustElementCoordinates, adjustmentRequired };