import React from 'react';
import {render} from '@testing-library/react';
import Comment from './Comment';

test('Renders comment component', () => {
  const review = {
    id: 1,
    productId: 1,
    name: 'User',
    email: 'user@email.com',
    rating: 5,
    comment: "Here's some text about my feelings on this product.",
    createdAt: 1649893373000,
  };
  const {container} = render(<Comment review={review} />);
  const el = container.querySelector('.CommentItem');
  expect(el).toHaveTextContent("Here's some text about my feelings on this product.— User");
  expect(el).toHaveStyle('border: 1px solid #cecfd9');
  expect(el).toHaveStyle('marginBottom: 10px');
});
