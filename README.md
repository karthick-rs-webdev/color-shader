#### Clone this project by using this link- https://github.com/karthick-rs-webdev/color-shader.git
#### code is under master branch(default)
#### and then run `npm start`
#### Following Dependencies are Installed for this project
1. User Search Engine Results Page(SERP) API for get image from user input
2. sortColorsByHue for sorting color based on HEX value
3. install sortColorsByHue by using **npm install sort-colors-js** command
4. loadash for debounce.
5. install loadash by using **npm i --save lodash** command

#### Dependencies Explanation
1. When User enter a input SERP Api will give a image result based on that
2. Add SERP Api Key in src/constants.js under SERP_KEY variable.Then only you can get Image Results.
3. From that image find a Dominant RGB Color.
4. From RGB Color Generate Related HEX Colors.
5. The Generated HEX Colors should be sorted.so i use sortColorsByHue package for that.
6. Debounce is a Technique which we can limit rate of api Call.i used this method for SERP api.
7. styles are wrote in src/custom.css
8. Application is Mobile Responsive
