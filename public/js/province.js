/* eslint-disable */
function throttle(callback, limit) {
  var wait = false /* Initially, we're not waiting */
  return function() {
    /* We return a throttled function */
    if (!wait) {
      /* If we're not waiting */
      callback.call() /* Execute user's function */
      wait = true /* Prevent future invocations */
      setTimeout(function() {
        /* After a period of time */
        wait = false /* And allow future invocations */
      }, limit)
    }
  }
}

function updateCSSVar() {
  /* First we get the viewport height and we multiple it by 1% to get a value for a vh unit */
  let vh = window.innerHeight * 0.01
  /* Then we set the value in the --vh custom property to the root of the document */
  document.documentElement.style.setProperty('--vh', vh + 'px')
}

function ifLandscapeMode(cb) {
  return function() {
    /* you're in LANDSCAPE mode */
    if (window.matchMedia('(orientation: landscape)').matches) {
      cb()
    }
  }
}

/* We listen to the resize event every 5 milliseconds */
window.addEventListener('resize', throttle(ifLandscapeMode(updateCSSVar), 5))
updateCSSVar()

const pastEvents = document.querySelectorAll('.past')
const allEvents = document.getElementsByTagName('dt')
const rows = document.querySelectorAll('.row')
const b = document.getElementById('toggle-past')
b.setAttribute('data-show', true)
b.setAttribute(
  'data-show-aria-label',
  `Hide ${pastEvents.length} past holidays from the list. Including past holidays, ${allEvents.length} holidays are listed.`,
)
b.setAttribute('data-show-textContent', `Hide ${pastEvents.length} past holidays`)
b.setAttribute(
  'data-hide-aria-label',
  `Return ${pastEvents.length} past holidays to the list. Not including past holidays, ${allEvents.length} holidays are listed.`,
)
b.setAttribute('data-hide-textContent', `Show ${pastEvents.length} past holidays`)

// set initial values for button
b.setAttribute('aria-label', b.getAttribute('data-show-aria-label'))
b.textContent = b.getAttribute('data-show-textContent')

b.addEventListener(
  'click',
  function(event) {
    let show = b.getAttribute('data-show') === 'false' ? false : true

    // reverse the boolean because we want to do the opposite of the data value
    show = !show

    b.setAttribute('data-show', show)
    if (show) {
      b.setAttribute('aria-label', b.getAttribute('data-show-aria-label'))
      b.textContent = b.getAttribute('data-show-textContent')
    } else {
      b.setAttribute('aria-label', b.getAttribute('data-hide-aria-label'))
      b.textContent = b.getAttribute('data-hide-textContent')
    }

    for (var i = 0, max = pastEvents.length; i < max; i++) {
      if (!show) {
        pastEvents[i].style.display = 'none'
      } else {
        pastEvents[i].style = null
      }
    }
  },
  false,
)
