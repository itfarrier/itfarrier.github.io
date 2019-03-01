import * as React from 'react';
import { useEffect, useState } from 'react';

interface IContextInitialState {
  isDark: boolean;
  toggleDark(): void;
}

const initialState: IContextInitialState = {
  isDark: false,
  /* tslint:disable-next-line:no-empty */
  toggleDark: () => {},
};

const Context: React.Context<IContextInitialState> = React.createContext<IContextInitialState>(
  initialState,
);

export const ContextProvider = ({ children }) => {
  const [isDark, toggleDark] = useState(false);

  return <Context.Provider value={{ isDark, toggleDark }}>{children}</Context.Provider>;
};

export default Context;
