import React from 'react'
import renderer from 'react-test-renderer'
import {SimpleModal} from '../js/components/Modal'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AddProductToCartMutation from '../js/mutations/AddProductToCartMutation'

configure({ adapter: new Adapter() })

describe('SimpleModal component', () => {
  describe('snapshot', () => {
    it('SimpleModal closed', () => {
      const
        relay = {enviroment: {}},
        product = {id: 1, name: 'item a', image: 'a.png', price: 1.23, amount: 1},
        renderedValue =  renderer.create(<SimpleModal product={product} relay={relay} open={false}/>).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })

    // it('SimpleModal opened', () => {
    //   const
    //     relay = {enviroment: {}},
    //     product = {id: 1, name: 'item a', image: 'a.png', price: 1.23, amount: 1},
    //     renderedValue =  renderer.create(<SimpleModal product={product} relay={relay} open={true}/>).toJSON()
    //   expect(renderedValue).toMatchSnapshot()
    // })
  })

  describe('method _handleBuyProduct', () => {
    const relay = {environment:{xunda:1}}

    it('Add product when amount bigger then 0', () => {
      const product = {
          id: 1, name: 'item a', image: 'a.png', price: 11, amount: 2
      }
      let wrapper = shallow(<SimpleModal product={product} relay={relay} open={false}/>)
      spyOn(AddProductToCartMutation, 'commit')
      wrapper.instance()._handleBuyProduct()
      expect(AddProductToCartMutation.commit).toHaveBeenCalledWith(relay.environment, product)
    })
  })
})