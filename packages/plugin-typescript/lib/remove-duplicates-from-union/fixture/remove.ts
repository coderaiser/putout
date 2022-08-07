type Y = () => void;

type X = Z | {
    a?: Y;
} | {
    a?: Y;
}
