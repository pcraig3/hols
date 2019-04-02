const html = require('../utils.js')

const labelStyle = {
  display: 'block',
  marginBottom: 10,
}

const inputStyle = {
  font: '400 1em sans-serif',
  border: '2px solid black',
  width: '100%',
  height: 40,
  marginTop: 0,
  padding: 5,
  borderRadius: 0,
  WebkitAppearance: 'none',
}

const Input = ({
  id,
  children,
  name = '',
  type = 'text',
  bold = true,
  style = {},
  ...props
}) =>
  html`
    <span>
      <label style=${{ ...labelStyle, fontWeight: bold ? 700 : 400 }} for=${id}>
        ${children}
      </label>
      <input
        style=${{ ...inputStyle, ...style }}
        id=${id}
        name=${name || id}
        type=${type}
        ...${props}
      />
    </span>
  `

module.exports = Input
