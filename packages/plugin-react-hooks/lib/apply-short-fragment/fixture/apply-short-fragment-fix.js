function Glossary(props) {
  return (
    (<dl>
      {props.items.map(item => (
        // Without the `key`, React will fire a key warning
        (<React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>)
      ))}
    </dl>)
  );
}

class MemberExpression extends React.Component {
  render() {
    return <>
      <td>Hello</td>
      <td>World</td>
    </>;
  }
}

class Identifier extends React.Component {
  render() {
    return <>
      <td>Hello</td>
      <td>World</td>
    </>;
  }
}

function short(props) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}
