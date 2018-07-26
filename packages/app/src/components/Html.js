// @flow
import React from 'react'
import type { AuthToken } from '../middleware/auth'

export type HtmlConfig = {|
  accessToken?: AuthToken,
  api: {|
    http: string,
    ws: string
  |}
|}

export default ({apolloState, helmet, styles, content, config, version}: { apolloState: *, helmet: *, styles: *, content: string, config: HtmlConfig, version: string }) => (
  <html {...helmet.htmlAttributes.toComponent()}>
  <head>
    {helmet.title.toComponent()}
    {helmet.meta.toComponent()}
    {helmet.link.toComponent()}
    <script
      type={'application/javascript'}
      dangerouslySetInnerHTML={{__html: `window.__CONFIG__ = ${JSON.stringify(config).replace(/</g, '\\u003c')}`}} />
    <script
      type={'application/javascript'}
      dangerouslySetInnerHTML={{__html: `window.__APOLLO_STATE__= ${JSON.stringify(apolloState).replace(/</g, '\\u003c')}`}} />
    {styles}
    <script src={`/main.js?v=${version}`} async defer />
    <link href={'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css'} rel={'stylesheet'}
          type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Unica+One" rel="stylesheet" />
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png"/>
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png"/>
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png"/>
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png"/>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png"/>
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png"/>
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png"/>
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png"/>
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png"/>
    <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)" href="/apple-touch-startup-image-320x460.png"/>
    <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)" href="/apple-touch-startup-image-640x920.png"/>
    <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href="/apple-touch-startup-image-640x1096.png"/>
    <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="/apple-touch-startup-image-750x1294.png"/>
    <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)" href="/apple-touch-startup-image-1182x2208.png"/>
    <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3)" href="/apple-touch-startup-image-1242x2148.png"/>
    <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)" href="/apple-touch-startup-image-748x1024.png"/>
    <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)" href="/apple-touch-startup-image-1496x2048.png"/>
    <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)" href="/apple-touch-startup-image-768x1004.png"/>
    <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" href="/apple-touch-startup-image-1536x2008.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
    <link rel="icon" type="image/png" sizes="228x228" href="/coast-228x228.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
    <link rel="manifest" href="/manifest.json"/>
    <link rel="shortcut icon" href="/favicon.ico"/>
    <link rel="yandex-tableau-widget" href="/yandex-browser-manifest.json"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
    <meta name="apple-mobile-web-app-title"/>
    <meta name="application-name"/>
    <meta name="mobile-web-app-capable" content="yes"/>
    <meta name="msapplication-TileColor" content="transparent"/>
    <meta name="msapplication-TileImage" content="/mstile-144x144.png"/>
    <meta name="msapplication-config" content="/browserconfig.xml"/>
    <meta name="theme-color" content="transparent"/>

  </head>
  <body {...helmet.bodyAttributes.toComponent()}>
  <div id={'content'} dangerouslySetInnerHTML={{__html: content}} />
  <div id={'modal-root'} />
  </body>
  </html>
)
