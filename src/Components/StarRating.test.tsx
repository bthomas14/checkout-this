import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';

import StarRating from './StarRating';

test('renders star rating component', () => {
  const {container} = render(<StarRating onClick={jest.fn()} value={null} />);

  const starEls = container.querySelectorAll('li > div');
  expect(starEls.length).toBe(5);

  const selected = container.getElementsByClassName('selected');
  const unselected = container.getElementsByClassName('unselected');
  expect(selected.length).toBe(0)
  expect(unselected.length).toBe(5)
});

test('renders star rating component with value', () => {
  const {container} = render(<StarRating onClick={jest.fn()} value={3} />);

  const selected = container.getElementsByClassName('selected');
  const unselected = container.getElementsByClassName('unselected');
  expect(selected.length).toBe(3)
  expect(unselected.length).toBe(2)
});