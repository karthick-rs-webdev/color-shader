#### Clone this project by using this link- https://github.com/karthick-rs-webdev/color-shader.git
Run `npm install`
### The following dependencies have been installed for this project:
1. User Search Engine Results Page (SERP) API for retrieving images based on user input.
2. sort-colors-js for sorting colors based on HEX values.
3. lodash for debouncing.

### Explanation of dependencies and how they work:
1. To make the SERP API functional, add the API key in src/constants.js under the SERP_KEY variable. This step is necessary for obtaining image results.
2. Once an image is obtained, find the dominant RGB color.
3. Generate related HEX colors from the RGB color.
4. Ensure the generated HEX colors are sorted. For this purpose, the sortColorsByHue package is used.
5. Use the debounce technique to limit the rate of API calls. This method is employed for the SERP API.

#### Styles are written in `src/custom.css`, and the application is mobile-responsive.
