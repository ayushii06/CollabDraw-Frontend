const average = (a: number, b: number): number => { return (a + b) / 2; }

export { average };

const distance = (
      a: {
            x: number;
            y: number;
      },
      b: {
            x: number;
            y: number;
      }):number => {

      return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export {distance}