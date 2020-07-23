import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadMenu,
  addItemMenu,
  deleteItemMenu,
} from '../../../redux/actions/menu-actions';
import styles from './Menu.module.css';
import Modal from '../EventsCafe/ModalAddEvent';
import stylesTab from '../../../pages/cafe/cafe.module.css';

export default function Menu({ id }) {
  const [newItem, setNewItem] = useState({
    goods: '',
    cost: Number,
    size: Number,
  });

  const idCafe = id;
  const dispatch = useDispatch();
  const menuCafe = useSelector((state) => state.menu[idCafe]);
  const user = useSelector((state) => state.enter.login);

  //Load from DB
  async function showMenu() {
    const response = await fetch(`/api/cafes/${idCafe}/menu`);
    const result = await response.json();
    if (result.menu.length) {
      const data = result.menu.filter(
        (menuCafe) => menuCafe.location === idCafe,
      );
      dispatch(loadMenu(data, idCafe));
    }
  }

  useEffect(() => {
    showMenu();
  }, []);

  //Modal Window
  const modalRef = React.useRef();

  function addEventModal() {
    modalRef.current.openModal();
  }

  //Add new item menu
  function inputItem({ target: { name, value } }) {
    setNewItem({
      ...newItem,
      [name]: value,
    });
  }

  async function addNewItem(event) {
    event.preventDefault();

    const response = await fetch(`/api/cafes/${idCafe}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
    modalRef.current.close();
    const result = await response.json();
    // console.log('>>>>>RESULR_FROM_ITEM: ', result)
    dispatch(addItemMenu(result, idCafe));
  }

  //Delete item
  async function deleteItem(id) {
    const response = await fetch(`/api/cafes/${idCafe}/menu`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (response.status === 200) {
      dispatch(deleteItemMenu(id, idCafe));
    }
  }

  return (
    <>
      <div className={stylesTab.cafeContent}>
        <h2>Меню:</h2>
        {user && (
          <button className="btn btn-light mb-2 btn-sm" onClick={addEventModal}>
            Добавить
          </button>
        )}
        <br></br>
        <Modal ref={modalRef}>
          <form onSubmit={addNewItem}>
            <label htmlFor="newitem">
              <h2>Что вы хотите добавить?</h2>
              <br></br>
              <input
                className={'form-control mr-sm-2'}
                onChange={inputItem}
                name="goods"
                type="text"
                placeholder="Название"
              />
              <br></br>
              <input
                className={'form-control mr-sm-2'}
                onChange={inputItem}
                name="cost"
                type="text"
                placeholder="Цена"
              />
              <br></br>
              <input
                className={'form-control mr-sm-2'}
                onChange={inputItem}
                name="size"
                type="text"
                placeholder="Объем"
              />
              <br></br>
            </label>
            <input
              className="btn btn-light mb-2 btn-sm"
              type="submit"
              value="Создать"
            />
          </form>
        </Modal>

        <table className={styles.tableMenu}>
          <tr className={styles.trMenu}>
            <td>
              <strong>Кофе:</strong>
            </td>
            <td>
              <strong>Цена:</strong>
            </td>
            <td>
              <strong>Объем:</strong>
            </td>
          </tr>
          {menuCafe &&
            menuCafe.map((menu) => (
              <React.Fragment key={menu._id}>
                <tr className={styles.trMenu}>
                  <td>{menu.goods}</td>
                  <td>{menu.cost}</td>
                  <td>{menu.size}</td>
                  {user && (
                    <td>
                      <button
                        id={menu._id}
                        onClick={() => deleteItem(menu._id)}
                        className="btn btn-light mb-2 btn-sm"
                      >
                        Удалить
                      </button>
                    </td>
                  )}
                </tr>
              </React.Fragment>
            ))}
        </table>
      </div>
    </>
  );
}
