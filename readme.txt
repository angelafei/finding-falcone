- How to get code working:
    1. change the basename in `<BrowserRouter basename="/coding-test">` in route.jsx file to the basename that you are going to locate this project (eg. https://domain/coding-test).
    2. open terminal, and run `npm install`.
    3. run `npm run build` or `npm run build-dev`.
    4. find `main.js` and `index.html` in generated `dist` folder and copy them to your `www` or hosting place.
    5. open the browser and start to play `finding-falcone`!


- How to get testing running:
    1. open terminal, and run `npm run test`.
    2. test will then start and you can see coverage report displayed in the terminal


- Things still want to improve when getting more time:
    1. Adding spinner when data (planets, vehicles) loading.
    2. Adding error message while request fail (eg. network error...etc).
    3. Hiding the planets in Autocomplete when there's no vehicle available.
 