# smartserve-loader

This snippet defers the loading of smartserve if the following conditions are met:

- It is the first pageview of a session (no need otherwise as the file will be cached)
- The device is a mobile device
- The connection is slow or the browser doesn't support modern features

The defer will be managed automatically so that the script will only be loaded when there is a period of cpu idle time.

## Usage

Paste `index.min.js` into your tag manager or a script tag replacing the propertyId in brackets at the end with your property id


e.g. before:
```js
!function(propertyId){return firstPageView()&&mobile()&&(slow()||!modern())?whenIdle(fetch):fetch();function slow(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection;return e&&has(["slow-2g","2g","3g"],e.effectiveType)}function mobile(){return void 0!==window.orientation||-1!==navigator.userAgent.indexOf("IEMobile")}function modern(){try{return Boolean(eval("(async () => await true)()").then)}catch(e){return}}function whenIdle(e){var t=+new Date;setTimeout(function(){return 200<new Date-t?idle(e):void e()},100)}function firstPageView(){var e="qubit-defer";return!has(decodeURIComponent(document.cookie),e)&&(document.cookie=e+"=1;",1)}function has(e,t){return-1<e.indexOf(t)}function fetch(){var t,n=document.createElement("script");return n.type="text/javascript",n.async=!0,n.defer=!0,n.src="https://static.goqubit.com/smartserve-"+propertyId+".js",n.onerror=n.onload=function(e){return e&&"error"===e.type?o():t||n.readyState&&!/^(c|loade)/.test(n.readyState)?void 0:o()},document.head.appendChild(n),n;function o(){t=!0,n.parentElement&&n.parentElement.removeChild(n)}}}(propertyId);
```

after:
```js
!function(propertyId){return firstPageView()&&mobile()&&(slow()||!modern())?whenIdle(fetch):fetch();function slow(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection;return e&&has(["slow-2g","2g","3g"],e.effectiveType)}function mobile(){return void 0!==window.orientation||-1!==navigator.userAgent.indexOf("IEMobile")}function modern(){try{return Boolean(eval("(async () => await true)()").then)}catch(e){return}}function whenIdle(e){var t=+new Date;setTimeout(function(){return 200<new Date-t?idle(e):void e()},100)}function firstPageView(){var e="qubit-defer";return!has(decodeURIComponent(document.cookie),e)&&(document.cookie=e+"=1;",1)}function has(e,t){return-1<e.indexOf(t)}function fetch(){var t,n=document.createElement("script");return n.type="text/javascript",n.async=!0,n.defer=!0,n.src="https://static.goqubit.com/smartserve-"+propertyId+".js",n.onerror=n.onload=function(e){return e&&"error"===e.type?o():t||n.readyState&&!/^(c|loade)/.test(n.readyState)?void 0:o()},document.head.appendChild(n),n;function o(){t=!0,n.parentElement&&n.parentElement.removeChild(n)}}}(2499);
```

