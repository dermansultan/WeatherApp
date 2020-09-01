import React from "react";

function UnitToggleSwitch(props) {
  return (
    <div className='switchContainer'>
     {props.userSearched ?  <div><label className="switch">
        <input type="checkbox" id="togBtn"
        checked={props.checked} onChange={props.onChange}></input>
        <div className="slider round">
          <span className="on">°C</span>
          <span className="off">°F</span>
        </div>
      </label>
    </div>: ''}
    </div>
  );
}

export default UnitToggleSwitch;
