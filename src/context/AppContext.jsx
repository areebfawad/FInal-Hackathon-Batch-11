import React, { createContext, useReducer, useEffect } from 'react';

// Action Type Constants
const SET_USER = 'SET_USER';

// Initial State
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

// Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// Create Context
const AppContext = createContext();

// AppProvider Component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist user data to local storage
  useEffect(() => {
    try {
      if (state.user) {
        localStorage.setItem('user', JSON.stringify(state.user));
      } else {
        localStorage.removeItem('user');
      }
    } catch (err) {
      console.error('Error persisting user data:', err);
    }
  }, [state.user]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to Access State
export const useAppState = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context.state;
};

// Hook to Dispatch Actions
export const useAppDispatch = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppDispatch must be used within an AppProvider');
  }
  return context.dispatch;
};

// Export Context as Named and Default
export { AppContext };
export default AppContext;
