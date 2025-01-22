const itemModel = require("../models/itemModel");

// Get all items
const getItemController = async (req, res) => {
  try {
    const items = await itemModel.find();
    res.status(200).json({
      success: true,
      message: "Items fetched successfully.",
      data: items,
    });
  } catch (error) {
    console.error("Error fetching items:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching items.",
    });
  }
};

// Add a new item
const addItemController = async (req, res) => {
  try {
    const newItem = new itemModel(req.body);
    const savedItem = await newItem.save();
    res.status(201).json({
      success: true,
      message: "Item created successfully!",
      data: savedItem,
    });
  } catch (error) {
    console.error("Error adding item:", error.message);
    res.status(400).json({
      success: false,
      message: "An error occurred while adding the item.",
    });
  }
};

// Update an item
const editItemController = async (req, res) => {
  try {
    const { itemId, ...updateData } = req.body;
    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required for updating.",
      });
    }

    const updatedItem = await itemModel.findByIdAndUpdate(itemId, updateData, {
      new: true,
      runValidators: true, // Ensures validation rules are applied
    });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully!",
      data: updatedItem,
    });
  } catch (error) {
    console.error("Error updating item:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the item.",
    });
  }
};

// Delete an item
const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required for deletion.",
      });
    }

    const deletedItem = await itemModel.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully!",
      data: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting item:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the item.",
    });
  }
};

module.exports = {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
};
