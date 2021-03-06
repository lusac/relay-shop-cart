import React from 'react'
import ReactDOM from 'react-dom'

import {QueryRenderer, graphql} from 'react-relay'
import {Environment, Network, RecordSource, Store} from 'relay-runtime'

import ProductApp from './components/ProductApp'

function fetchQuery(operation, variables) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})

ReactDOM.render(
  <QueryRenderer
    environment={modernEnvironment}
    query={graphql`
      query appQuery {
        viewer {
          ...ProductApp_viewer
        }
        products {
          ...ProductApp_products
        }
      }
    `}
    variables={{}}
    render={({error, props}) => {
      if (props) {
        return <ProductApp viewer={props.viewer} products={props.products} />
      } else {
        return <div>Loading</div>
      }
    }}
  />,
  document.getElementById('root'),
)
