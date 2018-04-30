import { Component } from 'react'
import Head from 'next/head'

export default () => (
      <div>
        <Head>
          <title>McSocks</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
          <style>{`
          body {
            margin: 0;
          }

          * {
            box-sizing: border-box;
            font-family: 'Roboto', sans-serif;
          }
        `}</style>
    </Head>
  </div>)
