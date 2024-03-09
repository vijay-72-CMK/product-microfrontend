import Button from "react-bootstrap/Button";
import "./CustomButton.css";

function CustomButton({ children, size, OnClick }) {
  return (
    <>
      <Button variant="flat" size={size} onClick={OnClick}>
        {children}
      </Button>
    </>
  );
}

export default CustomButton;
