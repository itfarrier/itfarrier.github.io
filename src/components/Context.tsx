import * as React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';

interface IContextInitialState {
  isDark: boolean;
  toggleDark: Dispatch<SetStateAction<boolean>>;
}

const initialState: IContextInitialState = {
  isDark: false,
  toggleDark: () => !this.isDark,
};

const Context: React.Context<IContextInitialState> = React.createContext<IContextInitialState>(
  initialState,
);

export const ContextProvider = ({ children }) => {
  const [isDark, toggleDark] = useState<IContextInitialState['isDark']>(initialState.isDark);

  return <Context.Provider value={{ isDark, toggleDark }}>{children}</Context.Provider>;
};

export default Context;
