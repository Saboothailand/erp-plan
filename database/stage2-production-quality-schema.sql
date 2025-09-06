-- =====================================================
-- 2단계 - 생산 및 품질 관리 모듈 데이터베이스 스키마
-- 화장품 제조업 ERP 시스템
-- =====================================================

-- =====================================================
-- 1. 생산 관리
-- =====================================================

-- 생산 라인
CREATE TABLE production_lines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    capacity_per_hour DECIMAL(10,2),
    setup_time_minutes INTEGER DEFAULT 0,
    cleanup_time_minutes INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 생산 주문
CREATE TABLE production_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) NOT NULL UNIQUE,
    product_id UUID NOT NULL REFERENCES products(id),
    formula_id UUID NOT NULL REFERENCES product_formulas(id),
    quantity DECIMAL(10,3) NOT NULL,
    production_line_id UUID REFERENCES production_lines(id),
    priority VARCHAR(20) DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
    planned_start_date TIMESTAMP WITH TIME ZONE,
    planned_end_date TIMESTAMP WITH TIME ZONE,
    actual_start_date TIMESTAMP WITH TIME ZONE,
    actual_end_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'planned', -- 'planned', 'approved', 'in_progress', 'completed', 'cancelled', 'on_hold'
    actual_yield DECIMAL(10,3),
    expected_yield DECIMAL(10,3),
    yield_percentage DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE WHEN expected_yield > 0 THEN (actual_yield / expected_yield) * 100 ELSE 0 END
    ) STORED,
    notes TEXT,
    created_by UUID NOT NULL,
    approved_by UUID,
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- 생산 배치
CREATE TABLE production_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_number VARCHAR(100) NOT NULL UNIQUE,
    production_order_id UUID NOT NULL REFERENCES production_orders(id),
    formula_id UUID NOT NULL REFERENCES product_formulas(id),
    batch_size DECIMAL(10,3) NOT NULL,
    actual_yield DECIMAL(10,3),
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER GENERATED ALWAYS AS (
        CASE WHEN start_time IS NOT NULL AND end_time IS NOT NULL 
             THEN EXTRACT(EPOCH FROM (end_time - start_time)) / 60 
             ELSE NULL END
    ) STORED,
    status VARCHAR(50) DEFAULT 'in_progress', -- 'in_progress', 'completed', 'failed', 'cancelled'
    quality_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'passed', 'failed', 'quarantine', 'rework'
    temperature DECIMAL(5,2),
    humidity DECIMAL(5,2),
    ph_level DECIMAL(4,2),
    viscosity DECIMAL(8,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 생산 기록
CREATE TABLE production_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id UUID NOT NULL REFERENCES production_batches(id),
    record_type VARCHAR(50) NOT NULL, -- 'start', 'checkpoint', 'parameter', 'issue', 'completion'
    record_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    parameter_name VARCHAR(100),
    parameter_value DECIMAL(10,3),
    parameter_unit VARCHAR(20),
    operator_id UUID REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 품질 검사
CREATE TABLE quality_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id UUID NOT NULL REFERENCES production_batches(id),
    check_type VARCHAR(50) NOT NULL, -- 'visual', 'physical', 'chemical', 'microbiological', 'sensory'
    check_name VARCHAR(100) NOT NULL,
    specification_min DECIMAL(10,3),
    specification_max DECIMAL(10,3),
    actual_value DECIMAL(10,3),
    unit_of_measure VARCHAR(20),
    result VARCHAR(20) NOT NULL, -- 'pass', 'fail', 'conditional'
    inspector_id UUID REFERENCES users(id),
    check_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. GMP 22716 준수
-- =====================================================

-- GMP 문서
CREATE TABLE gmp_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_number VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    document_type VARCHAR(50) NOT NULL, -- 'sop', 'policy', 'procedure', 'form', 'specification', 'protocol'
    category VARCHAR(50) NOT NULL, -- 'production', 'quality', 'cleaning', 'maintenance', 'training'
    version VARCHAR(20) NOT NULL,
    effective_date DATE NOT NULL,
    expiry_date DATE,
    review_frequency_months INTEGER DEFAULT 12,
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'review', 'approved', 'obsolete', 'superseded'
    file_path VARCHAR(500),
    file_size INTEGER,
    mime_type VARCHAR(100),
    is_confidential BOOLEAN DEFAULT false,
    created_by UUID NOT NULL,
    reviewed_by UUID,
    approved_by UUID,
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- 배치 기록
CREATE TABLE batch_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_number VARCHAR(100) NOT NULL UNIQUE,
    product_id UUID NOT NULL REFERENCES products(id),
    production_batch_id UUID REFERENCES production_batches(id),
    formula_id UUID NOT NULL REFERENCES product_formulas(id),
    batch_size DECIMAL(10,3) NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    actual_yield DECIMAL(10,3),
    expected_yield DECIMAL(10,3),
    yield_percentage DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE WHEN expected_yield > 0 THEN (actual_yield / expected_yield) * 100 ELSE 0 END
    ) STORED,
    quality_checks JSONB,
    deviations JSONB,
    environmental_conditions JSONB, -- temperature, humidity, pressure
    equipment_used JSONB,
    materials_used JSONB,
    status VARCHAR(50) DEFAULT 'in_progress', -- 'in_progress', 'completed', 'reviewed', 'approved'
    created_by UUID NOT NULL,
    reviewed_by UUID,
    approved_by UUID,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- 품질 기준
CREATE TABLE quality_standards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    standard_number VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL, -- 'internal', 'external', 'regulatory', 'customer'
    standard_type VARCHAR(50) NOT NULL, -- 'specification', 'test_method', 'sampling_plan', 'acceptance_criteria'
    version VARCHAR(20) NOT NULL,
    effective_date DATE NOT NULL,
    expiry_date DATE,
    is_mandatory BOOLEAN DEFAULT false,
    applicable_products JSONB, -- product IDs or categories
    test_parameters JSONB,
    acceptance_criteria JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 준수 검사
CREATE TABLE compliance_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    check_number VARCHAR(100) NOT NULL UNIQUE,
    check_type VARCHAR(50) NOT NULL, -- 'routine', 'audit', 'investigation', 'customer_complaint'
    standard_id UUID REFERENCES quality_standards(id),
    product_id UUID REFERENCES products(id),
    batch_id UUID REFERENCES production_batches(id),
    check_date DATE NOT NULL,
    inspector_id UUID NOT NULL REFERENCES users(id),
    findings JSONB,
    non_conformities JSONB,
    corrective_actions JSONB,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'follow_up_required'
    due_date DATE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- 시정 조치
CREATE TABLE corrective_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action_number VARCHAR(100) NOT NULL UNIQUE,
    compliance_check_id UUID REFERENCES compliance_checks(id),
    non_conformity_id UUID, -- references non_conformities table
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    root_cause TEXT,
    action_type VARCHAR(50) NOT NULL, -- 'immediate', 'corrective', 'preventive'
    priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
    assigned_to UUID REFERENCES users(id),
    due_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'open', -- 'open', 'in_progress', 'completed', 'overdue', 'cancelled'
    completion_date DATE,
    effectiveness_review_date DATE,
    effectiveness_review_result VARCHAR(50), -- 'effective', 'partially_effective', 'ineffective'
    cost DECIMAL(10,2),
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- =====================================================
-- 3. ISO 9001 품질 관리
-- =====================================================

-- 감사 기록
CREATE TABLE audit_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_number VARCHAR(100) NOT NULL UNIQUE,
    audit_type VARCHAR(50) NOT NULL, -- 'internal', 'external', 'supplier', 'customer', 'regulatory'
    audit_scope TEXT NOT NULL,
    audit_criteria TEXT NOT NULL,
    audit_date DATE NOT NULL,
    auditor_name VARCHAR(255) NOT NULL,
    auditor_organization VARCHAR(255),
    auditee_department VARCHAR(100),
    findings JSONB,
    observations JSONB,
    recommendations JSONB,
    strengths JSONB,
    opportunities_for_improvement JSONB,
    status VARCHAR(50) DEFAULT 'planned', -- 'planned', 'in_progress', 'completed', 'follow_up_required'
    follow_up_date DATE,
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- 부적합 사항
CREATE TABLE non_conformities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nc_number VARCHAR(100) NOT NULL UNIQUE,
    audit_record_id UUID REFERENCES audit_records(id),
    compliance_check_id UUID REFERENCES compliance_checks(id),
    customer_complaint_id UUID, -- references complaints table
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'product', 'process', 'system', 'supplier'
    severity VARCHAR(20) NOT NULL, -- 'minor', 'major', 'critical'
    root_cause TEXT,
    impact_assessment TEXT,
    immediate_action TEXT,
    corrective_action_id UUID REFERENCES corrective_actions(id),
    preventive_action_id UUID REFERENCES corrective_actions(id),
    status VARCHAR(50) DEFAULT 'open', -- 'open', 'investigating', 'action_plan', 'implementing', 'completed', 'closed'
    due_date DATE,
    completion_date DATE,
    effectiveness_review_date DATE,
    cost DECIMAL(10,2),
    created_by UUID NOT NULL,
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- 예방 조치
CREATE TABLE preventive_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action_number VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    risk_assessment TEXT,
    action_type VARCHAR(50) NOT NULL, -- 'process_improvement', 'training', 'equipment_upgrade', 'procedure_update'
    priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
    assigned_to UUID REFERENCES users(id),
    due_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'open', -- 'open', 'in_progress', 'completed', 'cancelled'
    completion_date DATE,
    effectiveness_review_date DATE,
    cost DECIMAL(10,2),
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- 경영 검토
CREATE TABLE management_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_number VARCHAR(100) NOT NULL UNIQUE,
    review_date DATE NOT NULL,
    review_period_start DATE NOT NULL,
    review_period_end DATE NOT NULL,
    attendees JSONB, -- list of attendees
    agenda_items JSONB,
    quality_objectives_review JSONB,
    customer_satisfaction JSONB,
    process_performance JSONB,
    product_conformity JSONB,
    supplier_performance JSONB,
    audit_results JSONB,
    corrective_actions_review JSONB,
    resource_adequacy JSONB,
    risks_and_opportunities JSONB,
    improvement_opportunities JSONB,
    decisions JSONB,
    action_items JSONB,
    next_review_date DATE,
    status VARCHAR(50) DEFAULT 'scheduled', -- 'scheduled', 'in_progress', 'completed', 'cancelled'
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- =====================================================
-- 4. 역물류 관리
-- =====================================================

-- 반품 관리
CREATE TABLE returns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    return_number VARCHAR(100) NOT NULL UNIQUE,
    customer_id UUID NOT NULL REFERENCES customers(id),
    sales_order_id UUID REFERENCES sales_orders(id),
    invoice_id UUID REFERENCES invoices(id),
    return_date DATE NOT NULL,
    reason VARCHAR(100) NOT NULL, -- 'defective', 'wrong_item', 'customer_request', 'expired', 'damaged_shipping'
    reason_description TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'received', 'processed', 'completed'
    total_amount DECIMAL(12,2),
    refund_amount DECIMAL(12,2),
    restocking_fee DECIMAL(10,2) DEFAULT 0,
    return_shipping_cost DECIMAL(10,2),
    notes TEXT,
    created_by UUID NOT NULL,
    processed_by UUID REFERENCES users(id),
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- 반품 상세
CREATE TABLE return_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    return_id UUID NOT NULL REFERENCES returns(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity DECIMAL(10,3) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    condition VARCHAR(50) NOT NULL, -- 'new', 'used', 'damaged', 'defective'
    reason VARCHAR(100),
    disposition VARCHAR(50) DEFAULT 'pending', -- 'pending', 'restock', 'refurbish', 'dispose', 'return_to_supplier'
    notes TEXT
);

-- 고객 불만
CREATE TABLE complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_number VARCHAR(100) NOT NULL UNIQUE,
    customer_id UUID NOT NULL REFERENCES customers(id),
    product_id UUID REFERENCES products(id),
    batch_id UUID REFERENCES production_batches(id),
    complaint_date DATE NOT NULL,
    complaint_type VARCHAR(50) NOT NULL, -- 'quality', 'delivery', 'service', 'safety', 'packaging'
    severity VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
    description TEXT NOT NULL,
    customer_expectation TEXT,
    impact_assessment TEXT,
    status VARCHAR(50) DEFAULT 'open', -- 'open', 'investigating', 'resolved', 'closed', 'escalated'
    assigned_to UUID REFERENCES users(id),
    investigation_notes TEXT,
    root_cause TEXT,
    corrective_action_id UUID REFERENCES corrective_actions(id),
    resolution TEXT,
    customer_satisfaction_rating INTEGER CHECK (customer_satisfaction_rating >= 1 AND customer_satisfaction_rating <= 5),
    resolution_date DATE,
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- 환불
CREATE TABLE refunds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    refund_number VARCHAR(100) NOT NULL UNIQUE,
    return_id UUID REFERENCES returns(id),
    complaint_id UUID REFERENCES complaints(id),
    customer_id UUID NOT NULL REFERENCES customers(id),
    refund_date DATE NOT NULL,
    refund_amount DECIMAL(12,2) NOT NULL,
    currency_id UUID,
    refund_method VARCHAR(50) NOT NULL, -- 'credit_card', 'bank_transfer', 'check', 'store_credit'
    reference_number VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processed', 'completed', 'failed', 'cancelled'
    processed_by UUID REFERENCES users(id),
    processed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 보증 청구
CREATE TABLE warranty_claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_number VARCHAR(100) NOT NULL UNIQUE,
    customer_id UUID NOT NULL REFERENCES customers(id),
    product_id UUID NOT NULL REFERENCES products(id),
    batch_id UUID REFERENCES production_batches(id),
    claim_date DATE NOT NULL,
    issue_description TEXT NOT NULL,
    warranty_type VARCHAR(50) NOT NULL, -- 'manufacturing_defect', 'material_defect', 'workmanship'
    warranty_period_months INTEGER,
    purchase_date DATE,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'repaired', 'replaced', 'refunded'
    investigation_notes TEXT,
    resolution TEXT,
    resolution_date DATE,
    cost DECIMAL(10,2),
    assigned_to UUID REFERENCES users(id),
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- 폐기 기록
CREATE TABLE disposal_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    disposal_number VARCHAR(100) NOT NULL UNIQUE,
    product_id UUID NOT NULL REFERENCES products(id),
    batch_id UUID REFERENCES production_batches(id),
    disposal_date DATE NOT NULL,
    disposal_type VARCHAR(50) NOT NULL, -- 'expired', 'damaged', 'defective', 'recall', 'waste'
    quantity DECIMAL(10,3) NOT NULL,
    unit_of_measure VARCHAR(20),
    disposal_method VARCHAR(50) NOT NULL, -- 'landfill', 'incineration', 'recycling', 'return_to_supplier'
    disposal_facility VARCHAR(255),
    disposal_certificate VARCHAR(100),
    cost DECIMAL(10,2),
    environmental_impact TEXT,
    compliance_notes TEXT,
    approved_by UUID REFERENCES users(id),
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. 배치/로트 추적성
-- =====================================================

-- 배치 계보
CREATE TABLE batch_genealogy (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_batch_id UUID REFERENCES production_batches(id),
    child_batch_id UUID REFERENCES production_batches(id),
    relationship_type VARCHAR(50) NOT NULL, -- 'split', 'merge', 'rework', 'blend'
    quantity_used DECIMAL(10,3),
    quantity_produced DECIMAL(10,3),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID
);

-- 로트 추적
CREATE TABLE lot_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lot_number VARCHAR(100) NOT NULL,
    product_id UUID NOT NULL REFERENCES products(id),
    batch_id UUID REFERENCES production_batches(id),
    supplier_id UUID REFERENCES suppliers(id),
    manufacturing_date DATE,
    expiry_date DATE,
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'quarantined', 'recalled', 'disposed'
    current_location VARCHAR(100),
    quantity_remaining DECIMAL(10,3),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 유통기한 관리
CREATE TABLE expiry_management (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id),
    lot_number VARCHAR(100) NOT NULL,
    expiry_date DATE NOT NULL,
    days_to_expiry INTEGER GENERATED ALWAYS AS (expiry_date - CURRENT_DATE) STORED,
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'expiring_soon', 'expired', 'disposed'
    alert_sent BOOLEAN DEFAULT false,
    disposal_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 로트 번호
CREATE TABLE lot_numbers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lot_number VARCHAR(100) NOT NULL UNIQUE,
    product_id UUID NOT NULL REFERENCES products(id),
    batch_id UUID REFERENCES production_batches(id),
    supplier_id UUID REFERENCES suppliers(id),
    manufacturing_date DATE,
    expiry_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID
);

-- 시리얼 번호
CREATE TABLE serial_numbers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    serial_number VARCHAR(100) NOT NULL UNIQUE,
    product_id UUID NOT NULL REFERENCES products(id),
    lot_number VARCHAR(100),
    batch_id UUID REFERENCES production_batches(id),
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'sold', 'returned', 'defective', 'disposed'
    customer_id UUID REFERENCES customers(id),
    sale_date DATE,
    warranty_start_date DATE,
    warranty_end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- =====================================================
-- 인덱스 생성
-- =====================================================

-- 생산 관련 인덱스
CREATE INDEX idx_production_orders_product ON production_orders(product_id);
CREATE INDEX idx_production_orders_status ON production_orders(status);
CREATE INDEX idx_production_orders_dates ON production_orders(planned_start_date, planned_end_date);
CREATE INDEX idx_production_batches_order ON production_batches(production_order_id);
CREATE INDEX idx_production_batches_number ON production_batches(batch_number);
CREATE INDEX idx_production_records_batch ON production_records(batch_id);
CREATE INDEX idx_quality_checks_batch ON quality_checks(batch_id);

-- GMP 관련 인덱스
CREATE INDEX idx_gmp_documents_type ON gmp_documents(document_type);
CREATE INDEX idx_gmp_documents_status ON gmp_documents(status);
CREATE INDEX idx_batch_records_number ON batch_records(batch_number);
CREATE INDEX idx_batch_records_product ON batch_records(product_id);
CREATE INDEX idx_compliance_checks_type ON compliance_checks(check_type);
CREATE INDEX idx_corrective_actions_status ON corrective_actions(status);

-- ISO 9001 관련 인덱스
CREATE INDEX idx_audit_records_type ON audit_records(audit_type);
CREATE INDEX idx_audit_records_date ON audit_records(audit_date);
CREATE INDEX idx_non_conformities_status ON non_conformities(status);
CREATE INDEX idx_non_conformities_severity ON non_conformities(severity);
CREATE INDEX idx_preventive_actions_status ON preventive_actions(status);
CREATE INDEX idx_management_reviews_date ON management_reviews(review_date);

-- 역물류 관련 인덱스
CREATE INDEX idx_returns_customer ON returns(customer_id);
CREATE INDEX idx_returns_status ON returns(status);
CREATE INDEX idx_complaints_customer ON complaints(customer_id);
CREATE INDEX idx_complaints_type ON complaints(complaint_type);
CREATE INDEX idx_complaints_severity ON complaints(severity);
CREATE INDEX idx_refunds_customer ON refunds(customer_id);
CREATE INDEX idx_warranty_claims_customer ON warranty_claims(customer_id);
CREATE INDEX idx_disposal_records_product ON disposal_records(product_id);

-- 추적성 관련 인덱스
CREATE INDEX idx_lot_tracking_lot ON lot_tracking(lot_number);
CREATE INDEX idx_lot_tracking_product ON lot_tracking(product_id);
CREATE INDEX idx_expiry_management_expiry ON expiry_management(expiry_date);
CREATE INDEX idx_expiry_management_status ON expiry_management(status);
CREATE INDEX idx_serial_numbers_product ON serial_numbers(product_id);
CREATE INDEX idx_serial_numbers_status ON serial_numbers(status);

-- =====================================================
-- 제약조건 추가
-- =====================================================

-- 생산 주문 제약조건
ALTER TABLE production_orders ADD CONSTRAINT chk_production_quantity CHECK (quantity > 0);
ALTER TABLE production_orders ADD CONSTRAINT chk_production_yield CHECK (actual_yield >= 0);
ALTER TABLE production_orders ADD CONSTRAINT chk_production_dates CHECK (planned_end_date >= planned_start_date);

-- 품질 검사 제약조건
ALTER TABLE quality_checks ADD CONSTRAINT chk_quality_spec_range CHECK (
    (specification_min IS NULL AND specification_max IS NULL) OR
    (specification_min IS NOT NULL AND specification_max IS NOT NULL AND specification_max >= specification_min)
);

-- 배치 기록 제약조건
ALTER TABLE batch_records ADD CONSTRAINT chk_batch_size CHECK (batch_size > 0);
ALTER TABLE batch_records ADD CONSTRAINT chk_batch_yield CHECK (actual_yield >= 0);

-- 반품 제약조건
ALTER TABLE return_items ADD CONSTRAINT chk_return_quantity CHECK (quantity > 0);
ALTER TABLE return_items ADD CONSTRAINT chk_return_price CHECK (unit_price >= 0);

-- 불만 제약조건
ALTER TABLE complaints ADD CONSTRAINT chk_complaint_rating CHECK (
    customer_satisfaction_rating IS NULL OR 
    (customer_satisfaction_rating >= 1 AND customer_satisfaction_rating <= 5)
);

-- =====================================================
-- 뷰 생성
-- =====================================================

-- 생산 현황 뷰
CREATE VIEW v_production_summary AS
SELECT 
    po.order_number,
    p.name as product_name,
    pl.name as production_line,
    po.planned_start_date,
    po.planned_end_date,
    po.actual_start_date,
    po.actual_end_date,
    po.status,
    po.quantity as planned_quantity,
    po.actual_yield,
    po.yield_percentage,
    CASE 
        WHEN po.actual_end_date IS NOT NULL THEN 
            EXTRACT(EPOCH FROM (po.actual_end_date - po.actual_start_date)) / 3600
        ELSE NULL 
    END as actual_hours
FROM production_orders po
JOIN products p ON po.product_id = p.id
LEFT JOIN production_lines pl ON po.production_line_id = pl.id
ORDER BY po.planned_start_date DESC;

-- 품질 현황 뷰
CREATE VIEW v_quality_summary AS
SELECT 
    qc.batch_id,
    pb.batch_number,
    p.name as product_name,
    qc.check_type,
    qc.check_name,
    qc.result,
    qc.check_date,
    u.first_name || ' ' || u.last_name as inspector_name
FROM quality_checks qc
JOIN production_batches pb ON qc.batch_id = pb.id
JOIN products p ON pb.production_order_id IN (
    SELECT id FROM production_orders WHERE product_id = p.id
)
LEFT JOIN users u ON qc.inspector_id = u.id
ORDER BY qc.check_date DESC;

-- 불만 현황 뷰
CREATE VIEW v_complaints_summary AS
SELECT 
    c.complaint_number,
    c.complaint_date,
    cust.name as customer_name,
    p.name as product_name,
    c.complaint_type,
    c.severity,
    c.status,
    u.first_name || ' ' || u.last_name as assigned_to_name,
    c.resolution_date
FROM complaints c
JOIN customers cust ON c.customer_id = cust.id
LEFT JOIN products p ON c.product_id = p.id
LEFT JOIN users u ON c.assigned_to = u.id
ORDER BY c.complaint_date DESC;

-- =====================================================
-- 함수 생성
-- =====================================================

-- 배치 상태 업데이트 함수
CREATE OR REPLACE FUNCTION update_batch_status()
RETURNS TRIGGER AS $$
BEGIN
    -- 품질 검사 결과에 따라 배치 상태 업데이트
    IF NEW.result = 'fail' THEN
        UPDATE production_batches 
        SET quality_status = 'failed'
        WHERE id = NEW.batch_id;
    ELSIF NEW.result = 'pass' AND OLD.result = 'fail' THEN
        UPDATE production_batches 
        SET quality_status = 'passed'
        WHERE id = NEW.batch_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 품질 검사 트리거
CREATE TRIGGER tr_quality_check_status
    AFTER INSERT OR UPDATE ON quality_checks
    FOR EACH ROW
    EXECUTE FUNCTION update_batch_status();

-- 유통기한 알림 함수
CREATE OR REPLACE FUNCTION check_expiry_alerts()
RETURNS void AS $$
BEGIN
    -- 30일 이내 만료 예정 제품 알림
    UPDATE expiry_management 
    SET status = 'expiring_soon', alert_sent = true
    WHERE days_to_expiry <= 30 
    AND days_to_expiry > 0 
    AND status = 'active'
    AND alert_sent = false;
    
    -- 만료된 제품 상태 업데이트
    UPDATE expiry_management 
    SET status = 'expired'
    WHERE days_to_expiry <= 0 
    AND status = 'active';
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 기본 데이터 삽입
-- =====================================================

-- 기본 생산 라인
INSERT INTO production_lines (code, name, description, capacity_per_hour, setup_time_minutes, cleanup_time_minutes) VALUES 
('PL001', 'Cream Production Line', 'Main cream production line', 100.00, 30, 20),
('PL002', 'Lotion Production Line', 'Lotion and emulsion production', 150.00, 25, 15),
('PL003', 'Serum Production Line', 'Serum and essence production', 80.00, 20, 10),
('PL004', 'Packaging Line', 'Filling and packaging line', 200.00, 15, 10),
('PL005', 'R&D Pilot Line', 'Small batch R&D production', 20.00, 60, 30);

-- 기본 GMP 문서 유형
INSERT INTO gmp_documents (document_number, title, document_type, category, version, effective_date, status, created_by) VALUES 
('SOP-001', 'Cleaning and Sanitization Procedure', 'sop', 'cleaning', '1.0', CURRENT_DATE, 'approved', (SELECT id FROM users LIMIT 1)),
('SOP-002', 'Batch Record Documentation', 'sop', 'production', '1.0', CURRENT_DATE, 'approved', (SELECT id FROM users LIMIT 1)),
('POL-001', 'Quality Policy', 'policy', 'quality', '1.0', CURRENT_DATE, 'approved', (SELECT id FROM users LIMIT 1)),
('PROC-001', 'Raw Material Receipt and Inspection', 'procedure', 'quality', '1.0', CURRENT_DATE, 'approved', (SELECT id FROM users LIMIT 1));

-- 기본 품질 기준
INSERT INTO quality_standards (standard_number, title, description, category, standard_type, version, effective_date, is_mandatory) VALUES 
('QS-001', 'Product Specification Standard', 'General product quality specifications', 'internal', 'specification', '1.0', CURRENT_DATE, true),
('QS-002', 'Microbiological Testing Method', 'Standard microbiological testing procedures', 'internal', 'test_method', '1.0', CURRENT_DATE, true),
('QS-003', 'Physical Properties Testing', 'Physical properties testing procedures', 'internal', 'test_method', '1.0', CURRENT_DATE, true),
('QS-004', 'Sensory Evaluation Protocol', 'Sensory evaluation procedures', 'internal', 'protocol', '1.0', CURRENT_DATE, false);
