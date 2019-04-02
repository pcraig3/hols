const html = require('../utils.js')

const buttonStyle = {
  font: '400 1em sans-serif',
  lineHeight: 1.1875,
  display: 'inline-block',
  position: 'relative',
  width: '100%',
  marginTop: 0,
  padding: '7px 10px',
  borderRadius: 0,
  color: '#000000',
  backgroundColor: '#EEE',
  border: '2px solid #595959',
  textAlign: 'center',
  verticalAlign: 'top',
  cursor: 'pointer',
  WebkitAppearance: 'none',
}

const Button = ({ children, type = 'submit', style = {}, ...props }) =>
  html`
    <button type="${type}," style=${{ ...buttonStyle, ...style }} ...${props}>
      ${children}
    </button>
  `

module.exports = Button
