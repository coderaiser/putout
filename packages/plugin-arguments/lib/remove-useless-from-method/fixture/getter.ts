class Hello {
  public get onRender(): IEvent<{ start: number, end: number }> { return this._onRender.event; }
  /**
   * Apply key handling to the terminal
   */
  private _bindKeys(): void {
    this.register(this.onRender(() => this._compositionHelper!.updateCompositionElements()));
  }
}
