import React from "react";
import success from "../images/success.svg";
import error from "../images/error.svg";

function InfoTooltip(props) {
  return (
    <div
      id={props.popupId}
      className={`popup popup_profile ${props.isOpen ? "popup_opened" : ""}`}
    >
{/* <div
    id={props.popupId}
    className={`popup popup_profile popup_opened`}
  > */}
      <div className="popup__window">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <div>
          <div className="popup__image-info">
            <img
              className="popup__image"
              alt={props.isSuccess ? "хорошо" : "плохо"}
              src={props.isSuccess ? success : error}
            />
            <h2 className="popup__image-title">
              {props.isSuccess
                ? "Вы успешно зарегистрировались"
                : "Что-то поло не так Попробуйте ещё раз."}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
