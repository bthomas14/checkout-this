import React from 'react';
import {render} from '@testing-library/react';

import App from './App';

test('Renders app successfully', () => {
  const app = render(<App />);
  expect(app).toMatchSnapshot();
});
