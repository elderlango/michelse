function Empty({ resourceName }) {
  return <p 
  style={{ 
  border: '1px solid var(--color-grey-200)',
  backgroundColor: 'var(--color-grey-0)',
  borderRadius: '7px',
  width: '100%',
  height: '10rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.6rem',
  fontWeight: '500',
  textAlign: 'center',
}}
  >No se encontraron {resourceName}</p>;
}

export default Empty;
