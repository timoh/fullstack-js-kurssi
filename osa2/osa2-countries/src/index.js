import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filter: ''
        }
    }

    componentWillMount() {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                this.setState({ countries: response.data })
            })
    }

    filterChange = (e) => {
        this.setState({filter: e.target.value})
    }

    render() {
        return (
            <div>
                find countries <input value={this.state.filter} onChange={this.filterChange} />

                <Countries filter={this.state.filter} countries={this.state.countries} />
            </div>

        )
    }
}

const Countries = (props) => {

    const filter = props.filter


    if (filter.length > 0 && filter.length <= 10) {

        const matcher = new RegExp(filter, "i")

        const matchCount = props.countries.filter(country => matcher.test(country.name)).length

        if (matchCount > 10) {
            return (
                <div>too many matches, specify another filter</div>
            )
        } else if (matchCount === 1) {

            const country = props.countries.filter(country => matcher.test(country.name))[0]

            return (
                <div>
                    <h1>{country.name} {country.nativeName}</h1>
                    <p>capital: {country.capital}</p>
                    <p>population: {country.population}</p>
                    <p><img alt={country.name} src={country.flag} height="200px" /></p>
                </div>    
            )
        } 
        else {
            return (
                <div>
                    {props.countries.filter(country => matcher.test(country.name)).map(country => <div key={country.alpha3Code}>{country.name}</div>)}
                </div>
            )
        }

    } else {
        return (
            <div></div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)