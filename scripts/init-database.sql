-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  product_id UUID REFERENCES products(id),
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  delivery_address TEXT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  stripe_payment_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample products
INSERT INTO products (name, description, price, category, image_url, stock) VALUES
('Modern Sofa Set', 'Beautiful 3-seater sofa with premium fabric', 450000, 'Living Room', '/products/sofa.jpg', 5),
('Wooden Dining Table', 'Solid wood dining table for 6 people', 350000, 'Dining', '/products/dining-table.jpg', 3),
('Bedroom Cabinet', 'Spacious wooden cabinet with drawers', 280000, 'Bedroom', '/products/cabinet.jpg', 7),
('Office Chair', 'Ergonomic office chair with lumbar support', 180000, 'Office', '/products/chair.jpg', 10),
('Coffee Table', 'Modern glass top coffee table', 120000, 'Living Room', '/products/coffee-table.jpg', 8),
('Bed Frame', 'King size wooden bed frame', 420000, 'Bedroom', '/products/bed.jpg', 4),
('Bookshelf', 'Wall-mounted bookshelf unit', 95000, 'Office', '/products/bookshelf.jpg', 6),
('Kitchen Cabinet', 'Modern kitchen cabinet with storage', 290000, 'Kitchen', '/products/kitchen-cabinet.jpg', 5);

-- Enable RLS if needed (optional, for security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
