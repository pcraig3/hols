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
