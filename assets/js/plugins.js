// create a new script element for the toastify-js library
var toastifyScript = document.createElement('script');
toastifyScript.type = 'text/javascript';
toastifyScript.src = 'https://cdn.jsdelivr.net/npm/toastify-js';

// append the new script element to the document's head
document.head.appendChild(toastifyScript);

// load other scripts after toastify-js has finished loading
toastifyScript.onload = function() {
  // load the choices.js library
  var choicesScript = document.createElement('script');
  choicesScript.type = 'text/javascript';
  choicesScript.src = 'assets/libs/choices.js/public/assets/scripts/choices.min.js';
  document.head.appendChild(choicesScript);

  // load the flatpickr library
  var flatpickrScript = document.createElement('script');
  flatpickrScript.type = 'text/javascript';
  flatpickrScript.src = 'assets/libs/flatpickr/flatpickr.min.js';
  document.head.appendChild(flatpickrScript);
}

// remove the original code that uses document.writeln
// (document.querySelectorAll("[toast-list]")||document.querySelectorAll("[data-choices]")||document.querySelectorAll("[data-provider]"))&&(document.writeln("<script type='text/javascript' src='https://cdn.jsdelivr.net/npm/toastify-js'><\/script>"),document.writeln("<script type='text/javascript' src='assets/libs/choices.js/public/assets/scripts/choices.min.js'><\/script>"),document.writeln("<script type='text/javascript' src='assets/libs/flatpickr/flatpickr.min.js'><\/script>"));
