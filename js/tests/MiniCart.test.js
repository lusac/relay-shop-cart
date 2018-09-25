import React from 'react'
import renderer from 'react-test-renderer'
import MiniCart from '../components/MiniCart'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AddProductToCartMutation from '../mutations/AddProductToCartMutation'
import DecreaseProductToCartMutation from '../mutations/DecreaseProductToCartMutation'
import RemoveProductToCartMutation from '../mutations/RemoveProductToCartMutation'

configure({ adapter: new Adapter() })

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

  describe('methods', () => {
    let product
    let environment
    let items

    beforeEach(() => {
      product={
        id: 1, name: 'item a', image: 'a.png', price: 11, amount: 1, qty: 2
      },
      environment = {xunda:1},
      items=[
        {id: 1, name: 'item a', image: 'a.png', price: 11, amount: 1},
        {id: 2, name: 'item b', image: 'b.png', price: 22, amount: 2},
        {id: 3, name: 'item c', image: 'c.png', price: 33, amount: 3}
      ]
    })

    describe('method _handleIncreaseProduct', () => {
      it('Add product when amount bigger then 0', () => {
        let wrapper = shallow(<MiniCart items={items} environment={environment} />)
        spyOn(AddProductToCartMutation, 'commit')
        wrapper.instance()._handleIncreaseProduct(product)
        expect(AddProductToCartMutation.commit).toHaveBeenCalledWith(environment, product)
      })

      // Mockar Alert
      // it('Do not Add product when amount equal to 0', () => {
      //   const product = {
      //     id: 1, name: 'item a', image: 'a.png', price: 11, amount: 0
      //   }
      //   let wrapper = shallow(<MiniCart items={items} environment={environment} />)
      //   spyOn(AddProductToCartMutation, 'commit')
      //   wrapper.instance()._handleIncreaseProduct(product)
      //   expect(AddProductToCartMutation.commit).not.toHaveBeenCalled()
      // })
    })

    describe('method _handleDecreaseProduct', () => {
      it('Decrease product while qty bigger then 0', () => {
        let wrapper = shallow(<MiniCart items={items} environment={environment} />)
        spyOn(DecreaseProductToCartMutation, 'commit')
        wrapper.instance()._handleDecreaseProduct(product)
        expect(DecreaseProductToCartMutation.commit).toHaveBeenCalledWith(environment, product)
      })

      it('Do not decrease product while qty equal to 0', () => {
        product.qty = 0
        let wrapper = shallow(<MiniCart items={items} environment={environment} />)
        spyOn(DecreaseProductToCartMutation, 'commit')
        wrapper.instance()._handleDecreaseProduct(product)
        expect(DecreaseProductToCartMutation.commit).not.toHaveBeenCalled()
      })
    })

    describe('method _handleRemoveProduct', () => {
      it('Decrease product while qty bigger then 0', () => {
        let wrapper = shallow(<MiniCart items={items} environment={environment} />)
        spyOn(RemoveProductToCartMutation, 'commit')
        wrapper.instance()._handleRemoveProduct(product)
        expect(RemoveProductToCartMutation.commit).toHaveBeenCalledWith(environment, product)
      })
    })

    describe('method _handleToggle', () => {
      it('return class if show props is false', () => {
        let wrapper = shallow(<MiniCart show={false} items={items} environment={environment} />)
        let resp = wrapper.instance()._handleToggle()
        expect(resp).toBe('mini-cart--hidden')
      })

      it('return undefined if show props is true', () => {
        let wrapper = shallow(<MiniCart show={true} items={items} environment={environment} />)
        let resp = wrapper.instance()._handleToggle()
        expect(resp).toBeUndefined()
      })
    })
  })
})