import Spinner from "react-bootstrap/Spinner";

// function BasicExample() {
//   return (
//     <Spinner animation="border" role="status">
//       <span className="visually-hidden">Loading...</span>
//     </Spinner>
//   );
// }

// export default BasicExample;

// function VariantsExample() {
//   return (
//     <>
//       <div className="spinner-container">
//         <Spinner animation="border" variant="primary" />
//         <Spinner animation="border" variant="secondary" />
//         <Spinner animation="border" variant="success" />
//         <Spinner animation="border" variant="danger" />
//         <Spinner animation="border" variant="warning" />
//         <Spinner animation="border" variant="info" />
//         <Spinner animation="border" variant="light" />
//         <Spinner animation="border" variant="dark" />
//         <Spinner animation="grow" variant="primary" />
//         <Spinner animation="grow" variant="secondary" />
//         <Spinner animation="grow" variant="success" />
//         <Spinner animation="grow" variant="danger" />
//         <Spinner animation="grow" variant="warning" />
//         <Spinner animation="grow" variant="info" />
//         <Spinner animation="grow" variant="light" />
//         <Spinner animation="grow" variant="dark" />
//       </div>
//     </>
//   );
// }

function VariantsExample() {
  return (
    <>
      <div className="spinner-container">
        <Spinner animation="border" className="custom-spinner" />
      </div>
    </>
  );
}

export default VariantsExample;
