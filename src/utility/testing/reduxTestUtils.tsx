import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer, { initialState } from '../../store/reducer';

interface Props {
  children: ReactNode;
}

const render = (
  ui: ReactElement,
  { store = createStore(reducer), ...renderOptions } = { initialState }
) => {
  const Wrapper: FunctionComponent = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
