import React from 'react'
import "../assets/jury.css"
const Jury_panel = () => {
  return (
    <>
      <div className="row">
        <div className="col-xs-12">
          <table className="table table-bordered table-hover dt-responsive">
            <thead>
              <tr>
                <th>Country</th>
                <th>Languages</th>
                <th>Population</th>
                <th>Median Age</th>
                <th>Area (Km²)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Argentina</td>
                <td>Spanish (official), English, Italian, German, French</td>
                <td>41,803,125</td>
                <td>31.3</td>
                <td>2,780,387</td>
              </tr>
              <tr>
                <td>Australia</td>
                <td>English 79%, native and other languages</td>
                <td>23,630,169</td>
                <td>37.3</td>
                <td>7,739,983</td>
              </tr>
              <tr>
                <td>Greece</td>
                <td>Greek 99% (official), English, French</td>
                <td>11,128,404</td>
                <td>43.2</td>
                <td>131,956</td>
              </tr>
              <tr>
                <td>Luxembourg</td>
                <td>Luxermbourgish (national) French, German (both administrative)</td>
                <td>536,761</td>
                <td>39.1</td>
                <td>2,586</td>
              </tr>

            </tbody>

          </table>
        </div>
      </div>




      {/* <div className="grid-container">
        <aside className="sidenav">
          <div className="sidenav__close-icon">
            <i className="fas fa-times sidenav__brand-close"></i>
          </div>
          <ul className="sidenav__list">
            <li className="sidenav__list-item">ALL</li>
            <li className="sidenav__list-item">North</li>
            <li className="sidenav__list-item">South</li>
            <li className="sidenav__list-item">East</li>
            <li className="sidenav__list-item">West</li>
          </ul>
        </aside>

        <main className="main">

        </main>


      </div> */}



    </>
  )
}

export default Jury_panel