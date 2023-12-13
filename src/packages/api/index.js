// General functions
export { default as makeHttpRequest } from "./makeHttpRequest.js";
export { setBaseUrl, setHeaders, addHeaders, setToken } from "./config.js";

// Inventory
export { getInventories, getInventory } from "./endpoints/inventory.js";

// Category
export { getCategories } from "./endpoints/category.js";

// Points
export { getPoints } from "./endpoints/point.js";

// Calc
export { calculateRent, calculateRents } from "./endpoints/calc.js";

// Client
export {
    checkOrCreateClient,
    getClientRents,
    editClient,
    getClient,
    getClients,
    createClient,
} from "./endpoints/client.js";

// Rent
export { openRent } from "./endpoints/rent.js";
export { prepareRent } from "./endpoints/rent/prepare.js";
export { addInventoryToRent } from "./endpoints/rent/addInventoryToRent.js";
export { setRentTime } from "./endpoints/rent/setRentTime.js";
export { saveRent } from "./endpoints/rent/saveRent.js";
export { addClientToRent } from "./endpoints/rent/addClientToRent.js";

// InventoryDates
export { getRentsOfInventory } from "./endpoints/inventoryDates.js";

// Discount
export { searchDiscount } from "./endpoints/discount.js";

// Auth
export { authClient } from "./endpoints/auth.js";

// Registration
export { registerClient } from "./endpoints/registration.js";

// Restore
export {
    restorePassword,
    restoreCode,
    restoreChange,
} from "./endpoints/restore.js";

// Settings
export { getSettings } from "./endpoints/settings";
