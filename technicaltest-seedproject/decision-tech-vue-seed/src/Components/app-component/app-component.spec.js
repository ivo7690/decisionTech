import Vue from 'vue'
import MyComponent from './app-component.vue'
import 'isomorphic-fetch'
var fetchMock = require('fetch-mock');


describe('App-Component', () => {
  
      afterAll(() => {
        fetchMock.restore();
    });

    beforeAll(()=>{
       fetchMock.get('*',
            {
                deals: [
                    { name: 'iPhone 6s', manufacturer: 'Apple', image: 'image for iphone 6s', resultsUrl: 'a url' }
                ]
            }
        );
    })

  it('has a created hook', () => {
    expect(typeof MyComponent.created).toBe('function')
  })


  it('sets the correct default data', () => {
    expect(typeof MyComponent.data).toBe('function')
    const defaultData = MyComponent.data()
    expect(defaultData.deals.length).toBe(0)
  })


  it('correctly sets the message when created', () => {
    const vm = new Vue(MyComponent).$mount()
    const defaultData = MyComponent.data()
    expect(defaultData.deals.length).toBe(0)
  })
})