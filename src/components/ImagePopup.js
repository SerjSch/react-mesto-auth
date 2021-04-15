import React from "react";

function ImagePopup(props) {
  const { isOpen, onClose } = props;

  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    const handleOverlayClose = (event) => {
      if (
        event.target.classList.contains("popup") ||
        event.target.classList.contains("popup__close-button")
      ) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    document.addEventListener("mousedown", handleOverlayClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
      document.removeEventListener("mousedown", handleOverlayClose);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup popup_image-zoom ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__zoom-window">
        <img
          className="popup__big-foto"
          src={props.card.link}
          alt={props.card.name}
        />
        <button
          type="button"
          className="popup__close-button popup__close-button_zoom"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__place-name popup__place-name_zoom">
          {props.card.name}
        </h2>
      </div>
    </div>
  );
}
export default ImagePopup;
