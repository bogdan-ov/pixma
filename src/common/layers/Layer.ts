import { LayerElement } from "@source/elements/layers";
import { State, Trigger } from "@base/common/listenable";
import type { Tool } from "../tools";
import type { Project } from "../project";
import { ISelectableItem } from "@base/types/types";
import { Canvas } from "@base/common/misc";

export default class Layer implements ISelectableItem {
    static readonly KEY = "layer";
    static _id = 0;

    readonly id: number;
    readonly name: string;
    readonly project: Project;

    readonly canvas: Canvas;

    protected _isEmpty = true;
    protected _isCurrent = false;
    protected _isSelected = false;
    
    readonly displayNameState = new State<string>("Layer");
    readonly isVisibleState = new State<boolean>(true);
    readonly isLockedState = new State<boolean>(false);

    readonly onDidAdded = new Trigger<Layer>();
    readonly onDidRemoved = new Trigger<Layer>();
    readonly onDidChosen = new Trigger<Layer>();
    readonly onDidUnchosen = new Trigger<Layer>();
    readonly onDidToolDown = new Trigger<Tool>();
    readonly onDidToolUse = new Trigger<Tool>();
    readonly onDidToolUp = new Trigger<Tool>();
    readonly onDidEdited = new Trigger<Layer>();
    readonly onDidSelected = new Trigger<Layer>();
    readonly onDidUnselected = new Trigger<Layer>();
    readonly onDidReordered = new Trigger<number>();

    constructor(name: string, project: Project) {
        this.id = ++ Layer._id;
        this.name = name;
        this.project = project;

        this.canvas = Canvas.sized(project.canvasWidth, project.canvasHeight);
        this.canvas.element.id = "layer-" + this.id;
        this.canvas.element.classList.add("layer-canvas");

        this.setDisplayName("Layer " + this.id);

        //
        this.isVisibleState.listen(this.setCanvasElementVisibility.bind(this), true);

        // TEMP
        // for (let y = 0; y < this.width; y ++) {
        //     for (let x = 0; x < this.height; x ++) {
        //         this.context.fillStyle = Color.random().getRgbString();
        //         this.context.fillRect(x, y, 1, 1);
        //     }
        // }
    }

    choose(): boolean {
        return this.project.layers.choose(this);
    }
    unchoose(): boolean {
        return this.project.layers.unchoose(this);
    }
    remove(): boolean {
        return this.project.layers.remove(this);
    }

    createElement(): HTMLElement {
        return new LayerElement(this);
    }

    // On
    onAdd() {
        this.onDidAdded.trigger(this);
    }
    onRemove() {
        this.project.app.selection.deselect(Layer.KEY, this);
        
        this.canvas.element.remove();
        this.onDidRemoved.trigger(this);
    }
    onChoose() {
        this._isCurrent = true;
        this.onDidChosen.trigger(this);
    }
    onUnchoose() {
        this._isCurrent = false;
        this.onDidUnchosen.trigger(this);
    }
    onToolDown(tool: Tool) {
        this.onDidToolDown.trigger(tool);
    }
    onToolUse(tool: Tool) {
        this.onDidToolUse.trigger(tool);
    }
    onToolMove(tool: Tool) {}
    onToolUp(tool: Tool) {
        this.onChanged();
        
        this.onDidToolUp.trigger(tool);
        this.onDidEdited.trigger(this);
    }
    onSelect(key: string) {
        this._isSelected = true;
        this.onDidSelected.trigger(this);
    }
    onUnselect() {
        this._isSelected = false;
        this.onDidUnselected.trigger(this);
    }
    onChanged() {
        this._isEmpty = false;
        this.setCanvasElementVisibility(true);
    }
    onReorder(newIndex: number) {
        this.onDidReordered.trigger(newIndex);
    }
    
    // Set
    setSize(width: number, height: number): this {
        this.canvas.setSize(width, height);
        return this;
    }
    setDisplayName(value: string): this {
        this.displayNameState.set(value);
        return this;
    }
    setIsVisible(value: boolean): this {
        this.isVisibleState.set(value);
        return this;
    }
    setIsLocked(value: boolean): this {
        this.isLockedState.set(value);
        return this;
    }
    setCanvasElementVisibility(value: boolean): this {
        this.canvas.element.style.visibility = value ? "visible" : "hidden";
        return this;
    }

    // Get
    getDataUrl(): string {
        return this.canvas.getDataUrl();
    }
    /**
     * Returns index of `layer` in the list if exists, otherwise returns `null`
     * @alias layersManager.getIndexOf
     */
    getIndex(): number | null {
        return this.project.layers.getIndexOf(this);
    }
    get context(): CanvasRenderingContext2D {
        return this.canvas.context;
    }
    get displayName(): string {
        return this.displayNameState.value;
    }
    get isVisible(): boolean {
        return this.isVisibleState.value;
    }
    get isLocked(): boolean {
        return this.isLockedState.value;
    }
    get isCurrent(): boolean {
        return this._isCurrent;
    }
    get isSelected(): boolean {
        return this._isSelected;
    }
    get isEditable(): boolean {
        return this.isVisible && !this.isLocked;
    }
    get isEmpty(): boolean {
        return this._isEmpty;
    }
    get width(): number {
        return this.canvas.width;
    }
    get height(): number {
        return this.canvas.height;
    }
}