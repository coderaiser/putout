type Pos = namedTypes.Position;
type Loc = namedTypes.SourceLocation;

export default class Mapping {
  constructor(
    public sourceLines: Lines,
    public sourceLoc: Loc,
    public targetLoc: Loc = sourceLoc,
  ) {}
}
