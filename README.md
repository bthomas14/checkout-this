# Checkout.com Take Home Assignment

This project was created using React/Typescript on the client and a mock server using json-server.

## To install

You will need to install the mock server, json-server, with `npm install -g json-server`

You will also need to run `npm install` in the project directory.


## To Run

To start the mock server, run `json-server --watch db.json` in the project directory.
Endpoints can be viewed by opening [http://localhost:3000](http://localhost:3000) in the browser.

To the start the client server, run `npm start` in the project directory.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## To Test

In the project directory, run `npm test`.


## Notes

Here are some improvements I would make if I had more time:
- In a real app, we'd query the product and then query a list of reviews but this seemed outside the scope of the project. On a real project, if you had enough reviews, you'd probably want to paginate them, but this would then require calculating the metrics needed for the chart server-side.
- Adding pagination navigation to the comments would be nice, as well as better styling around the comments section.
- The StarRating component is not keyboard accessible, which I ran out of time to do. 
- Testing could be more robust here but tried to do basic unit testing.
- Form validation is pretty rudimentary. If I had more time, I'd split this out into a separate file for reusability for custom validation behavior. But, the more logical approach is to use a form validation library like Yup so as not to reinvent the wheel.

