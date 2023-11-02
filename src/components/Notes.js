import React, { useEffect, useState } from "react";
import image from "../assets/note.png";
import Popup from "./Popup";
import CircleButton from "./CircleButton";
import NoteDetail from "./NoteDetail";
import MyIcon from "../assets/Vector (4).png";
const Notes = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [Arr, setArr] = useState([]);
  const [Sort, setSort] = useState([]);
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];
  const [selectedColors, setSelectedColors] = useState([]);
  const [isSelect, setIsSelect] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [selectedVal, setSelectedVal] = useState(null);
  const [selectSort, setSelectSort] = useState(null);
  const [seleColor, setSeleColor] = useState(null);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const [colorErrorMessage, setColorErrorMessage] = useState("");

  useEffect(() => {
    // Load data from localStorage on component mount
    const storedSelectedArray = JSON.parse(localStorage.getItem('selectedArray'));
    const storedSelectedSort = JSON.parse(localStorage.getItem('selectedSort'));
    const storedSelectedColorLocal = JSON.parse(localStorage.getItem('selectedColorLocal'));

    if (storedSelectedArray) {
      setArr(storedSelectedArray);
    }

    if (storedSelectedSort) {
      setSort(storedSelectedSort);
    }

    if (storedSelectedColorLocal) {
      setSelectedColors(storedSelectedColorLocal);
    }
  }, []);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const updateAllvalue = (updatedValue) => {
    setArr(updatedValue);
  };

  const closePopup = () => {
    if (inputValue.trim().length < 3) {
      setInputErrorMessage("Please enter a group name with at least 3 characters.");
    } else if (!isSelect) {
      setColorErrorMessage("Please select a color.");
    } else {
      // If there are no errors, create the new notes group

      // Update your data
      const randomChars = `${inputValue.charAt(
        Math.floor(Math.random() * inputValue.length)
      )}${inputValue.charAt(
        Math.floor(Math.random() * inputValue.length)
      )}`.replace(/\s/g, "");

      Arr.push(inputValue);
      Sort.push(randomChars);

      // Save the updated data to localStorage
      localStorage.setItem('selectedArray', JSON.stringify(Arr));
      localStorage.setItem('selectedSort', JSON.stringify(Sort));
      localStorage.setItem('selectedColorLocal', JSON.stringify(selectedColors));

      setPopupOpen(false);
      setIsSelect(false);
      setInputValue("");
      setInputErrorMessage("");
      window.location.reload();
      setColorErrorMessage("");
    }
  };

  function handleButtonClick(color) {
    setSelectedColors([...selectedColors, color]);
    setIsSelect(true);
  }

  function changeHandler(e) {
    setInputValue(e.target.value);
  }

  const imageStyle = {
    marginRight: "5px", // Add a right margin of 5px
  };

  return (
    <div className="container">
      <div className={`SideBar ${window.innerWidth < 768 && isClicked ? 'SideBar1' : ''}`}>
        <h3 className="pN">Pocket Notes</h3>
        <div>
          <button className="btn" onClick={openPopup}>
          <span className="plus">+ </span>Create Notes group
          </button>
        </div>
        <div className="sidwindow">
        <div className="Title">
          {Arr.map((val, index) => {
            const selectedColor = selectedColors[index];
            return (
            
              <div
                className={`fd ${selectedNoteIndex === index ? "selected" : ""}`}
                key={index}
                onClick={() => {
                  setIsClicked(true);
                  setSelectedVal(val);
                  setSelectSort(Sort[index]);
                  setSeleColor(selectedColors[index]);
                  setSelectedNoteIndex(index);
                }}
              >
                <div className="cir" style={{ backgroundColor: selectedColor }}>
                  {Sort[index]}
                </div>
                <div className="val">{val}</div>
              </div>
        
            );
          })}
        </div>
        </div>
      </div>

      {selectedNoteIndex !== null ? (
        <NoteDetail
          selectedVal={selectedVal}
          val={Arr[selectedNoteIndex]}
          Sort={Sort[selectedNoteIndex]}
          selectedColor={selectedColors[selectedNoteIndex]}
          noteGroup={selectedNoteIndex}
          Allvalue={Arr}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          updateAllvalue={updateAllvalue}
        />
      ) : (
        <div className="DisplayBar">
          <div>
            <img src={image} className="image" alt="Pocket Notes" />
          </div>

          <div className="Pck">Pocket Notes</div>

          <div className="descr">
            Send and receive messages without keeping your phone online. Use
            Pocket Notes on up to 4 linked devices and 1 mobile phone
          </div>

          <div className="end"><img src={MyIcon} alt="My Icon" style={imageStyle}/>end-to-end encrypted</div>
        </div>
      )}

      <div>
        <Popup show={isPopupOpen} onClose={closePopup}>
          <div className="All">
            <h2>Create New Notes group</h2>

            <div className="two">
              <h2>Group Name</h2>
              <input
                placeholder="Enter your group name...."
                className="inp"
                onChange={changeHandler}
                required
              />
              {inputErrorMessage && <p className="error-message">{inputErrorMessage}</p>}
            </div>

            <div className="colo">
              <h2>Choose colour</h2>

              {colors.map((color) => (
                <CircleButton
                  color={color}
                  onClick={() => handleButtonClick(color)}
                />
              ))}
              {colorErrorMessage && <p className="error-message">{colorErrorMessage}</p>}
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default Notes;
