import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { Authorization, ScrollTop } from 'features/index';
import { Header, Settings, AutoCompleteSearch, Sidebar, AuthForm, Footer } from 'widjets/index';
import * as Sentry from "@sentry/react";
import './App.scss';
import { ErrorPage } from 'pages/index';

interface IAPP {
  children: ReactNode
}

const App = ({children}: IAPP) => {

  return (
    <Provider store={store}>
      <Authorization>
        <Header>
          <Sentry.ErrorBoundary fallback={<span>Произошла ошибка</span>}>
            <AutoCompleteSearch/>
          </Sentry.ErrorBoundary>
          {false && <ScrollTop/>}
          <Sentry.ErrorBoundary fallback={<span>Произошла ошибка</span>}>
            <Sidebar/>
          </Sentry.ErrorBoundary>
          <Settings/>
        </Header>
      </Authorization>
      <Sentry.ErrorBoundary fallback={<ErrorPage/>}>
        <AuthForm/>
      </Sentry.ErrorBoundary>
      <main className='main'>{children}</main>
      <Footer/>
    </Provider>
  );
};

export default App
