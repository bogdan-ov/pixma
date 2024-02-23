import { BaseElement } from "@base/elements";
import { EventName } from "@base/types/enums";
import { PaletteColor } from "@source/common/colors";

@BaseElement.define("palette-color")
export default class PaletteColorElement extends BaseElement {
    readonly paletteColor: PaletteColor;
    
    constructor(paletteColor: PaletteColor) {
        super();

        this.paletteColor = paletteColor;
        this.setStyle("background", paletteColor.getRgbString());

        this.classList.add("palette-color");
    }

    // On
    onMount(): void {
        super.onMount();

        this.listen(this, EventName.DOWN, this._onDown.bind(this));
    }
    protected _onDown() {
        this.paletteColor.pick();
    }
}
