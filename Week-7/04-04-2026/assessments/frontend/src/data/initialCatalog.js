import { v4 as uuidv4 } from 'uuid';

export const CATALOG_TYPES = {
  ENTRANCE: 'Entrance Fee',
  DONATION: 'Donation',
  MERCHANDISE: 'Selling Price',
  CUSTOM: 'Custom Item'
};

export const initialCatalog = [
  { id: uuidv4(), name: 'Adult Ticket', type: CATALOG_TYPES.ENTRANCE, defaultPrice: 50, taxRate: 10 },
  { id: uuidv4(), name: 'Child Ticket', type: CATALOG_TYPES.ENTRANCE, defaultPrice: 25, taxRate: 10 },
  { id: uuidv4(), name: 'Senior Ticket', type: CATALOG_TYPES.ENTRANCE, defaultPrice: 35, taxRate: 10 },
  { id: uuidv4(), name: 'VIP Pass', type: CATALOG_TYPES.ENTRANCE, defaultPrice: 150, taxRate: 10 },
  { id: uuidv4(), name: 'T-Shirt', type: CATALOG_TYPES.MERCHANDISE, defaultPrice: 30, taxRate: 5 },
  { id: uuidv4(), name: 'Mug', type: CATALOG_TYPES.MERCHANDISE, defaultPrice: 15, taxRate: 5 },
  { id: uuidv4(), name: 'General Donation', type: CATALOG_TYPES.DONATION, defaultPrice: 0, taxRate: 0 }, // Price is variable
];
