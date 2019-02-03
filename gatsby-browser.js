import React from 'react';

import { ContextProvider } from './src/components/Context';

export const wrapRootElement = ({ element }) => <ContextProvider>{element}</ContextProvider>;
