-- =====================================================
-- 샘플 데이터 삽입 SQL
-- 화장품 제조업 ERP 시스템
-- =====================================================

-- =====================================================
-- 1. 사용자 및 권한 샘플 데이터
-- =====================================================

-- 기본 사용자 생성
INSERT INTO users (employee_id, email, password_hash, first_name, last_name, department, position, is_active) VALUES 
('EMP001', 'admin@erpsaboo.com', crypt('admin123', gen_salt('bf')), 'Admin', 'User', 'IT', 'System Administrator', true),
('EMP002', 'manager@erpsaboo.com', crypt('manager123', gen_salt('bf')), 'John', 'Manager', 'Production', 'Production Manager', true),
('EMP003', 'operator@erpsaboo.com', crypt('operator123', gen_salt('bf')), 'Jane', 'Operator', 'Production', 'Production Operator', true),
('EMP004', 'quality@erpsaboo.com', crypt('quality123', gen_salt('bf')), 'Mike', 'Quality', 'Quality Control', 'Quality Manager', true),
('EMP005', 'sales@erpsaboo.com', crypt('sales123', gen_salt('bf')), 'Sarah', 'Sales', 'Sales', 'Sales Representative', true);

-- 사용자 역할 할당
INSERT INTO user_roles (user_id, role_id, assigned_by) VALUES 
((SELECT id FROM users WHERE email = 'admin@erpsaboo.com'), (SELECT id FROM roles WHERE name = 'admin'), (SELECT id FROM users WHERE email = 'admin@erpsaboo.com')),
((SELECT id FROM users WHERE email = 'manager@erpsaboo.com'), (SELECT id FROM roles WHERE name = 'manager'), (SELECT id FROM users WHERE email = 'admin@erpsaboo.com')),
((SELECT id FROM users WHERE email = 'operator@erpsaboo.com'), (SELECT id FROM roles WHERE name = 'operator'), (SELECT id FROM users WHERE email = 'admin@erpsaboo.com')),
((SELECT id FROM users WHERE email = 'quality@erpsaboo.com'), (SELECT id FROM roles WHERE name = 'quality'), (SELECT id FROM users WHERE email = 'admin@erpsaboo.com')),
((SELECT id FROM users WHERE email = 'sales@erpsaboo.com'), (SELECT id FROM roles WHERE name = 'sales'), (SELECT id FROM users WHERE email = 'admin@erpsaboo.com'));

-- =====================================================
-- 2. 제품 샘플 데이터
-- =====================================================

-- 제품 샘플 데이터
INSERT INTO products (sku, name, description, category_id, product_type, unit_of_measure_id, weight, volume, brand, is_active) VALUES 
('SKU001', 'Anti-Aging Serum', 'Premium anti-aging serum with retinol and hyaluronic acid', (SELECT id FROM product_categories WHERE code = 'SERUM'), 'finished_good', (SELECT id FROM units WHERE code = 'ml'), 30.0, 30.0, 'Saboo Beauty', true),
('SKU002', 'Moisturizing Cream', 'Rich moisturizing cream for dry skin', (SELECT id FROM product_categories WHERE code = 'MOISTURIZER'), 'finished_good', (SELECT id FROM units WHERE code = 'g'), 50.0, 50.0, 'Saboo Beauty', true),
('SKU003', 'Cleansing Foam', 'Gentle cleansing foam for all skin types', (SELECT id FROM product_categories WHERE code = 'CLEANSER'), 'finished_good', (SELECT id FROM units WHERE code = 'ml'), 150.0, 150.0, 'Saboo Beauty', true),
('SKU004', 'Hyaluronic Acid', 'Pure hyaluronic acid powder', (SELECT id FROM product_categories WHERE code = 'RAW_MAT'), 'raw_material', (SELECT id FROM units WHERE code = 'g'), 100.0, 100.0, 'Supplier A', true),
('SKU005', 'Retinol', 'Stable retinol powder', (SELECT id FROM product_categories WHERE code = 'RAW_MAT'), 'raw_material', (SELECT id FROM units WHERE code = 'g'), 50.0, 50.0, 'Supplier B', true);

-- 원료 샘플 데이터
INSERT INTO product_ingredients (code, name, scientific_name, inci_name, cas_number, supplier, purity, unit_of_measure_id, is_hazardous) VALUES 
('ING001', 'Hyaluronic Acid', 'Hyaluronic Acid', 'Hyaluronic Acid', '9004-61-9', 'Supplier A', 99.5, (SELECT id FROM units WHERE code = 'g'), false),
('ING002', 'Retinol', 'Retinol', 'Retinol', '68-26-8', 'Supplier B', 98.0, (SELECT id FROM units WHERE code = 'g'), true),
('ING003', 'Niacinamide', 'Niacinamide', 'Niacinamide', '98-92-0', 'Supplier C', 99.0, (SELECT id FROM units WHERE code = 'g'), false),
('ING004', 'Vitamin C', 'Ascorbic Acid', 'Ascorbic Acid', '50-81-7', 'Supplier D', 99.9, (SELECT id FROM units WHERE code = 'g'), false),
('ING005', 'Glycerin', 'Glycerin', 'Glycerin', '56-81-5', 'Supplier E', 99.7, (SELECT id FROM units WHERE code = 'g'), false);

-- =====================================================
-- 3. 고객 및 공급업체 샘플 데이터
-- =====================================================

-- 고객 샘플 데이터
INSERT INTO customers (code, name, contact_person, email, phone, address, city, country, customer_type, credit_limit, is_active) VALUES 
('CUST001', 'Beauty Store Chain', 'Alice Johnson', 'alice@beautystore.com', '+1-555-0101', '123 Beauty St', 'New York', 'US', 'wholesale', 50000.00, true),
('CUST002', 'Online Retailer', 'Bob Smith', 'bob@onlineretail.com', '+1-555-0102', '456 Online Ave', 'Los Angeles', 'US', 'retail', 25000.00, true),
('CUST003', 'Distributor Asia', 'Chen Wei', 'chen@distributor.asia', '+86-21-1234-5678', '789 Distribution Rd', 'Shanghai', 'CN', 'distributor', 100000.00, true),
('CUST004', 'European Retailer', 'Marie Dubois', 'marie@euroretail.eu', '+33-1-2345-6789', '321 Retail Blvd', 'Paris', 'FR', 'retail', 30000.00, true);

-- 공급업체 샘플 데이터
INSERT INTO suppliers (code, name, contact_person, email, phone, address, city, country, payment_terms, credit_limit, is_active) VALUES 
('SUPP001', 'Ingredient Solutions Inc', 'David Kim', 'david@ingredients.com', '+1-555-0201', '100 Ingredient Way', 'New Jersey', 'US', 'Net 30', 100000.00, true),
('SUPP002', 'Packaging Plus', 'Lisa Wang', 'lisa@packaging.com', '+1-555-0202', '200 Package St', 'California', 'US', 'Net 15', 50000.00, true),
('SUPP003', 'Chemical Supply Co', 'Tom Brown', 'tom@chemical.com', '+1-555-0203', '300 Chemical Ave', 'Texas', 'US', 'Net 30', 75000.00, true),
('SUPP004', 'Equipment Solutions', 'Anna Lee', 'anna@equipment.com', '+1-555-0204', '400 Equipment Dr', 'Illinois', 'US', 'Net 45', 200000.00, true);

-- =====================================================
-- 4. 재고 샘플 데이터
-- =====================================================

-- 재고 아이템 샘플 데이터
INSERT INTO inventory_items (product_id, warehouse_id, batch_number, quantity, unit_cost, created_by) VALUES 
((SELECT id FROM products WHERE sku = 'SKU001'), (SELECT id FROM warehouses WHERE code = 'WH003'), 'BATCH001', 100.0, 25.50, (SELECT id FROM users WHERE email = 'admin@erpsaboo.com')),
((SELECT id FROM products WHERE sku = 'SKU002'), (SELECT id FROM warehouses WHERE code = 'WH003'), 'BATCH002', 150.0, 18.75, (SELECT id FROM users WHERE email = 'admin@erpsaboo.com')),
((SELECT id FROM products WHERE sku = 'SKU003'), (SELECT id FROM warehouses WHERE code = 'WH003'), 'BATCH003', 200.0, 12.30, (SELECT id FROM users WHERE email = 'admin@erpsaboo.com')),
((SELECT id FROM products WHERE sku = 'SKU004'), (SELECT id FROM warehouses WHERE code = 'WH002'), 'BATCH004', 50.0, 150.00, (SELECT id FROM users WHERE email = 'admin@erpsaboo.com')),
((SELECT id FROM products WHERE sku = 'SKU005'), (SELECT id FROM warehouses WHERE code = 'WH002'), 'BATCH005', 25.0, 300.00, (SELECT id FROM users WHERE email = 'admin@erpsaboo.com'));

-- =====================================================
-- 5. 주문 샘플 데이터
-- =====================================================

-- 구매 주문 샘플 데이터
INSERT INTO purchase_orders (po_number, supplier_id, order_date, expected_delivery_date, status, total_amount, created_by) VALUES 
('PO-2024-001', (SELECT id FROM suppliers WHERE code = 'SUPP001'), '2024-01-15', '2024-01-30', 'approved', 15000.00, (SELECT id FROM users WHERE email = 'manager@erpsaboo.com')),
('PO-2024-002', (SELECT id FROM suppliers WHERE code = 'SUPP002'), '2024-01-16', '2024-01-31', 'pending', 8500.00, (SELECT id FROM users WHERE email = 'manager@erpsaboo.com')),
('PO-2024-003', (SELECT id FROM suppliers WHERE code = 'SUPP003'), '2024-01-17', '2024-02-01', 'approved', 12000.00, (SELECT id FROM users WHERE email = 'manager@erpsaboo.com'));

-- 구매 주문 상세 샘플 데이터
INSERT INTO purchase_order_items (po_id, product_id, quantity, unit_price, total_price) VALUES 
((SELECT id FROM purchase_orders WHERE po_number = 'PO-2024-001'), (SELECT id FROM products WHERE sku = 'SKU004'), 100.0, 150.00, 15000.00),
((SELECT id FROM purchase_orders WHERE po_number = 'PO-2024-002'), (SELECT id FROM products WHERE sku = 'SKU005'), 25.0, 300.00, 7500.00),
((SELECT id FROM purchase_orders WHERE po_number = 'PO-2024-002'), (SELECT id FROM products WHERE sku = 'SKU004'), 10.0, 150.00, 1500.00),
((SELECT id FROM purchase_orders WHERE po_number = 'PO-2024-003'), (SELECT id FROM products WHERE sku = 'SKU004'), 80.0, 150.00, 12000.00);

-- 판매 주문 샘플 데이터
INSERT INTO sales_orders (order_number, customer_id, order_date, delivery_date, status, total_amount, created_by) VALUES 
('SO-2024-001', (SELECT id FROM customers WHERE code = 'CUST001'), '2024-01-20', '2024-01-25', 'confirmed', 5000.00, (SELECT id FROM users WHERE email = 'sales@erpsaboo.com')),
('SO-2024-002', (SELECT id FROM customers WHERE code = 'CUST002'), '2024-01-21', '2024-01-26', 'pending', 3200.00, (SELECT id FROM users WHERE email = 'sales@erpsaboo.com')),
('SO-2024-003', (SELECT id FROM customers WHERE code = 'CUST003'), '2024-01-22', '2024-01-27', 'confirmed', 8500.00, (SELECT id FROM users WHERE email = 'sales@erpsaboo.com'));

-- 판매 주문 상세 샘플 데이터
INSERT INTO sales_order_items (order_id, product_id, quantity, unit_price, total_price) VALUES 
((SELECT id FROM sales_orders WHERE order_number = 'SO-2024-001'), (SELECT id FROM products WHERE sku = 'SKU001'), 50.0, 50.00, 2500.00),
((SELECT id FROM sales_orders WHERE order_number = 'SO-2024-001'), (SELECT id FROM products WHERE sku = 'SKU002'), 50.0, 50.00, 2500.00),
((SELECT id FROM sales_orders WHERE order_number = 'SO-2024-002'), (SELECT id FROM products WHERE sku = 'SKU003'), 100.0, 32.00, 3200.00),
((SELECT id FROM sales_orders WHERE order_number = 'SO-2024-003'), (SELECT id FROM products WHERE sku = 'SKU001'), 100.0, 50.00, 5000.00),
((SELECT id FROM sales_orders WHERE order_number = 'SO-2024-003'), (SELECT id FROM products WHERE sku = 'SKU002'), 70.0, 50.00, 3500.00);

-- =====================================================
-- 6. 생산 샘플 데이터
-- =====================================================

-- 생산 주문 샘플 데이터
INSERT INTO production_orders (order_number, product_id, formula_id, quantity, production_line_id, planned_start_date, planned_end_date, status, created_by) VALUES 
('PROD-2024-001', (SELECT id FROM products WHERE sku = 'SKU001'), (SELECT id FROM product_formulas WHERE product_id = (SELECT id FROM products WHERE sku = 'SKU001') LIMIT 1), 100.0, (SELECT id FROM production_lines WHERE code = 'PL003'), '2024-02-01', '2024-02-03', 'planned', (SELECT id FROM users WHERE email = 'manager@erpsaboo.com')),
('PROD-2024-002', (SELECT id FROM products WHERE sku = 'SKU002'), (SELECT id FROM product_formulas WHERE product_id = (SELECT id FROM products WHERE sku = 'SKU002') LIMIT 1), 150.0, (SELECT id FROM production_lines WHERE code = 'PL001'), '2024-02-05', '2024-02-07', 'planned', (SELECT id FROM users WHERE email = 'manager@erpsaboo.com'));

-- =====================================================
-- 7. 품질 관리 샘플 데이터
-- =====================================================

-- 품질 검사 샘플 데이터
INSERT INTO quality_checks (batch_id, check_type, check_name, specification_min, specification_max, actual_value, unit_of_measure, result, inspector_id) VALUES 
((SELECT id FROM production_batches WHERE batch_number = 'BATCH001'), 'physical', 'pH Level', 5.5, 6.5, 6.0, 'pH', 'pass', (SELECT id FROM users WHERE email = 'quality@erpsaboo.com')),
((SELECT id FROM production_batches WHERE batch_number = 'BATCH001'), 'microbiological', 'Total Plate Count', 0, 1000, 50, 'CFU/g', 'pass', (SELECT id FROM users WHERE email = 'quality@erpsaboo.com')),
((SELECT id FROM production_batches WHERE batch_number = 'BATCH002'), 'physical', 'Viscosity', 2000, 3000, 2500, 'cP', 'pass', (SELECT id FROM users WHERE email = 'quality@erpsaboo.com'));

-- =====================================================
-- 8. R&D 샘플 데이터
-- =====================================================

-- R&D 프로젝트 샘플 데이터
INSERT INTO rd_projects (project_number, name, description, project_type, start_date, target_completion_date, status, budget, project_manager_id) VALUES 
('R&D-2024-001', 'Anti-Aging Innovation', 'Development of next-generation anti-aging serum', 'new_product', '2024-01-01', '2024-06-30', 'active', 50000.00, (SELECT id FROM users WHERE email = 'manager@erpsaboo.com')),
('R&D-2024-002', 'Sustainable Packaging', 'Research on eco-friendly packaging solutions', 'innovation', '2024-02-01', '2024-08-31', 'active', 30000.00, (SELECT id FROM users WHERE email = 'manager@erpsaboo.com'));

-- =====================================================
-- 9. 고객 불만 샘플 데이터
-- =====================================================

-- 고객 불만 샘플 데이터
INSERT INTO complaints (complaint_number, customer_id, product_id, complaint_date, complaint_type, severity, description, status, assigned_to, created_by) VALUES 
('COMP-2024-001', (SELECT id FROM customers WHERE code = 'CUST001'), (SELECT id FROM products WHERE sku = 'SKU001'), '2024-01-15', 'quality', 'medium', 'Product arrived with damaged packaging', 'open', (SELECT id FROM users WHERE email = 'quality@erpsaboo.com'), (SELECT id FROM users WHERE email = 'sales@erpsaboo.com')),
('COMP-2024-002', (SELECT id FROM customers WHERE code = 'CUST002'), (SELECT id FROM products WHERE sku = 'SKU002'), '2024-01-20', 'delivery', 'low', 'Late delivery by 2 days', 'resolved', (SELECT id FROM users WHERE email = 'sales@erpsaboo.com'), (SELECT id FROM users WHERE email = 'sales@erpsaboo.com'));

-- =====================================================
-- 10. 활동 로그 샘플 데이터
-- =====================================================

-- 활동 로그 샘플 데이터
INSERT INTO activity_logs (user_id, entity_type, entity_id, action, created_at) VALUES 
((SELECT id FROM users WHERE email = 'admin@erpsaboo.com'), 'users', (SELECT id FROM users WHERE email = 'manager@erpsaboo.com'), 'create', NOW()),
((SELECT id FROM users WHERE email = 'manager@erpsaboo.com'), 'products', (SELECT id FROM products WHERE sku = 'SKU001'), 'create', NOW()),
((SELECT id FROM users WHERE email = 'sales@erpsaboo.com'), 'sales_orders', (SELECT id FROM sales_orders WHERE order_number = 'SO-2024-001'), 'create', NOW()),
((SELECT id FROM users WHERE email = 'quality@erpsaboo.com'), 'quality_checks', (SELECT id FROM quality_checks WHERE check_name = 'pH Level'), 'create', NOW());

-- =====================================================
-- 11. 알림 샘플 데이터
-- =====================================================

-- 알림 샘플 데이터
INSERT INTO notifications (user_id, title, message, type, entity_type, entity_id, is_read) VALUES 
((SELECT id FROM users WHERE email = 'manager@erpsaboo.com'), 'New Purchase Order', 'Purchase order PO-2024-001 has been created', 'info', 'purchase_orders', (SELECT id FROM purchase_orders WHERE po_number = 'PO-2024-001'), false),
((SELECT id FROM users WHERE email = 'quality@erpsaboo.com'), 'Quality Check Required', 'Quality check required for batch BATCH001', 'warning', 'production_batches', (SELECT id FROM production_batches WHERE batch_number = 'BATCH001'), false),
((SELECT id FROM users WHERE email = 'sales@erpsaboo.com'), 'New Customer Complaint', 'New complaint COMP-2024-001 has been received', 'error', 'complaints', (SELECT id FROM complaints WHERE complaint_number = 'COMP-2024-001'), false);

-- =====================================================
-- 12. 첨부파일 샘플 데이터
-- =====================================================

-- 첨부파일 샘플 데이터
INSERT INTO attachments (entity_type, entity_id, file_name, original_name, file_path, file_size, mime_type, description, created_by) VALUES 
('products', (SELECT id FROM products WHERE sku = 'SKU001'), 'sku001_spec.pdf', 'Anti-Aging Serum Specification.pdf', '/uploads/products/sku001_spec.pdf', 1024000, 'application/pdf', 'Product specification document', (SELECT id FROM users WHERE email = 'admin@erpsaboo.com')),
('purchase_orders', (SELECT id FROM purchase_orders WHERE po_number = 'PO-2024-001'), 'po001_quote.pdf', 'Quote for PO-2024-001.pdf', '/uploads/purchase_orders/po001_quote.pdf', 512000, 'application/pdf', 'Supplier quote document', (SELECT id FROM users WHERE email = 'manager@erpsaboo.com')),
('complaints', (SELECT id FROM complaints WHERE complaint_number = 'COMP-2024-001'), 'comp001_photo.jpg', 'Damaged Packaging Photo.jpg', '/uploads/complaints/comp001_photo.jpg', 2048000, 'image/jpeg', 'Photo of damaged packaging', (SELECT id FROM users WHERE email = 'sales@erpsaboo.com'));

-- =====================================================
-- 13. 재무 회계 샘플 데이터
-- =====================================================

-- 분개 샘플 데이터
INSERT INTO journal_entries (entry_number, entry_date, reference_type, reference_id, description, total_debit, total_credit, status, created_by) VALUES 
('JE-2024-001', '2024-01-15', 'purchase', (SELECT id FROM purchase_orders WHERE po_number = 'PO-2024-001'), 'Purchase of raw materials', 15000.00, 15000.00, 'posted', (SELECT id FROM users WHERE email = 'admin@erpsaboo.com')),
('JE-2024-002', '2024-01-20', 'sale', (SELECT id FROM sales_orders WHERE order_number = 'SO-2024-001'), 'Sale of finished goods', 5000.00, 5000.00, 'posted', (SELECT id FROM users WHERE email = 'admin@erpsaboo.com'));

-- 분개 상세 샘플 데이터
INSERT INTO journal_entry_lines (journal_entry_id, account_id, debit_amount, credit_amount, description) VALUES 
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2024-001'), (SELECT id FROM chart_of_accounts WHERE account_code = '1300'), 15000.00, 0, 'Raw materials inventory'),
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2024-001'), (SELECT id FROM chart_of_accounts WHERE account_code = '2100'), 0, 15000.00, 'Accounts payable'),
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2024-002'), (SELECT id FROM chart_of_accounts WHERE account_code = '1200'), 5000.00, 0, 'Accounts receivable'),
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2024-002'), (SELECT id FROM chart_of_accounts WHERE account_code = '4100'), 0, 5000.00, 'Sales revenue');

-- =====================================================
-- 14. 고객 로열티 샘플 데이터
-- =====================================================

-- 고객 로열티 샘플 데이터
INSERT INTO customer_loyalty (customer_id, program_id, current_tier, total_points, available_points, lifetime_value, join_date, is_active) VALUES 
((SELECT id FROM customers WHERE code = 'CUST001'), (SELECT id FROM loyalty_programs WHERE name = 'Beauty Rewards'), 'gold', 7500.00, 5000.00, 150000.00, '2023-01-01', true),
((SELECT id FROM customers WHERE code = 'CUST002'), (SELECT id FROM loyalty_programs WHERE name = 'Beauty Rewards'), 'silver', 2500.00, 2000.00, 45000.00, '2023-06-01', true),
((SELECT id FROM customers WHERE code = 'CUST003'), (SELECT id FROM loyalty_programs WHERE name = 'Beauty Rewards'), 'platinum', 15000.00, 10000.00, 300000.00, '2022-01-01', true);

-- =====================================================
-- 15. 마케팅 캠페인 샘플 데이터
-- =====================================================

-- 마케팅 캠페인 샘플 데이터
INSERT INTO marketing_campaigns (campaign_name, description, campaign_type, target_segment_id, start_date, end_date, budget, status, created_by) VALUES 
('Spring Collection Launch', 'Promotional campaign for new spring skincare collection', 'email', (SELECT id FROM customer_segments WHERE name = 'Premium'), '2024-03-01', '2024-03-31', 10000.00, 'active', (SELECT id FROM users WHERE email = 'sales@erpsaboo.com')),
('Loyalty Program Promotion', 'Special promotion for loyalty program members', 'social_media', (SELECT id FROM customer_segments WHERE name = 'VIP'), '2024-02-15', '2024-02-28', 5000.00, 'completed', (SELECT id FROM users WHERE email = 'sales@erpsaboo.com'));

-- =====================================================
-- 완료 메시지
-- =====================================================

-- 샘플 데이터 삽입 완료
SELECT 'Sample data insertion completed successfully!' as status;
