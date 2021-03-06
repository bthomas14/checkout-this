import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewChart from './ReviewChart';

test('Renders chart correctly', () => {
  const reviews =[
    {
      "id": 1,
      "productId": 1,
      "name": "User",
      "email": "user@email.com",
      "rating": 5,
      "comment": "Here's some text about my feelings on this product.",
      "createdAt": 1649893373000
    },
    {
      "id": 2,
      "productId": 1,
      "name": "Bob",
      "email": "bob@email.com",
      "rating": 3,
      "comment": "I didn't really like this.",
      "createdAt": 1650152573000
    },
    {
      "id": 3,
      "productId": 1,
      "name": "Maria",
      "email": "maria@email.com",
      "rating": 1,
      "comment": "This was just awful.",
      "createdAt": 1650578066229
    },
    {
      "id": 4,
      "productId": 1,
      "name": "Darren",
      "email": "darren@email.com",
      "rating": 5,
      "comment": "Excellent",
      "createdAt": 1650670973000
    },
    {
      "id": 5,
      "productId": 1,
      "name": "Nancy",
      "email": "nancy@gmail.com",
      "rating": 4,
      "comment": "I just loved this!",
      "createdAt": 1650585974529
    },
    {
      "id": 6,
      "productId": 1,
      "name": "Nancy",
      "email": "nancy@gmail.com",
      "rating": 4,
      "comment": "I just loved this!",
      "createdAt": 1650586121129
    },
    {
      "id": 7,
      "productId": 1,
      "name": "Layla",
      "email": "laylay@gmail.com",
      "rating": 2,
      "comment": "Seems weird",
      "createdAt": 1650586188376
    },
    {
      "id": 8,
      "name": "g",
      "email": "br@gmail.com",
      "rating": 4,
      "comment": "I didn't actually buy this",
      "createdAt": 1650843075760,
      "productId": 1
    },
    {
      "id": 9,
      "name": "Ness",
      "email": "ness@email.com",
      "rating": 2,
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "createdAt": 1650921193095,
      "productId": 1
    },
    {
      "id": 10,
      "name": "Kirby",
      "email": "kirby@email.com",
      "rating": 4,
      "comment": "This was pretty good.",
      "createdAt": 1650925043201,
      "productId": 1
    }
  ];
  const {container} = render(<ReviewChart reviews={reviews} />);

  const chartEl = container.querySelector('.recharts-wrapper');
  expect(chartEl).toBeInTheDocument();

  expect(screen.getByTestId('avg-rating')).toHaveTextContent('3.4 stars out of 5');
  expect(screen.getByTestId('rating-count')).toHaveTextContent('10 reviews');
});