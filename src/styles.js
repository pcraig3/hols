const { css } = require('emotion')

/* Utilities */

const theme = {
  color: {
    red: '#D43B1D',
    yellowPale: '#FFFCF0',
    greyLight: '#BFC1C3',
    focus: 'cornflowerblue',
    AB: { accent: '#a50069', focus: '#00aad2' },
    BC: { accent: '#5475a7', focus: '#ffbf47' },
    MB: { accent: '#057d3e', focus: '#2c3135' },
    NB: { accent: '#336666', focus: '#ffbf47' },
    NL: { accent: '#005596', focus: '#fbaf5f' },
    NS: { accent: '#006cb7', focus: '#f8d44c' },
    NT: { accent: '#0f599a', focus: '#c75997' },
    NU: { accent: '#5c5600', focus: '#5a9699' },
    ON: { accent: '#006B3F', focus: '#333333' },
    PE: { accent: '#008570', focus: '#99CC99' },
    QC: { accent: '#095797', focus: '#ffbf47' },
    SK: { accent: '#046a38', focus: '#fbdd40' },
    YT: { accent: '#244C5A', focus: '#F2A900' },
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
    xxl: 'min-width: 1600px',
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
