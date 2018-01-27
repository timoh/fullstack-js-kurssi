import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {

  klikHyva = () => {
    this.setState({
      hyva: this.state.hyva + 1
    })
  }

  klikNeutraali = () => {
    this.setState({
      neutraali: this.state.neutraali + 1
    })
  }

  klikHuono = () => {
    this.setState({
      huono: this.state.huono + 1
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  render() {

    const AnnaPalautetta = () => {

      return (
        <div>
          <h1>anna palautetta</h1>
          <button onClick={this.klikHyva}>hyvä</button>
          <button onClick={this.klikNeutraali}>neutraali</button>
          <button onClick={this.klikHuono}>huono</button>
        </div>
      )
    
    }
  
    const Statistiikka = () => {
  
      return (
        <div>
          <h2>statistiikka</h2>
          <p>hyvä {this.state.hyva}</p>
          <p>neutraali {this.state.neutraali}</p>
          <p>huono {this.state.huono}</p>
        </div>
      )
    
    }
  
    return (
      <div>
        <AnnaPalautetta />
        <Statistiikka />
      </div>
    )

  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)