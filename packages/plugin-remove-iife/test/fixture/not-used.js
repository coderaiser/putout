((a) => fn(42))(value);
((a) => fn(a, 42))(value);
((a) => fn({customProp: a.x}))(value);
