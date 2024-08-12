const PriceCard = ({ data }) => {
  return (
    <div>
      <div className="price-card">
        <h5 className="price-detail">
          ${parseFloat(data.resale_price).toLocaleString()}
        </h5>
        <p>
          <strong>Town:</strong> {data.town}
        </p>
        <p>
          <strong>Month:</strong> {data.month}
        </p>
        <p className="paraSpace">
          <strong>Flat Type:</strong> {data.flat_type}
        </p>
        <p>
          <strong>Block:</strong> {data.block}
        </p>
        <p>
          <strong>Street Name:</strong> {data.street_name}
        </p>
        <p>
          <strong>Storey Range:</strong> {data.storey_range}
        </p>
        <p>
          <strong>Floor Area sqm:</strong> {data.floor_area_sqm}
        </p>
        <p className="paraSpace">
          <strong>Flat Model:</strong> {data.flat_model}
        </p>
        <p>
          <strong>Lease Commence Date:</strong> {data.lease_commence_date}
        </p>
        <p>
          <strong>Remaining Lease:</strong> {data.remaining_lease}
        </p>
      </div>
    </div>
  );
};

export default PriceCard;
