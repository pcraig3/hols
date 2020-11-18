const { html, pe2pei } = require('../utils')

const ObservingProvinces = ({ provinces = [], federal = false }) => {
  if (provinces.length === 13) {
    return html`<p>National holiday</p>`
  }

  if (provinces.length === 0) {
    return federal
      ? html`<p>
          Observed by${' '}<a href="/federal">federal industries</a
          ><span class="visuallyHidden">.</span>
        </p>`
      : ''
  }

  if (provinces.length === 1) {
    return federal
      ? html`
          <p>
            Observed in${' '}<a href=${`/provinces/${provinces[0].id}`}>${provinces[0].nameEn}</a>
            ${' '}and by${' '}<a href="/federal">federal industries</a>
            <span class="visuallyHidden">.</span>
          </p>
        `
      : html`
          <p>
            Observed in${' '}<a href=${`/provinces/${provinces[0].id}`}>${provinces[0].nameEn}</a>
            <span class="visuallyHidden">.</span>
          </p>
        `
  }

  if (provinces.length === 2) {
    return federal
      ? html`
          <p>
            Observed in${' '}<a href=${`/provinces/${provinces[0].id}`}>${provinces[0].nameEn}</a>,
            ${' '}<a href=${`/provinces/${provinces[1].id}`}>${provinces[1].nameEn},</a>${' '}and
            ${' '}by${' '}<a href="/federal">federal industries</a>
            <span class="visuallyHidden">.</span>
          </p>
        `
      : html`
          <p>
            Observed in${' '}<a href=${`/provinces/${provinces[0].id}`}>${provinces[0].nameEn}</a>
            ${' '}and${' '}<a href=${`/provinces/${provinces[1].id}`}>${provinces[1].nameEn}</a>
            <span class="visuallyHidden">.</span>
          </p>
        `
  }

  const isLastProvince = (province) => province.id === provinces[provinces.length - 1].id

  if (federal) {
    return html`
      <p>
        Observed in
        ${provinces.map(
          (p) =>
            html`${' '}<a href=${`/provinces/${p.id}`} aria-label=${p.nameEn}>${pe2pei(p.id)}</a
              >${','}`,
        )}
        ${' '}and by${' '}<a href="/federal">federal industries</a>
        <span class="visuallyHidden">.</span>
      </p>
    `
  }

  return html`
    <p>
      Observed in
      ${provinces.map(
        (p) => html`
          ${isLastProvince(p) ? ' and ' : ' '}<a href=${`/provinces/${p.id}`} aria-label=${p.nameEn}
            >${pe2pei(p.id)}</a
          >${isLastProvince(p) ? '' : ','}
        `,
      )}
      <span class="visuallyHidden">.</span>
    </p>
  `
}

module.exports = ObservingProvinces
