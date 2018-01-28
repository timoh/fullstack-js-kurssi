import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  const Kurssi = (props) => {
    return(
      <div>
        <Otsikko kurssi={props.kurssi['nimi']} />
        <Sisalto osat={props.kurssi['osat']} />
        <Yhteensa osat={props.kurssi['osat']} />
      </div>
    )
  }

  const Otsikko = (props) => {
    return(
      <div>
        <h1>{props.kurssi}</h1>
      </div>
    )
  }

  const Sisalto = (props) => {

    const Osa = (props) => {
      return(
        <p>{props.osa['nimi']} {props.osa['tehtavia']}</p>
      )
    }

    return(
      <div>
        {props.osat.map(osa => <Osa key={osa.nimi} osa={osa} />)}
      </div>
    )
  }

  const Yhteensa = (props) => {

    const reducer = (acc, currVal) => acc + currVal
    let tehtavia = props.osat.map(osa => osa.tehtavia).reduce(reducer)

    return(
      <div>
        <p>yhteensä {tehtavia} tehtävää</p>
      </div>
    )
  }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)