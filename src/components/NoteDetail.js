
import React, { useEffect, useState } from "react";
import arrow from "../assets/Vector (1).png";
import backArrow from '../assets/backArrow.png';

const NoteDetail = ({ val, Sort, selectedColor, noteGroup, Allvalue, isClicked, setIsClicked }) => {
  const [Allvalues, setAllvalues] = useState(() => {
    // Load data from localStorage on component mount
    const storedSelectedArray = JSON.parse(localStorage.getItem('updatedAllvalues'));
    if (storedSelectedArray) {
      return storedSelectedArray;
    }
    return Allvalue.map((value) => ({
      NoteGroup: value,
      Note: [],
    }));
  });

  const [changeValue, setChangeValue] = useState("");
  const [selectValues, setSelectValues] = useState(false);

  // Use useEffect to update Allvalues when Allvalue prop changes
  useEffect(() => {
    setAllvalues(Allvalue.map((value) => ({
      NoteGroup: value,
      Note: [],
    })));
  }, [Allvalue]);

  function changeHandler(e) {
    setChangeValue(e.target.value);
  }

  const addNote = () => {
    const updatedAllvalues = [...Allvalues];
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString("en-US", {
      month: "long",
    });
    const year = currentDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formattedTime = currentDate.toLocaleString("en-US", timeOptions);

    // Create a new note object
    const newNote = {
      date: formattedDate,
      time: formattedTime,
      NoteContent: changeValue,
    };

    // Find the note group by its value and add the new note
    const noteGroupIndex = updatedAllvalues.findIndex((group) => group.NoteGroup === val);
    if (noteGroupIndex !== -1) {
      updatedAllvalues[noteGroupIndex].Note.push(newNote);
      localStorage.setItem('updatedAllvalues', JSON.stringify(updatedAllvalues));
      setAllvalues(updatedAllvalues);
    }

    setChangeValue("");
    setSelectValues(true);
  };

  return (
    <div className={`NoteDetail ${window.innerWidth < 768 && isClicked ? 'responsive-class' : 'NoteDetail1'}`}>
      <div className="nav">
        {window.innerWidth < 768 && isClicked ? (
          <div onClick={() => { setIsClicked(false) }} className="backArrow">
            <img src={backArrow} alt="Back" />
          </div>
        ) : ('')}
        <h3 className="cir1" style={{ backgroundColor: selectedColor }}>
          {Sort}
        </h3>
        <h2 className="val">{val}</h2>
      </div>

      <div className="middle">
        {selectValues && Allvalues[noteGroup].Note.length > 0 ? (
          <div className="wid">
            {Allvalues[noteGroup].Note.map((note, index) => {
              return (
                <div key={index} className="textInput">
                  <div className="date">
                    <div className="time">{note.time}</div>
                    <div className="Cdate">{note.date}</div>
                  </div>
                  <div className="Your_Notes">{note.NoteContent}</div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="area">
        <textarea
          value={changeValue}
          className="text"
          placeholder="Enter your text here..........."
          onChange={changeHandler}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Prevent the default behavior of Enter (e.g., adding a new line)
              addNote();
            }
          }}
        />

        <img
          src={arrow}
          className="arrow"
          onClick={addNote}
        />
      </div>
    </div>
  );
};

export default NoteDetail;