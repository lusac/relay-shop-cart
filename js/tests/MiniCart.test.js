import React from 'react'
import renderer from 'react-test-renderer'
import MiniCart from '../components/MiniCart'

describe('MiniCart component', () => {
  describe('snapshot', () => {
    it('MiniCart default', () => {
      const
        items=[
          {id: 1, name: 'item a', image: 'a.png', price: 11, amount: 1},
          {id: 2, name: 'item b', image: 'b.png', price: 22, amount: 2},
          {id: 3, name: 'item c', image: 'c.png', price: 33, amount: 3}
        ],
        renderedValue = renderer.create(<MiniCart items={items} />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })
  })
})