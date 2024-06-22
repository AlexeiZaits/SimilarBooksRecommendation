import { ReactNode } from 'react';
import './App.scss'
import { store } from '../store/store';
import { Provider } from 'react-redux';

interface IAPP {
  children: ReactNode
}

const App = ({children}: IAPP) => {
  
  return (
    <Provider store={store}>
      <header className='header'></header>
      <main className='main'>{children}</main>
      <footer className='footer'></footer>
    </Provider>
  );
};

export default App
