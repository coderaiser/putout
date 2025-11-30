export class DrawCircle {
    #canvas: HTMLElement | SVGElement | null;
    
    constructor(
        el: HTMLElement,
        radius: number, 
        options: SpeccerOptionsInterface
) {
        this.#init(el, radius, options);
    }
}