/* eslint-disable */

// Add a a polyfill for the 'details' HTML5 element for older browsers
if (typeof Promise !== 'function' && document.querySelector('details') !== null) {
  document.write('<script src="/js/details-element-polyfill.js"></script>')
}

// set up sweet scroll ッ
document.addEventListener('DOMContentLoaded', function () {
  var scroller = new SweetScroll({
    trigger: 'a[href^="#"]',
    // Selector for trigger (must be a valid css selector)
    duration: 650,
    // Specifies animation duration in integer
    easing: 'easeOutExpo',
    after: function after(offset, $trigger) {
      window.setTimeout(function () {
        document.getElementById($trigger.hash.substr(1)).focus();
      }, 1);
    }
  });
}, false);
