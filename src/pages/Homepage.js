import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";

const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selecedCategory, setSelecedCategory] = useState("fitness");

  const categories = [
    {
      name: "fitness",
      imageUrl:
        "https://as1.ftcdn.net/jpg/02/85/88/46/1000_F_285884603_0VQ584ny1Pl2afMyqnHKIkOt1XDiJhOA.jpg",
    },
    {
      name: "therapy",
      imageUrl: "https://www.manageminds.co.uk/app/uploads/therapy-session.png",
    },
    {
      name: "workshops",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU1bN7ZiC_KAhcdMl5qKxkIrOAjwJ7CVAv_9-QbsbUxeSfm-qzpnq3ODzQBwvyP30XncY&usqp=CAU",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
        console.log(data);
      } catch (error) {
        console.log(error);
        dispatch({ type: "HIDE_LOADING" });
      }
    };
    getAllItems();
  }, [dispatch]);

  return (
    <DefaultLayout>
      {/* Enhanced Categories Section */}
      <div className="w-full px-4 py-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Browse by Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6 justify-items-center">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`flex flex-col items-center justify-center text-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
                selecedCategory === category.name
                  ? "bg-blue-100 border-2 border-blue-500"
                  : "bg-white border border-gray-200 hover:bg-gray-50"
              } cursor-pointer`}
              onClick={() => setSelecedCategory(category.name)}
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="mb-3 h-16 w-16 sm:h-20 sm:w-24 object-contain"
              />
              <h4
                className={`text-sm sm:text-base font-medium capitalize ${
                  selecedCategory === category.name
                    ? "text-blue-600"
                    : "text-gray-800"
                }`}
              >
                {category.name}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Items Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          {selecedCategory.charAt(0).toUpperCase() + selecedCategory.slice(1)}{" "}
          Items
        </h2>
        <Row gutter={[16, 16]} className="justify-start items-start">
          {itemsData
            .filter((item) => item.category === selecedCategory)
            .map((item) => (
              <Col
                key={item.id}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                className="flex justify-center"
              >
                <ItemList item={item} />
              </Col>
            ))}
        </Row>
        {itemsData.filter((item) => item.category === selecedCategory)
          .length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No items available in this category.
          </p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Homepage;
