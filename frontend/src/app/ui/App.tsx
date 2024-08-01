import { ReactNode } from 'react';
import './App.scss'
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { Header } from 'widjets/header';
import { ModalRecommendsSearch } from 'widjets/modalRecommendsSearch';

interface IAPP {
  children: ReactNode
}

const App = ({children}: IAPP) => {

  return (
    <Provider store={store}>
      <Header>
        <ModalRecommendsSearch/>
      </Header>
      <main className='main'>{children}</main>
    </Provider>
  );
};

export default App
