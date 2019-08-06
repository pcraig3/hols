const { css } = require('emotion')

/* Utilities */

const theme = {
  color: {
    red: '#D43B1D',
    yellowPale: '#FFFCF0',
    greyLight: '#BFC1C3',
    focus: 'cornflowerblue',
  },
  space: {
    xxs: '5px',
    xs: '10px',
    sm: '15px',
    md: '20px',
    lg: '30px',
    xl: '40px',
    xxl: '60px',
  },
  mq: {
    xs: 'max-width: 336px',
    sm: 'min-width: 336px',
    md: 'min-width: 568px',
    lg: 'min-width: 768px',
    xl: 'min-width: 1024px',
  },
}

/* Reused styles */

const pageMargin = css`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${theme.space.md};
`

const visuallyHidden = css`
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  clip: rect(0 0 0 0) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  border: 0 !important;
  white-space: nowrap !important;
`

module.exports = {
  theme,
  visuallyHidden,
  pageMargin,
}
