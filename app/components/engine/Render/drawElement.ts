function drawElement(ctx, element) {
  const { tool, x1, y1, x2, y2 } = element;

  switch(tool) {

    case "line":
      ctx.beginPath();
      ctx.moveTo(x1,y1);
      ctx.lineTo(x2,y2);
      ctx.stroke();
      break;

    case "rectangle":
      ctx.strokeRect(x1,y1,x2-x1,y2-y1);
      break;

    case "circle":
      const radius = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
      ctx.beginPath();
      ctx.arc(x1,y1,radius,0,Math.PI*2);
      ctx.stroke();
      break;

  }
}