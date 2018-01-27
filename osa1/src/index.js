import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
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
        <Osa osa={props.osa1} />
        <Osa osa={props.osa2} />
        <Osa osa={props.osa3} />
      </div>
    )
  }

  const Yhteensa = (props) => {
    return(
      <div>
        <p>yhteensä {props.osa1 + props.osa2 + props.osa3} tehtävää</p>
      </div>
    )
  }

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osa1={osa1} osa2={osa2} osa3={osa3} />
      <Yhteensa osa1={osa1['tehtavia']} osa2={osa2['tehtavia']} osa3={osa3['tehtavia']} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)