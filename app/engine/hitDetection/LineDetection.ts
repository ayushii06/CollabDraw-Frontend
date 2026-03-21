

// Finds the distance of (x,y) from (x1,y1) and if it's less than 5 px, we say that the point is near.

import { PositionType } from "../../models/types"

// Using euclidean for finding distance between the cursor position and the end points of line.
const distance = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = x1 - x2
  const dy = y1 - y2
  return dx*dx + dy*dy;
}


const nearPoints = (x: number, y: number, x1: number, y1: number, name: PositionType, threshold = 8): PositionType | null => {

  return distance(x, y, x1, y1) <= threshold*threshold? name : null
}


// Finds whether the point (x,y) is within the line (x1,y1) and (x2,y2);
// OPTIMISATION 1 - Instead of using triangle inequality, we will use perpendicular distance for it.
// const onLine = (x1:number,y1:number,x2:number,y2:number,x:number,y:number,maxDistance:number = 1 ):string|null =>{
//       const a = {x:x1,y:y1};
//       const b = {x:x2,y:y2};
//       const c = {x,y};

//       const offset = distance(a,b) - (distance(a,c) + distance(b,c));
//       return Math.abs(offset) < maxDistance ? "inside" : null;
// }

// const onLine = (x1: number, y1: number, x2: number, y2: number, x: number, y: number, maxDistance: number = 6): PositionType | null => {
//   const A = { x: x1, y: y1 };
//   const B = { x: x2, y: y2 };
//   const C = { x, y };

//   const ABx = B.x - A.x;
//   const ABy = B.y - A.y;

//   const lengthSquared = ABx * ABx + ABy * ABy;

//   const t = ((C.x - A.x) * ABx + (C.y - A.y) * ABy) / lengthSquared;

//   if (t < 0 || t > 1) return null;

//   const closestX = A.x + t * ABx;
//   const closestY = A.y + t * ABy;

//   const dx = C.x - closestX;
//   const dy = C.y - closestY;

//   const distance = Math.sqrt(dx * dx + dy * dy);

//   return distance <= maxDistance ? "inside" : null;
// }



const inBoundingBox = (
  x:number,
  y:number,
  x1:number,
  y1:number,
  x2:number,
  y2:number,
  threshold:number
) => {

  const minX = Math.min(x1,x2) - threshold
  const maxX = Math.max(x1,x2) + threshold
  const minY = Math.min(y1,y2) - threshold
  const maxY = Math.max(y1,y2) + threshold

  return x >= minX && x <= maxX && y >= minY && y <= maxY
}

const pointLineDistance = (
  x:number,
  y:number,
  x1:number,
  y1:number,
  x2:number,
  y2:number
)=>{
  return Math.abs(
    (x2-x1)*(y1-y) - (x1-x)*(y2-y1)
  )
}

const onLine = (
  x1:number,
  y1:number,
  x2:number,
  y2:number,
  x:number,
  y:number,
  threshold = 6
):PositionType | null => {

  if(!inBoundingBox(x,y,x1,y1,x2,y2,threshold)){
    return null
  }

  const dx = x2-x1
  const dy = y2-y1

  const length = Math.sqrt(dx*dx + dy*dy)

  const distance =
    Math.abs(dx*(y1-y) - (x1-x)*dy) / length

  return distance <= threshold ? "inside" : null
}



export { nearPoints, onLine }