import type { ListenableListener } from "@base/common/listenable/Listenable";
import type { Listenable } from "@base/common/listenable";
import type { AccentName, ColorName, MouseButton, SizeName } from "./enums";

export type HTMLTagNames = keyof HTMLElementTagNameMap;

export type ValueType = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";

export interface IPoint {
    x: number
    y: number
}
export interface IMouseData {
    pos: IPoint
    last: IPoint
    start: IPoint
    end: IPoint
    movement: IPoint

    pressedButton: MouseButton
    isCtrlPressed: boolean
    isShiftPressed: boolean
    isAltPressed: boolean
}

export type RgbColor = [red: number, green: number, blue: number];
export type HslColor = [hue: number, saturation: number, lightness: number];
export type HsvColor = [hue: number, saturation: number, value: number];
export type RgbaColor = [...RgbColor, alpha: number];
export type HslaColor = [...HslColor, alpha: number];
export type HsvaColor = [...HsvColor, alpha: number];
export type HexColor = `#${ string }`;
export type RgbStringColor = `rgb(${ string })`;
export type RgbaStringColor = `rgba(${ string })`;
export type HslStringColor = `hsl(${ string })`;
export type HslaStringColor = `hsla(${ string })`;
export type AnyStringColor = `#${ string }` | RgbStringColor | RgbaStringColor | HslStringColor | HslaStringColor;
export type ArrayColor = RgbColor | RgbaColor | HsvColor | HsvaColor | HslColor | HslaColor;

export interface ISelectableItem {
	onSelect: (key: string)=> void
	onUnselect: ()=> void
}
export interface IListener {
    unlistens: VoidFunction[]
    unlistenAll(): void
    listen<K extends keyof GlobalEventHandlersEventMap>(element: EventTarget, eventName: K, listener: (event: GlobalEventHandlersEventMap[K]) => void, options?: boolean | AddEventListenerOptions): VoidFunction;
    listen(element: EventTarget, eventName: string, listener: (event: Event) => void, options?: boolean | AddEventListenerOptions): VoidFunction;
    listen<T>(listenable: Listenable<T>, listener: ListenableListener<T>, invoke?: boolean): VoidFunction;
}
export interface IThemeColorful {
    color: ColorName | AccentName
    setColor(name: ColorName | AccentName): this
}
export interface IThemeResizeable {
    size: SizeName
    setSize(name: SizeName): this
}

export interface Clamped {
    min: number;
    max: number;
    
    setMax(value: number): this;
    setMin(value: number): this;
    setClamp(min: number, max: number): this;
}
export interface Stepped {
    step: number;

    setStep(value: number): this;
}
