import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

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
      <h1>Opetusohjelma</h1>
      {kurssit.map(kurssi => <Kurssi kurssi={kurssi} />)}
      
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)