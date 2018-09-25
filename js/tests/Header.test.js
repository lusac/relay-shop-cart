import React from 'react'
import renderer from 'react-test-renderer'
import {Header} from '../components/Header'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('Header component', () => {
  describe('snapshot', () => {
    it('Header default', () => {
      const
        viewer = {
          cart: {
            edges: [{node: {id:1}},{node: {id:2}},{node: {id:3}}]
          }
        },
        relay = {enviroment: {}},
        renderedValue =  renderer.create(<Header viewer={viewer} relay={relay} />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })
  })

  describe('methods', () => {
    const
      viewer = {
        cart: {
          edges: [
            {node: {id: 1, name: 'item a', image: 'a.png', price: 1.23, amount: 1}},
            {node: {id: 2, name: 'item b', image: 'b.png', price: 7.21, amount: 2}},
            {node: {id: 3, name: 'item c', image: 'c.png', price: 11.09, amount: 3}},
            {node: {id: 1, name: 'item a', image: 'a.png', price: 1.23, amount: 1}},
            {node: {id: 2, name: 'item b', image: 'b.png', price: 7.21, amount: 2}}
          ]
        }
      },
      relay = {enviroment: {}}

    it('method _toggleMiniCart', () => {
      let wrapper = shallow(<Header viewer={viewer} relay={relay} />)
      spyOn(wrapper.instance(), 'setState')
      wrapper.instance()._toggleMiniCart()
      expect(wrapper.instance().setState).toHaveBeenCalledWith({showMiniCart: true})
    })

    it('method _getCartTotalPrice', () => {
      let wrapper = shallow(<Header viewer={viewer} relay={relay} />)
      let totalPrice = wrapper.instance()._getCartTotalPrice()
      expect(totalPrice).toBe('R$ 27.97')
    })

    it('method _getFormatProductsData', () => {
      let wrapper = shallow(<Header viewer={viewer} relay={relay} />)
      let formatDate = wrapper.instance()._getFormatProductsData()
      expect(formatDate).toEqual({1: {amount: 1, id: 1, image: "a.png", name: "item a", price: 1.23, qty: 2}, 2: {amount: 2, id: 2, image: "b.png", name: "item b", price: 7.21, qty: 2}, 3: {amount: 3, id: 3, image: "c.png", name: "item c", price: 11.09, qty: 1}})
    })
  })
})