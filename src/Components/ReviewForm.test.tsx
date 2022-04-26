import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';

import ReviewForm from './ReviewForm';

test('Text inputs change', async() => {
  render(<ReviewForm productId={1} onSubmit={jest.fn()} />);

  const nameInput = screen.getByLabelText('Name');
  fireEvent.change(nameInput, {target: {value: 'User'}});
  expect(nameInput).toHaveValue('User');

  const emailInput = screen.getByLabelText('Email');
  fireEvent.change(emailInput, {target: {value: 'user@gmail.com'}});
  expect(emailInput).toHaveValue('user@gmail.com');
});

test('Comments textarea changes', async() => {
  render(<ReviewForm productId={1} onSubmit={jest.fn()} />);
  const commentInput = screen.getByLabelText('Comment');
  fireEvent.change(commentInput, {target: {value: 'My review here'}});
  expect(commentInput).toHaveValue('My review here');
});

test('Star Rating changes on hover', async() => {
  render(<ReviewForm productId={1} onSubmit={jest.fn()} />);

  fireEvent.mouseEnter(screen.getByTestId('rating-3'));
  expect(screen.getByTestId('rating-1').children[0]).toHaveStyle('background-color: rgb(255, 157, 59)');
  expect(screen.getByTestId('rating-2').children[0]).toHaveStyle('background-color: rgb(255, 157, 59)');
  expect(screen.getByTestId('rating-3').children[0]).toHaveStyle('background-color: rgb(255, 157, 59)');
  expect(screen.getByTestId('rating-4').children[0]).toHaveStyle('background-color: rgb(206, 207, 217)');
  expect(screen.getByTestId('rating-5').children[0]).toHaveStyle('background-color: rgb(206, 207, 217)');

  fireEvent.mouseLeave(screen.getByTestId('rating-3'));
  expect(screen.getByTestId('rating-1').children[0]).toHaveStyle('background-color: rgb(206, 207, 217)');
  expect(screen.getByTestId('rating-2').children[0]).toHaveStyle('background-color: rgb(206, 207, 217)');
  expect(screen.getByTestId('rating-3').children[0]).toHaveStyle('background-color: rgb(206, 207, 217)');
  expect(screen.getByTestId('rating-4').children[0]).toHaveStyle('background-color: rgb(206, 207, 217)');
  expect(screen.getByTestId('rating-5').children[0]).toHaveStyle('background-color: rgb(206, 207, 217)');
});

test('Star Rating changes on click', async() => {
  render(<ReviewForm productId={1} onSubmit={jest.fn()} />);
  fireEvent.click(screen.getByTestId('rating-4'));

  expect(screen.getByTestId('rating-1').children[0]).toHaveStyle('background-color: rgb(255, 128, 0)');
  expect(screen.getByTestId('rating-2').children[0]).toHaveStyle('background-color: rgb(255, 128, 0)');
  expect(screen.getByTestId('rating-3').children[0]).toHaveStyle('background-color: rgb(255, 128, 0)');
  expect(screen.getByTestId('rating-4').children[0]).toHaveStyle('background-color: rgb(255, 128, 0)');
  expect(screen.getByTestId('rating-5').children[0]).toHaveStyle('background-color: rgb(206, 207, 217)');
});