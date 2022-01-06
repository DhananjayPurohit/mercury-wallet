import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';

import reducers from '../../reducers';
import { callGetAllStatecoins, isWalletLoaded, walletFromJson, walletLoad } from '../../features/WalletDataSlice';
import { Wallet } from '..';
import { MOCK_WALLET_NAME, MOCK_WALLET_PASSWORD } from '../wallet';
let bitcoin = require('bitcoinjs-lib')

function render(
    mockStore,
    ui,
    {
        preloadedState,
        store = mockStore,
        ...renderOptions
    } = {}
) {
    function Wrapper({children}) {
        return <Provider store={store}><Router>{children}</Router></Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}
// edit preloaded state to test different state variables


const TestComponent = ({wallet_json ,dispatchUsed = false, fn, args = []}) => {
    // Mock component for testing redux function
    // Instructions:
    // 1) Pass the function to be tested as 'fn'
    // 2) The arguments of the function should be passed in order in a list (excluding dispatch)
    // 3a) If dispatch is used, ensure it is the first argument of the function
    // b) Pass dispatchUsed = true
    const dispatch = useDispatch()
    if(!isWalletLoaded()){
        walletFromJson(wallet_json, MOCK_WALLET_PASSWORD)
    }

    console.log('Function rendered args: ', args)
    const fireEvent = () => {
        if(dispatchUsed){
            fn(dispatch,...args)
        }
        else{
            fn(...args)
        }
    }

    return(
        <div className = {'function-tester'} onClick={() => fireEvent()}>FireFunction</div>
    )
}


export default TestComponent
// re-export everything
export * from '@testing-library/react'
// override render method
export { render }