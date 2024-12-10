module.exports = {
  ga4: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-BHZ9J5CD89');

    document.addEventListener('DOMContentLoaded', function() {

      const eventLinks = document.querySelectorAll('a[data-event="true"]');
      for (let i = 0; i < eventLinks.length; i++) {
        eventLinks[i].addEventListener('click', function (event) {
          // 'this' is the element that the event handler is set on (otherwise, e.target is sometimes the children)
          gtag('event', 'click', {
            event_category: this.tagName,
            event_action: this.dataset.action,
            event_label: this.dataset.label,
          });
        })
      }

    });
  `,
  ga4Id: 'G-BHZ9J5CD89',
  fontStyles: `
  /* gothic-a1-300 - latin */
  @font-face {
    font-family: 'Gothic A1';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('/fonts/gothic-a1-v8-latin-300.woff2') format('woff2'); /* Modern browsers */
         url('/fonts/gothic-a1-v8-latin-300.woff') format('woff'); /* Fallback */
  }
  /* gothic-a1-regular - latin */
  @font-face {
    font-family: 'Gothic A1';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/gothic-a1-v8-latin-regular.woff2') format('woff2'); /* Modern browsers */
         url('/fonts/gothic-a1-v8-latin-regular.woff') format('woff'); /* Fallback */
  }
  /* gothic-a1-500 - latin */
  @font-face {
    font-family: 'Gothic A1';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/gothic-a1-v8-latin-500.woff2') format('woff2'); /* Modern browsers */
         url('/fonts/gothic-a1-v8-latin-500.woff') format('woff'); /* Fallback */
  }
  /* gothic-a1-600 - latin */
  @font-face {
    font-family: 'Gothic A1';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/gothic-a1-v8-latin-600.woff2') format('woff2'); /* Modern browsers */
         url('/fonts/gothic-a1-v8-latin-600.woff') format('woff'); /* Fallback */
  }
  /* gothic-a1-700 - latin */
  @font-face {
    font-family: 'Gothic A1';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/gothic-a1-v8-latin-700.woff2') format('woff2'); /* Modern browsers */
         url('/fonts/gothic-a1-v8-latin-700.woff') format('woff'); /* Fallback */
  }`,
  printStyles: `
  @media print {
    @page {
      size: 297mm 420mm; /* A4 page, otherwise Chrome uses mobile styles */
    }

    body {
      font-size: 12px;
      line-height: 1.2;
      font-family: sans-serif;
      color: black;
      padding: 0px 10px;
    }

    header .links,
    #next-holiday,
    .bottom-link,
    .hidden-print {
      display: none !important;
    }

    header,
    main section {
      padding: 0 !important;
    }

    header nav {
      padding-top: 10px;
      padding-bottom: 16px;
    }

    header nav > div:first-of-type > a {
      color: black !important;
    }

    header nav > div:first-of-type > a > svg > path {
      fill: black !important;
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
      padding-bottom: 16px !important;
    }

    section h1 ~ h2 {
      padding-top: 16px !important;
      padding-bottom: 8px !important;
    }

    dl {
      margin-bottom: 0 !important;
    }

    dl dt.key,
    dl dd.value,
    dl dd.value2 {
      width: 33% !important;
      padding: 8px 8px 8px 0 !important;
      border-width: 1px !important;
    }

    dl > div:not(.optional) dt.key,
    dl > div:not(.optional) dd.value,
    dl > div:not(.optional) dd.value2 {
        opacity: 1 !important;
    }

    dl > div.optional dt.key,
    dl > div.optional dd.value,
    dl > div.optional dd.value2 {
        opacity: 0.6;
    }

    #next-holiday-row > dt.key {
      color: black;
    }

    details summary {
      list-style: none;
    }

    details summary::-webkit-details-marker {
      display:none;
    }

    details summary > span {
      text-decoration: none !important;
    }
  }
`,
}
