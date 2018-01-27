import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {

  klikPainike = (event) => { 
    const key = event.target.id

    let uudetPalautteet = this.state.palautteet
    uudetPalautteet[key] = uudetPalautteet[key] + 1

    this.setState({ palautteet: uudetPalautteet })
    // console.log(this.state.palautteet)
   }

  constructor(props) {
    super(props)
    this.state = {
      palautteet : {
        hyva: 0,
        neutraali: 0,
        huono: 0
      }
    }
  }

  render() {



    const Button = () => {

      return (
        <div>
          <h1>anna palautetta</h1>
          <button id="hyva" onClick={this.klikPainike}>hyvä</button>
          <button id="neutraali" onClick={this.klikPainike}>neutraali</button>
          <button id="huono" onClick={this.klikPainike}>huono</button>
        </div>
      )
    
    }
  
    const Statistics = () => {


      const summa = () => 1*this.state.palautteet.hyva + 0*this.state.palautteet.neutraali + -1*this.state.palautteet.huono
      const lkm = () => this.state.palautteet.hyva + this.state.palautteet.neutraali + this.state.palautteet.huono
      
      const keskiarvo = () => {
        if (lkm() === 0) {
          return 0
        } else {
          return Number.parseFloat(summa()/lkm()).toPrecision(1)
        }
      }

      const positiivisia = () => {
        if (lkm() === 0) {
          return 0
        } else {
          return Number.parseFloat(this.state.palautteet.hyva/lkm()*100).toPrecision(3)
        }
      }

      const Statistic = (props) => { 

          return(
            <p>{props.teksti} {props.arvo} {props.yksikko}</p>
          )

      }

      if (lkm() === 0) {

        return(
          <div>
            <h2>statistiikka</h2>
            <p>ei yhtään palautetta annettu</p>
          </div>
        )

      } else {

        return (
          <div>
            <h2>statistiikka</h2>
            <Statistic teksti="hyvä" arvo={this.state.palautteet.hyva} yksikko="" />
            <Statistic teksti="neutraali" arvo={this.state.palautteet.neutraali} yksikko="" />
            <Statistic teksti="huono" arvo={this.state.palautteet.huono} yksikko="" />
  
            <div>
              <Statistic teksti="keskiarvo" arvo={keskiarvo()} yksikko="" />
              <Statistic teksti="positiivisia" arvo={positiivisia()} yksikko="%" />
            </div>
          </div>
  
        )

      }
    
    }
  
    return (
      <div>
        <Button />
        <Statistics />
      </div>
    )

  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)