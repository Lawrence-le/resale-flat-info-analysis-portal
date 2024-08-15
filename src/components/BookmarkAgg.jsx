const BookmarkAgg = ({
  meanPriceBookmark,
  medianPriceBookmark,
  unitCountBookmark,
  loading,
  selectedBookmarkTown,
  selectedBookmarkFlatType,
}) => {
  return (
    <div>
      {!selectedBookmarkTown || !selectedBookmarkFlatType ? (
        <p>Please select a bookmark.</p>
      ) : loading ? (
        <p>Loading... Please wait.</p>
      ) : medianPriceBookmark === null ? (
        <p>
          No Data for this Flat Type.
          <br />
          (Select other flat type)
        </p>
      ) : (
        <div>
          <p>
            <strong>{selectedBookmarkTown}</strong>
          </p>
          <p className="mb-3">
            <strong>{selectedBookmarkFlatType}</strong>
          </p>

          <h5 className="price-subtitle">Median Resale Price</h5>
          <h5 className="mb-3 price-detail">
            ${medianPriceBookmark.toLocaleString()}
          </h5>
          <h5 className="price-subtitle">Mean Resale Price</h5>
          <h5 className="price-detail mb-3">
            ${meanPriceBookmark.toLocaleString()}
          </h5>
          <h5 className="price-subtitle mb-1">No. of Units:</h5>
          <p className="numberOf mb-2">{unitCountBookmark}</p>
        </div>
      )}
    </div>
  );
};

export default BookmarkAgg;
