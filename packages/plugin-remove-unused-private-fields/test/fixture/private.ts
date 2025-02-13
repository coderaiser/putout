export class DrawCircle {
  constructor(
    el: HTMLElement,
    radius: number,
    options: SpeccerOptionsInterface
  ) {
    this.#init(el, radius, options);
  }

  #init(el: HTMLElement, radius: number, options: SpeccerOptionsInterface) {
    if (!el || !radius || !options) {
      throw new Error('Missing inputs el or radius or options');
    }
  }
}

