import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadCafeEvent } from '../../../redux/actions/eventsCafe-action';
import Modal from './ModalAddEvent';

export default function EventsCafe({ id }) {
  // const { id } = useParams()
  // const params = useParams()
  // const loc = useLocation()
  const idEvent = id
  console.log('>>>>>>>ID >>>>>>: ', idEvent)

  const dispatch = useDispatch();
  const eventCafe = useSelector((state) => state.eventsCafe[idEvent]);

  async function showEvent() {
    const response = await fetch(`/api/cafes/${idEvent}/events`);
    console.log('>>>>>>>RESPONSE', response)
    const result = await response.json()
    console.log('>>>>>RESULT_BEFORE: ', result)
    if (result.eventCafe.length) {
      const data = result.eventCafe.filter((event) => event.location === idEvent)
      dispatch(loadCafeEvent(data, idEvent))
    }
  }

  useEffect(() => {
    showEvent();
  }, [])

  const modalRef = React.useRef()

  function addEventModal() {
    modalRef.current.openModal()
  };

  return (
    <>
      <div className="cafeContent">
        <h2>События в нашей кофейне:</h2>
        <button className="addEventBtn" onClick={addEventModal}>Создать событие</button>
        <Modal ref={modalRef}>
          <h2>Новое событие</h2>
          <br></br>
          <input type="text" placeholder="Название" style={{ "width": "350px", "backgroundColor": "orange" }} />
          <br></br>
          <input type="text" placeholder="Описание" style={{ "height": "75px", "width": "350px", "backgroundColor": "orange" }} />
          <br></br>
          {/* <input type="text" placeholder="Кофейня" style={{"width": "350px"}}/>
          <br></br> */}
          <input type="text" placeholder="Организатор" style={{ "width": "350px", "backgroundColor": "orange" }} />
          <br></br>
          <input type="date" placeholder="Дата" style={{ "width": "350px", "backgroundColor": "orange" }} />
          <br></br>
          <br></br>
          <input type="submit" value="Создать" style={{"backgroundColor": "dodgerblue"}}/>
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
