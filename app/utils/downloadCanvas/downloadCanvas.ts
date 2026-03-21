const downloadCanvas = (canva_bg: string): void => {
      const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
      if (!canvas) {
            return;
      }
      const ctx = canvas.getContext('2d');

      // Save the current canvas content
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(canvas, 0, 0);

      // Fill background with desired color (e.g., white)
      ctx.fillStyle = canva_bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the original content back onto the canvas
      ctx.drawImage(tempCanvas, 0, 0);

      // Generate image and download
      const image:string = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'image.png';
      link.click();

      // Restore original canvas content
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0);
};

export {downloadCanvas}