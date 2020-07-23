import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadBarista } from '../../../redux/actions/barista-actions';


export default function Barista({ id }) {
  const idCafe = id;
  const dispatch = useDispatch();
  const baristaCafe = useSelector((state) => state.barista[idCafe]);

  //load
  async function showBarista() {
    const response = await fetch(`/api/cafes/${idCafe}/barista`);
    const result = await response.json();
    if (result.barista.length) {
      const data = result.barista.filter(
        (man) => man.location === idCafe,
      );
      dispatch(loadBarista(data, idCafe));
    }
  };

  useEffect(() => {
    showBarista();
  }, []);

  return (
    <>
      <div className="cafeContent">
        <h2>Рады Вам варить кофе:</h2>
        <div className="baristaContent">
          <table>
            {baristaCafe &&
              baristaCafe.map((emp) => (
                <React.Fragment key={emp._id}>
                  <tr>
                    <td>
                      <img src={emp.photo} />
                    </td>
                  </tr>
                  <tr>
                    <td><strong>{emp.name}</strong></td>
                  </tr>
                  <tr>
                    <td>{emp.about}</td>
                  </tr>
                </React.Fragment>
              ))}
          </table>
        </div>
      </div>
    </>
  );
}
