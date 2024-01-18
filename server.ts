import express from "express";

const app = express();
const port = 3000; // Change this if you want to run the server on a different port

interface Restaurant {
    name: string;
    id: number;
    coverImage: string;
    menus: string[];
    activeTimePeriod: {
        open: string;
        close: string;
    };
}

// A function getRestaurantData that takes a restaurantId and returns the corresponding data
const getRestaurantData = (restaurantId: string): Restaurant | null => {
    try {
        const restaurantPath = `./api/restaurants/${restaurantId}.json`; // Specify the path to the restaurant data
        const restaurantData = require(restaurantPath); // Load the restaurant data
        return restaurantData as Restaurant;
    } catch (error) {
        console.error(`Error loading restaurant data for ID ${restaurantId}:`, error);
        return null;
    }
};

app.get("/api/restaurants/:restaurantId.json", (req, res) => {
    const restaurantId = req.params.restaurantId;
    const data = getRestaurantData(restaurantId);
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
