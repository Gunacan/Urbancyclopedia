import React, { Component } from 'react'
import Search from './components/Search'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      cities: []
    }    
  }
  
  
  componentDidMount = () => {
    fetch('https://api.teleport.org/api/urban_areas/?embed=ua:item/ua:images')
    .then(response => response.json())
    .then(data => {
      this.setState({
        cities: data._embedded["ua:item"]
      })
    })
  }
  
  
  render() {
    return (
      <React.Fragment>
        <Header />
        <main>
          <Search cities={this.state.cities} />
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}

export default App