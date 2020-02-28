/* eslint-disable */

// Add a a polyfill for the 'details' HTML5 element for older browsers
if (typeof Promise !== 'function' && document.querySelector('details') !== null) {
  document.write('<script src="/js/details-element-polyfill.js"></script>')
}

// set up sweet scroll ッ
document.addEventListener('DOMContentLoaded', function () {
  new SweetScroll({
    trigger: 'a[href^="#"]',
    // Selector for trigger (must be a valid css selector)
    duration: 650,
    // Specifies animation duration in integer
    easing: 'easeOutExpo',
    after: function after(offset, $trigger) {
      window.setTimeout(function () {
        var id = $trigger.hash.substr(1)
        document.getElementById(id).focus();
        // the disappearing skip link messes with the scrollTo otherwise
        id === 'content' && window.scrollTo(0, 58);
      }, 1);
    }
  });
}, false);
