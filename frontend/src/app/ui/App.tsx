import { ReactNode } from 'react';
import './App.scss'
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { Header } from 'widjets/header';
import { AutoCompleteSearch } from 'widjets/autoCompleteSearch';

interface IAPP {
  children: ReactNode
}

const App = ({children}: IAPP) => {

  return (
    <Provider store={store}>
      <Header>
        <AutoCompleteSearch/>
      </Header>
      <main className='main'>{children}</main>
    </Provider>
  );
};

export default App
