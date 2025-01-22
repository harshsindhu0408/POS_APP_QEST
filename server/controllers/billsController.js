const billsModel = require("../models/billsModel");

// Add a new bill
const addBillsController = async (req, res) => {
  try {
    const newBill = new billsModel(req.body);
    await newBill.save();
    res.status(201).json({
      success: true,
      message: "Bill created successfully!",
      data: newBill,
    });
  } catch (error) {
    console.error("Error creating bill:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the bill.",
    });
  }
};

// Get all bills
const getBillsController = async (req, res) => {
  try {
    const bills = await billsModel.find();
    res.status(200).json({
      success: true,
      message: "Bills fetched successfully.",
      data: bills,
    });
  } catch (error) {
    console.error("Error fetching bills:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching bills.",
    });
  }
};

module.exports = {
  addBillsController,
  getBillsController,
};
