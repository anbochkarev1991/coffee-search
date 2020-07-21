import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadCafeEvent, addCafeEvent } from '../../../redux/actions/eventsCafe-action';
import Modal from './ModalAddEvent';

export default function EventsCafe({ id }) {
  const [newEvent, setNewEvent] = useState({
    title: '',
    body: '',
    author: '',
    date: Date,
  })

  const idEvent = id
  // console.log('>>>>>>>ID >>>>>>: ', idEvent)

  const dispatch = useDispatch();
  const eventCafe = useSelector((state) => state.eventsCafe[idEvent]);

  // Load event from DB
  async function showEvent() {
    const response = await fetch(`/api/cafes/${idEvent}/events`);
    console.log('>>>>>>>RESPONSE', response);
    const result = await response.json();
    console.log('>>>>>RESULT_BEFORE: ', result);
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
    // console.log('>>>>>>NEW_EVENT: ', newEvent)
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

    // const data = result.filter((event) => event.location === idEvent)
    // console.log('>>>>>>DATA_2: ', data)
    dispatch(addCafeEvent(result, idEvent))

  };

  return (
    <>
      <div className="cafeContent">
        <h2>События в нашей кофейне:</h2>
        <button className="addEventBtn" onClick={addEventModal}>Создать событие</button>
        <Modal ref={modalRef}>
          <form onSubmit={addNewEvent}>
            <label htmlFor="newevent">
              <h2>Новое событие</h2>
              <br></br>
              <input onChange={inputEvent} name="title" type="text" placeholder="Название" style={{ "width": "420px", "backgroundColor": "orange" }} />
              <br></br>
              <input onChange={inputEvent} name="body" type="text" placeholder="Описание" style={{ "height": "75px", "width": "420px", "backgroundColor": "orange" }} />
              <br></br>
              {/* <input type="text" placeholder="Кофейня" style={{"width": "350px"}}/>
          <br></br> */}
              <input onChange={inputEvent} name="author" type="text" placeholder="Организатор" style={{ "width": "420px", "backgroundColor": "orange" }} />
              <br></br>
              <input onChange={inputEvent} name="date" type="date" placeholder="Дата" style={{ "width": "420px", "backgroundColor": "orange" }} />
              <br></br>
              <br></br>
            </label>
            <input type="submit" value="Создать" style={{ "backgroundColor": "dodgerblue" }} />
          </form>
        </Modal>
        {eventCafe && eventCafe.map((event) => (
          <React.Fragment>
            <p>
              <strong>{event.title}</strong>
            </p>
            <p>Информация: {event.body}</p>
            <p>Дата: {event.date}</p>
            <p>Организатор: {event.author}</p>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
