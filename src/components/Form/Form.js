import React, { useState, useEffect, useRef } from "react";
import "./Form.css";
import { uid } from "uid";

const Form = (props) => {
  const { edit, selectedNote, toggleModal } = props;
  const [title, setTitle] = useState((edit && selectedNote.title) || "");
  const [text, setText] = useState((edit && selectedNote.text) || "");
  const [isActiveForm, setIsActiveForm] = useState(edit);
  const formRef = useRef(null);

  const titleChangeHandler = (event) => setTitle(event.target.value);
  const textChangeHandler = (event) => {
    setText(event.target.value);
    setIsActiveForm(true);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (title.trim() === "" && text.trim() === "") {
      return;
    }

    if (!edit) {
      props.addNote({
        id: uid(),
        title,
        text,
      });
    } else {
      props.editNote({
        id: selectedNote.id,
        title,
        text,
      });
      toggleModal();
    }

    setTitle("");
    setText("");
    setIsActiveForm(false);
  };

  const formClickHandler = () => {
    setIsActiveForm(true);
  };

  const closeFormHandler = (event) => {
    event.stopPropagation(); // Prevent triggering other click handlers
    if (title.trim() === "" && text.trim() === "") {
      setIsActiveForm(false);
    } else {
      setTitle("");
      setText("");
      setIsActiveForm(false);
      if (edit) {
        toggleModal();
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        if (title.trim() !== "" || text.trim() !== "") {
          submitFormHandler(event);
        } else {
          setIsActiveForm(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [title, text]);

  return (
    <div ref={formRef} className={`form-container ${isActiveForm ? "active-form" : ""}`} onClick={formClickHandler}>
      <form onSubmit={submitFormHandler} className={isActiveForm ? "form" : ""}>
        {isActiveForm && (
          <input
            onChange={titleChangeHandler}
            value={title}
            type="text"
            className="note-title"
            placeholder="Title"
          />
        )}
        <input
          onChange={textChangeHandler}
          value={text}
          type="text"
          className="note-text"
          placeholder="Take a note..."
        />
        {isActiveForm && (
          <div className="form-actions">
            <div className="icons">
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">
                  add_alert
                </span>
                <span className="tooltip-text">Remind me</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">
                  person_add
                </span>
                <span className="tooltip-text">Collaborator</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">
                  palette
                </span>
                <span className="tooltip-text">Change Color</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">
                  image
                </span>
                <span className="tooltip-text">Add Image</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">
                  archive
                </span>
                <span className="tooltip-text">Archive</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">
                  more_vert
                </span>
                <span className="tooltip-text">More</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">
                  undo
                </span>
                <span className="tooltip-text">Undo</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">
                  redo
                </span>
                <span className="tooltip-text">Redo</span>
              </div>
            </div>
            <button type="button" className="close-btn" onClick={closeFormHandler}>
              close
            </button>
          </div>
        )}
        {!isActiveForm && (
          <div className="form-actions">
            <div className="tooltip">
              <span className="material-symbols-outlined hover">check_box</span>
              <span className="tooltip-text">New List</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover">brush</span>
              <span className="tooltip-text">New Drawing</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover">image</span>
              <span className="tooltip-text">New Image</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
 