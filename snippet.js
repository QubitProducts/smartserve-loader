!function(url){var defer=window.requestIdleCallback||whenIdle;return firstPageView("qubit-defer")&&mobile()&&(slow()||!modern())?defer(function(){fetch(url)},50,100):fetch(url);function fetch(e){var n=document.createElement("script");return n.type="text/javascript",n.async=!0,n.defer=!0,n.src=e,document.head.appendChild(n),n}function firstPageView(e){return!has(document.cookie,e)&&(document.cookie=e+"=1;",1)}function has(e,n){return-1<e.indexOf(n)}function mobile(){return void 0!==window.orientation||-1!==navigator.userAgent.indexOf("IEMobile")}function modern(){try{return Boolean(eval("(async () => await true)()").then)}catch(e){return}}function slow(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection;return e&&has(["slow-2g","2g","3g"],e.effectiveType)}function whenIdle(e,n,t){var r=+new Date;setTimeout(function(){return new Date-r>n+t?whenIdle(e,n,t):void e()},n)}}(url);
