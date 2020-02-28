/* eslint-disable */
var regionButton = document.getElementById('region-select__button');
regionButton.setAttribute('data-hidden', true);

var regionSelect = document.getElementById('region-select');
regionSelect.addEventListener('change', function (event) {
  // regionSelect[regionSelect.selectedIndex].value
  event.target.form.submit()
})
