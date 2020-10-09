/**  eslint disable */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './Store/reducers/rootReducers';
import Login from './Components/Auth/Login';

const store = createStore(reducer, applyMiddleware(thunk));

describe('Login test', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>,
  );

  test('Should render all Login Buttons', () => {
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Github')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('Login as a Guest')).toBeInTheDocument();
  });
});
