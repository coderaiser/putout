/** Params constructor type. */
export interface IParamsConstructor {
  new(maxLength: number, maxSubParamsLength: number): IParams;

  /** create params from ParamsArray */
  fromArray(values: ParamsArray): IParams;
}
