// Renders **bold** markers and \n line breaks safely (no dangerouslySetInnerHTML)
export default function MessageRenderer({ text }) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g)

  return (
    <>
      {segments.map((seg, i) => {
        if (seg.startsWith('**') && seg.endsWith('**')) {
          return (
            <strong key={i} style={{ color: '#00E5FF', fontWeight: '600' }}>
              {seg.slice(2, -2)}
            </strong>
          )
        }
        return seg.split('\n').map((line, j, arr) => (
          <span key={`${i}-${j}`}>
            {line}
            {j < arr.length - 1 && <br />}
          </span>
        ))
      })}
    </>
  )
}
