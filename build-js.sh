#!/bin/bash

# Include library dependencies first
# - details-element-polyfill.js: Details polyfill for older browsers
# - sweet-scroll.min.js: Smooth scrolling library
# - picker.js: JS for the province picker
# - script.js: Core site functionality
# - email.js: Email-specific logic

terser \
  public/js/details-element-polyfill.js \
  public/js/sweet-scroll.min.js \
  public/js/picker.js \
  public/js/script.js \
  public/js/email.js \
  --compress \
  --mangle \
  --output public/js/min/bundle.min.js
