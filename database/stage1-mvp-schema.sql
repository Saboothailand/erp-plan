-- =====================================================
-- 1단계 MVP - 핵심 운영 모듈 데이터베이스 스키마
-- 화장품 제조업 ERP 시스템
-- =====================================================

-- 확장 기능 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =====================================================
-- 1. 사용자 및 권한 관리 (RBAC 구조)
-- =====================================================

-- 역할 정의
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    is_system_role BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 권한 정의
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    display_name VARCHAR(150) NOT NULL,
    description TEXT,
    module VARCHAR(50) NOT NULL, -- 'system', 'products', 'inventory', 'sales', 'purchase', 'production', 'quality', 'rd', 'crm'
    resource VARCHAR(50) NOT NULL, -- 'users', 'products', 'orders', etc.
    action VARCHAR(50) NOT NULL, -- 'create', 'read', 'update', 'delete', 'approve', 'export'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID
);

-- 역할-권한 매핑
CREATE TABLE role_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    granted_by UUID,
    UNIQUE(role_id, permission_id)
);

-- 사용자 정보
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id VARCHAR(20) UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    phone VARCHAR(20),
    mobile VARCHAR(20),
    department VARCHAR(100),
    position VARCHAR(100),
    manager_id UUID REFERENCES users(id),
    hire_date DATE,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    password_changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 사용자-역할 매핑
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    assigned_by UUID,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(user_id, role_id)
);

-- =====================================================
-- 2. 제품 관리
-- =====================================================

-- 제품 카테고리
CREATE TABLE product_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES product_categories(id),
    level INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 제품 기본 정보
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    category_id UUID REFERENCES product_categories(id),
    product_type VARCHAR(50) NOT NULL, -- 'finished_good', 'raw_material', 'packaging', 'semi_finished'
    brand VARCHAR(100),
    manufacturer VARCHAR(100),
    origin_country VARCHAR(3), -- ISO country code
    unit_of_measure_id UUID, -- references units table
    weight DECIMAL(10,3),
    volume DECIMAL(10,3),
    dimensions VARCHAR(100), -- LxWxH
    color VARCHAR(50),
    size VARCHAR(50),
    barcode VARCHAR(100),
    is_hazardous BOOLEAN DEFAULT false,
    requires_cold_storage BOOLEAN DEFAULT false,
    min_temperature DECIMAL(5,2),
    max_temperature DECIMAL(5,2),
    shelf_life_days INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 원료 정보
CREATE TABLE product_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255),
    inci_name VARCHAR(255),
    cas_number VARCHAR(50),
    einECS_number VARCHAR(50),
    supplier VARCHAR(255),
    purity DECIMAL(5,2),
    unit_of_measure_id UUID,
    molecular_weight DECIMAL(10,3),
    is_hazardous BOOLEAN DEFAULT false,
    hazard_classification VARCHAR(100),
    storage_conditions TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 제품 포뮬러
CREATE TABLE product_formulas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    version VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    total_weight DECIMAL(10,3),
    total_percentage DECIMAL(5,2) DEFAULT 100.00,
    is_active BOOLEAN DEFAULT true,
    approved_at TIMESTAMP WITH TIME ZONE,
    approved_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    UNIQUE(product_id, version)
);

-- 포뮬러 원료 구성
CREATE TABLE formula_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    formula_id UUID NOT NULL REFERENCES product_formulas(id) ON DELETE CASCADE,
    ingredient_id UUID NOT NULL REFERENCES product_ingredients(id),
    percentage DECIMAL(5,2) NOT NULL,
    weight DECIMAL(10,3),
    phase VARCHAR(50), -- 'oil', 'water', 'emulsifier', 'preservative', 'fragrance', 'color'
    step_order INTEGER DEFAULT 1,
    temperature DECIMAL(5,2),
    mixing_time INTEGER, -- minutes
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID
);

-- 제품 변형 (색상, 크기, 향 등)
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_type VARCHAR(50) NOT NULL, -- 'color', 'size', 'fragrance', 'packaging'
    variant_value VARCHAR(100) NOT NULL,
    sku VARCHAR(100),
    additional_cost DECIMAL(10,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    UNIQUE(product_id, variant_type, variant_value)
);

-- =====================================================
-- 3. 재고 관리
-- =====================================================

-- 창고 정보
CREATE TABLE warehouses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(3),
    postal_code VARCHAR(20),
    capacity DECIMAL(10,2),
    temperature_controlled BOOLEAN DEFAULT false,
    min_temperature DECIMAL(5,2),
    max_temperature DECIMAL(5,2),
    humidity_controlled BOOLEAN DEFAULT false,
    min_humidity DECIMAL(5,2),
    max_humidity DECIMAL(5,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 재고 아이템
CREATE TABLE inventory_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id),
    warehouse_id UUID NOT NULL REFERENCES warehouses(id),
    batch_number VARCHAR(100),
    lot_number VARCHAR(100),
    serial_number VARCHAR(100),
    expiry_date DATE,
    manufacturing_date DATE,
    quantity DECIMAL(10,3) NOT NULL DEFAULT 0,
    reserved_quantity DECIMAL(10,3) DEFAULT 0,
    available_quantity DECIMAL(10,3) GENERATED ALWAYS AS (quantity - reserved_quantity) STORED,
    unit_cost DECIMAL(10,2),
    total_value DECIMAL(12,2) GENERATED ALWAYS AS (quantity * unit_cost) STORED,
    location_in_warehouse VARCHAR(100),
    bin_location VARCHAR(50),
    is_quarantined BOOLEAN DEFAULT false,
    quarantine_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 재고 이동 내역
CREATE TABLE inventory_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID NOT NULL REFERENCES inventory_items(id),
    transaction_type VARCHAR(50) NOT NULL, -- 'in', 'out', 'adjustment', 'transfer', 'quarantine', 'release'
    quantity DECIMAL(10,3) NOT NULL,
    unit_cost DECIMAL(10,2),
    total_cost DECIMAL(12,2),
    reference_type VARCHAR(50), -- 'purchase', 'sale', 'production', 'adjustment', 'transfer'
    reference_id UUID,
    from_warehouse_id UUID REFERENCES warehouses(id),
    to_warehouse_id UUID REFERENCES warehouses(id),
    notes TEXT,
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 재고 조정
CREATE TABLE inventory_adjustments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    adjustment_number VARCHAR(50) NOT NULL UNIQUE,
    warehouse_id UUID NOT NULL REFERENCES warehouses(id),
    adjustment_type VARCHAR(50) NOT NULL, -- 'physical_count', 'damage', 'loss', 'theft', 'expiry'
    reason TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    total_adjustment_value DECIMAL(12,2),
    approved_at TIMESTAMP WITH TIME ZONE,
    approved_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 재고 조정 상세
CREATE TABLE inventory_adjustment_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    adjustment_id UUID NOT NULL REFERENCES inventory_adjustments(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    batch_number VARCHAR(100),
    expected_quantity DECIMAL(10,3),
    actual_quantity DECIMAL(10,3),
    adjustment_quantity DECIMAL(10,3) GENERATED ALWAYS AS (actual_quantity - expected_quantity) STORED,
    unit_cost DECIMAL(10,2),
    adjustment_value DECIMAL(12,2) GENERATED ALWAYS AS (adjustment_quantity * unit_cost) STORED,
    notes TEXT
);

-- =====================================================
-- 4. 구매 관리
-- =====================================================

-- 공급업체
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    contact_person VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    mobile VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(3),
    postal_code VARCHAR(20),
    tax_id VARCHAR(50),
    registration_number VARCHAR(50),
    payment_terms VARCHAR(100),
    credit_limit DECIMAL(12,2),
    currency_id UUID, -- references currencies table
    rating DECIMAL(3,2), -- 1.00 to 5.00
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 구매 주문
CREATE TABLE purchase_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    po_number VARCHAR(50) NOT NULL UNIQUE,
    supplier_id UUID NOT NULL REFERENCES suppliers(id),
    order_date DATE NOT NULL,
    expected_delivery_date DATE,
    actual_delivery_date DATE,
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'pending', 'approved', 'sent', 'partially_received', 'received', 'cancelled'
    priority VARCHAR(20) DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
    total_amount DECIMAL(12,2),
    currency_id UUID,
    payment_terms VARCHAR(100),
    shipping_address TEXT,
    notes TEXT,
    created_by UUID NOT NULL,
    approved_by UUID,
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- 구매 주문 상세
CREATE TABLE purchase_order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    po_id UUID NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity DECIMAL(10,3) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    received_quantity DECIMAL(10,3) DEFAULT 0,
    remaining_quantity DECIMAL(10,3) GENERATED ALWAYS AS (quantity - received_quantity) STORED,
    expected_delivery_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 입고 내역
CREATE TABLE receipts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    receipt_number VARCHAR(50) NOT NULL UNIQUE,
    po_id UUID REFERENCES purchase_orders(id),
    supplier_id UUID NOT NULL REFERENCES suppliers(id),
    receipt_date DATE NOT NULL,
    warehouse_id UUID NOT NULL REFERENCES warehouses(id),
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'received', 'inspected', 'accepted', 'rejected'
    total_amount DECIMAL(12,2),
    notes TEXT,
    received_by UUID,
    inspected_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 입고 상세
CREATE TABLE receipt_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    receipt_id UUID NOT NULL REFERENCES receipts(id) ON DELETE CASCADE,
    po_item_id UUID REFERENCES purchase_order_items(id),
    product_id UUID NOT NULL REFERENCES products(id),
    batch_number VARCHAR(100),
    lot_number VARCHAR(100),
    quantity DECIMAL(10,3) NOT NULL,
    unit_price DECIMAL(10,2),
    total_price DECIMAL(12,2),
    expiry_date DATE,
    manufacturing_date DATE,
    quality_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'passed', 'failed', 'quarantine'
    notes TEXT
);

-- 공급업체 계약
CREATE TABLE supplier_contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    supplier_id UUID NOT NULL REFERENCES suppliers(id),
    contract_number VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'active', -- 'draft', 'active', 'expired', 'terminated'
    terms_and_conditions TEXT,
    payment_terms VARCHAR(100),
    delivery_terms VARCHAR(100),
    quality_requirements TEXT,
    file_path VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- =====================================================
-- 5. 판매 관리
-- =====================================================

-- 고객
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    contact_person VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    mobile VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(3),
    postal_code VARCHAR(20),
    tax_id VARCHAR(50),
    customer_type VARCHAR(50) DEFAULT 'retail', -- 'retail', 'wholesale', 'distributor', 'b2b'
    credit_limit DECIMAL(12,2),
    payment_terms VARCHAR(100),
    currency_id UUID,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 판매 주문
CREATE TABLE sales_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id UUID NOT NULL REFERENCES customers(id),
    order_date DATE NOT NULL,
    delivery_date DATE,
    actual_delivery_date DATE,
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'
    priority VARCHAR(20) DEFAULT 'normal',
    total_amount DECIMAL(12,2),
    currency_id UUID,
    payment_terms VARCHAR(100),
    shipping_address TEXT,
    billing_address TEXT,
    notes TEXT,
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- 판매 주문 상세
CREATE TABLE sales_order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES sales_orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity DECIMAL(10,3) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    shipped_quantity DECIMAL(10,3) DEFAULT 0,
    remaining_quantity DECIMAL(10,3) GENERATED ALWAYS AS (quantity - shipped_quantity) STORED,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 송장
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    order_id UUID REFERENCES sales_orders(id),
    customer_id UUID NOT NULL REFERENCES customers(id),
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'sent', 'paid', 'overdue', 'cancelled'
    subtotal DECIMAL(12,2) NOT NULL,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL,
    currency_id UUID,
    payment_terms VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 결제 내역
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_number VARCHAR(50) NOT NULL UNIQUE,
    invoice_id UUID REFERENCES invoices(id),
    customer_id UUID NOT NULL REFERENCES customers(id),
    payment_date DATE NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    currency_id UUID,
    payment_method VARCHAR(50) NOT NULL, -- 'cash', 'check', 'bank_transfer', 'credit_card', 'other'
    reference_number VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'cancelled'
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- =====================================================
-- 6. 공통 테이블
-- =====================================================

-- 첨부파일
CREATE TABLE attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL, -- 'product', 'order', 'customer', 'supplier', etc.
    entity_id UUID NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID NOT NULL
);

-- 단위
CREATE TABLE units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    unit_type VARCHAR(50) NOT NULL, -- 'weight', 'volume', 'length', 'area', 'count'
    base_unit_id UUID REFERENCES units(id),
    conversion_factor DECIMAL(15,6) DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 통화
CREATE TABLE currencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(3) NOT NULL UNIQUE, -- ISO 4217
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    decimal_places INTEGER DEFAULT 2,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 세금 코드
CREATE TABLE tax_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    tax_rate DECIMAL(5,4) NOT NULL, -- 0.0000 to 1.0000
    tax_type VARCHAR(50) NOT NULL, -- 'sales_tax', 'vat', 'gst', 'excise', 'customs'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 알림
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'info', 'warning', 'error', 'success'
    entity_type VARCHAR(50),
    entity_id UUID,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 활동 로그
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete', 'view', 'export'
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 인덱스 생성
-- =====================================================

-- 사용자 관련 인덱스
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_employee_id ON users(employee_id);
CREATE INDEX idx_users_department ON users(department);
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role_id ON user_roles(role_id);

-- 제품 관련 인덱스
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_type ON products(product_type);
CREATE INDEX idx_product_ingredients_code ON product_ingredients(code);
CREATE INDEX idx_formula_ingredients_formula ON formula_ingredients(formula_id);
CREATE INDEX idx_formula_ingredients_ingredient ON formula_ingredients(ingredient_id);

-- 재고 관련 인덱스
CREATE INDEX idx_inventory_items_product ON inventory_items(product_id);
CREATE INDEX idx_inventory_items_warehouse ON inventory_items(warehouse_id);
CREATE INDEX idx_inventory_items_batch ON inventory_items(batch_number);
CREATE INDEX idx_inventory_transactions_item ON inventory_transactions(item_id);
CREATE INDEX idx_inventory_transactions_type ON inventory_transactions(transaction_type);
CREATE INDEX idx_inventory_transactions_date ON inventory_transactions(transaction_date);

-- 구매 관련 인덱스
CREATE INDEX idx_suppliers_code ON suppliers(code);
CREATE INDEX idx_purchase_orders_supplier ON purchase_orders(supplier_id);
CREATE INDEX idx_purchase_orders_status ON purchase_orders(status);
CREATE INDEX idx_purchase_orders_date ON purchase_orders(order_date);
CREATE INDEX idx_purchase_order_items_po ON purchase_order_items(po_id);
CREATE INDEX idx_receipts_supplier ON receipts(supplier_id);
CREATE INDEX idx_receipts_warehouse ON receipts(warehouse_id);

-- 판매 관련 인덱스
CREATE INDEX idx_customers_code ON customers(code);
CREATE INDEX idx_sales_orders_customer ON sales_orders(customer_id);
CREATE INDEX idx_sales_orders_status ON sales_orders(status);
CREATE INDEX idx_sales_orders_date ON sales_orders(order_date);
CREATE INDEX idx_sales_order_items_order ON sales_order_items(order_id);
CREATE INDEX idx_invoices_customer ON invoices(customer_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_payments_customer ON payments(customer_id);

-- 공통 테이블 인덱스
CREATE INDEX idx_attachments_entity ON attachments(entity_type, entity_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read);
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);

-- =====================================================
-- 기본 데이터 삽입
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

-- 기본 창고
INSERT INTO warehouses (code, name, description, capacity, temperature_controlled, is_active) VALUES 
('WH001', 'Main Warehouse', 'Primary storage facility', 10000.00, false, true),
('WH002', 'Raw Materials', 'Raw materials storage', 5000.00, false, true),
('WH003', 'Finished Goods', 'Finished products storage', 8000.00, false, true),
('WH004', 'Cold Storage', 'Temperature controlled storage', 2000.00, true, true),
('WH005', 'Quarantine', 'Quarantine area', 500.00, false, true);

-- 기본 제품 카테고리
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
-- 제약조건 추가
-- =====================================================

-- 사용자 테이블 제약조건
ALTER TABLE users ADD CONSTRAINT chk_users_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
ALTER TABLE users ADD CONSTRAINT chk_users_phone_format CHECK (phone ~* '^\+?[1-9]\d{1,14}$' OR phone IS NULL);
ALTER TABLE users ADD CONSTRAINT chk_users_failed_attempts CHECK (failed_login_attempts >= 0);

-- 제품 테이블 제약조건
ALTER TABLE products ADD CONSTRAINT chk_products_weight CHECK (weight >= 0);
ALTER TABLE products ADD CONSTRAINT chk_products_volume CHECK (volume >= 0);
ALTER TABLE products ADD CONSTRAINT chk_products_shelf_life CHECK (shelf_life_days > 0);

-- 재고 테이블 제약조건
ALTER TABLE inventory_items ADD CONSTRAINT chk_inventory_quantity CHECK (quantity >= 0);
ALTER TABLE inventory_items ADD CONSTRAINT chk_inventory_reserved CHECK (reserved_quantity >= 0);
ALTER TABLE inventory_items ADD CONSTRAINT chk_inventory_unit_cost CHECK (unit_cost >= 0);

-- 구매/판매 주문 제약조건
ALTER TABLE purchase_order_items ADD CONSTRAINT chk_po_quantity CHECK (quantity > 0);
ALTER TABLE purchase_order_items ADD CONSTRAINT chk_po_unit_price CHECK (unit_price >= 0);
ALTER TABLE sales_order_items ADD CONSTRAINT chk_so_quantity CHECK (quantity > 0);
ALTER TABLE sales_order_items ADD CONSTRAINT chk_so_unit_price CHECK (unit_price >= 0);

-- 포뮬러 제약조건
ALTER TABLE formula_ingredients ADD CONSTRAINT chk_formula_percentage CHECK (percentage >= 0 AND percentage <= 100);
ALTER TABLE formula_ingredients ADD CONSTRAINT chk_formula_weight CHECK (weight >= 0);

-- 통화 제약조건
ALTER TABLE currencies ADD CONSTRAINT chk_currencies_code_length CHECK (char_length(code) = 3);
ALTER TABLE currencies ADD CONSTRAINT chk_currencies_decimal_places CHECK (decimal_places >= 0 AND decimal_places <= 4);

-- 세금 코드 제약조건
ALTER TABLE tax_codes ADD CONSTRAINT chk_tax_rate CHECK (tax_rate >= 0 AND tax_rate <= 1);

-- =====================================================
-- 뷰 생성
-- =====================================================

-- 재고 현황 뷰
CREATE VIEW v_inventory_summary AS
SELECT 
    p.sku,
    p.name as product_name,
    pc.name as category_name,
    w.name as warehouse_name,
    SUM(ii.quantity) as total_quantity,
    SUM(ii.reserved_quantity) as total_reserved,
    SUM(ii.available_quantity) as total_available,
    AVG(ii.unit_cost) as avg_unit_cost,
    SUM(ii.total_value) as total_value
FROM inventory_items ii
JOIN products p ON ii.product_id = p.id
JOIN product_categories pc ON p.category_id = pc.id
JOIN warehouses w ON ii.warehouse_id = w.id
WHERE ii.quantity > 0
GROUP BY p.sku, p.name, pc.name, w.name, w.id
ORDER BY p.sku, w.name;

-- 주문 현황 뷰
CREATE VIEW v_order_summary AS
SELECT 
    'purchase' as order_type,
    po.po_number as order_number,
    s.name as partner_name,
    po.order_date,
    po.status,
    po.total_amount,
    po.currency_id
FROM purchase_orders po
JOIN suppliers s ON po.supplier_id = s.id
UNION ALL
SELECT 
    'sales' as order_type,
    so.order_number,
    c.name as partner_name,
    so.order_date,
    so.status,
    so.total_amount,
    so.currency_id
FROM sales_orders so
JOIN customers c ON so.customer_id = c.id
ORDER BY order_date DESC;

-- =====================================================
-- 함수 생성
-- =====================================================

-- 재고 수량 업데이트 함수
CREATE OR REPLACE FUNCTION update_inventory_quantity()
RETURNS TRIGGER AS $$
BEGIN
    -- 재고 수량 업데이트
    UPDATE inventory_items 
    SET 
        quantity = quantity + NEW.quantity,
        updated_at = NOW(),
        updated_by = NEW.created_by
    WHERE id = NEW.item_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 재고 트랜잭션 트리거
CREATE TRIGGER tr_inventory_transaction
    AFTER INSERT ON inventory_transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_inventory_quantity();

-- 사용자 업데이트 시간 트리거
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 주요 테이블에 업데이트 시간 트리거 적용
CREATE TRIGGER tr_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_inventory_items_updated_at BEFORE UPDATE ON inventory_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_purchase_orders_updated_at BEFORE UPDATE ON purchase_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_sales_orders_updated_at BEFORE UPDATE ON sales_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();

