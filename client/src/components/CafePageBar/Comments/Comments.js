import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../../pages/cafe/cafe.module.css';
import commentsStyle from './Comments.module.css';
import Modal from './ModalAddComment';
import {
  loadCafeComments,
  addCafeComment,
  deleteCafeComment,
} from '../../../redux/actions/comments-actions';

export default function Comments({ id }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.enter.login);
  const [comment, setComment] = useState({
    title: '',
    body: '',
    login: user,
  });

  const idCafe = id;
  const commentCafe = useSelector((state) => state.comments[idCafe]);

  async function showComments() {
    const response = await fetch(`/api/cafes/${idCafe}/comments`);
    const result = await response.json();
    if (result.comments) {
      const data = result.comments.filter((comment) => comment.cafe === idCafe);
      dispatch(loadCafeComments(data, idCafe));
    }
  }

  useEffect(() => {
    showComments();
  }, []);

  async function addComment(event) {
    event.preventDefault();
    const response = await fetch(`/api/cafes/${idCafe}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    modalRef.current.close();
    const result = await response.json();
    dispatch(addCafeComment(result, idCafe));
  }

  const modalRef = React.useRef();

  function addCommentModal() {
    modalRef.current.openModal();
  }

  function handleInput({ target: { name, value } }) {
    setComment({
      ...comment,
      [name]: value,
    });
  }

  async function deleteCommentCafe(id) {
    const response = await fetch(`/api/cafes/${idCafe}/comments`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (response.status === 200) {
      dispatch(deleteCafeComment(id, idCafe));
    }
  }

  return (
    <>
      <div className={styles.cafeContent}>
        <h2>Отзывы о нашей кофейне:</h2>
        {user && (
          <button
            className="btn btn-light mb-2 btn-sm"
            onClick={addCommentModal}
          >
            Добавить комментарий
          </button>
        )}
        <br></br>
        <Modal ref={modalRef}>
          <form onSubmit={addComment}>
            <h2>Комментарий</h2>
            <br></br>
            <input
              onChange={handleInput}
              name="title"
              type="text"
              placeholder="Заголовок"
              className={'form-control mr-sm-2'}
            />
            <br></br>
            <input
              onChange={handleInput}
              name="body"
              type="text"
              placeholder="Комментарий"
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

        {commentCafe &&
          commentCafe.map((comment) => (
            <React.Fragment key={comment._id}>
              <div className={commentsStyle.comment}>
                <p>
                  <strong>{comment.title}</strong>
                </p>
                <p>{comment.body}</p>
                <p>Дата: {new Date(comment.date).toLocaleString()}</p>
                <p>Автор: {comment.author.login}</p>
              </div>
              {user && (
                <button
                  className="btn btn-light mb-2 btn-sm"
                  id={comment._id}
                  onClick={() => deleteCommentCafe(comment._id)}
                >
                  Удалить
                </button>
              )}
            </React.Fragment>
          ))}
      </div>
    </>
  );
}
