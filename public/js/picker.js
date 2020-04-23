/* eslint-disable */
var regionButton = document.getElementById('region-select__button');
regionButton.setAttribute('data-hidden', true);

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