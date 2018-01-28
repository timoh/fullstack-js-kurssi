import React from 'react'

const Kurssi = (props) => {

  const Otsikko = (props) => {
    return (
      <div>
        <h1>{props.kurssi}</h1>
      </div>
    )
  }

  const Sisalto = (props) => {

    const Osa = (props) => {
      return (
        <p>{props.osa['nimi']} {props.osa['tehtavia']}</p>
      )
    }

    return (
      <div>
        {props.osat.map(osa => <Osa key={osa.nimi} osa={osa} />)}
      </div>
    )
  }

  const Yhteensa = (props) => {

    const reducer = (acc, currVal) => acc + currVal
    let tehtavia = props.osat.map(osa => osa.tehtavia).reduce(reducer)

    return (
      <div>
        <p>yhteensä {tehtavia} tehtävää</p>
      </div>
    )
  }


  return (
    <div>
      <Otsikko kurssi={props.kurssi['nimi']} />
      <Sisalto osat={props.kurssi['osat']} />
      <Yhteensa osat={props.kurssi['osat']} />
    </div>
  )
}

export default Kurssi