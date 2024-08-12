const TownAgg = ({
  townFilter,
  meanPrice,
  medianPrice,
  unitCount,
  loading,
}) => {
  return (
    <div>
      {townFilter.length === 0 || !townFilter[0].town ? (
        <p>Please set filter</p>
      ) : loading ? (
        <p>Loading... Please wait.</p>
      ) : medianPrice === null ? (
        <p>
          No Data for this Flat Type.
          <br />
          (Select other flat type)
        </p>
      ) : (
        townFilter.map((filter, index) => (
          <div key={index}>
            <p>
              <strong>Town:</strong> {filter.town}
            </p>
            <p className="mb-3">
              <strong>Flat Type:</strong> {filter.flatType}
            </p>

            <h5 className="price-subtitle">Median Resale Price</h5>
            <h5 className="mb-3 price-detail">
              ${medianPrice.toLocaleString()}
            </h5>
            <h5 className="price-subtitle">Mean Resale Price</h5>
            <h5 className="price-detail mb-3">${meanPrice.toLocaleString()}</h5>
            <p className="mb-3">
              <strong>No. of Units:</strong> {unitCount}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default TownAgg;
