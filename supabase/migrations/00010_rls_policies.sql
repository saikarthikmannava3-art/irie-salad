-- Row-Level Security Policies

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_read_own_profile" ON profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "users_update_own_profile" ON profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "staff_read_all_profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('super_admin','org_admin','kitchen_manager'))
);

-- Addresses
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_manage_own_addresses" ON addresses FOR ALL USING (profile_id = auth.uid());

-- Menu (public read)
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_menu" ON menu_items FOR SELECT USING (true);
CREATE POLICY "staff_manage_menu" ON menu_items FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('super_admin','org_admin','kitchen_manager'))
);

ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_categories" ON menu_categories FOR SELECT USING (true);

-- Plans (public read)
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_plans" ON plans FOR SELECT USING (true);

-- Subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "customers_own_subscriptions" ON subscriptions FOR SELECT USING (profile_id = auth.uid());
CREATE POLICY "staff_read_subscriptions" ON subscriptions FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('super_admin','org_admin','kitchen_manager'))
);

-- Orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "customers_own_orders" ON orders FOR SELECT USING (profile_id = auth.uid());
CREATE POLICY "customers_update_own_scheduled" ON orders FOR UPDATE USING (
  profile_id = auth.uid() AND status = 'scheduled'
);
CREATE POLICY "staff_manage_orders" ON orders FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('super_admin','org_admin','kitchen_manager','production_staff','delivery_manager'))
);

-- Inventory (staff only)
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff_manage_inventory" ON inventory FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('super_admin','org_admin','kitchen_manager','production_staff'))
);

ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff_read_inv_transactions" ON inventory_transactions FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('super_admin','org_admin','kitchen_manager','production_staff'))
);

-- Production (staff only)
ALTER TABLE daily_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff_read_snapshots" ON daily_snapshots FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('super_admin','org_admin','kitchen_manager','production_staff'))
);

ALTER TABLE production_requirements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff_read_prod_requirements" ON production_requirements FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('super_admin','org_admin','kitchen_manager','production_staff'))
);

ALTER TABLE ingredient_requirements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff_read_ingredient_requirements" ON ingredient_requirements FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('super_admin','org_admin','kitchen_manager','production_staff'))
);

-- Payments
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "customers_own_payments" ON payments FOR SELECT USING (profile_id = auth.uid());

-- Organizations, brands, cities, kitchens, zones — public read
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_orgs" ON organizations FOR SELECT USING (true);

ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_brands" ON brands FOR SELECT USING (true);

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_cities" ON cities FOR SELECT USING (true);

ALTER TABLE kitchens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_kitchens" ON kitchens FOR SELECT USING (true);

ALTER TABLE delivery_zones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_zones" ON delivery_zones FOR SELECT USING (true);

-- Ingredients (staff read)
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff_read_ingredients" ON ingredients FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('super_admin','org_admin','kitchen_manager','production_staff'))
);

-- Recipes (staff read)
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff_read_recipes" ON recipes FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('super_admin','org_admin','kitchen_manager','production_staff'))
);

ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff_read_recipe_ingredients" ON recipe_ingredients FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('super_admin','org_admin','kitchen_manager','production_staff'))
);
