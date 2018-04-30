import Router from 'next/router'
import Nav from './Nav'
import Head from './Head'

import * as gtag from '../lib/gtag'

Router.onRouteChangeComplete = url => {
  gtag.pageview(url)
}

export default ({ children }) => (
  <div>
    <Head />
    {children}
  </div>
)
