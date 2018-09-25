import React from 'react'
import renderer from 'react-test-renderer'
import {Product} from '../js/components/Product'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AddProductToCartMutation from '../js/mutations/AddProductToCartMutation'

configure({ adapter: new Adapter() })

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

  describe('methods', () => {
    describe('method _handleBuyProduct', () => {
      const relay = {environment:{xunda:1}}

      it('Add product when amount bigger then 0', () => {
        const product = {
          id: 1, name: 'item a', image: 'a.png', price: 11, amount: 1
        }
        let wrapper = shallow(<Product product={product} relay={relay} />)
        spyOn(AddProductToCartMutation, 'commit')
        wrapper.instance()._handleBuyProduct()
        expect(AddProductToCartMutation.commit).toHaveBeenCalledWith(relay.environment, product)
      })
    })
  })
})