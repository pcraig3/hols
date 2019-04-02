const html = require('../utils.js')

const labelStyle = {
  display: 'block',
  marginBottom: 10,
}

const inputStyle = {
  border: '2px solid black',
  width: '100%',
  height: 40,
  marginTop: 0,
  padding: 5,
  borderRadius: 0,
  WebkitAppearance: 'none',
  font: '400 1em sans-serif',
}

const Input = ({
  id,
  children,
  name = '',
  type = 'text',
  style = {},
  ...props
}) =>
  html`
    <div>
      <label style=${labelStyle} for=${id}>
        ${children}
      </label>
      <input
        style=${{ ...inputStyle, ...style }}
        id=${id}
        name=${name || id}
        type=${type}
        ...${props}
      />
    </div>
  `

module.exports = Input
