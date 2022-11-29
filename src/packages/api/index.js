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
export { checkOrCreateClient } from "./endpoints/client.js";

// Rent
export { createRent } from "./endpoints/rent.js";

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
