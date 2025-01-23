import React from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();

  // Update cart handler
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity: 1 },
    });
    message.success("Item added successfully..");
  };

  return (
    <div className="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-3 rounded-2xl shadow-lg">
      {/* Image Section */}
      <div className="h-48 bg-gray-700 rounded-xl overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-800">{item.name}</span>
          </div>
          <span className="font-bold text-red-600">${item.price}</span>
        </div>
        <button
          className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-md transition-all duration-200"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ItemList;
