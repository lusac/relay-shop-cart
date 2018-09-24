import React from 'react'
import renderer from 'react-test-renderer'
import {Product} from '../components/Product'

describe('Product component', () => {
  describe('snapshot', () => {
    it('Product default', () => {
      const
        product={
          id: 1, name: 'item a', image: 'a.png', price: 11, amount: 1
        },
        renderedValue = renderer.create(<Product product={product} />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })
  })
})