import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMenu } from '../../../redux/actions/menu-actions';
import styles from './Menu.module.css'


export default function Menu({ id }) {
  const idCafe = id;
  const dispatch = useDispatch();
  const menuCafe = useSelector((state) => state.menu[idCafe]);

  //Load from DB
  async function showMenu() {
    const response = await fetch(`/api/cafes/${idCafe}/menu`);
    const result = await response.json();
    console.log('>>>>>RESULT Front: ', result)
    if (result.menu.length) {
      const data = result.menu.filter(
        (menuCafe) => menuCafe.location === idCafe,
      );
      dispatch(loadMenu(data, idCafe));
    }
  };

  useEffect(() => {
    showMenu();
  }, []);

  return (
    <>
      <div className="cafeContent">
        <h2>Меню:</h2>
        {menuCafe &&
          menuCafe.map((menu) => (
            <React.Fragment key={menu._id}>
              <table className="tableMenu">
                <tr className="trMenu">
                  <td>Кофе:</td>
                  <td>Цена:</td>
                  <td>Объем:</td>
                  </tr>
                  <tr>
                    <td>{menu.goods}</td>
                    <td>{menu.cost}</td>
                    <td>{menu.size}</td>
                  </tr>
                {/* </tr> */}
              </table>
              <strong>Кофе: {menu.goods}</strong>
              <p>Цена: {menu.cost}</p>
              <p>Объем: {menu.size}</p>
            </React.Fragment>
          ))}
      </div>
    </>
  );
}
