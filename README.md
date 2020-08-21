
<h1 align="center"> Hotel Currencies & Price Competitiveness task </h1>

![Airbrb](https://dev-to-uploads.s3.amazonaws.com/i/cpx1mvmiztpptfspcjum.png)


This projects is a frontend applications that displays a list of hotels, it's prices (in 4 different currencies) and it's competitors prices.

<h1 align="center"> <a href="https://ascenda-challenge.vercel.app/">Checkout the Website →	</a> </h1>



## Getting Started

To start the development server, run the following command —

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the applications running.

To run the tests, run the following —
```bash
npm run test
```

## Design Considerations
#### Tech stack / Packages

- [Next.js](https://nextjs.org/docs) (React.js) for the frontend
- [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for the unit and integrations tests
- [react-tooltip](https://www.npmjs.com/package/react-tooltip) for hover over tooltips
- [Vercel](https://vercel.com/) for hosting
- Vanilla CSS, but uses [CSS Modules](https://github.com/css-modules/css-modules) for file based scoping

## Changelog
#### 1.0
- Fetches hotels and pricing and displays it
- Currency conversion feature
- Competitor price listing feature
- Setup Jest & React Testing Library
- Unit / Integration tests for HotelCard component & utility functions

## Future version enhancements
 - [ ] When changing currencies, make only the prices API call instead of both hotels & prices
 - [ ] Add animating skeletons for the initial load
 - [ ] Fetch other currency prices asynchronously when the page has finished loading for one currency and store in state
 - [ ] Setup and configure Cypress for E2E tests
 - [ ] Automatically fetch prices for hotels after 'x' amount of time has passed or the user returns to this tab from another tab
 
##### Possible API changes for better performance 
- [ ] Allow price API calls for individual hotels instead of loading all at once 
- [ ] Cache frequently searched hotels to reduce initial load time


