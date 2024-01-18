import { app } from "../server";

interface ShortMenu {
    name: string;
    id: string;
    thumbnailImage?: string;
    fullPrice: number;
    discountedPercent: number;
    discountedTimePeriod?: {
        begin: string;
        end: string;
    };
    sold: number;
    totalInStock: number;
}

interface FullMenu extends ShortMenu {
    largeImage?: string;
    options: {
        label: string;
        choices: {
            label: string;
        }[];
    }[];
}

const getFullMenuData = (restaurantId: string, menuName: string): FullMenu | null => {
    try {
        const menuPath = `../restaurants/${restaurantId}/menus/${menuName}.json`;
        const menuData = require(menuPath);
        return menuData as FullMenu;
    } catch (error) {
        console.error(
            `Error loading menu data for Restaurant ID ${restaurantId} on Menu ${menuName}:`,
            error
        );
        return null;
    }
};

app.get("/api/restaurants/:restaurantId/menus/:menuName/full.json", (req, res) => {
    const {restaurantId, menuName} = req.params;
    const data = getFullMenuData(restaurantId, menuName);
    res.json(data);
});

app.get("/api/restaurants/:restaurantId/menus/:menuName/short.json", (req, res) => {
    const {restaurantId, menuName} = req.params;
    const FullData = getFullMenuData(restaurantId, menuName);
    
    if (FullData === null) {
        res.json(null);
        return;
    }
    
    const ShortData: ShortMenu = {
        name: FullData.name,
        id: FullData.id,
        thumbnailImage: FullData.thumbnailImage,
        fullPrice: FullData.fullPrice,
        discountedPercent: FullData.discountedPercent,
        discountedTimePeriod: FullData.discountedTimePeriod,
        sold: FullData.sold,
        totalInStock: FullData.totalInStock
    };
    res.json(ShortData);
});
