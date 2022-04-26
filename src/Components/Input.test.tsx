import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

test('Input changes on change event', async () => {
  let val = '';
  let mockSetVal = jest.fn((v) => (val = v));
  const utils = render(
    <Input label="Email" name="email" type="email" value={val} onChange={mockSetVal} placeholder="Email" />,
  );

  const input = utils.getByLabelText('Email');
  const user = userEvent.setup();
  await user.type(input, 'user@email.com');
  expect(mockSetVal).toHaveBeenCalled();
});
