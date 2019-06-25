
export const StyleProvider = () => {
  return <style jsx global>{`
  h1,
  a {
    font-family: 'Arial';
    color: blue;
  }

  ul {
    padding: 0;
  }

  li {
    list-style: none;
    margin: 5px 0;
  }

  a {
    text-decoration: none;
    color: blue;
  }

  a:hover {
    opacity: 0.6;
  }
`}</style>
}