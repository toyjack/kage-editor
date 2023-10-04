import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { RectPointPosition, CTMInv } from '../actions/drag';

import { GlyphLine, Glyph, parseGlyph } from '../kageUtils/glyph';
import { StretchParam } from '../kageUtils/stretchparam';
import { KShotai } from '../kage';

import select from './select';
import drag from './drag';
import editor from './editor';
import display, { GridState } from './display';

import { undoable } from './undo';
import { XorMaskType } from '../xorMask';

export interface AppState {
  glyph: Glyph;
  selection: number[];

  areaSelectRect: [number, number, number, number] | null;
  dragSelection: [number, number, number, number] | null;
  dragPoint: [number, [number, number, number, number]] | null;
  resizeSelection: [RectPointPosition, [number, number, number, number]] | null;
  freehandStroke: [number, number][] | null;
  ctmInv: CTMInv | null;
  freehandMode: boolean;

  buhinMap: Map<string, string>;
  stretchParamMap: Map<string, StretchParam>;
  clipboard: GlyphLine[];
  undoStacks: {
    undo: Glyph[];
    redo: Glyph[];
  };
  exitEvent: Event | null;

  showOptionModal: boolean;
  grid: GridState;
  showStrokeCenterLine: boolean;
  shotai: KShotai;
  xorMaskType: XorMaskType;

  args: {
    name: string;
    related: string;
    data: string;
    onSubmit?: (data: string) => void;
  };
}

const initialGlyph = localStorage.getItem("kage-editor-data")
  ? localStorage.getItem("kage-editor-data")
  : "";

const initialState: AppState = {
  glyph: parseGlyph(initialGlyph as string),
  selection: [],

  areaSelectRect: null,
  dragSelection: null,
  dragPoint: null,
  resizeSelection: null,
  freehandStroke: null,
  ctmInv: null,
  freehandMode: false,

  buhinMap: new Map<string, string>(),
  stretchParamMap: new Map<string, StretchParam>(),
  clipboard: [],
  undoStacks: { undo: [], redo: [] },
  exitEvent: null,

  showOptionModal: false,
  grid: {
    display: true,
    originX: 0,
    originY: 0,
    spacingX: 20,
    spacingY: 20,
  },
  showStrokeCenterLine: false,
  shotai: 0, // kMincho
  xorMaskType: "none",

  args: {
    name: "u3013",
    related: "〓",
    data: "",
  },
};

const reducer = undoable(
  reducerWithInitialState(initialState)
    .withHandling(select)
    .withHandling(drag)
    .withHandling(editor)
    .withHandling(display)
);

export default reducer;
