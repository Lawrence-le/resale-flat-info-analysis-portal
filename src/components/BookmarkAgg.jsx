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
            <strong>Town:</strong> {selectedBookmarkTown}
          </p>
          <p className="mb-3">
            <strong>Flat Type:</strong> {selectedBookmarkFlatType}
          </p>

          <h5 className="price-subtitle">Median Resale Price</h5>
          <h5 className="mb-3 price-detail">
            ${medianPriceBookmark.toLocaleString()}
          </h5>
          <h5 className="price-subtitle">Mean Resale Price</h5>
          <h5 className="price-detail mb-3">
            ${meanPriceBookmark.toLocaleString()}
          </h5>
          <p className="mb-3">
            <strong>No. of Units:</strong> {unitCountBookmark}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookmarkAgg;
