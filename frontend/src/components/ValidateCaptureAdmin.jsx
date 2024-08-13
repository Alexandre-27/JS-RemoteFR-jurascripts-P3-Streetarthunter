import PropTypes from "prop-types";
import CrossButton from "../assets/picto/yellow/cross_yell.svg";
import "./ValidateCaptureAdmin.scss";

function ValidateCaptureAdmin({
  setToggleModalCapture,
  handleValidateButtonClick,
  pointsUserId,
  deleteCaptureId,
}) {
  return (
    <section className="ValidateCapturePoints">
      <div>
        <button
          type="button"
          onClick={() => {
            setToggleModalCapture(false);
          }}
        >
          <img src={CrossButton} alt="Fermeture du filtre" />
        </button>
      </div>
      <h2>Valider</h2>
      <p>
        Êtes-vous sûr de vouloir valider cette oeuvre et accorder 100 points au
        joueur ?
      </p>
      <button
        type="button"
        className="button-red"
        onClick={() => {
          handleValidateButtonClick(pointsUserId, deleteCaptureId);
        }}
      >
        Valider l'oeuvre
      </button>
    </section>
  );
}

ValidateCaptureAdmin.propTypes = {
  setToggleModalCapture: PropTypes.func.isRequired,
  handleValidateButtonClick: PropTypes.func.isRequired,
  pointsUserId: PropTypes.number.isRequired,
  deleteCaptureId: PropTypes.number.isRequired,
};

export default ValidateCaptureAdmin;
