import select from '../public/toolbar/select.svg'
import pen from '../public/toolbar/pen.svg'
import eraser from '../public/toolbar/eraser.svg'
import text from '../public/toolbar/text.svg'
import gallery from '../public/toolbar/gallery.svg'
import minus from '../public/toolbar/minus.svg'
import rectangle from '../public/toolbar/rectangle.svg'
import circle from '../public/toolbar/circle.svg'
import hand from '../public/toolbar/hand.svg'
import { Circle, CircleDashed, Eraser, Hand, LassoSelect, Minus, Pen, RectangleCircle, RectangleHorizontal, Square, SquareDashed, SquareMousePointer, Text, TypeIcon } from 'lucide-react'


const colors = {
    BLACK: '#1d1d1d',
    RED: '#e03131',
    GREEN: '#099268',
    BLUE: '#1971c2',
    ORANGE: '#f08c00',
    PURPLE:'#ae3ec9'
}

const fillColors = {
    BLACK: '#e9ecef',
    RED: '#ffc9c9',
    GREEN: '#b2f2bb',
    BLUE: '#a5d8ff',
    ORANGE: '#ffec99',
    PURPLE:'#eebefa'
}


const tools = {
    Move:'pan',
    Select :'select',
    Pen : 'pen',
    Eraser : 'eraser',
    Rectangle : 'rectangle',
    Circle:'circle',
    Line : 'line',
    Text : 'text',
}

const icons = [
    { id: tools.Text, src: TypeIcon, alt: 'Text',url : '/'  },
    { id: tools.Pen, src: Pen, alt: 'Pen' ,url : '/'  },
    { id: tools.Line, src: Minus, alt: 'line' ,url : '/' },
    {id:tools.Circle,src:Circle,alt:'Circle',url:'/'},
    { id: tools.Rectangle, src: Square, alt: 'Rectangle',url : '/'  },
    { id: tools.Eraser, src: Eraser, alt: 'Eraser',url : '/'  },
    { id: tools.Select, src: SquareMousePointer, alt: 'Select' , url : '/' },
    { id: tools.Move, src: Hand, alt: 'Move',url : '/'  },
];

const Backgrounds = {
    WHITE : '#ffffff',
    ORANGE : '#ffe7b3',
    BLUE : '#b4efff',
    GREEN : '#ceffb3',
    PURPLE : '#f3c4ff',
}

export {colors, fillColors, tools,icons,Backgrounds}