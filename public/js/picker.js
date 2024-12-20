/* eslint-disable */
var selectPadding = 42;
var root = document.documentElement;
var regionButton = document.getElementById('region-select__button');
if (regionButton) {
  regionButton.setAttribute('data-display-none', true);

  var pickerContainer = document.getElementById('picker-container');
  pickerContainer.setAttribute('data-hidden', false);

  function addChangeListener(node) {
    node.addEventListener('change', function (event) {
      // node[node.selectedIndex].value
      event.target.form.submit();
    });
  }

  var regionSelect = document.getElementById('region-select');
  addChangeListener(regionSelect);

  var yearSelect = document.getElementById('year-select');
  addChangeListener(yearSelect);

  var regionSelectWidth = document.getElementById('region-select-width');
  root.style.setProperty('--region-select-width', regionSelectWidth.offsetWidth + selectPadding + "px");
}
