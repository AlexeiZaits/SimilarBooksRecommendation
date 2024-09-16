import { ReactNode } from 'react';
import './App.scss'
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { Header } from 'widjets/header';
import { AutoCompleteSearch } from 'widjets/autoCompleteSearch';
import { Authorization, ScrollTop } from 'features/index';
import { Sidebar } from 'widjets/index';

interface IAPP {
  children: ReactNode
}

const App = ({children}: IAPP) => {

  return (
    <Provider store={store}>
      <Authorization>
        <Header>
          <AutoCompleteSearch/>
          {false && <ScrollTop/>}
          <Sidebar/>
        </Header>
      </Authorization>
      <main className='main'>{children}</main>
    </Provider>
  );
};

export default App
