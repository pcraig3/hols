/* eslint-disable */
window.ga = window.ga || function () {
  ;
  (ga.q = ga.q || []).push(arguments);
};

ga.l = +new Date();
ga('create', 'UA-37633400-10', 'auto');
ga('send', 'pageview');

document.addEventListener('click', function (event) {
  if (event.target.dataset.event) {
    // ga(‘send’, ‘event’, ‘Category’, ‘Action’, ‘Label’, ‘Value’);
    ga('send', 'event', {
      eventCategory: event.target.tagName,
      eventAction: event.target.dataset.action,
      eventLabel: event.target.dataset.label,
      transport: 'beacon'
    })
  }
}, false);
