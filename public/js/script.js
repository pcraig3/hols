/* eslint-disable */

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

// Find all of the links with the 'button' role and add a click event to them
var elements = document.querySelectorAll('a[role="button"]');

for (var i = 0, len = elements.length; i < len; i++) {
  elements[i].addEventListener('keydown', function (e) {
    if (e.keyCode == 32) {
      e.target.click();
      e.preventDefault();
    }
  });
}

// Open the details element if someone clicks the "next-holiday-link" at the top of the page
var nextHolidayLink = document.getElementById('next-holiday-link');
if (nextHolidayLink) {
  nextHolidayLink.addEventListener('click', function (e) {
    var nextHolidayDetails = document.querySelector('#next-holiday-row details');
    if(nextHolidayDetails) {
      nextHolidayDetails.setAttribute('open', '');
    }
  });
}

/*
 * Inspired by Bootstrap Cookie Alert by Wruczek
 * https://github.com/Wruczek/Bootstrap-Cookie-Alert
 */
(function () {
  var cookieName = "toast1";
  var cookieAlert = document.getElementById('toast');
  var acceptCookies = document.querySelector('.toast--yes');

  if (!cookieAlert) {
     return;
  }

  cookieAlert.offsetHeight; // Force browser to trigger reflow (https://stackoverflow.com/a/39451131)

  // Show the alert if we cant find the "toast1" cookie
  if (!getCookie(cookieName)) {
      cookieAlert.classList.add("show");
  }

  // When clicking on the agree button, create a 1 year
  // cookie to remember user's choice and close the banner
  acceptCookies.addEventListener("click", function () {
      setCookie(cookieName, true, 1);
      cookieAlert.classList.remove("show");
  });

  // Cookie functions from w3schools
  function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + "path=/; SameSite=Lax; Secure";
  }

  function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }
})();

