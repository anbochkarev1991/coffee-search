import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import {
  loadBatch,
  addBatch,
  deleteBatch,
} from '../../../redux/actions/batch-actions';
import styles from '../../../pages/cafe/cafe.module.css';
import batchStyle from './Batch.module.css';
import Modal from '../EventsCafe/ModalAddEvent';

export default function Batch({ id }) {
  const [newBatch, setNewBatch] = useState({
    title: '',
    region: '',
    roaster: '',
    cultivation: '',
  });

  const idCafe = id;
  const dispatch = useDispatch();
  const batchCafe = useSelector((state) => state.batch[idCafe]);
  const user = useSelector((state) => state.enter.login);

  //load
  async function showBatch() {
    const response = await fetch(`/api/cafes/${idCafe}/batch`);
    const result = await response.json();
    console.log('>>>>>RESULT_BATCH', result);
    if (result.batch.length) {
      const data = result.batch.filter((el) => el.location === idCafe);
      dispatch(loadBatch(data, idCafe));
    }
  }

  useEffect(() => {
    showBatch();
  }, []);

  //Modal Window
  const modalRef = React.useRef();

  function addEventModal() {
    modalRef.current.openModal();
  }

  //Add new batch
  function inputBatch({ target: { name, value } }) {
    setNewBatch({
      ...newBatch,
      [name]: value,
    });
  }

  async function addNewBatch(event) {
    event.preventDefault();
    const response = await fetch(`/api/cafes/${idCafe}/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBatch),
    });
    modalRef.current.close();
    const result = await response.json();
    console.log('RESULT_BATCH: ', result);
    dispatch(addBatch(result, idCafe));
  }

  //Delete batch
  async function deleteBatchF(id) {
    const response = await fetch(`/api/cafes/${idCafe}/batch`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (response.status === 200) {
      dispatch(deleteBatch(id, idCafe));
    }
  }

  return (
    <div className={styles.cafeContent}>
      <div className={batchStyle.wrapper}>
        <h2>Ассортимент:</h2>
        {user && (
          <button className="btn btn-light mb-2 btn-sm" onClick={addEventModal}>
            Добавить
          </button>
        )}
        <br></br>
        <Modal ref={modalRef}>
          <form onSubmit={addNewBatch}>
            <h2>Добавить зерно</h2>
            <br></br>
            <input
              onChange={inputBatch}
              name="title"
              type="text"
              placeholder="Название"
              className={'form-control mr-sm-2'}
            />
            <br></br>
            <input
              onChange={inputBatch}
              name="region"
              type="text"
              placeholder=" Регион"
              className={'form-control mr-sm-2'}
            />
            <br></br>
            <input
              onChange={inputBatch}
              name="roaster"
              type="text"
              placeholder="Ростер"
              className={'form-control mr-sm-2'}
            />
            <br></br>
            <input
              onChange={inputBatch}
              name="cultivation"
              type="text"
              placeholder="Урожай"
              className={'form-control mr-sm-2'}
            />
            <br></br>
            <input
              type="submit"
              value="Создать"
              className="btn btn-light mb-2 btn-sm"
            />
          </form>
        </Modal>

        {batchCafe &&
          batchCafe.map((item) => (
            <React.Fragment>
              <p>
                <strong>{item.title}</strong>
              </p>
              <p>Регион: {item.region}</p>
              <p>Ростер: {item.roaster}</p>
              <p>Год: {item.cultivation}</p>

              {user && (
                <button
                  className="btn btn-light mb-2 btn-sm"
                  id={item._id}
                  onClick={() => deleteBatchF(item._id)}
                >
                  Удалить
                </button>
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
