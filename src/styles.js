const { css } = require('emotion')

/* Utilities */

const theme = {
  color: {
    red: '#9f2f10',
    yellowPale: '#fffcf0',
    greyLight: '#bfc1c3',
    grey: '#3A3A3A',
    focus: 'cornflowerblue',
    federal: { accent: '#b04f72', focus: 'cornflowerblue' },
    AB: { accent: '#a50069', focus: '#00aad2' },
    BC: { accent: '#5475a7', focus: '#ffbf47' },
    MB: { accent: '#057d3e', focus: '#2c3135' },
    NB: { accent: '#336666', focus: '#ffbf47' },
    NL: { accent: '#005596', focus: '#fbaf5f' },
    NS: { accent: '#006cb7', focus: '#f8d44c' },
    NT: { accent: '#0f599a', focus: '#c75997' },
    NU: { accent: '#5c5600', focus: '#5a9699' },
    ON: { accent: '#006b3f', focus: '#333333' },
    PE: { accent: '#008570', focus: '#99cc99' },
    QC: { accent: '#095797', focus: '#ffbf47' },
    SK: { accent: '#046a38', focus: '#fbdd40' },
    YT: { accent: '#244c5a', focus: '#f2a900' },
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

const contentPageStyles = css`
  line-height: 1.4;

  > *:not(ul) {
    width: 100%;

    @media (${theme.mq.md}) {
      width: 90%;
    }

    @media (${theme.mq.xl}) {
      width: 70%;
    }
  }

  h1 {
    margin: ${theme.space.xl} 0;
  }

  h2 {
    font-size: 1.15em;
    margin-top: ${theme.space.xl};

    @media (${theme.mq.md}) {
      margin-top: ${theme.space.xxl};
    }
  }

  ul {
    padding-left: ${theme.space.md};

    @media (${theme.mq.sm}) {
      padding-left: ${theme.space.lg};
    }

    @media (${theme.mq.md}) {
      padding-left: ${theme.space.xl};
    }
  }

  footer {
    margin-top: calc(${theme.space.xl} + ${theme.space.xl});
  }
`

const horizontalPadding = css`
  padding-left: ${theme.space.sm};
  padding-right: ${theme.space.md};

  @media (${theme.mq.lg}) {
    padding-left: ${theme.space.lg};
  }
`

const insideContainer = css`
  width: 100%;
  margin: 0 auto;

  @media (${theme.mq.sm}) {
    width: 95%;
  }

  @media (${theme.mq.lg}) {
    width: 80%;
    max-width: 960px;
  }

  @media (${theme.mq.xl}) {
    max-width: 1170px;
  }
`

const hiddenOnMobile = css`
  display: none !important;

  @media (${theme.mq.md}) {
    display: initial !important;
  }
`

module.exports = {
  theme,
  visuallyHidden,
  pageMargin,
  contentPageStyles,
  insideContainer,
  horizontalPadding,
  hiddenOnMobile,
}
