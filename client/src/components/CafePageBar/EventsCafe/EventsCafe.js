import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadCafeEvent } from '../../../redux/actions/eventsCafe-action';

export default function EventsCafe({ id }) {
  // const { id } = useParams()
  // const params = useParams()
  // const loc = useLocation()
  const idEvent = id

  const dispatch = useDispatch();
  const eventCafe = useSelector((state) => state.eventsCafe[idEvent.id]);

  async function showEvent() {
    const response = await fetch(`/api/cafes/${idEvent.id}/events`);
    console.log('>>>>>>>RESPONSE', response)
    const result = await response.json()
    console.log('>>>>>RESULT_BEFORE: ', result)
    const data = result.eventCafe.filter((event) => event.location === idEvent.id)
    console.log('>>>>>>>>>FETCH_RESPONSE: ', data)
    if (response.status === 200) {
      dispatch(loadCafeEvent(data, idEvent.id))
    }
  }

  useEffect(() => {
    showEvent();
  }, [])

  return (
    <>
      <div className="cafeContent">
        <h2>События в нашей кофейне:</h2>
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
