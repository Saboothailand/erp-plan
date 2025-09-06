-- =====================================================
-- 3단계 - 고도화 모듈 데이터베이스 스키마
-- 화장품 제조업 ERP 시스템
-- =====================================================

-- =====================================================
-- 1. R&D 관리
-- =====================================================

-- R&D 프로젝트
CREATE TABLE rd_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_number VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    objective TEXT,
    project_type VARCHAR(50) NOT NULL, -- 'new_product', 'formula_improvement', 'cost_reduction', 'regulatory', 'innovation'
    priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
    start_date DATE,
    target_completion_date DATE,
    actual_completion_date DATE,
    status VARCHAR(50) DEFAULT 'planning', -- 'planning', 'active', 'on_hold', 'completed', 'cancelled', 'suspended'
    budget DECIMAL(12,2),
    actual_cost DECIMAL(12,2) DEFAULT 0,
    project_manager_id UUID REFERENCES users(id),
    team_members JSONB, -- array of user IDs
    success_criteria JSONB,
    risks_and_mitigation JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 포뮬러 버전
CREATE TABLE formula_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES rd_projects(id),
    product_id UUID REFERENCES products(id),
    version_number VARCHAR(20) NOT NULL,
    version_name VARCHAR(255) NOT NULL,
    description TEXT,
    formula_data JSONB, -- detailed formula composition
    target_specifications JSONB,
    cost_analysis JSONB,
    stability_data JSONB,
    efficacy_data JSONB,
    safety_data JSONB,
    regulatory_status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'testing', 'approved', 'rejected'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    UNIQUE(product_id, version_number)
);

-- 테스트 결과
CREATE TABLE test_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES rd_projects(id),
    formula_version_id UUID REFERENCES formula_versions(id),
    test_name VARCHAR(255) NOT NULL,
    test_type VARCHAR(50) NOT NULL, -- 'stability', 'efficacy', 'safety', 'microbiological', 'sensory', 'physical'
    test_method VARCHAR(100),
    test_standard VARCHAR(100),
    test_date DATE NOT NULL,
    test_conditions JSONB, -- temperature, humidity, etc.
    results JSONB,
    conclusion TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'failed'
    pass_criteria JSONB,
    actual_results JSONB,
    deviation_notes TEXT,
    tester_id UUID REFERENCES users(id),
    reviewer_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- 규제 승인
CREATE TABLE regulatory_approvals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES rd_projects(id),
    product_id UUID REFERENCES products(id),
    country_code VARCHAR(3) NOT NULL, -- ISO country code
    regulatory_body VARCHAR(100) NOT NULL, -- 'FDA', 'EMA', 'Health Canada', etc.
    approval_type VARCHAR(50) NOT NULL, -- 'cosmetic_notification', 'drug_approval', 'medical_device', 'food_supplement'
    application_number VARCHAR(100),
    submission_date DATE,
    approval_date DATE,
    expiry_date DATE,
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'submitted', 'under_review', 'approved', 'rejected', 'withdrawn'
    requirements JSONB,
    documents JSONB, -- list of submitted documents
    fees_paid DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 혁신 아이디어
CREATE TABLE innovation_ideas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    idea_number VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'product', 'process', 'technology', 'marketing', 'packaging'
    priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
    feasibility_score INTEGER CHECK (feasibility_score >= 1 AND feasibility_score <= 5),
    market_potential_score INTEGER CHECK (market_potential_score >= 1 AND market_potential_score <= 5),
    cost_benefit_score INTEGER CHECK (cost_benefit_score >= 1 AND cost_benefit_score <= 5),
    total_score DECIMAL(3,2) GENERATED ALWAYS AS (
        (feasibility_score + market_potential_score + cost_benefit_score) / 3.0
    ) STORED,
    status VARCHAR(50) DEFAULT 'submitted', -- 'submitted', 'under_review', 'approved', 'rejected', 'implemented'
    estimated_cost DECIMAL(12,2),
    estimated_timeline_months INTEGER,
    assigned_to UUID REFERENCES users(id),
    project_id UUID REFERENCES rd_projects(id),
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- =====================================================
-- 2. 규제 관리
-- =====================================================

-- 규제 요구사항
CREATE TABLE regulatory_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_code VARCHAR(3) NOT NULL,
    regulatory_body VARCHAR(100) NOT NULL,
    requirement_type VARCHAR(50) NOT NULL, -- 'ingredient_restriction', 'labeling', 'testing', 'documentation', 'notification'
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    effective_date DATE NOT NULL,
    expiry_date DATE,
    applicable_products JSONB, -- product categories or specific products
    requirements JSONB, -- detailed requirements
    penalties JSONB, -- non-compliance penalties
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 국가별 등록
CREATE TABLE country_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id),
    country_code VARCHAR(3) NOT NULL,
    registration_number VARCHAR(100),
    registration_type VARCHAR(50) NOT NULL, -- 'cosmetic_notification', 'drug_approval', 'medical_device'
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'suspended', 'expired'
    submission_date DATE,
    approval_date DATE,
    expiry_date DATE,
    renewal_date DATE,
    responsible_person VARCHAR(255),
    local_agent VARCHAR(255),
    fees_paid DECIMAL(10,2),
    documents JSONB,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    UNIQUE(product_id, country_code)
);

-- 원료 제한
CREATE TABLE ingredient_restrictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ingredient_id UUID NOT NULL REFERENCES product_ingredients(id),
    country_code VARCHAR(3) NOT NULL,
    restriction_type VARCHAR(50) NOT NULL, -- 'prohibited', 'restricted', 'limited_concentration', 'special_conditions'
    max_concentration DECIMAL(5,4), -- maximum allowed concentration
    concentration_unit VARCHAR(20),
    special_conditions TEXT,
    effective_date DATE NOT NULL,
    expiry_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 라벨링 요구사항
CREATE TABLE labeling_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_code VARCHAR(3) NOT NULL,
    product_type VARCHAR(50) NOT NULL,
    requirement_type VARCHAR(50) NOT NULL, -- 'mandatory', 'optional', 'prohibited'
    element_name VARCHAR(100) NOT NULL, -- 'ingredient_list', 'warnings', 'directions', 'net_weight'
    description TEXT NOT NULL,
    specifications JSONB, -- detailed specifications
    position_requirements JSONB, -- where on the label
    font_requirements JSONB, -- size, style, color
    effective_date DATE NOT NULL,
    expiry_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- MSDS 기록
CREATE TABLE msds_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ingredient_id UUID NOT NULL REFERENCES product_ingredients(id),
    supplier_id UUID REFERENCES suppliers(id),
    msds_number VARCHAR(100) NOT NULL,
    version VARCHAR(20) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    language VARCHAR(10) DEFAULT 'en',
    is_current BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- FDA 등록
CREATE TABLE fda_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    facility_id VARCHAR(100) NOT NULL,
    facility_name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) NOT NULL UNIQUE,
    registration_type VARCHAR(50) NOT NULL, -- 'cosmetic_facility', 'drug_establishment', 'medical_device'
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'inactive', 'suspended', 'cancelled'
    registration_date DATE NOT NULL,
    expiry_date DATE,
    renewal_date DATE,
    contact_person VARCHAR(255),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    products JSONB, -- list of registered products
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- =====================================================
-- 3. 공급망 관리
-- =====================================================

-- 공급업체 인증
CREATE TABLE supplier_certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    supplier_id UUID NOT NULL REFERENCES suppliers(id),
    certification_type VARCHAR(50) NOT NULL, -- 'iso_9001', 'iso_14001', 'ohsas_18001', 'halal', 'kosher', 'organic'
    certification_body VARCHAR(100) NOT NULL,
    certificate_number VARCHAR(100) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'expired', 'suspended', 'cancelled'
    scope TEXT,
    file_path VARCHAR(500),
    audit_frequency_months INTEGER DEFAULT 12,
    last_audit_date DATE,
    next_audit_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 배송 추적
CREATE TABLE shipping_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tracking_number VARCHAR(100) NOT NULL UNIQUE,
    order_id UUID, -- can reference purchase_orders or sales_orders
    order_type VARCHAR(20) NOT NULL, -- 'purchase', 'sales'
    carrier VARCHAR(100) NOT NULL,
    service_type VARCHAR(50),
    origin_address TEXT,
    destination_address TEXT,
    shipped_date DATE,
    estimated_delivery_date DATE,
    actual_delivery_date DATE,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'exception'
    current_location VARCHAR(255),
    tracking_events JSONB, -- array of tracking events
    special_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 통관 서류
CREATE TABLE customs_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shipment_id UUID REFERENCES shipping_tracking(id),
    document_type VARCHAR(50) NOT NULL, -- 'commercial_invoice', 'packing_list', 'certificate_of_origin', 'bill_of_lading'
    document_number VARCHAR(100) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    language VARCHAR(10) DEFAULT 'en',
    is_required BOOLEAN DEFAULT true,
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'submitted', 'approved', 'rejected'
    customs_office VARCHAR(100),
    customs_reference VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- =====================================================
-- 4. 고객 관계 관리 (CRM)
-- =====================================================

-- 고객 세분화
CREATE TABLE customer_segments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    criteria JSONB, -- segmentation criteria
    color_code VARCHAR(7), -- hex color code
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 고객 세그먼트 할당
CREATE TABLE customer_segment_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id),
    segment_id UUID NOT NULL REFERENCES customer_segments(id),
    assigned_date DATE NOT NULL,
    assigned_by UUID REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(customer_id, segment_id)
);

-- 로열티 프로그램
CREATE TABLE loyalty_programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    tier_structure JSONB, -- bronze, silver, gold, platinum
    benefits JSONB, -- benefits for each tier
    points_per_currency DECIMAL(8,4) DEFAULT 1.0,
    redemption_rules JSONB,
    is_active BOOLEAN DEFAULT true,
    start_date DATE NOT NULL,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 고객 로열티
CREATE TABLE customer_loyalty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id),
    program_id UUID NOT NULL REFERENCES loyalty_programs(id),
    current_tier VARCHAR(50) NOT NULL,
    total_points DECIMAL(12,2) DEFAULT 0,
    available_points DECIMAL(12,2) DEFAULT 0,
    lifetime_value DECIMAL(12,2) DEFAULT 0,
    join_date DATE NOT NULL,
    last_activity_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID,
    UNIQUE(customer_id, program_id)
);

-- 포인트 거래
CREATE TABLE loyalty_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_loyalty_id UUID NOT NULL REFERENCES customer_loyalty(id),
    transaction_type VARCHAR(50) NOT NULL, -- 'earn', 'redeem', 'expire', 'adjustment'
    points DECIMAL(12,2) NOT NULL,
    description TEXT,
    reference_type VARCHAR(50), -- 'purchase', 'referral', 'bonus', 'redemption'
    reference_id UUID,
    expiry_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID
);

-- 마케팅 캠페인
CREATE TABLE marketing_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_name VARCHAR(255) NOT NULL,
    description TEXT,
    campaign_type VARCHAR(50) NOT NULL, -- 'email', 'sms', 'social_media', 'direct_mail', 'promotion'
    target_segment_id UUID REFERENCES customer_segments(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    budget DECIMAL(12,2),
    actual_cost DECIMAL(12,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'planned', -- 'planned', 'active', 'paused', 'completed', 'cancelled'
    objectives JSONB,
    content JSONB,
    metrics JSONB, -- open_rate, click_rate, conversion_rate, etc.
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID
);

-- 캠페인 참여
CREATE TABLE campaign_participations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES marketing_campaigns(id),
    customer_id UUID NOT NULL REFERENCES customers(id),
    participation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    response_type VARCHAR(50), -- 'opened', 'clicked', 'converted', 'unsubscribed'
    response_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. 재무 회계
-- =====================================================

-- 계정과목
CREATE TABLE chart_of_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_code VARCHAR(20) NOT NULL UNIQUE,
    account_name VARCHAR(255) NOT NULL,
    account_type VARCHAR(50) NOT NULL, -- 'asset', 'liability', 'equity', 'revenue', 'expense'
    parent_account_id UUID REFERENCES chart_of_accounts(id),
    level INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 분개
CREATE TABLE journal_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entry_number VARCHAR(50) NOT NULL UNIQUE,
    entry_date DATE NOT NULL,
    reference_type VARCHAR(50), -- 'purchase', 'sale', 'production', 'adjustment'
    reference_id UUID,
    description TEXT NOT NULL,
    total_debit DECIMAL(15,2) NOT NULL,
    total_credit DECIMAL(15,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'posted', 'reversed'
    posted_at TIMESTAMP WITH TIME ZONE,
    posted_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    CHECK (total_debit = total_credit)
);

-- 분개 상세
CREATE TABLE journal_entry_lines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    journal_entry_id UUID NOT NULL REFERENCES journal_entries(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES chart_of_accounts(id),
    debit_amount DECIMAL(15,2) DEFAULT 0,
    credit_amount DECIMAL(15,2) DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CHECK ((debit_amount > 0 AND credit_amount = 0) OR (debit_amount = 0 AND credit_amount > 0))
);

-- 원장
CREATE TABLE general_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES chart_of_accounts(id),
    entry_date DATE NOT NULL,
    journal_entry_id UUID REFERENCES journal_entries(id),
    reference_type VARCHAR(50),
    reference_id UUID,
    description TEXT,
    debit_amount DECIMAL(15,2) DEFAULT 0,
    credit_amount DECIMAL(15,2) DEFAULT 0,
    running_balance DECIMAL(15,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 인덱스 생성
-- =====================================================

-- R&D 관련 인덱스
CREATE INDEX idx_rd_projects_status ON rd_projects(status);
CREATE INDEX idx_rd_projects_manager ON rd_projects(project_manager_id);
CREATE INDEX idx_formula_versions_project ON formula_versions(project_id);
CREATE INDEX idx_formula_versions_product ON formula_versions(product_id);
CREATE INDEX idx_test_results_project ON test_results(project_id);
CREATE INDEX idx_test_results_type ON test_results(test_type);
CREATE INDEX idx_regulatory_approvals_country ON regulatory_approvals(country_code);
CREATE INDEX idx_innovation_ideas_status ON innovation_ideas(status);
CREATE INDEX idx_innovation_ideas_score ON innovation_ideas(total_score);

-- 규제 관리 관련 인덱스
CREATE INDEX idx_regulatory_requirements_country ON regulatory_requirements(country_code);
CREATE INDEX idx_regulatory_requirements_type ON regulatory_requirements(requirement_type);
CREATE INDEX idx_country_registrations_product ON country_registrations(product_id);
CREATE INDEX idx_country_registrations_country ON country_registrations(country_code);
CREATE INDEX idx_ingredient_restrictions_ingredient ON ingredient_restrictions(ingredient_id);
CREATE INDEX idx_ingredient_restrictions_country ON ingredient_restrictions(country_code);
CREATE INDEX idx_labeling_requirements_country ON labeling_requirements(country_code);
CREATE INDEX idx_msds_records_ingredient ON msds_records(ingredient_id);
CREATE INDEX idx_fda_registrations_facility ON fda_registrations(facility_id);

-- 공급망 관리 관련 인덱스
CREATE INDEX idx_supplier_certifications_supplier ON supplier_certifications(supplier_id);
CREATE INDEX idx_supplier_certifications_type ON supplier_certifications(certification_type);
CREATE INDEX idx_shipping_tracking_number ON shipping_tracking(tracking_number);
CREATE INDEX idx_shipping_tracking_status ON shipping_tracking(status);
CREATE INDEX idx_customs_documents_shipment ON customs_documents(shipment_id);
CREATE INDEX idx_customs_documents_type ON customs_documents(document_type);

-- CRM 관련 인덱스
CREATE INDEX idx_customer_segment_assignments_customer ON customer_segment_assignments(customer_id);
CREATE INDEX idx_customer_segment_assignments_segment ON customer_segment_assignments(segment_id);
CREATE INDEX idx_customer_loyalty_customer ON customer_loyalty(customer_id);
CREATE INDEX idx_customer_loyalty_program ON customer_loyalty(program_id);
CREATE INDEX idx_loyalty_transactions_customer ON loyalty_transactions(customer_loyalty_id);
CREATE INDEX idx_marketing_campaigns_segment ON marketing_campaigns(target_segment_id);
CREATE INDEX idx_marketing_campaigns_status ON marketing_campaigns(status);
CREATE INDEX idx_campaign_participations_campaign ON campaign_participations(campaign_id);
CREATE INDEX idx_campaign_participations_customer ON campaign_participations(customer_id);

-- 재무 회계 관련 인덱스
CREATE INDEX idx_chart_of_accounts_type ON chart_of_accounts(account_type);
CREATE INDEX idx_chart_of_accounts_parent ON chart_of_accounts(parent_account_id);
CREATE INDEX idx_journal_entries_date ON journal_entries(entry_date);
CREATE INDEX idx_journal_entries_status ON journal_entries(status);
CREATE INDEX idx_journal_entry_lines_account ON journal_entry_lines(account_id);
CREATE INDEX idx_general_ledger_account ON general_ledger(account_id);
CREATE INDEX idx_general_ledger_date ON general_ledger(entry_date);

-- =====================================================
-- 제약조건 추가
-- =====================================================

-- R&D 프로젝트 제약조건
ALTER TABLE rd_projects ADD CONSTRAINT chk_rd_budget CHECK (budget >= 0);
ALTER TABLE rd_projects ADD CONSTRAINT chk_rd_actual_cost CHECK (actual_cost >= 0);
ALTER TABLE rd_projects ADD CONSTRAINT chk_rd_dates CHECK (target_completion_date >= start_date);

-- 테스트 결과 제약조건
ALTER TABLE test_results ADD CONSTRAINT chk_test_scores CHECK (
    feasibility_score IS NULL OR (feasibility_score >= 1 AND feasibility_score <= 5)
);
ALTER TABLE test_results ADD CONSTRAINT chk_test_scores2 CHECK (
    market_potential_score IS NULL OR (market_potential_score >= 1 AND market_potential_score <= 5)
);
ALTER TABLE test_results ADD CONSTRAINT chk_test_scores3 CHECK (
    cost_benefit_score IS NULL OR (cost_benefit_score >= 1 AND cost_benefit_score <= 5)
);

-- 로열티 제약조건
ALTER TABLE customer_loyalty ADD CONSTRAINT chk_loyalty_points CHECK (total_points >= 0);
ALTER TABLE customer_loyalty ADD CONSTRAINT chk_loyalty_available_points CHECK (available_points >= 0);
ALTER TABLE loyalty_transactions ADD CONSTRAINT chk_transaction_points CHECK (points != 0);

-- 재무 회계 제약조건
ALTER TABLE journal_entries ADD CONSTRAINT chk_journal_totals CHECK (total_debit = total_credit);
ALTER TABLE journal_entry_lines ADD CONSTRAINT chk_line_amounts CHECK (
    (debit_amount > 0 AND credit_amount = 0) OR (debit_amount = 0 AND credit_amount > 0)
);

-- =====================================================
-- 뷰 생성
-- =====================================================

-- R&D 프로젝트 현황 뷰
CREATE VIEW v_rd_projects_summary AS
SELECT 
    rp.project_number,
    rp.name as project_name,
    rp.project_type,
    rp.status,
    rp.start_date,
    rp.target_completion_date,
    rp.actual_completion_date,
    rp.budget,
    rp.actual_cost,
    u.first_name || ' ' || u.last_name as project_manager,
    CASE 
        WHEN rp.actual_completion_date IS NOT NULL THEN 
            rp.actual_completion_date - rp.start_date
        ELSE 
            CURRENT_DATE - rp.start_date
    END as project_duration_days
FROM rd_projects rp
LEFT JOIN users u ON rp.project_manager_id = u.id
ORDER BY rp.start_date DESC;

-- 고객 로열티 현황 뷰
CREATE VIEW v_customer_loyalty_summary AS
SELECT 
    c.name as customer_name,
    c.customer_type,
    cs.name as segment_name,
    lp.name as program_name,
    cl.current_tier,
    cl.total_points,
    cl.available_points,
    cl.lifetime_value,
    cl.join_date,
    cl.last_activity_date
FROM customer_loyalty cl
JOIN customers c ON cl.customer_id = c.id
JOIN loyalty_programs lp ON cl.program_id = lp.id
LEFT JOIN customer_segment_assignments csa ON c.id = csa.customer_id
LEFT JOIN customer_segments cs ON csa.segment_id = cs.id
WHERE cl.is_active = true
ORDER BY cl.lifetime_value DESC;

-- 재무 현황 뷰
CREATE VIEW v_financial_summary AS
SELECT 
    coa.account_code,
    coa.account_name,
    coa.account_type,
    SUM(gl.debit_amount) as total_debits,
    SUM(gl.credit_amount) as total_credits,
    MAX(gl.running_balance) as current_balance
FROM chart_of_accounts coa
LEFT JOIN general_ledger gl ON coa.id = gl.account_id
WHERE coa.is_active = true
GROUP BY coa.id, coa.account_code, coa.account_name, coa.account_type
ORDER BY coa.account_code;

-- =====================================================
-- 함수 생성
-- =====================================================

-- 로열티 포인트 계산 함수
CREATE OR REPLACE FUNCTION calculate_loyalty_points(
    customer_id UUID,
    program_id UUID,
    transaction_amount DECIMAL(12,2)
)
RETURNS DECIMAL(12,2) AS $$
DECLARE
    points_per_currency DECIMAL(8,4);
    calculated_points DECIMAL(12,2);
BEGIN
    -- 포인트 비율 가져오기
    SELECT lp.points_per_currency INTO points_per_currency
    FROM loyalty_programs lp
    WHERE lp.id = program_id AND lp.is_active = true;
    
    -- 포인트 계산
    calculated_points := transaction_amount * points_per_currency;
    
    RETURN calculated_points;
END;
$$ LANGUAGE plpgsql;

-- 계정 잔액 업데이트 함수
CREATE OR REPLACE FUNCTION update_account_balance()
RETURNS TRIGGER AS $$
DECLARE
    current_balance DECIMAL(15,2);
BEGIN
    -- 현재 잔액 계산
    SELECT COALESCE(SUM(
        CASE 
            WHEN account_id = NEW.account_id THEN 
                CASE 
                    WHEN debit_amount > 0 THEN debit_amount
                    ELSE -credit_amount
                END
            ELSE 0
        END
    ), 0) INTO current_balance
    FROM general_ledger
    WHERE account_id = NEW.account_id
    AND entry_date <= NEW.entry_date;
    
    -- 잔액 업데이트
    NEW.running_balance := current_balance;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 원장 트리거
CREATE TRIGGER tr_general_ledger_balance
    BEFORE INSERT ON general_ledger
    FOR EACH ROW
    EXECUTE FUNCTION update_account_balance();

-- =====================================================
-- 기본 데이터 삽입
-- =====================================================

-- 기본 계정과목
INSERT INTO chart_of_accounts (account_code, account_name, account_type, level) VALUES 
-- 자산
('1000', 'Current Assets', 'asset', 0),
('1100', 'Cash and Cash Equivalents', 'asset', 1),
('1200', 'Accounts Receivable', 'asset', 1),
('1300', 'Inventory', 'asset', 1),
('1400', 'Prepaid Expenses', 'asset', 1),
('1500', 'Fixed Assets', 'asset', 1),
('1600', 'Accumulated Depreciation', 'asset', 1),

-- 부채
('2000', 'Current Liabilities', 'liability', 0),
('2100', 'Accounts Payable', 'liability', 1),
('2200', 'Accrued Expenses', 'liability', 1),
('2300', 'Short-term Debt', 'liability', 1),

-- 자본
('3000', 'Equity', 'equity', 0),
('3100', 'Share Capital', 'equity', 1),
('3200', 'Retained Earnings', 'equity', 1),

-- 수익
('4000', 'Revenue', 'revenue', 0),
('4100', 'Sales Revenue', 'revenue', 1),
('4200', 'Service Revenue', 'revenue', 1),

-- 비용
('5000', 'Cost of Goods Sold', 'expense', 0),
('5100', 'Raw Materials', 'expense', 1),
('5200', 'Direct Labor', 'expense', 1),
('5300', 'Manufacturing Overhead', 'expense', 1),
('6000', 'Operating Expenses', 'expense', 0),
('6100', 'Selling Expenses', 'expense', 1),
('6200', 'Administrative Expenses', 'expense', 1);

-- 기본 고객 세그먼트
INSERT INTO customer_segments (name, description, color_code) VALUES 
('VIP', 'High-value customers with premium products', '#FFD700'),
('Premium', 'Regular customers with high purchase frequency', '#C0C0C0'),
('Standard', 'Regular customers with average spending', '#CD7F32'),
('New', 'New customers requiring attention', '#32CD32'),
('At Risk', 'Customers with declining engagement', '#FF6B6B');

-- 기본 로열티 프로그램
INSERT INTO loyalty_programs (name, description, tier_structure, benefits, points_per_currency, start_date) VALUES 
('Beauty Rewards', 'Cosmetic customer loyalty program', 
 '{"bronze": {"min_points": 0, "max_points": 999}, "silver": {"min_points": 1000, "max_points": 4999}, "gold": {"min_points": 5000, "max_points": 9999}, "platinum": {"min_points": 10000, "max_points": 999999}}',
 '{"bronze": ["1% discount"], "silver": ["2% discount", "free shipping"], "gold": ["5% discount", "free shipping", "early access"], "platinum": ["10% discount", "free shipping", "early access", "exclusive products"]}',
 1.0, CURRENT_DATE);

-- 기본 규제 요구사항
INSERT INTO regulatory_requirements (country_code, regulatory_body, requirement_type, title, description, effective_date) VALUES 
('US', 'FDA', 'ingredient_restriction', 'Prohibited Ingredients List', 'List of ingredients prohibited in cosmetics', CURRENT_DATE),
('EU', 'EC', 'labeling', 'EU Cosmetic Labeling Requirements', 'Mandatory labeling requirements for cosmetics in EU', CURRENT_DATE),
('KR', 'MFDS', 'notification', 'Cosmetic Notification System', 'Pre-market notification system for cosmetics', CURRENT_DATE),
('TH', 'FDA Thailand', 'testing', 'Safety Testing Requirements', 'Required safety tests for cosmetic products', CURRENT_DATE);
