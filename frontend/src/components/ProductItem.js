import React from "react";

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <li className="list-group-item mb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            {product.image && (
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.name}
                className="img-fluid"
                style={{
                  width: "100%",
                  maxWidth: "350px",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          {/* <div className='col-md-5'></div> */}
          <div className="col-md-12  d-flex justify-content-center flex-column align-items-center">
            <h4>Name:{product.name}</h4>
            <h4>Description:{product.description}</h4>
            <h4>Price: ${product.price}</h4>
            <button onClick={onEdit} className="btn btn-success me-2">
              Edit
            </button>
            <button onClick={onDelete} className="btn btn-danger my-2">
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
