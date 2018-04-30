import { Component } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import MdShoppingCart from 'react-icons/lib/md/shopping-cart'

import CartProvider from './CartProvider'
import HeaderCart from './HeaderCart'
import { totalItems } from '../lib/helpers'

const {publicRuntimeConfig} = getConfig()
const {CART_SERVICE} = publicRuntimeConfig

export default ({cart}) => (
  <div className={'nav-wrapper'}>
    <Link href={`/`}>
      <a>
        <h1>Socks Unlimited</h1>
      </a>
    </Link>

    <div className={'shopping-cart-container'}>
        <Link href={`/cart`}>
          <a>
            <MdShoppingCart size={25}/>
            <span>{ totalItems(cart) }</span>
          </a>
        </Link>
    </div>

    <style jsx>{`
      .nav-wrapper {
        width: 100%;
        background-color: gray;
        padding: 1em 3em;
        display: flex;
        justify-content: space-between;
      }

      .shopping-cart-container {
        display: flex;
        align-items: center;
        margin-right: 2em;
        cursor: pointer;
      }
    `}</style>
  </div>
)
