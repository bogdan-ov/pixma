import { State, Trigger } from "../listenable";
import { TabElement } from "@base/elements/tabs";
import type { TabsManager } from "@base/managers";

export default class Tab {
    static _id: number = 0;

    readonly id: number;
    readonly manager: TabsManager;

    protected _viewElement: HTMLElement | null = null;

    readonly titleState = new State<string>("Tab");

    protected _isOpened = false;
    protected _isActive = false;

    readonly onDidOpened = new Trigger<Tab>();
    readonly onDidClosed = new Trigger<Tab>();
    readonly onDidEntered = new Trigger<Tab>();
    readonly onDidLeaved = new Trigger<Tab>();

    constructor(manager: TabsManager) {
        this.id = ++ Tab._id;
        this.manager = manager;
    }

    enter(): boolean {
        return this.manager.enter(this);
    }
    leave(): boolean {
        return this.manager.leave(this);
    }
    close(): boolean {
        return this.manager.close(this);
    }

    createElement(): HTMLElement {
        return new TabElement(this);
    }
    attachView(element: HTMLElement): this {
        this._viewElement = element;
        return this;
    }

    // On
    onOpen() {
        this._isOpened = true;
        this.onDidOpened.trigger(this);
    }
    onClose() {
        this._isOpened = false;
        this.onDidClosed.trigger(this);
    }
    onEnter() {
        this._isActive = true;
        this.onDidEntered.trigger(this);
    }
    onLeave() {
        this._isActive = false;
        this.onDidLeaved.trigger(this);
    }

    // Set
    setTitle(value: string): this {
        this.titleState.set(value);
        return this;
    }

    // Get
    get viewElement() {
        return this._viewElement;
    }
    get title() {
        return this.titleState.value;
    }
    get isOpened() {
        return this._isOpened;
    }
    get isActive() {
        return this._isActive;
    }
}
