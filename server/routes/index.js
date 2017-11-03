import express from 'express';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import routes from '../../client/routes';
import reducers from '../../client//reducers';
import auth from './middlewares/auth';

const router = express.Router();
const store = createStore(reducers, applyMiddleware(thunk));

router.use(require('./middlewares/inject'));
router.use('/api', auth, require('./api/index'));
router.get('*', (req, res) => {
  const matchedRoutes = matchRoutes(routes, req.url);
  const promises = matchedRoutes.map(({route, match}) => {
    let initData = route.component.initData;
    let params = match.params;

    // need pass parsed params to init data fn
    return initData instanceof Function ? initData(store, params) : Promise.resolve(null);
  });
  return Promise.all(promises).then(() => {
    let context = {};
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );
    if (context.status === 404) {
      return res.status(404);
    }
    if (context.status === 302) {
      return res.redirect(302, context. url);
    }
    res.render('index', {
      initialState: decodeHtml(JSON.stringify(store.getState())),
      html
    });
  });
});

function encodeHtml(html) {
  return html.length === 0 ? '' :
    html.replace(/&amp;/g,"&")
      .replace(/&lt;/g,"<")
      .replace(/&gt;/g,">")
      .replace(/&nbsp;/g," ")
      .replace(/&#39;/g,"\'")
      .replace(/&quot;/g,"\"");
}

function decodeHtml (html) {
  return html.length === 0 ? '' :
    html.replace(/&/g,"&amp;")
    replace(/</g,"&lt;")
    replace(/>/g,"&gt;")
    replace(/ /g,"&nbsp;")
    replace(/\'/g,"&#39;")
    replace(/\"/g,"&quot;");
}

module.exports = router;
