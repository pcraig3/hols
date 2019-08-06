/* eslint-disable */
document.addEventListener(
  'DOMContentLoaded',
  () => {
    const scroller = new SweetScroll({
      trigger: 'a[href^="#"]', // Selector for trigger (must be a valid css selector)
      duration: 650, // Specifies animation duration in integer
      easing: 'easeOutExpo',
      after: (offset, $trigger) => {
        document.getElementById($trigger.hash.substr(1)).focus()
      },
    })
  },
  false,
)
