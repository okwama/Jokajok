import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  tags: string[];
  category: string;
  colors: Array<{
    name: string;
    value: string;
    available: boolean;
  }>;
  features: string[];
  materials: string;
  dimensions: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

// Get all products
export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    try {
      console.log('Loading products from products.json...');
      
      if (!productsData) {
        throw new Error('productsData is undefined');
      }
      
      if (!productsData.products) {
        throw new Error('productsData.products is undefined');
      }
      
      if (!Array.isArray(productsData.products)) {
        console.error('Products data is not an array:', typeof productsData.products);
        throw new Error('Products data is not an array');
      }
      
      console.log(`Loaded ${productsData.products.length} products from JSON`);
      
      // Debug: Log first few products
      const sampleProducts = productsData.products.slice(0, 3);
      console.log('Sample products:', sampleProducts.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category
      })));
      
      // Simulate API call with setTimeout
      setTimeout(() => {
        resolve(productsData.products);
      }, 100);
    } catch (error) {
      console.error('Error in getProducts:', error);
      reject(error);
    }
  });
};

// Get a single product by ID
export const getProductById = async (id: string | number): Promise<Product | undefined> => {
  const products = await getProducts();
  return products.find(product => product.id.toString() === id.toString());
};

// Get products by category
export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter(product => product.category === categoryId);
};

// Get all main categories
export const getCategories = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Only return main categories
      const mainCategories = categoriesData.mainCategories.map(mainCategory => ({
        id: mainCategory.id,
        name: mainCategory.name,
        description: mainCategory.description,
        image: mainCategory.image,
        productCount: mainCategory.subcategories.reduce((sum, sub) => sum + sub.productCount, 0)
      }));
      
      resolve(mainCategories);
    }, 100);
  });
};

// Get a single category by ID
export const getCategoryById = async (id: string): Promise<Category | undefined> => {
  const categories = await getCategories();
  return categories.find(category => category.id === id);
};

// Search products by query
export const searchProducts = async (query: string): Promise<Product[]> => {
  const products = await getProducts();
  const searchTerm = query.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};
