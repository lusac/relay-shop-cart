import React from 'react'
import renderer from 'react-test-renderer'
import {Header} from '../components/Header'

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
})