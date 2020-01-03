module.exports = {
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
