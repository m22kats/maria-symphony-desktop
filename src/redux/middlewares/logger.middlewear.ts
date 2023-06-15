import { PayloadAction } from '@reduxjs/toolkit';

export const loggerMiddleware =
  () => (next: any) => (action: PayloadAction<any>) => {
    const [reducerName, actionName] = action.type.split('/');
    // get times of date
    const times = new Date().toLocaleTimeString();

    // if (environment.isDevelopment) {
    console.info(`[ACTION ${times}]`, `${reducerName}Actions.${actionName}`);
    // }

    next(action);
  };
