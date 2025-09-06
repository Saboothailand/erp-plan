-- =====================================================
-- ERP Saboo Plan - Basic Data Insertion
-- 화장품 제조업 ERP 시스템 기본 데이터 삽입
-- =====================================================

-- =====================================================
-- 1. 기본 역할 및 권한 데이터
-- =====================================================

-- 기본 역할
INSERT INTO roles (name, display_name, description, is_system_role) VALUES 
('admin', 'System Administrator', 'Full system access', true),
('manager', 'Manager', 'Department management access', false),
('operator', 'Operator', 'Production and operational access', false),
('quality', 'Quality Control', 'Quality management access', false),
('sales', 'Sales Representative', 'Sales and customer management', false),
('purchasing', 'Purchasing Agent', 'Procurement management', false),
('inventory', 'Inventory Manager', 'Inventory management access', false);

-- 기본 권한
INSERT INTO permissions (name, display_name, description, module, resource, action) VALUES 
-- 시스템 관리
('system.users.create', 'Create Users', 'Create new users', 'system', 'users', 'create'),
('system.users.read', 'View Users', 'View user information', 'system', 'users', 'read'),
('system.users.update', 'Update Users', 'Update user information', 'system', 'users', 'update'),
('system.users.delete', 'Delete Users', 'Delete users', 'system', 'users', 'delete'),
('system.roles.manage', 'Manage Roles', 'Manage roles and permissions', 'system', 'roles', 'manage'),

-- 제품 관리
('products.create', 'Create Products', 'Create new products', 'products', 'products', 'create'),
('products.read', 'View Products', 'View product information', 'products', 'products', 'read'),
('products.update', 'Update Products', 'Update product information', 'products', 'products', 'update'),
('products.delete', 'Delete Products', 'Delete products', 'products', 'products', 'delete'),
('products.formulas.manage', 'Manage Formulas', 'Manage product formulas', 'products', 'formulas', 'manage'),

-- 재고 관리
('inventory.view', 'View Inventory', 'View inventory levels', 'inventory', 'inventory', 'read'),
('inventory.adjust', 'Adjust Inventory', 'Adjust inventory levels', 'inventory', 'inventory', 'update'),
('inventory.transfer', 'Transfer Inventory', 'Transfer inventory between warehouses', 'inventory', 'inventory', 'transfer'),

-- 구매 관리
('purchase.create', 'Create Purchase Orders', 'Create purchase orders', 'purchase', 'orders', 'create'),
('purchase.read', 'View Purchase Orders', 'View purchase orders', 'purchase', 'orders', 'read'),
('purchase.update', 'Update Purchase Orders', 'Update purchase orders', 'purchase', 'orders', 'update'),
('purchase.approve', 'Approve Purchase Orders', 'Approve purchase orders', 'purchase', 'orders', 'approve'),

-- 판매 관리
('sales.create', 'Create Sales Orders', 'Create sales orders', 'sales', 'orders', 'create'),
('sales.read', 'View Sales Orders', 'View sales orders', 'sales', 'orders', 'read'),
('sales.update', 'Update Sales Orders', 'Update sales orders', 'sales', 'orders', 'update'),
('sales.invoice', 'Create Invoices', 'Create invoices', 'sales', 'invoices', 'create');

-- =====================================================
-- 2. 기본 단위 및 통화 데이터
-- =====================================================

-- 기본 단위
INSERT INTO units (code, name, symbol, unit_type) VALUES 
-- 무게
('kg', 'Kilogram', 'kg', 'weight'),
('g', 'Gram', 'g', 'weight'),
('mg', 'Milligram', 'mg', 'weight'),
('lb', 'Pound', 'lb', 'weight'),
('oz', 'Ounce', 'oz', 'weight'),

-- 부피
('L', 'Liter', 'L', 'volume'),
('ml', 'Milliliter', 'ml', 'volume'),
('gal', 'Gallon', 'gal', 'volume'),
('fl_oz', 'Fluid Ounce', 'fl oz', 'volume'),

-- 길이
('m', 'Meter', 'm', 'length'),
('cm', 'Centimeter', 'cm', 'length'),
('mm', 'Millimeter', 'mm', 'length'),
('in', 'Inch', 'in', 'length'),
('ft', 'Foot', 'ft', 'length'),

-- 개수
('pcs', 'Pieces', 'pcs', 'count'),
('box', 'Box', 'box', 'count'),
('case', 'Case', 'case', 'count'),
('pallet', 'Pallet', 'pallet', 'count');

-- 기본 통화
INSERT INTO currencies (code, name, symbol, decimal_places) VALUES 
('USD', 'US Dollar', '$', 2),
('EUR', 'Euro', '€', 2),
('GBP', 'British Pound', '£', 2),
('JPY', 'Japanese Yen', '¥', 0),
('KRW', 'South Korean Won', '₩', 0),
('THB', 'Thai Baht', '฿', 2),
('CNY', 'Chinese Yuan', '¥', 2);

-- 기본 세금 코드
INSERT INTO tax_codes (code, name, description, tax_rate, tax_type) VALUES 
('VAT_0', 'VAT 0%', 'Zero rate VAT', 0.0000, 'vat'),
('VAT_7', 'VAT 7%', 'Standard VAT rate', 0.0700, 'vat'),
('VAT_10', 'VAT 10%', 'Reduced VAT rate', 0.1000, 'vat'),
('SALES_TAX_8', 'Sales Tax 8%', 'Standard sales tax', 0.0800, 'sales_tax'),
('EXEMPT', 'Exempt', 'Tax exempt', 0.0000, 'sales_tax');

-- =====================================================
-- 3. 기본 창고 데이터
-- =====================================================

INSERT INTO warehouses (code, name, description, capacity, temperature_controlled, is_active) VALUES 
('WH001', 'Main Warehouse', 'Primary storage facility', 10000.00, false, true),
('WH002', 'Raw Materials', 'Raw materials storage', 5000.00, false, true),
('WH003', 'Finished Goods', 'Finished products storage', 8000.00, false, true),
('WH004', 'Cold Storage', 'Temperature controlled storage', 2000.00, true, true),
('WH005', 'Quarantine', 'Quarantine area', 500.00, false, true);

-- =====================================================
-- 4. 기본 제품 카테고리 데이터
-- =====================================================

INSERT INTO product_categories (code, name, description, level) VALUES 
('SKINCARE', 'Skincare', 'Skincare products', 0),
('MAKEUP', 'Makeup', 'Makeup products', 0),
('HAIRCARE', 'Hair Care', 'Hair care products', 0),
('BODY', 'Body Care', 'Body care products', 0),
('FRAGRANCE', 'Fragrance', 'Perfumes and fragrances', 0),
('RAW_MAT', 'Raw Materials', 'Raw materials and ingredients', 0),
('PACKAGING', 'Packaging', 'Packaging materials', 0);

-- 하위 카테고리
INSERT INTO product_categories (code, name, description, parent_id, level) VALUES 
-- 스킨케어 하위 카테고리
('CLEANSER', 'Cleanser', 'Facial cleansers', (SELECT id FROM product_categories WHERE code = 'SKINCARE'), 1),
('MOISTURIZER', 'Moisturizer', 'Moisturizers and creams', (SELECT id FROM product_categories WHERE code = 'SKINCARE'), 1),
('SERUM', 'Serum', 'Facial serums', (SELECT id FROM product_categories WHERE code = 'SKINCARE'), 1),
('SUNSCREEN', 'Sunscreen', 'Sun protection products', (SELECT id FROM product_categories WHERE code = 'SKINCARE'), 1),

-- 메이크업 하위 카테고리
('FOUNDATION', 'Foundation', 'Foundation products', (SELECT id FROM product_categories WHERE code = 'MAKEUP'), 1),
('LIPSTICK', 'Lipstick', 'Lip products', (SELECT id FROM product_categories WHERE code = 'MAKEUP'), 1),
('EYESHADOW', 'Eyeshadow', 'Eye makeup products', (SELECT id FROM product_categories WHERE code = 'MAKEUP'), 1),
('MASCARA', 'Mascara', 'Mascara products', (SELECT id FROM product_categories WHERE code = 'MAKEUP'), 1);

-- =====================================================
-- 5. 샘플 제품 데이터
-- =====================================================

-- 샘플 원료
INSERT INTO product_ingredients (code, name, scientific_name, inci_name, cas_number, supplier, purity, is_hazardous, is_active) VALUES 
('VIT_E', 'Vitamin E Oil', 'Tocopherol', 'Tocopherol', '59-02-9', 'Supplier ABC', 99.50, false, true),
('HYALURONIC', 'Hyaluronic Acid', 'Hyaluronic Acid', 'Hyaluronic Acid', '9004-61-9', 'Supplier XYZ', 95.00, false, true),
('RETINOL', 'Retinol', 'Retinol', 'Retinol', '68-26-8', 'Supplier DEF', 98.00, true, true),
('NIACINAMIDE', 'Niacinamide', 'Niacinamide', 'Niacinamide', '98-92-0', 'Supplier GHI', 99.00, false, true),
('CERAMIDE', 'Ceramide NP', 'Ceramide NP', 'Ceramide NP', '100403-19-0', 'Supplier JKL', 97.50, false, true);

-- 샘플 제품
INSERT INTO products (sku, name, description, category_id, product_type, brand, manufacturer, unit_of_measure_id, weight, volume, shelf_life_days, barcode, is_active) VALUES 
('FC001', 'Anti-Aging Face Cream', 'Premium anti-aging face cream with retinol and hyaluronic acid', (SELECT id FROM product_categories WHERE code = 'MOISTURIZER'), 'finished_good', 'Saboo Beauty', 'Saboo Cosmetics', (SELECT id FROM units WHERE code = 'ml'), 50.0, 50.0, 1095, '1234567890123', true),
('SC002', 'Hydrating Serum', 'Intensive hydrating serum with hyaluronic acid', (SELECT id FROM product_categories WHERE code = 'SERUM'), 'finished_good', 'Saboo Beauty', 'Saboo Cosmetics', (SELECT id FROM units WHERE code = 'ml'), 30.0, 30.0, 730, '1234567890124', true),
('SH003', 'Moisturizing Shampoo', 'Gentle moisturizing shampoo for all hair types', (SELECT id FROM product_categories WHERE code = 'HAIRCARE'), 'finished_good', 'Saboo Beauty', 'Saboo Cosmetics', (SELECT id FROM units WHERE code = 'ml'), 250.0, 250.0, 1095, '1234567890125', true),
('BOT001', 'Glass Jar 50ml', 'Premium glass jar for face cream packaging', (SELECT id FROM product_categories WHERE code = 'PACKAGING'), 'packaging', 'Saboo Packaging', 'Saboo Packaging', (SELECT id FROM units WHERE code = 'pcs'), 0.1, 0.05, 3650, '1234567890126', true);

-- =====================================================
-- 6. 샘플 공급업체 데이터
-- =====================================================

INSERT INTO suppliers (code, name, legal_name, contact_person, email, phone, address, city, country, payment_terms, credit_limit, currency_id, rating, is_active) VALUES 
('SUP001', 'ABC Ingredients Ltd.', 'ABC Ingredients Limited', 'John Smith', 'john@abcingredients.com', '+1-555-0101', '123 Industrial Ave', 'New York', 'USA', 'Net 30', 50000.00, (SELECT id FROM currencies WHERE code = 'USD'), 4.5, true),
('SUP002', 'XYZ Chemicals Co.', 'XYZ Chemicals Company', 'Maria Garcia', 'maria@xyzchemicals.com', '+1-555-0102', '456 Chemical Blvd', 'Los Angeles', 'USA', 'Net 45', 75000.00, (SELECT id FROM currencies WHERE code = 'USD'), 4.2, true),
('SUP003', 'DEF Packaging Inc.', 'DEF Packaging Incorporated', 'David Lee', 'david@defpackaging.com', '+1-555-0103', '789 Packaging St', 'Chicago', 'USA', 'Net 15', 30000.00, (SELECT id FROM currencies WHERE code = 'USD'), 4.8, true);

-- =====================================================
-- 7. 샘플 고객 데이터
-- =====================================================

INSERT INTO customers (code, name, legal_name, contact_person, email, phone, address, city, country, customer_type, credit_limit, payment_terms, currency_id, is_active) VALUES 
('CUST001', 'Beauty Store Chain', 'Beauty Store Chain Inc.', 'Sarah Johnson', 'sarah@beautystore.com', '+1-555-0201', '100 Retail Plaza', 'Miami', 'USA', 'wholesale', 100000.00, 'Net 30', (SELECT id FROM currencies WHERE code = 'USD'), true),
('CUST002', 'Online Beauty Shop', 'Online Beauty Shop LLC', 'Michael Brown', 'michael@onlinebeauty.com', '+1-555-0202', '200 E-commerce Ave', 'Seattle', 'USA', 'retail', 25000.00, 'Net 15', (SELECT id FROM currencies WHERE code = 'USD'), true),
('CUST003', 'Distributor Plus', 'Distributor Plus Corp.', 'Lisa Wilson', 'lisa@distributorplus.com', '+1-555-0203', '300 Distribution Dr', 'Dallas', 'USA', 'distributor', 200000.00, 'Net 45', (SELECT id FROM currencies WHERE code = 'USD'), true);

-- =====================================================
-- 8. 샘플 재고 데이터
-- =====================================================

-- 샘플 재고 아이템
INSERT INTO inventory_items (product_id, warehouse_id, batch_number, lot_number, expiry_date, manufacturing_date, quantity, unit_cost, location_in_warehouse, is_active) VALUES 
-- Face Cream 재고
((SELECT id FROM products WHERE sku = 'FC001'), (SELECT id FROM warehouses WHERE code = 'WH003'), 'BATCH001', 'LOT2024001', '2025-12-31', '2024-01-15', 100.0, 25.50, 'A-01-01', true),
((SELECT id FROM products WHERE sku = 'FC001'), (SELECT id FROM warehouses WHERE code = 'WH003'), 'BATCH002', 'LOT2024002', '2025-12-31', '2024-02-15', 150.0, 25.50, 'A-01-02', true),

-- Hydrating Serum 재고
((SELECT id FROM products WHERE sku = 'SC002'), (SELECT id FROM warehouses WHERE code = 'WH003'), 'BATCH003', 'LOT2024003', '2025-06-30', '2024-01-20', 200.0, 18.75, 'A-02-01', true),

-- Shampoo 재고
((SELECT id FROM products WHERE sku = 'SH003'), (SELECT id FROM warehouses WHERE code = 'WH003'), 'BATCH004', 'LOT2024004', '2025-12-31', '2024-01-25', 300.0, 12.00, 'A-03-01', true),

-- Packaging 재고
((SELECT id FROM products WHERE sku = 'BOT001'), (SELECT id FROM warehouses WHERE code = 'WH002'), 'BATCH005', 'LOT2024005', '2026-01-31', '2024-01-10', 1000.0, 2.50, 'B-01-01', true);

-- =====================================================
-- 9. 샘플 주문 데이터
-- =====================================================

-- 샘플 구매 주문
INSERT INTO purchase_orders (po_number, supplier_id, order_date, expected_delivery_date, status, priority, total_amount, currency_id, payment_terms, created_by) VALUES 
('PO2024001', (SELECT id FROM suppliers WHERE code = 'SUP001'), '2024-01-15', '2024-01-30', 'received', 'normal', 5000.00, (SELECT id FROM currencies WHERE code = 'USD'), 'Net 30', (SELECT id FROM users WHERE email = 'admin@saboo.com'));

-- 구매 주문 상세
INSERT INTO purchase_order_items (po_id, product_id, quantity, unit_price, total_price, expected_delivery_date) VALUES 
((SELECT id FROM purchase_orders WHERE po_number = 'PO2024001'), (SELECT id FROM products WHERE sku = 'VIT_E'), 100.0, 15.00, 1500.00, '2024-01-30'),
((SELECT id FROM purchase_orders WHERE po_number = 'PO2024001'), (SELECT id FROM products WHERE sku = 'HYALURONIC'), 50.0, 25.00, 1250.00, '2024-01-30'),
((SELECT id FROM purchase_orders WHERE po_number = 'PO2024001'), (SELECT id FROM products WHERE sku = 'RETINOL'), 30.0, 75.00, 2250.00, '2024-01-30');

-- 샘플 판매 주문
INSERT INTO sales_orders (order_number, customer_id, order_date, delivery_date, status, priority, total_amount, currency_id, payment_terms, created_by) VALUES 
('SO2024001', (SELECT id FROM customers WHERE code = 'CUST001'), '2024-01-20', '2024-02-05', 'delivered', 'normal', 2500.00, (SELECT id FROM currencies WHERE code = 'USD'), 'Net 30', (SELECT id FROM users WHERE email = 'admin@saboo.com'));

-- 판매 주문 상세
INSERT INTO sales_order_items (order_id, product_id, quantity, unit_price, total_price) VALUES 
((SELECT id FROM sales_orders WHERE order_number = 'SO2024001'), (SELECT id FROM products WHERE sku = 'FC001'), 50.0, 45.00, 2250.00),
((SELECT id FROM sales_orders WHERE order_number = 'SO2024001'), (SELECT id FROM products WHERE sku = 'SC002'), 25.0, 35.00, 875.00);

-- =====================================================
-- 10. 샘플 사용자 데이터 (관리자 계정)
-- =====================================================

-- 관리자 사용자 생성 (비밀번호: admin123)
INSERT INTO users (employee_id, email, password_hash, first_name, last_name, department, position, is_active, created_by) VALUES 
('EMP001', 'admin@saboo.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'IT', 'System Administrator', true, (SELECT id FROM users WHERE email = 'admin@saboo.com'));

-- 사용자-역할 매핑
INSERT INTO user_roles (user_id, role_id, assigned_by) VALUES 
((SELECT id FROM users WHERE email = 'admin@saboo.com'), (SELECT id FROM roles WHERE name = 'admin'), (SELECT id FROM users WHERE email = 'admin@saboo.com'));

-- =====================================================
-- 11. 샘플 알림 데이터
-- =====================================================

INSERT INTO notifications (user_id, title, message, type, entity_type, entity_id, is_read) VALUES 
((SELECT id FROM users WHERE email = 'admin@saboo.com'), 'Welcome to Saboo ERP', 'Welcome to the Saboo ERP system! Your account has been successfully created.', 'info', 'system', NULL, false),
((SELECT id FROM users WHERE email = 'admin@saboo.com'), 'Low Stock Alert', 'Face Cream (FC001) is running low. Current stock: 100 units', 'warning', 'inventory', (SELECT id FROM products WHERE sku = 'FC001'), false),
((SELECT id FROM users WHERE email = 'admin@saboo.com'), 'New Order Received', 'New sales order SO2024001 has been received from Beauty Store Chain', 'success', 'sales', (SELECT id FROM sales_orders WHERE order_number = 'SO2024001'), false);
