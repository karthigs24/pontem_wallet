// Importing modules
//import React,
//{ useState,useEffect } from "react";
import logo from './logo.svg';
import "./App.css";

function App() {
  //Provider Browser Detection
  if (typeof window.pontem !== 'undefined') {
    console.log('Pontem Wallet is installed!');
  }
  const connectwallet = async () => {
    //Connection to the wallet
    window.pontem.connect()
      .then(address => console.log(`Access for address ${address} allowed by user`))
      .catch(e => console.log('Access denied by user', e))
    //Change active Account
    window.pontem.onChangeAccount((address) => {
      if (address) {
        console.log('New selected account: ', address);
      } else {
        console.log('The user has selected an account that is not allowed to access');
      }
    })

    //Change active Account
    window.pontem.onChangeAccount((address) => {
      if (address) {
        console.log('New selected account: ', address);
      } else {
        console.log('The user has selected an account that is not allowed to access');
      }
    })

    //Get Current Account  
    window.pontem.account()
      .then(address => {
        if (address) {
          console.log('Account address: ', address);
        } else {
          console.log('The user has selected an account that is not allowed to access');
        }
      })
  }

  // Send Transaction
  const transaction = async () => {
    const payload = {
      type: "entry_function_payload",
      function: "0x1::coin::transfer",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: ["0x10f98dcd5b877d5b5be9c9839222da005de57cd12e887edfa216bf3ed281141c", "1000"]
    };
    const otherOptions = {
      max_gas_amount: '1000',
      gas_unit_price: '1',
      expiration_timestamp_secs: '16623396218',
      sequence_number: '10'
    }
    window.pontem.signTransaction(payload, otherOptions)
      .then(tx => {
        console.log('Transaction', tx)
      })
      .catch(e => console.log('Error', e))
  }

  return (
    <div className="App">
      <button onClick={() => connectwallet()} variant="primary">
        Connect to wallet
      </button>
      <button onClick={() => transaction()} variant="primary">
        Transaction
      </button>
    </div>
  );
}

export default App;