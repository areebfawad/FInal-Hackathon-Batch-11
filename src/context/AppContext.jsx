import React, { createContext, useReducer, useEffect } from 'react'; // Import createContext and other React hooks

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
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Export custom hooks
export const useAppState = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context.state;
};

export const useAppDispatch = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppDispatch must be used within an AppProvider');
  }
  return context.dispatch;
};



// Export context as a named export and optionally as default
export { AppContext };
export default AppContext;
