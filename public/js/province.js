/* eslint-disable */
var pastEvents = document.querySelectorAll('.past');
var allEvents = document.getElementsByTagName('dt');
var rows = document.querySelectorAll('.row');
var b = document.getElementById('toggle-past');
b.setAttribute('data-show-aria-label', "Hide ".concat(pastEvents.length, " past holidays from the list. Including past holidays, ").concat(allEvents.length, " holidays are listed."));
b.setAttribute('data-show-textContent', "Hide ".concat(pastEvents.length, " past holidays"));
b.setAttribute('data-hide-aria-label', "Return ".concat(pastEvents.length, " past holidays to the list. Not including past holidays, ").concat(allEvents.length, " holidays are listed."));
b.setAttribute('data-hide-textContent', "Show ".concat(pastEvents.length, " past holidays")); // set initial values for button

/* set up button */
b.setAttribute('data-show', false);
b.setAttribute('aria-label', b.getAttribute('data-hide-aria-label'));
b.querySelector('span').textContent = b.getAttribute('data-hide-textContent');
b.removeAttribute('style');
for (var i = 0, max = pastEvents.length; i < max; i++) {
  pastEvents[i].style.display = 'none';
}

b.addEventListener('click', function (event) {
  var show = b.getAttribute('data-show') === 'false' ? false : true; // reverse the boolean because we want to do the opposite of the data value

  show = !show;
  b.setAttribute('data-show', show);

  if (show) {
    b.setAttribute('aria-label', b.getAttribute('data-show-aria-label'));
    b.querySelector('span').textContent = b.getAttribute('data-show-textContent');
  } else {
    b.setAttribute('aria-label', b.getAttribute('data-hide-aria-label'));
    b.querySelector('span').textContent = b.getAttribute('data-hide-textContent');
  }

  for (var i = 0, max = pastEvents.length; i < max; i++) {
    if (!show) {
      pastEvents[i].style.display = 'none';
    } else {
      pastEvents[i].removeAttribute('style');
    }
  }
}, false);