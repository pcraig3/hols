module.exports = {
  fontStyles: `
  /* generated with https://google-webfonts-helper.herokuapp.com/fonts/gothic-a1?subsets=latin */
  /* gothic-a1-300 - latin */
  @font-face {
    font-family: 'Gothic A1';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('/fonts/gothic-a1-v8-latin-300.eot'); /* IE9 Compat Modes */
    src: local('Gothic A1 Light'), local('GothicA1-Light'),
         url('/fonts/gothic-a1-v8-latin-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/gothic-a1-v8-latin-300.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/gothic-a1-v8-latin-300.woff') format('woff'), /* Modern Browsers */
         url('/fonts/gothic-a1-v8-latin-300.ttf') format('truetype'), /* Safari, Android, iOS */
         url('/fonts/gothic-a1-v8-latin-300.svg#GothicA1') format('svg'); /* Legacy iOS */
  }
  /* gothic-a1-regular - latin */
  @font-face {
    font-family: 'Gothic A1';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/gothic-a1-v8-latin-regular.eot'); /* IE9 Compat Modes */
    src: local('Gothic A1 Regular'), local('GothicA1-Regular'),
         url('/fonts/gothic-a1-v8-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/gothic-a1-v8-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/gothic-a1-v8-latin-regular.woff') format('woff'), /* Modern Browsers */
         url('/fonts/gothic-a1-v8-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
         url('/fonts/gothic-a1-v8-latin-regular.svg#GothicA1') format('svg'); /* Legacy iOS */
  }
  /* gothic-a1-500 - latin */
  @font-face {
    font-family: 'Gothic A1';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/gothic-a1-v8-latin-500.eot'); /* IE9 Compat Modes */
    src: local('Gothic A1 Medium'), local('GothicA1-Medium'),
         url('/fonts/gothic-a1-v8-latin-500.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/gothic-a1-v8-latin-500.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/gothic-a1-v8-latin-500.woff') format('woff'), /* Modern Browsers */
         url('/fonts/gothic-a1-v8-latin-500.ttf') format('truetype'), /* Safari, Android, iOS */
         url('/fonts/gothic-a1-v8-latin-500.svg#GothicA1') format('svg'); /* Legacy iOS */
  }
  /* gothic-a1-600 - latin */
  @font-face {
    font-family: 'Gothic A1';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/gothic-a1-v8-latin-600.eot'); /* IE9 Compat Modes */
    src: local('Gothic A1 SemiBold'), local('GothicA1-SemiBold'),
         url('/fonts/gothic-a1-v8-latin-600.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/gothic-a1-v8-latin-600.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/gothic-a1-v8-latin-600.woff') format('woff'), /* Modern Browsers */
         url('/fonts/gothic-a1-v8-latin-600.ttf') format('truetype'), /* Safari, Android, iOS */
         url('/fonts/gothic-a1-v8-latin-600.svg#GothicA1') format('svg'); /* Legacy iOS */
  }
  /* gothic-a1-700 - latin */
  @font-face {
    font-family: 'Gothic A1';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/gothic-a1-v8-latin-700.eot'); /* IE9 Compat Modes */
    src: local('Gothic A1 Bold'), local('GothicA1-Bold'),
         url('/fonts/gothic-a1-v8-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/gothic-a1-v8-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/gothic-a1-v8-latin-700.woff') format('woff'), /* Modern Browsers */
         url('/fonts/gothic-a1-v8-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
         url('/fonts/gothic-a1-v8-latin-700.svg#GothicA1') format('svg'); /* Legacy iOS */
  }`,
  printStyles: `
  @media print {
    @page {
      size: 297mm 420mm; /* A4 page, otherwise Chrome uses mobile styles */
    }

    body {
      font-size: 11px;
      line-height: 1.2;
      font-family: sans-serif;
      color: black;
    }

    header,
    #next-holiday,
    .bottom-link {
      display: none;
    }

    main section {
      padding: 0 !important;
    }

    header nav,
    main section > div {
      width: 100% !important;
    }

    section h1 {
      margin-top: 0 !important;
    }

    section h2 {
      margin: 0 !important;
      padding-top: 0 !important;
      padding-bottom: 24px !important;
    }

    section h1 ~ h2 {
      padding-top: 16px !important;
      padding-bottom: 8px !important;
    }

    dl {
      margin-bottom: 0 !important;
    }

    dt.key,
    dd.value,
    dd.value2 {
      width: 33% !important;
      padding: 8px 8px 8px 0 !important;
      border-width: 1px !important;
    }
  }
`,
}
