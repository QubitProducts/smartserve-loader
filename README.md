# smartserve-loader

This snippet defers the loading of a script until the CPU is idle under the following conditions:

- The device is a mobile device
- It is the first pageview of a session (no need otherwise as the file will be cached)
- The connection is slow or the browser doesn't support modern features (the latter being a proxy for the device being old and therefore having limited resources)

## Rationale

The script attributes `async` and `defer` help peformance by loading scripts in parallel and allowing html parsing and execution to continue while the script downloads. However, in situations where there is limited bandwith or a device has limited resources, we can go further than `async` and `defer`, and wait until the CPU is idle before downloading the script in order to prevent any competition for bandwidth or resources.

`No async / defer`:
The browser pauses html parsing, downloads and executes the script, and then resumes parsing.

`async`:
The browser downloads the script immediately but continues parsing the html in parallel. Once the script has downloaded the browser pauses parsing to execute the script.

`defer`:
The browser downloads the script immediately but continues parsing the html in parallel. Once the script has downloaded the browser waits until it has finished parsing before executing the script.

`smartserve-loader`:
If a slow connection or device is detected, the browser does not download the script immediately, it waits until the CPU is idle before downloading and executing the script with both `async` and `defer` turned on.

before:
![before](https://user-images.githubusercontent.com/640611/82683632-3beaa300-9c49-11ea-8174-e4a9d49bf1f7.png)

after:
![after](https://user-images.githubusercontent.com/640611/82683639-3f7e2a00-9c49-11ea-8fc0-c0b8ce92044e.png)

## Usage

Paste `snippet.js` into your tag manager or a script tag replacing the url in the final parenthesis with the url for the script you wish to load:

For example:
```js
!function(url){var whenIdle...whenIdle(e,n,t):void e()},n)}}("YOUR URL GOES HERE");
```
