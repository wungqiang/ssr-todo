import App from './containers/App';
import HomePage from './containers/HomePage';
import CreatePage from './containers/CreatePage';
import DetailPage from './containers/DetailPage';
import NotFoundPage from './containers/NotFoundPage';

const routes = [{
    component: App,
    routes: [{
        path: '/',
        exact: true,
        component: HomePage
      }, {
        path: '/create',
        component: CreatePage
      }, {
        path: '/edit/:id',
        component: CreatePage
      }, {
        path: '/detail/:id',
        component: DetailPage
      }, {
        path: '*',
        component: NotFoundPage
      }]
  }];

export default routes;
