const { html } = require('../utils')

const Expand = () => {
  return html`
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 485.539 485.539"
      xml:space="preserve"
      fill="#DD2E44"
      style="vertical-align: -0.125em;-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
      class="arrows--expand"
      aria-hidden="true"
      focusable="false"
    >
      <g>
        <g>
          <polygon
            points="162.295,282.887 52.18,393.002 52.18,314.268 0,314.268 0,482.08 167.813,482.08 167.813,429.9 89.076,429.9
			199.193,319.785 		"
          />
          <polygon
            points="433.359,393.002 323.246,282.889 286.348,319.785 396.465,429.9 317.727,429.9 317.727,482.08 485.539,482.08
			485.539,314.268 433.359,314.268 		"
          />
          <polygon
            points="317.727,3.459 317.727,55.639 396.465,55.639 286.348,165.754 323.246,202.651 433.359,92.538 433.359,171.273
			485.539,171.273 485.539,3.459 		"
          />
          <polygon
            points="167.813,55.639 167.813,3.459 0,3.459 0,171.273 52.18,171.273 52.18,92.537 162.295,202.651 199.193,165.754
			89.076,55.639 		"
          />
        </g>
      </g>
    </svg>
  `
}

const Collapse = () => {
  return html`
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 489.682 489.682"
      xml:space="preserve"
      fill="#DD2E44"
      style="vertical-align: -0.125em;-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
      class="arrows--collapse"
      aria-hidden="true"
      focusable="false"
    >
      <g>
        <g>
          <polygon
            points="31.38,339.21 110.117,339.21 0,449.325 36.898,486.222 147.013,376.108 147.013,454.843 199.193,454.843
			199.193,287.03 31.38,287.03 		"
          />
          <polygon
            points="458.302,339.21 458.302,287.03 290.488,287.03 290.488,454.843 342.669,454.843 342.669,376.108 452.782,486.222
			489.682,449.325 379.564,339.21 		"
          />
          <polygon
            points="458.302,150.472 379.564,150.472 489.682,40.357 452.782,3.46 342.669,113.574 342.669,34.839 290.488,34.839
			290.488,202.652 458.302,202.652 		"
          />
          <polygon
            points="147.013,113.574 36.898,3.46 0,40.357 110.117,150.472 31.38,150.472 31.38,202.652 199.193,202.652
			199.193,34.839 147.013,34.839 		"
          />
        </g>
      </g>
    </svg>
  `
}

const Download = () => {
  return html`
    <svg
      x="0px"
      y="0px"
      viewBox="0 0 451.111 451.111"
      xml:space="preserve"
      fill="#DD2E44"
      style="vertical-align: -0.125em;-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
      class="arrows--collapse"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="m225.556 354.445 145-145-48.333-48.333-64.444 64.444v-225.556h-64.444v225.556l-64.444-64.444-48.333 48.333z"
      />
      <path d="m0 386.667h451.111v64.444h-451.111z" />
    </svg>
  `
}

module.exports = { Expand, Collapse, Download }
