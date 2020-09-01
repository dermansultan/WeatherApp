import React from 'react';
import Header from './Components/Header'
import SearchArea from './Components/SearchArea'
import Footer from './Components/Footer'

class App extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div className='appContainer'>
                <Header></Header>
                <SearchArea></SearchArea>
                <Footer></Footer>
            </div>
        )
    }
}

export default App