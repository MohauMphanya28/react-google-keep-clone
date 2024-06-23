import React, { useState } from "react";
import "./Notes.css";

const Note = (props) => {
  const { toggleModal, note, setSelectedNote, deleteNote } = props;
  const [hoveredOver, setHoveredOver] = useState(false);

  const noteClickHandler = () => {
    toggleModal();
    setSelectedNote(note);
  };

  const hoverOverNote = () => {
    setHoveredOver(true);
  };

  const hoverOutNote = () => {
    setHoveredOver(false);
  };

  const deleteNoteHandler = (event) => {
    event.stopPropagation(); 
    deleteNote(note.id);
  };

  return (
    <div
      className="note"
      id={props.id}
      onClick={noteClickHandler}
      onMouseOver={hoverOverNote}
      onMouseOut={hoverOutNote}
    >
      {hoveredOver && (
        <span className="material-symbols-outlined check-circle">
          check_circle
        </span>
      )}

      <div className="title">{note.title}</div>
      <div className="text">{note.text}</div>
      <div className="note-footer">
        <div className={`tooltip ${hoveredOver ? "visible" : "hidden"}`}>
          <span className="material-symbols-outlined hover small-icon">
            add_alert
          </span>
          <span className="tooltip-text">Remind me</span>
        </div>
        <div className={`tooltip ${hoveredOver ? "visible" : "hidden"}`}>
          <span className="material-symbols-outlined hover small-icon">
            person_add
          </span>
          <span className="tooltip-text">Collaborator</span>
        </div>
        <div className={`tooltip ${hoveredOver ? "visible" : "hidden"}`}>
          <span className="material-symbols-outlined hover small-icon">
            palette
          </span>
          <span className="tooltip-text">Change Color</span>
        </div>
        <div className={`tooltip ${hoveredOver ? "visible" : "hidden"}`}>
          <span className="material-symbols-outlined hover small-icon">
            image
          </span>
          <span className="tooltip-text">Add Image</span>
        </div>
        <div className={`tooltip archive ${hoveredOver ? "visible" : "hidden"}`} onClick={deleteNoteHandler}>
          <span className="material-symbols-outlined hover small-icon">
            archive
          </span>
          <span className="tooltip-text">Archive</span>
        </div>
        <div className={`tooltip ${hoveredOver ? "visible" : "hidden"}`}>
          <span className="material-symbols-outlined hover small-icon">
            more_vert
          </span>
          <span className="tooltip-text">More</span>
        </div>
      </div>
    </div>
  );
};

export default Note;
