/* eslint-env node */

import express from 'express'
import path from 'path'
import thunk from 'redux-thunk'
import { match } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import createHistory from 'react-router/lib/createMemoryHistory'
import routes from '../app/routes'
import reducers from '../app/app.redux'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import React from 'react'
import serialize from 'serialize-javascript'
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'
import 'isomorphic-fetch'

const app = express()

app.use(express.static(path.join(__dirname, '..', 'dist')))
console.log('SSR', process.env.SSR)
console.log('SERVER_LOAD_DATA', process.env.SERVER_LOAD_DATA)
// Create redux store
const middleware = [thunk]
let finalCreateStore
if (global.__DEV__) {
  finalCreateStore = compose(
    applyMiddleware(...middleware)
  )(createStore)
} else {
  finalCreateStore = applyMiddleware(...middleware)(createStore)
}
const store = finalCreateStore(reducers)

app.use((req, res) => {
  const history = createHistory(req.originalUr)

  match({ history, routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      if (__DEV__) {
        global.webpack_isomorphic_tools.refresh()
      }

      const loadData = process.env.SERVER_LOAD_DATA
        ? loadOnServer(Object.assign({}, renderProps, { store }))
        : Promise.resolve(1)
      loadData.then(() => {
        let serverRender = ''
        let serverState = ''
        let stylesheets = []
        let inlineStyles = []

        let bundleScriptFile
        const assets = global.webpack_isomorphic_tools.assets()
        if (process.env.SSR === true) {
          // You can also check renderProps.components or renderProps.routes for
          // your "not found" component or route respectively, and send a 404 as
          // below, if you're using a catch-all route.
          serverRender = renderToString(
            <Provider store={store}>
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          )
          /* styles (will be present only in production with webpack extract text plugin) */
          stylesheets = Object.keys(assets.styles).map((style) =>
            `<link href='${assets.styles[style]}' media="screen, projection" rel="stylesheet" type="text/css"/>`)

          inlineStyles = Object.keys(assets.assets)
            .map(k => assets.assets[k])
            .filter(v => v._style)
            .map(v => `<style>${v._style}</style>`)

          serverState = `<script charSet='UTF-8'>window.__data=${serialize(store.getState())}</script>`
          bundleScriptFile = `<script src=${assets.javascript.main} charSet='UTF-8'></script>`
        } else {
          bundleScriptFile = `<script src=${assets.javascript.main} charSet='UTF-8'></script>`
        }

        res.set('content-type', 'text/html')
        res.status(200).send(`<!doctype html>
  <html lang='en-us'>
    <head>
      <link rel='shortcut icon' href='/favicon.ico' />
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      <title>universal-react</title>
      ${stylesheets.join('\r\n')}
      ${inlineStyles.join('\r\n')}
    </head>
    <body>
      <div id="app">${serverRender}</div>
      ${serverState}
      ${bundleScriptFile}
    </body>
  </html>`)
        res.end()
      })
    } else {
      res.status(404).send('Not found')
    }
  })
})

app.listen(process.env.PORT, 'localhost', function (err) {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening at http://localhost:${process.env.PORT}`)
})
