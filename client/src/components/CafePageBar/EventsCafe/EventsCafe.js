import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadCafeEvent, addCafeEvent, deleteCafeEvent } from '../../../redux/actions/eventsCafe-action';
import Modal from './ModalAddEvent';

export default function EventsCafe({ id }) {
  const [newEvent, setNewEvent] = useState({
    title: '',
    body: '',
    author: {},
    date: Date,
  })

  const idEvent = id;
  const dispatch = useDispatch();
  const eventCafe = useSelector((state) => state.eventsCafe[idEvent]);
  const user = useSelector((state) => state.enter.login);

  // Load event from DB
  async function showEvent() {
    const response = await fetch(`/api/cafes/${idEvent}/events`);
    const result = await response.json();
    if (result.eventCafe.length) {
      const data = result.eventCafe.filter(
        (event) => event.location === idEvent,
      );
      dispatch(loadCafeEvent(data, idEvent));
    }
  }

  useEffect(() => {
    showEvent();
  }, []);

  //Modal Window
  const modalRef = React.useRef()

  function addEventModal() {
    modalRef.current.openModal()
  };

  //Add new event
  function inputEvent({ target: { name, value } }) {
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  }

  async function addNewEvent(event) {
    event.preventDefault();
    const response = await fetch(`/api/cafes/${idEvent}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent)
    });
    modalRef.current.close()
    const result = await response.json()
    console.log('>>>>>>>>RESULT2222222: ', result)
    dispatch(addCafeEvent(result, idEvent))
  };

  //Delete event cafe
  async function deleteEventCafe(id) {
    const response = await fetch(`/api/cafes/${idEvent}/events`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (response.status === 200) {
      dispatch(deleteCafeEvent(id, idEvent));
    }
  };


  return (
    <>
      <div className="cafeContent">
        <h2>События в нашей кофейне:</h2>
        {user && <button className="addEventBtn" onClick={addEventModal}>Создать событие</button>}
        <br></br>
        <Modal ref={modalRef}>
          <form onSubmit={addNewEvent}>
            <label htmlFor="newevent">
              <h2>Новое событие</h2>
              <br></br>
              <input onChange={inputEvent} name="title" type="text" placeholder="Название" style={{ "width": "420px", "backgroundColor": "orange" }} />
              <br></br>
              <input onChange={inputEvent} name="body" type="text" placeholder="Описание" style={{ "height": "75px", "width": "420px", "backgroundColor": "orange" }} />
              <br></br>
              <input onChange={inputEvent} name="author" type="text" placeholder="Организатор" style={{ "width": "420px", "backgroundColor": "orange" }} />
              <br></br>
              <input onChange={inputEvent} name="date" type="datetime-local" placeholder="Дата" style={{ "width": "420px", "backgroundColor": "orange" }} />
              <br></br>
              <br></br>
            </label>
            <input type="submit" value="Создать" style={{ "backgroundColor": "dodgerblue" }} />
          </form>
        </Modal>

        {eventCafe &&
          eventCafe.map((event) => (
            <React.Fragment key={event._id}>
              <hr></hr>
              <p>
                <strong>{event.title}</strong>
              </p>
              <p>Информация: {event.body}</p>
              <p>Дата: {event.date}</p>
              <p>Организатор: {event.author.login}</p>
              {user && <button className="addEventBtn" id={event._id} onClick={() => deleteEventCafe(event._id)}>Удалить</button>}
            </React.Fragment>
          ))}
      </div>
    </>
  );
}
