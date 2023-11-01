import React from "react";

const CartTableHead = () => {
  return (
    <tr>
      <th>
        <input type="checkbox" name="allselect" />
      </th>
      <th>Product</th>
      <th></th>
      <th>Unit Price</th>
      <th>Quantity</th>
      <th>Total Price</th>
      <th>Actions</th>
    </tr>
  );
};

export default CartTableHead;
