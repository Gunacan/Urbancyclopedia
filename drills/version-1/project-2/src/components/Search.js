import React, { Component } from 'react'

class Search extends Component  {

    state = {
        selectedCity: {},
        imagesArray: [],
        moreInfo: {},
        searchPageLoaded: false,
        cityLoaded: false
    }

    handleChange = (event) => {
        const cityName = event.target.selectedOptions[0].text
        const currentCity = this.props.cities.filter(city => {
            return city.name === cityName
        })[0]
        
        const citySlug = currentCity.slug
        fetch(`https://api.teleport.org/api/urban_areas/slug:${citySlug}/scores/`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                moreInfo: data
            })
        })
        this.setState({
            selectedCity: currentCity,
            imagesArray: currentCity._embedded["ua:images"].photos.map(photo => photo.image.web),
            cityLoaded: true
        })
        
    }

    loadSearchPage = (event) => {
        this.setState({
            searchPageLoaded: true
        })
    }
    
    render() {
        const description = this.state.moreInfo.summary

        const cityScore = this.state.moreInfo.teleport_city_score
        
        const images = this.state.imagesArray.map(image => {
            return <img className="urban-image" src={image} alt=""/>
        })
        const cities = this.props.cities.map(city => {
            return ( <option value="" className='cities' key={city.slug}>{city.name}</option>          
            )
        })
                
        return(
            <React.Fragment>
                <section className='brochure-page' 
                    style={{display: this.state.searchPageLoaded ? ('none') : ('flex') }}>
                    <h2>Welcome to <em>Urbancyclopedia</em></h2>
                    <p>Whether you’re planning a big move, or simply planning a weekend getaway, Urbancyclopedia is your destination for statistics on over 260 different urban cities around the world.</p>
                    <p>Next time you’re planning a vacation, or simply want to learn something new, let urbancyclopedia do the work for you. Simply select a city from the drop down menu and Urbancyclopedia provides information about each city, to feed your knowledge and help you choose the perfect travel destination.</p>
                    <button onClick={this.loadSearchPage}>Start Searching</button>
                </section>
                {this.state.searchPageLoaded ? 
                (<select  className="drop-down" onChange={this.handleChange}>
                    <option value="" disabled selected>Choose your Urban</option>
                    {cities}   
                </select>) : null}
                <div className='info-card'>
                    {images}
                    <section className='text-info'>
                        <h3 className='fullName'>{this.state.selectedCity.full_name}</h3>
                        <h3 className='continent'>{this.state.selectedCity.continent}</h3>
                        <p className='summary' dangerouslySetInnerHTML={{__html: description}}></p>
                        {this.state.cityLoaded ? (
                            <div className='card-footer'>
                                <h4>Life quality score of {this.state.selectedCity.name} is <b>{Math.round(cityScore)}</b> out of 100</h4>
                                <a href={this.state.selectedCity.teleport_city_url} target='_blank' className='moreInfoUrl'> >> Click here to find out more about <b>{this.state.selectedCity.name}</b> </a>
                            </div> ) 
                        : null }
                    </section>
                </div>
            </React.Fragment>
        )
    }
    
}

export default Search