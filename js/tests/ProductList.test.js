import React from 'react'
import renderer from 'react-test-renderer'
import {ProductList} from '../components/ProductList'

describe('ProductList component', () => {
  describe('snapshot', () => {
    it('ProductList default', () => {
      const
        relay={environment:{}},
        viewer={},
        products=[],
        renderedValue = renderer.create(<ProductList products={products} relay={relay} viewer={viewer} />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })
  })
})