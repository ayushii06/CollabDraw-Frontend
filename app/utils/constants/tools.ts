import { Circle, Eraser, Hand, Minus, Pen, Square, SquareMousePointer, Trash2Icon, TypeIcon } from 'lucide-react'
import { ToolBar } from '../../models/types';

const tools: Record<string, ToolBar> = {
    Move: 'pan',
    Select: 'select',
    Pen: 'pen',
    Eraser: 'eraser',
    Rectangle: 'rectangle',
    Circle: 'circle',
    Line: 'line',
    Text: 'text',
    Reset:'reset',
} as const;

interface IconItem {
    id: ToolBar; // This ensures the ID matches your Redux state exactly
    src: any;    // Ideally replace 'any' with your icon component type
    alt: string;
    url: string;
}

const icons:IconItem[] = [
    { id: tools.Text, src: TypeIcon, alt: 'Text',url : '/'  },
    { id: tools.Pen, src: Pen, alt: 'Pen' ,url : '/'  },
    { id: tools.Line, src: Minus, alt: 'line' ,url : '/' },
    {id:tools.Circle,src:Circle,alt:'Circle',url:'/'},
    { id: tools.Rectangle, src: Square, alt: 'Rectangle',url : '/'  },
    { id: tools.Eraser, src: Eraser, alt: 'Eraser',url : '/'  },
    { id: tools.Select, src: SquareMousePointer, alt: 'Select' , url : '/' },
    { id: tools.Move, src: Hand, alt: 'Move',url : '/'  },
    { id: tools.Reset, src: Trash2Icon, alt: 'Reset',url : '/'  },
];

export {icons,tools};
