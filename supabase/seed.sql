-- =============================================================================
-- Irie Kitchen — Database Seed
-- =============================================================================
-- Idempotent: uses ON CONFLICT DO NOTHING throughout.
-- Run with: supabase db reset   (auto-runs seed.sql)
--       or: psql -f supabase/seed.sql
-- =============================================================================

-- Use a transaction for atomicity
BEGIN;

-- =============================================================================
-- 1. ORGANIZATION
-- =============================================================================

INSERT INTO organizations (id, name, slug, settings) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'irie kitchen', 'irie-kitchen', '{"currency":"INR","country":"IN"}')
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- 2. BRAND
-- =============================================================================

INSERT INTO brands (id, org_id, name, slug, color_primary, color_secondary, domain, is_active) VALUES
  ('b0000000-0000-0000-0000-000000000001',
   'a0000000-0000-0000-0000-000000000001',
   'irie kitchen', 'irie-kitchen',
   '#1f4d3a', '#f5f0e8',
   'iriekitchen.in', true)
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- 3. CITY
-- =============================================================================

INSERT INTO cities (id, org_id, name, slug, timezone, is_active) VALUES
  ('c0000000-0000-0000-0000-000000000001',
   'a0000000-0000-0000-0000-000000000001',
   'Hyderabad', 'hyderabad', 'Asia/Kolkata', true)
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- 4. KITCHEN
-- =============================================================================

INSERT INTO kitchens (id, city_id, name, code, address, lat, lng, capacity_orders, is_active) VALUES
  ('k0000000-0000-0000-0000-000000000001',
   'c0000000-0000-0000-0000-000000000001',
   'Irie Main Kitchen', 'HYD-MAIN',
   'Jubilee Hills, Hyderabad, Telangana 500033',
   17.4319000, 78.4070000, 200, true)
ON CONFLICT (code) DO NOTHING;

-- =============================================================================
-- 5. DELIVERY ZONES
-- =============================================================================

INSERT INTO delivery_zones (id, kitchen_id, name, slug, delivery_fee, is_active) VALUES
  ('dz000000-0000-0000-0000-000000000001', 'k0000000-0000-0000-0000-000000000001', 'Jubilee Hills',  'jubilee-hills',  0, true),
  ('dz000000-0000-0000-0000-000000000002', 'k0000000-0000-0000-0000-000000000001', 'Banjara Hills',  'banjara-hills',  0, true),
  ('dz000000-0000-0000-0000-000000000003', 'k0000000-0000-0000-0000-000000000001', 'Madhapur',        'madhapur',       0, true),
  ('dz000000-0000-0000-0000-000000000004', 'k0000000-0000-0000-0000-000000000001', 'Gachibowli',      'gachibowli',     0, true),
  ('dz000000-0000-0000-0000-000000000005', 'k0000000-0000-0000-0000-000000000001', 'Kondapur',        'kondapur',       0, true),
  ('dz000000-0000-0000-0000-000000000006', 'k0000000-0000-0000-0000-000000000001', 'Hitech City',     'hitech-city',    0, true)
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 6. MENU CATEGORIES
-- =============================================================================
-- Maps to MEAL_CATEGORIES from meal-categories.ts
-- These are the "product types" customers subscribe to.

INSERT INTO menu_categories (id, brand_id, name, slug, sort_order, is_active) VALUES
  ('mc000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'irie breakfast',                'irie-breakfast',               1,  true),
  ('mc000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'irie lunch thali',              'irie-lunch-thali',             2,  true),
  ('mc000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'irie biryani',                  'irie-biryani',                 3,  true),
  ('mc000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 'signature irie salad (350g)',    'signature-irie-salad-350',     4,  true),
  ('mc000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000001', 'signature irie salad (500g)',    'signature-irie-salad-500',     5,  true),
  ('mc000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000001', 'irie evening snack',            'irie-evening-snack',           6,  true),
  ('mc000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000001', 'Fresh Seasonal Fruit Bowl',     'fresh-seasonal-fruit-bowl',    7,  true),
  ('mc000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000001', 'irie dinner',                   'irie-dinner',                  8,  true),
  ('mc000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000001', 'irie millet dinner',            'irie-millet-dinner',           9,  true),
  ('mc000000-0000-0000-0000-00000000000a', 'b0000000-0000-0000-0000-000000000001', 'Tropical Smoothie Bowl',        'tropical-smoothie-bowl',       10, true),
  ('mc000000-0000-0000-0000-00000000000b', 'b0000000-0000-0000-0000-000000000001', 'Coconut Overnight Oats',        'coconut-overnight-oats',       11, true),
  ('mc000000-0000-0000-0000-00000000000c', 'b0000000-0000-0000-0000-000000000001', 'Fresh Detox Juice',             'fresh-detox-juice',            12, true)
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 7. MENU ITEMS  (the 12 subscribable meal categories as menu_items)
-- =============================================================================
-- Each meal category is also a menu_item that can have variants, pricing, etc.
-- base_price = single/walk-in price from MEAL_CATEGORY_PRICING.

INSERT INTO menu_items (id, brand_id, category_id, name, slug, description, short_desc, image_url, base_price, calories, is_customizable, has_daily_menu, short_name, is_active, sort_order) VALUES
  -- Breakfast
  ('mi000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'mc000000-0000-0000-0000-000000000001',
   'irie breakfast', 'irie-breakfast',
   'A different wholesome Indian breakfast every day. Idli, dosa, paratha, pongal and more. Chef-curated daily menu.',
   'Chef-curated daily breakfast', '/images/meal-categories/irie-breakfast.jpg',
   149, 310, false, true, 'Breakfast', true, 1),

  -- Lunch Thali
  ('mi000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'mc000000-0000-0000-0000-000000000002',
   'irie lunch thali', 'irie-lunch-thali',
   'A complete Indian thali with dal, sabzi, rice, roti and accompaniments. Daily recipe rotates across regions.',
   'Complete Indian lunch thali', '/images/meal-categories/irie-lunch-thali.jpg',
   249, 480, false, true, 'Lunch Thali', true, 2),

  -- Biryani
  ('mi000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'mc000000-0000-0000-0000-000000000003',
   'irie biryani', 'irie-biryani',
   'Aromatic vegetable biryani or pulao, slow-cooked daily. Served with raita and accompaniments.',
   'Daily biryani/pulao with raita', '/images/meal-categories/irie-biryani.jpg',
   279, 520, false, true, 'Biryani', true, 3),

  -- Salad 350g
  ('mi000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 'mc000000-0000-0000-0000-000000000004',
   'signature irie salad (350g)', 'signature-irie-salad-350',
   'Our signature fresh salad with your choice of Tofu, Paneer, or Garden style. 350g portion.',
   'Fresh signature salad 350g', '/images/meal-categories/signature-irie-salad.jpg',
   249, 380, true, false, 'Salad 350g', true, 4),

  -- Salad 500g
  ('mi000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000001', 'mc000000-0000-0000-0000-000000000005',
   'signature irie salad (500g)', 'signature-irie-salad-500',
   'Our signature fresh salad with your choice of Tofu, Paneer, or Garden style. Generous 500g portion.',
   'Fresh signature salad 500g', '/images/meal-categories/signature-irie-salad.jpg',
   299, 540, true, false, 'Salad 500g', true, 5),

  -- Evening Snack
  ('mi000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000001', 'mc000000-0000-0000-0000-000000000006',
   'irie evening snack', 'irie-evening-snack',
   'A healthy Indian snack for your evening. Chaat, dhokla, sundal and more. Changes daily.',
   'Healthy daily evening snack', '/images/meal-categories/irie-evening-snack.jpg',
   129, 200, false, true, 'Eve Snack', true, 6),

  -- Fruit Bowl
  ('mi000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000001', 'mc000000-0000-0000-0000-000000000007',
   'Fresh Seasonal Fruit Bowl', 'fresh-seasonal-fruit-bowl',
   'Hand-cut seasonal fruits, freshly assembled daily based on market availability.',
   'Fresh seasonal fruits', '/images/meal-categories/fresh-seasonal-fruit-bowl.jpg',
   249, 220, false, true, 'Fruit Bowl', true, 7),

  -- Dinner
  ('mi000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000001', 'mc000000-0000-0000-0000-000000000008',
   'irie dinner', 'irie-dinner',
   'A light, balanced Indian dinner. Khichdi, roti-dal, dosa, soup and more. Daily recipe rotates.',
   'Light balanced daily dinner', '/images/meal-categories/irie-dinner.jpg',
   219, 350, false, true, 'Dinner', true, 8),

  -- Millet Dinner
  ('mi000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000001', 'mc000000-0000-0000-0000-000000000009',
   'irie millet dinner', 'irie-millet-dinner',
   'Nutritious millet-based dinner. Bajra roti, ragi roti, jowar preparations. High fiber, gluten-free options.',
   'Millet-based healthy dinner', '/images/meal-categories/irie-millet-dinner.jpg',
   249, 380, false, true, 'Millet Dinner', true, 9),

  -- Smoothie Bowl (add-on only)
  ('mi000000-0000-0000-0000-00000000000a', 'b0000000-0000-0000-0000-000000000001', 'mc000000-0000-0000-0000-00000000000a',
   'Tropical Smoothie Bowl', 'tropical-smoothie-bowl',
   'Thick, creamy smoothie bowl topped with fresh fruits and granola. Add-on only. Pair with a breakfast or lunch subscription.',
   'Tropical smoothie bowl', '/images/meal-categories/tropical-smoothie-bowl.jpg',
   249, 290, false, false, 'Smoothie Bowl', true, 10),

  -- Overnight Oats (add-on only)
  ('mi000000-0000-0000-0000-00000000000b', 'b0000000-0000-0000-0000-000000000001', 'mc000000-0000-0000-0000-00000000000b',
   'Coconut Overnight Oats', 'coconut-overnight-oats',
   'Creamy coconut-based overnight oats in Fruit, Chocolate, or Seasonal varieties. Add-on only.',
   'Coconut overnight oats', '/images/meal-categories/coconut-overnight-oats.jpg',
   249, 320, true, false, 'Overnight Oats', true, 11),

  -- Detox Juice (add-on only)
  ('mi000000-0000-0000-0000-00000000000c', 'b0000000-0000-0000-0000-000000000001', 'mc000000-0000-0000-0000-00000000000c',
   'Fresh Detox Juice', 'fresh-detox-juice',
   'Cold-pressed detox juice made fresh every morning. Add-on only. Must be ordered with another meal.',
   'Fresh cold-pressed detox juice', '/images/meal-categories/fresh-detox-juice.jpg',
   139, 90, false, false, 'Detox Juice', true, 12)
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- 8. PRODUCT VARIANTS
-- =============================================================================
-- Default variant for daily-menu items (single SKU), plus protein/size variants
-- for salads and overnight oats.

INSERT INTO product_variants (id, menu_item_id, label, slug, variant_type, size, is_daily_menu, is_active, sort_order) VALUES
  -- Breakfast (single daily variant)
  ('pv000000-0000-0000-0000-000000000001', 'mi000000-0000-0000-0000-000000000001', 'Daily Breakfast',     'breakfast-daily',     'daily',   NULL,    true,  true, 1),

  -- Lunch Thali (single daily variant)
  ('pv000000-0000-0000-0000-000000000002', 'mi000000-0000-0000-0000-000000000002', 'Daily Lunch Thali',   'lunch-thali-daily',   'daily',   NULL,    true,  true, 1),

  -- Biryani (single daily variant)
  ('pv000000-0000-0000-0000-000000000003', 'mi000000-0000-0000-0000-000000000003', 'Daily Biryani/Pulao', 'biryani-daily',       'daily',   NULL,    true,  true, 1),

  -- Salad 350g — Tofu, Paneer, Garden
  ('pv000000-0000-0000-0000-000000000004', 'mi000000-0000-0000-0000-000000000004', 'Tofu 350g',           'salad-tofu-350',      'protein', '350g', false, true, 1),
  ('pv000000-0000-0000-0000-000000000005', 'mi000000-0000-0000-0000-000000000004', 'Paneer 350g',         'salad-paneer-350',    'protein', '350g', false, true, 2),
  ('pv000000-0000-0000-0000-000000000006', 'mi000000-0000-0000-0000-000000000004', 'Garden 350g',         'salad-garden-350',    'protein', '350g', false, true, 3),

  -- Salad 500g — Tofu, Paneer, Garden
  ('pv000000-0000-0000-0000-000000000007', 'mi000000-0000-0000-0000-000000000005', 'Tofu 500g',           'salad-tofu-500',      'protein', '500g', false, true, 1),
  ('pv000000-0000-0000-0000-000000000008', 'mi000000-0000-0000-0000-000000000005', 'Paneer 500g',         'salad-paneer-500',    'protein', '500g', false, true, 2),
  ('pv000000-0000-0000-0000-000000000009', 'mi000000-0000-0000-0000-000000000005', 'Garden 500g',         'salad-garden-500',    'protein', '500g', false, true, 3),

  -- Evening Snack (single daily variant)
  ('pv000000-0000-0000-0000-00000000000a', 'mi000000-0000-0000-0000-000000000006', 'Daily Eve Snack',     'eve-snack-daily',     'daily',   NULL,    true,  true, 1),

  -- Fruit Bowl (single daily variant)
  ('pv000000-0000-0000-0000-00000000000b', 'mi000000-0000-0000-0000-000000000007', 'Daily Fruit Bowl',    'fruit-bowl-daily',    'daily',   NULL,    true,  true, 1),

  -- Dinner (single daily variant)
  ('pv000000-0000-0000-0000-00000000000c', 'mi000000-0000-0000-0000-000000000008', 'Daily Dinner',        'dinner-daily',        'daily',   NULL,    true,  true, 1),

  -- Millet Dinner (single daily variant)
  ('pv000000-0000-0000-0000-00000000000d', 'mi000000-0000-0000-0000-000000000009', 'Daily Millet Dinner', 'millet-dinner-daily', 'daily',   NULL,    true,  true, 1),

  -- Smoothie Bowl (single variant)
  ('pv000000-0000-0000-0000-00000000000e', 'mi000000-0000-0000-0000-00000000000a', 'Smoothie Bowl',       'smoothie-default',    'default', NULL,    false, true, 1),

  -- Overnight Oats — Fruit, Chocolate, Seasonal
  ('pv000000-0000-0000-0000-00000000000f', 'mi000000-0000-0000-0000-00000000000b', 'Fruit Oats',          'oats-fruit',          'flavor',  NULL,    false, true, 1),
  ('pv000000-0000-0000-0000-000000000010', 'mi000000-0000-0000-0000-00000000000b', 'Chocolate Oats',      'oats-chocolate',      'flavor',  NULL,    false, true, 2),
  ('pv000000-0000-0000-0000-000000000011', 'mi000000-0000-0000-0000-00000000000b', 'Seasonal Oats',       'oats-seasonal',       'flavor',  NULL,    false, true, 3),

  -- Detox Juice (single variant)
  ('pv000000-0000-0000-0000-000000000012', 'mi000000-0000-0000-0000-00000000000c', 'Detox Juice',         'juice-default',       'default', NULL,    false, true, 1)
ON CONFLICT (menu_item_id, slug) DO NOTHING;

-- =============================================================================
-- 9. PRODUCT ADD-ONS
-- =============================================================================

INSERT INTO product_addons (id, brand_id, name, slug, price, is_market_price, is_active, sort_order) VALUES
  ('pa000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Extra Paneer',        'extra-paneer',     45.00, false, true, 1),
  ('pa000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'Extra Tofu',          'extra-tofu',       45.00, false, true, 2),
  ('pa000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'Protein Tikki (2 pcs)', 'protein-tikki', 25.00, false, true, 3),
  ('pa000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 'Extra Seeds Mix',     'extra-seeds-mix',  25.00, false, true, 4),
  ('pa000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000001', 'Extra Avocado',       'extra-avocado',    45.00, false, true, 5),
  ('pa000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000001', 'Extra Roti (2 pcs)',  'extra-roti',       15.00, false, true, 6),
  ('pa000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000001', 'Extra Rice',          'extra-rice',       20.00, false, true, 7),
  ('pa000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000001', 'Extra Dal',           'extra-dal',        30.00, false, true, 8),
  ('pa000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000001', 'Extra Raita',         'extra-raita',      25.00, false, true, 9)
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- 10. PRODUCT ADD-ON COMPATIBILITY
-- =============================================================================
-- Which add-ons work with which menu items.

INSERT INTO product_addon_compatibility (addon_id, menu_item_id) VALUES
  -- Extra Paneer: salad-350, salad-500, lunch-thali, dinner
  ('pa000000-0000-0000-0000-000000000001', 'mi000000-0000-0000-0000-000000000004'),
  ('pa000000-0000-0000-0000-000000000001', 'mi000000-0000-0000-0000-000000000005'),
  ('pa000000-0000-0000-0000-000000000001', 'mi000000-0000-0000-0000-000000000002'),
  ('pa000000-0000-0000-0000-000000000001', 'mi000000-0000-0000-0000-000000000008'),

  -- Extra Tofu: salad-350, salad-500
  ('pa000000-0000-0000-0000-000000000002', 'mi000000-0000-0000-0000-000000000004'),
  ('pa000000-0000-0000-0000-000000000002', 'mi000000-0000-0000-0000-000000000005'),

  -- Protein Tikki: salad-350, salad-500, lunch-thali, dinner
  ('pa000000-0000-0000-0000-000000000003', 'mi000000-0000-0000-0000-000000000004'),
  ('pa000000-0000-0000-0000-000000000003', 'mi000000-0000-0000-0000-000000000005'),
  ('pa000000-0000-0000-0000-000000000003', 'mi000000-0000-0000-0000-000000000002'),
  ('pa000000-0000-0000-0000-000000000003', 'mi000000-0000-0000-0000-000000000008'),

  -- Extra Seeds Mix: salad-350, salad-500, overnight-oats, millet-dinner
  ('pa000000-0000-0000-0000-000000000004', 'mi000000-0000-0000-0000-000000000004'),
  ('pa000000-0000-0000-0000-000000000004', 'mi000000-0000-0000-0000-000000000005'),
  ('pa000000-0000-0000-0000-000000000004', 'mi000000-0000-0000-0000-00000000000b'),
  ('pa000000-0000-0000-0000-000000000004', 'mi000000-0000-0000-0000-000000000009'),

  -- Extra Avocado: salad-350, salad-500
  ('pa000000-0000-0000-0000-000000000005', 'mi000000-0000-0000-0000-000000000004'),
  ('pa000000-0000-0000-0000-000000000005', 'mi000000-0000-0000-0000-000000000005'),

  -- Extra Roti: lunch-thali, dinner
  ('pa000000-0000-0000-0000-000000000006', 'mi000000-0000-0000-0000-000000000002'),
  ('pa000000-0000-0000-0000-000000000006', 'mi000000-0000-0000-0000-000000000008'),

  -- Extra Rice: lunch-thali, biryani, dinner
  ('pa000000-0000-0000-0000-000000000007', 'mi000000-0000-0000-0000-000000000002'),
  ('pa000000-0000-0000-0000-000000000007', 'mi000000-0000-0000-0000-000000000003'),
  ('pa000000-0000-0000-0000-000000000007', 'mi000000-0000-0000-0000-000000000008'),

  -- Extra Dal: lunch-thali, dinner
  ('pa000000-0000-0000-0000-000000000008', 'mi000000-0000-0000-0000-000000000002'),
  ('pa000000-0000-0000-0000-000000000008', 'mi000000-0000-0000-0000-000000000008'),

  -- Extra Raita: lunch-thali, biryani, dinner
  ('pa000000-0000-0000-0000-000000000009', 'mi000000-0000-0000-0000-000000000002'),
  ('pa000000-0000-0000-0000-000000000009', 'mi000000-0000-0000-0000-000000000003'),
  ('pa000000-0000-0000-0000-000000000009', 'mi000000-0000-0000-0000-000000000008')
ON CONFLICT (addon_id, menu_item_id) DO NOTHING;

-- =============================================================================
-- 11. PRODUCT PRICING MATRIX
-- =============================================================================
-- variant x plan_duration -> price (INR)
-- From MEAL_CATEGORY_PRICING and PRICING in pricing.ts

INSERT INTO product_pricing (variant_id, plan_duration, price) VALUES
  -- Breakfast: 149 / 134 / 119 / 112
  ('pv000000-0000-0000-0000-000000000001', 'single', 149),
  ('pv000000-0000-0000-0000-000000000001', '12',     134),
  ('pv000000-0000-0000-0000-000000000001', '24',     119),
  ('pv000000-0000-0000-0000-000000000001', '48',     112),

  -- Lunch Thali: 249 / 224 / 199 / 187
  ('pv000000-0000-0000-0000-000000000002', 'single', 249),
  ('pv000000-0000-0000-0000-000000000002', '12',     224),
  ('pv000000-0000-0000-0000-000000000002', '24',     199),
  ('pv000000-0000-0000-0000-000000000002', '48',     187),

  -- Biryani: 279 / 251 / 223 / 209
  ('pv000000-0000-0000-0000-000000000003', 'single', 279),
  ('pv000000-0000-0000-0000-000000000003', '12',     251),
  ('pv000000-0000-0000-0000-000000000003', '24',     223),
  ('pv000000-0000-0000-0000-000000000003', '48',     209),

  -- Salad Tofu 350g: 249 / 224 / 199 / 187
  ('pv000000-0000-0000-0000-000000000004', 'single', 249),
  ('pv000000-0000-0000-0000-000000000004', '12',     224),
  ('pv000000-0000-0000-0000-000000000004', '24',     199),
  ('pv000000-0000-0000-0000-000000000004', '48',     187),

  -- Salad Paneer 350g: 249 / 224 / 199 / 187
  ('pv000000-0000-0000-0000-000000000005', 'single', 249),
  ('pv000000-0000-0000-0000-000000000005', '12',     224),
  ('pv000000-0000-0000-0000-000000000005', '24',     199),
  ('pv000000-0000-0000-0000-000000000005', '48',     187),

  -- Salad Garden 350g: 229 / 206 / 183 / 172
  ('pv000000-0000-0000-0000-000000000006', 'single', 229),
  ('pv000000-0000-0000-0000-000000000006', '12',     206),
  ('pv000000-0000-0000-0000-000000000006', '24',     183),
  ('pv000000-0000-0000-0000-000000000006', '48',     172),

  -- Salad Tofu 500g: 299 / 269 / 239 / 224
  ('pv000000-0000-0000-0000-000000000007', 'single', 299),
  ('pv000000-0000-0000-0000-000000000007', '12',     269),
  ('pv000000-0000-0000-0000-000000000007', '24',     239),
  ('pv000000-0000-0000-0000-000000000007', '48',     224),

  -- Salad Paneer 500g: 299 / 269 / 239 / 224
  ('pv000000-0000-0000-0000-000000000008', 'single', 299),
  ('pv000000-0000-0000-0000-000000000008', '12',     269),
  ('pv000000-0000-0000-0000-000000000008', '24',     239),
  ('pv000000-0000-0000-0000-000000000008', '48',     224),

  -- Salad Garden 500g: 279 / 251 / 223 / 209
  ('pv000000-0000-0000-0000-000000000009', 'single', 279),
  ('pv000000-0000-0000-0000-000000000009', '12',     251),
  ('pv000000-0000-0000-0000-000000000009', '24',     223),
  ('pv000000-0000-0000-0000-000000000009', '48',     209),

  -- Evening Snack: 129 / 116 / 103 / 97
  ('pv000000-0000-0000-0000-00000000000a', 'single', 129),
  ('pv000000-0000-0000-0000-00000000000a', '12',     116),
  ('pv000000-0000-0000-0000-00000000000a', '24',     103),
  ('pv000000-0000-0000-0000-00000000000a', '48',      97),

  -- Fruit Bowl: 249 / 224 / 199 / 187
  ('pv000000-0000-0000-0000-00000000000b', 'single', 249),
  ('pv000000-0000-0000-0000-00000000000b', '12',     224),
  ('pv000000-0000-0000-0000-00000000000b', '24',     199),
  ('pv000000-0000-0000-0000-00000000000b', '48',     187),

  -- Dinner: 219 / 197 / 175 / 165
  ('pv000000-0000-0000-0000-00000000000c', 'single', 219),
  ('pv000000-0000-0000-0000-00000000000c', '12',     197),
  ('pv000000-0000-0000-0000-00000000000c', '24',     175),
  ('pv000000-0000-0000-0000-00000000000c', '48',     165),

  -- Millet Dinner: 249 / 224 / 199 / 187
  ('pv000000-0000-0000-0000-00000000000d', 'single', 249),
  ('pv000000-0000-0000-0000-00000000000d', '12',     224),
  ('pv000000-0000-0000-0000-00000000000d', '24',     199),
  ('pv000000-0000-0000-0000-00000000000d', '48',     187),

  -- Smoothie Bowl: 249 / 224 / 199 / 187
  ('pv000000-0000-0000-0000-00000000000e', 'single', 249),
  ('pv000000-0000-0000-0000-00000000000e', '12',     224),
  ('pv000000-0000-0000-0000-00000000000e', '24',     199),
  ('pv000000-0000-0000-0000-00000000000e', '48',     187),

  -- Overnight Oats Fruit: 249 / 224 / 199 / 187
  ('pv000000-0000-0000-0000-00000000000f', 'single', 249),
  ('pv000000-0000-0000-0000-00000000000f', '12',     224),
  ('pv000000-0000-0000-0000-00000000000f', '24',     199),
  ('pv000000-0000-0000-0000-00000000000f', '48',     187),

  -- Overnight Oats Chocolate: 249 / 224 / 199 / 187
  ('pv000000-0000-0000-0000-000000000010', 'single', 249),
  ('pv000000-0000-0000-0000-000000000010', '12',     224),
  ('pv000000-0000-0000-0000-000000000010', '24',     199),
  ('pv000000-0000-0000-0000-000000000010', '48',     187),

  -- Overnight Oats Seasonal: 249 / 224 / 199 / 187
  ('pv000000-0000-0000-0000-000000000011', 'single', 249),
  ('pv000000-0000-0000-0000-000000000011', '12',     224),
  ('pv000000-0000-0000-0000-000000000011', '24',     199),
  ('pv000000-0000-0000-0000-000000000011', '48',     187),

  -- Detox Juice: 139 / 0 / 0 / 0 (single purchase only)
  ('pv000000-0000-0000-0000-000000000012', 'single', 139),
  ('pv000000-0000-0000-0000-000000000012', '12',       0),
  ('pv000000-0000-0000-0000-000000000012', '24',       0),
  ('pv000000-0000-0000-0000-000000000012', '48',       0)
ON CONFLICT (variant_id, plan_duration) DO NOTHING;

-- =============================================================================
-- 12. SUBSCRIPTION PLANS
-- =============================================================================
-- Plans represent "how many days" a customer subscribes for.
-- price_per_meal and total_price use the Lunch Thali as reference baseline.

INSERT INTO plans (id, brand_id, name, slug, duration_days, meals_per_day, price_per_meal, total_price, discount_pct, description, features, is_trial, is_active, sort_order) VALUES
  ('pl000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001',
   'Trial Plan', 'trial-3-day', 3, 1, 249.00, 747.00, 0,
   'Try irie kitchen for 3 days. No commitment.',
   ARRAY['3 days of meals', 'Free delivery', 'No commitment', 'Cancel anytime'],
   true, true, 1),

  ('pl000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001',
   '12-Day Plan', '12-day', 12, 1, 224.00, 2688.00, 10,
   'Our starter subscription. Save 10% on every meal.',
   ARRAY['12 days of meals', 'Free delivery', '10% savings', 'Pause & skip flexibility'],
   false, true, 2),

  ('pl000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001',
   '24-Day Plan', '24-day', 24, 1, 199.00, 4776.00, 20,
   'Our most popular plan. Save 20% on every meal.',
   ARRAY['24 days of meals', 'Free delivery', '20% savings', 'Pause & skip flexibility', 'Priority support'],
   false, true, 3),

  ('pl000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001',
   '48-Day Plan', '48-day', 48, 1, 187.00, 8976.00, 25,
   'Maximum value. Save 25% on every meal.',
   ARRAY['48 days of meals', 'Free delivery', '25% savings', 'Pause & skip flexibility', 'Priority support', 'Exclusive menu previews'],
   false, true, 4)
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- 13. RECIPES
-- =============================================================================
-- All 48 recipes from recipes.ts. Each recipe is stored as a row in the recipes
-- table linked to a menu_item. Since recipes represent daily rotation options
-- for the daily-menu products, we link them to the appropriate menu_item
-- (breakfast items -> irie-breakfast, lunch -> irie-lunch-thali, etc.)
-- and store rich metadata in the instructions JSONB field.
--
-- The recipes table schema: (id, menu_item_id, version, instructions, prep_time_mins, is_current)
-- We use the instructions JSONB to store all the recipe metadata that doesn't
-- have dedicated columns: meal_occasion, region, cooking_method, nutrition,
-- allergens, tags, storage/reheating instructions, etc.

-- ----- BREAKFAST RECIPES (11) -> linked to irie-breakfast -----

INSERT INTO recipes (id, menu_item_id, version, instructions, prep_time_mins, is_current) VALUES
  -- B01: Pesarattu with Ginger Chutney
  ('re000000-0000-0000-0000-000000000001', 'mi000000-0000-0000-0000-000000000001', 1,
   '{
     "slug": "pesarattu",
     "name": "Pesarattu with Ginger Chutney",
     "shortName": "Pesarattu",
     "description": "Crispy green moong dal crepes served with fresh ginger-green chilli chutney. A protein-packed Andhra breakfast classic.",
     "mealOccasion": "breakfast",
     "category": "Dosa & Crepes",
     "region": "south",
     "cookingMethod": "fermented",
     "image": "/images/recipes/pesarattu.jpg",
     "nutrition": {"calories": 280, "proteinG": 16, "fiberG": 6, "carbsG": 38, "fatG": 6},
     "tags": ["High Protein", "South Indian", "Vegan"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Heat on tawa for 1-2 minutes on each side until crispy.",
     "storageInstructions": "Refrigerate and consume within 8 hours.",
     "portionSize": "2 pesarattu + chutney",
     "sortOrder": 1
   }', 30, true),

  -- B02: Soft Idli with Sambar & Chutney
  ('re000000-0000-0000-0000-000000000002', 'mi000000-0000-0000-0000-000000000001', 1,
   '{
     "slug": "idli-sambar",
     "name": "Soft Idli with Sambar & Chutney",
     "shortName": "Idli Sambar",
     "description": "Fluffy steamed rice-lentil cakes served with aromatic vegetable sambar and fresh coconut chutney.",
     "mealOccasion": "breakfast",
     "category": "Steamed",
     "region": "south",
     "cookingMethod": "steamed",
     "image": "/images/recipes/idli-sambar.jpg",
     "nutrition": {"calories": 310, "proteinG": 12, "fiberG": 5, "carbsG": 52, "fatG": 5},
     "tags": ["Classic", "South Indian", "Light"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Steam for 3-4 minutes or microwave with a damp cloth for 1 minute.",
     "storageInstructions": "Refrigerate and consume within 8 hours.",
     "portionSize": "4 idli + sambar + chutney",
     "sortOrder": 2
   }', 25, true),

  -- B03: Ven Pongal with Vadai
  ('re000000-0000-0000-0000-000000000003', 'mi000000-0000-0000-0000-000000000001', 1,
   '{
     "slug": "ven-pongal",
     "name": "Ven Pongal with Vadai",
     "shortName": "Pongal",
     "description": "Comforting rice and moong dal pongal tempered with cumin, pepper and ghee, served with crispy medu vadai.",
     "mealOccasion": "breakfast",
     "category": "Rice & Dal",
     "region": "south",
     "cookingMethod": "slow-cooked",
     "image": "/images/recipes/ven-pongal.jpg",
     "nutrition": {"calories": 380, "proteinG": 14, "fiberG": 4, "carbsG": 48, "fatG": 14},
     "tags": ["Comfort Food", "South Indian"],
     "isVegetarian": true,
     "allergens": ["gluten"],
     "reheatingInstructions": "Microwave for 2 minutes or heat on low flame with a splash of water.",
     "storageInstructions": "Refrigerate and consume within 8 hours.",
     "portionSize": "1 bowl pongal + 1 vadai",
     "sortOrder": 3
   }', 40, true),

  -- B04: Vegetable Rava Upma
  ('re000000-0000-0000-0000-000000000004', 'mi000000-0000-0000-0000-000000000001', 1,
   '{
     "slug": "vegetable-upma",
     "name": "Vegetable Rava Upma",
     "shortName": "Upma",
     "description": "Semolina cooked with seasonal vegetables, mustard seeds and curry leaves. Light yet filling.",
     "mealOccasion": "breakfast",
     "category": "Semolina",
     "region": "south",
     "cookingMethod": "sauteed",
     "image": "/images/recipes/vegetable-upma.jpg",
     "nutrition": {"calories": 260, "proteinG": 8, "fiberG": 4, "carbsG": 40, "fatG": 7},
     "tags": ["Light", "Quick"],
     "isVegetarian": true,
     "allergens": ["gluten"],
     "reheatingInstructions": "Microwave for 1.5 minutes or reheat on low flame with a teaspoon of water.",
     "storageInstructions": "Refrigerate and consume within 6 hours.",
     "portionSize": "1 bowl (250g)",
     "sortOrder": 4
   }', 20, true),

  -- B05: Indori Poha with Sev
  ('re000000-0000-0000-0000-000000000005', 'mi000000-0000-0000-0000-000000000001', 1,
   '{
     "slug": "poha",
     "name": "Indori Poha with Sev",
     "shortName": "Poha",
     "description": "Flattened rice tempered with mustard, turmeric, onions and peanuts. Topped with sev, cilantro and lemon.",
     "mealOccasion": "breakfast",
     "category": "Flattened Rice",
     "region": "central",
     "cookingMethod": "sauteed",
     "image": "/images/recipes/poha.jpg",
     "nutrition": {"calories": 290, "proteinG": 7, "fiberG": 3, "carbsG": 44, "fatG": 9},
     "tags": ["Quick", "Central Indian", "Vegan"],
     "isVegetarian": true,
     "allergens": ["peanuts"],
     "reheatingInstructions": "Best served at room temperature. If cold, microwave 30 seconds.",
     "storageInstructions": "Consume within 4 hours. Best fresh.",
     "portionSize": "1 plate (200g)",
     "sortOrder": 5
   }', 15, true),

  -- B06: Masala Dosa with Chutneys
  ('re000000-0000-0000-0000-000000000006', 'mi000000-0000-0000-0000-000000000001', 1,
   '{
     "slug": "masala-dosa",
     "name": "Masala Dosa with Chutneys",
     "shortName": "Masala Dosa",
     "description": "Crispy fermented rice-lentil crepe filled with spiced potato masala, served with sambar and coconut chutney.",
     "mealOccasion": "breakfast",
     "category": "Dosa & Crepes",
     "region": "south",
     "cookingMethod": "fermented",
     "image": "/images/recipes/masala-dosa.jpg",
     "nutrition": {"calories": 350, "proteinG": 10, "fiberG": 4, "carbsG": 52, "fatG": 11},
     "tags": ["Classic", "South Indian", "Crispy"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Heat on tawa for 2 minutes until crispy. Do not microwave.",
     "storageInstructions": "Best consumed within 2 hours.",
     "portionSize": "1 dosa + potato filling + chutneys",
     "sortOrder": 6
   }', 30, true),

  -- B07: Aloo Paratha with Curd & Pickle
  ('re000000-0000-0000-0000-000000000007', 'mi000000-0000-0000-0000-000000000001', 1,
   '{
     "slug": "aloo-paratha",
     "name": "Aloo Paratha with Curd & Pickle",
     "shortName": "Aloo Paratha",
     "description": "Whole wheat flatbread stuffed with spiced potato, served with fresh curd and mango pickle.",
     "mealOccasion": "breakfast",
     "category": "Roti & Bread",
     "region": "north",
     "cookingMethod": "tandoori",
     "image": "/images/recipes/aloo-paratha.jpg",
     "nutrition": {"calories": 420, "proteinG": 12, "fiberG": 5, "carbsG": 54, "fatG": 17},
     "tags": ["North Indian", "Hearty", "Filling"],
     "isVegetarian": true,
     "allergens": ["gluten", "dairy"],
     "reheatingInstructions": "Heat on tawa with a little ghee for 1-2 minutes each side.",
     "storageInstructions": "Refrigerate and consume within 8 hours.",
     "portionSize": "2 paratha + curd + pickle",
     "sortOrder": 7
   }', 35, true),

  -- B08: Mixed Vegetable Uttapam
  ('re000000-0000-0000-0000-000000000008', 'mi000000-0000-0000-0000-000000000001', 1,
   '{
     "slug": "mixed-veg-uttapam",
     "name": "Mixed Vegetable Uttapam",
     "shortName": "Uttapam",
     "description": "Thick, soft rice-lentil pancake topped with onions, tomatoes, capsicum and fresh coriander.",
     "mealOccasion": "breakfast",
     "category": "Dosa & Crepes",
     "region": "south",
     "cookingMethod": "fermented",
     "image": "/images/recipes/mixed-veg-uttapam.jpg",
     "nutrition": {"calories": 300, "proteinG": 10, "fiberG": 5, "carbsG": 46, "fatG": 8},
     "tags": ["South Indian", "Soft", "Kid Friendly"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Heat on tawa for 1-2 minutes each side.",
     "storageInstructions": "Refrigerate and consume within 6 hours.",
     "portionSize": "2 uttapam + chutney",
     "sortOrder": 8
   }', 25, true),

  -- B09: Ragi Mudde with Sambar
  ('re000000-0000-0000-0000-000000000009', 'mi000000-0000-0000-0000-000000000001', 1,
   '{
     "slug": "ragi-mudde-sambar",
     "name": "Ragi Mudde with Sambar",
     "shortName": "Ragi Mudde",
     "description": "Traditional finger millet balls served with a hearty vegetable sambar. A Karnataka staple, rich in calcium.",
     "mealOccasion": "breakfast",
     "category": "Millet",
     "region": "south",
     "cookingMethod": "steamed",
     "image": "/images/recipes/ragi-mudde-sambar.jpg",
     "nutrition": {"calories": 320, "proteinG": 10, "fiberG": 8, "carbsG": 56, "fatG": 4},
     "tags": ["Millet", "High Fiber", "Calcium Rich"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Steam for 3-4 minutes. Reheat sambar separately.",
     "storageInstructions": "Refrigerate and consume within 8 hours.",
     "portionSize": "2 mudde + sambar",
     "sortOrder": 9
   }', 30, true),

  -- B10: Sabudana Khichdi with Peanuts
  ('re000000-0000-0000-0000-00000000000a', 'mi000000-0000-0000-0000-000000000001', 1,
   '{
     "slug": "sabudana-khichdi",
     "name": "Sabudana Khichdi with Peanuts",
     "shortName": "Sabudana Khichdi",
     "description": "Tapioca pearls sauteed with roasted peanuts, potatoes, cumin and fresh curry leaves. Light and energizing.",
     "mealOccasion": "breakfast",
     "category": "Special",
     "region": "west",
     "cookingMethod": "sauteed",
     "image": "/images/recipes/sabudana-khichdi.jpg",
     "nutrition": {"calories": 340, "proteinG": 8, "fiberG": 3, "carbsG": 58, "fatG": 10},
     "tags": ["Fasting Friendly", "Gluten Free", "West Indian"],
     "isVegetarian": true,
     "allergens": ["peanuts"],
     "reheatingInstructions": "Microwave for 1 minute or reheat gently on low flame.",
     "storageInstructions": "Consume within 4 hours. Best fresh.",
     "portionSize": "1 plate (200g)",
     "sortOrder": 10
   }', 20, true),

  -- B11: Moong Dal Chilla with Mint Chutney
  ('re000000-0000-0000-0000-00000000000b', 'mi000000-0000-0000-0000-000000000001', 1,
   '{
     "slug": "moong-dal-chilla",
     "name": "Moong Dal Chilla with Mint Chutney",
     "shortName": "Moong Chilla",
     "description": "Protein-rich green moong dal pancakes filled with paneer and vegetables, served with fresh mint chutney.",
     "mealOccasion": "breakfast",
     "category": "Dosa & Crepes",
     "region": "north",
     "cookingMethod": "sauteed",
     "image": "/images/recipes/moong-dal-chilla.jpg",
     "nutrition": {"calories": 270, "proteinG": 18, "fiberG": 5, "carbsG": 30, "fatG": 8},
     "tags": ["High Protein", "Low Carb", "Gluten Free"],
     "isVegetarian": true,
     "allergens": ["dairy"],
     "reheatingInstructions": "Heat on tawa for 1 minute each side.",
     "storageInstructions": "Refrigerate and consume within 6 hours.",
     "portionSize": "2 chilla + chutney",
     "sortOrder": 11
   }', 20, true),

  -- ----- LUNCH RECIPES (12) -> linked to irie-lunch-thali -----

  -- L01: Dal Tadka with Steamed Rice
  ('re000000-0000-0000-0000-000000000101', 'mi000000-0000-0000-0000-000000000002', 1,
   '{
     "slug": "dal-rice",
     "name": "Dal Tadka with Steamed Rice",
     "shortName": "Dal Rice",
     "description": "Yellow lentils tempered with cumin, garlic and ghee, served with fragrant steamed basmati rice and papad.",
     "mealOccasion": "lunch",
     "category": "Dal & Curry",
     "region": "pan-indian",
     "cookingMethod": "slow-cooked",
     "image": "/images/recipes/dal-rice.jpg",
     "nutrition": {"calories": 420, "proteinG": 16, "fiberG": 6, "carbsG": 62, "fatG": 10},
     "tags": ["Comfort Food", "Everyday", "Protein Rich"],
     "isVegetarian": true,
     "allergens": ["dairy"],
     "reheatingInstructions": "Microwave for 2-3 minutes. Add a splash of water to dal if thick.",
     "storageInstructions": "Refrigerate and consume within 12 hours.",
     "portionSize": "1 bowl dal + rice + papad",
     "sortOrder": 1
   }', 40, true),

  -- L02: Rajma Chawal with Salad
  ('re000000-0000-0000-0000-000000000102', 'mi000000-0000-0000-0000-000000000002', 1,
   '{
     "slug": "rajma-chawal",
     "name": "Rajma Chawal with Salad",
     "shortName": "Rajma Chawal",
     "description": "Slow-cooked kidney beans in a rich tomato-onion gravy, served with steamed rice and fresh onion salad.",
     "mealOccasion": "lunch",
     "category": "Dal & Curry",
     "region": "north",
     "cookingMethod": "slow-cooked",
     "image": "/images/recipes/rajma-chawal.jpg",
     "nutrition": {"calories": 480, "proteinG": 18, "fiberG": 12, "carbsG": 68, "fatG": 12},
     "tags": ["North Indian", "High Protein", "High Fiber"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Microwave for 2-3 minutes. Rajma thickens on standing, add water if needed.",
     "storageInstructions": "Refrigerate and consume within 12 hours.",
     "portionSize": "1 bowl rajma + rice + salad",
     "sortOrder": 2
   }', 60, true),

  -- L03: Chole with Jeera Rice
  ('re000000-0000-0000-0000-000000000103', 'mi000000-0000-0000-0000-000000000002', 1,
   '{
     "slug": "chole-rice",
     "name": "Chole with Jeera Rice",
     "shortName": "Chole Rice",
     "description": "Spicy Punjabi chickpea curry with cumin-tempered basmati rice and pickled onion.",
     "mealOccasion": "lunch",
     "category": "Dal & Curry",
     "region": "north",
     "cookingMethod": "slow-cooked",
     "image": "/images/recipes/chole-rice.jpg",
     "nutrition": {"calories": 460, "proteinG": 16, "fiberG": 10, "carbsG": 64, "fatG": 14},
     "tags": ["North Indian", "Hearty", "Vegan"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Microwave for 2-3 minutes.",
     "storageInstructions": "Refrigerate and consume within 12 hours.",
     "portionSize": "1 bowl chole + jeera rice",
     "sortOrder": 3
   }', 50, true),

  -- L04: Sambar Rice with Poriyal
  ('re000000-0000-0000-0000-000000000104', 'mi000000-0000-0000-0000-000000000002', 1,
   '{
     "slug": "sambar-rice",
     "name": "Sambar Rice with Poriyal",
     "shortName": "Sambar Rice",
     "description": "Tangy lentil-vegetable stew mixed with steamed rice, accompanied by dry vegetable poriyal and papad.",
     "mealOccasion": "lunch",
     "category": "Rice & Biryani",
     "region": "south",
     "cookingMethod": "slow-cooked",
     "image": "/images/recipes/sambar-rice.jpg",
     "nutrition": {"calories": 400, "proteinG": 14, "fiberG": 7, "carbsG": 60, "fatG": 10},
     "tags": ["South Indian", "Classic", "Balanced"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Microwave for 2-3 minutes. Mix sambar into rice before eating.",
     "storageInstructions": "Refrigerate and consume within 10 hours.",
     "portionSize": "1 plate sambar rice + poriyal + papad",
     "sortOrder": 4
   }', 45, true),

  -- L05: Millet Khichdi with Kadhi
  ('re000000-0000-0000-0000-000000000105', 'mi000000-0000-0000-0000-000000000002', 1,
   '{
     "slug": "millet-khichdi",
     "name": "Millet Khichdi with Kadhi",
     "shortName": "Millet Khichdi",
     "description": "Nutritious foxtail millet and moong dal khichdi with a side of creamy yogurt kadhi.",
     "mealOccasion": "lunch",
     "category": "Millet",
     "region": "pan-indian",
     "cookingMethod": "slow-cooked",
     "image": "/images/recipes/millet-khichdi.jpg",
     "nutrition": {"calories": 380, "proteinG": 14, "fiberG": 8, "carbsG": 52, "fatG": 10},
     "tags": ["Millet", "High Fiber", "Light"],
     "isVegetarian": true,
     "allergens": ["dairy"],
     "reheatingInstructions": "Microwave for 2 minutes. Add water if khichdi has thickened.",
     "storageInstructions": "Refrigerate and consume within 10 hours.",
     "portionSize": "1 bowl khichdi + kadhi",
     "sortOrder": 5
   }', 35, true),

  -- L06: Hyderabadi Veg Dum Biryani (also rotation recipe for biryani menu_item)
  ('re000000-0000-0000-0000-000000000106', 'mi000000-0000-0000-0000-000000000003', 1,
   '{
     "slug": "veg-biryani",
     "name": "Hyderabadi Veg Dum Biryani",
     "shortName": "Veg Biryani",
     "description": "Aromatic basmati rice layered with spiced vegetables, saffron and fried onions, slow-cooked in dum style. Served with raita.",
     "mealOccasion": "lunch",
     "category": "Rice & Biryani",
     "region": "south",
     "cookingMethod": "dum",
     "image": "/images/recipes/veg-biryani.jpg",
     "nutrition": {"calories": 520, "proteinG": 14, "fiberG": 5, "carbsG": 72, "fatG": 18},
     "tags": ["Biryani", "Hyderabadi", "Special"],
     "isVegetarian": true,
     "allergens": ["dairy", "nuts"],
     "reheatingInstructions": "Microwave for 3 minutes covered. Sprinkle water before reheating.",
     "storageInstructions": "Refrigerate and consume within 10 hours.",
     "portionSize": "1 plate biryani + raita",
     "sortOrder": 6
   }', 60, true),

  -- L07: Vegetable Pulao with Raita (also rotation recipe for biryani menu_item)
  ('re000000-0000-0000-0000-000000000107', 'mi000000-0000-0000-0000-000000000003', 1,
   '{
     "slug": "veg-pulao",
     "name": "Vegetable Pulao with Raita",
     "shortName": "Veg Pulao",
     "description": "Fragrant basmati rice cooked with seasonal vegetables, whole spices and fresh herbs. Served with boondi raita.",
     "mealOccasion": "lunch",
     "category": "Rice & Biryani",
     "region": "pan-indian",
     "cookingMethod": "dum",
     "image": "/images/recipes/veg-pulao.jpg",
     "nutrition": {"calories": 440, "proteinG": 10, "fiberG": 4, "carbsG": 64, "fatG": 14},
     "tags": ["Light", "Aromatic"],
     "isVegetarian": true,
     "allergens": ["dairy"],
     "reheatingInstructions": "Microwave for 2-3 minutes covered.",
     "storageInstructions": "Refrigerate and consume within 10 hours.",
     "portionSize": "1 plate pulao + raita",
     "sortOrder": 7
   }', 40, true),

  -- L08: Roti Sabzi Thali
  ('re000000-0000-0000-0000-000000000108', 'mi000000-0000-0000-0000-000000000002', 1,
   '{
     "slug": "roti-sabzi-thali",
     "name": "Roti Sabzi Thali",
     "shortName": "Roti Sabzi",
     "description": "Complete North Indian thali with 3 whole wheat rotis, seasonal sabzi, dal, rice, salad and pickle.",
     "mealOccasion": "lunch",
     "category": "Thali",
     "region": "north",
     "cookingMethod": "tandoori",
     "image": "/images/recipes/roti-sabzi-thali.jpg",
     "nutrition": {"calories": 550, "proteinG": 18, "fiberG": 8, "carbsG": 72, "fatG": 18},
     "tags": ["Thali", "Complete Meal", "North Indian"],
     "isVegetarian": true,
     "allergens": ["gluten", "dairy"],
     "reheatingInstructions": "Reheat roti on tawa with ghee. Microwave sabzi and dal for 2 minutes.",
     "storageInstructions": "Refrigerate and consume within 10 hours.",
     "portionSize": "3 roti + sabzi + dal + rice + salad",
     "sortOrder": 8
   }', 50, true),

  -- L09: Paneer Butter Masala with Rice
  ('re000000-0000-0000-0000-000000000109', 'mi000000-0000-0000-0000-000000000002', 1,
   '{
     "slug": "paneer-butter-masala-rice",
     "name": "Paneer Butter Masala with Rice",
     "shortName": "Paneer Masala",
     "description": "Rich and creamy paneer curry in a tomato-cashew gravy, served with steamed basmati rice.",
     "mealOccasion": "lunch",
     "category": "Dal & Curry",
     "region": "north",
     "cookingMethod": "slow-cooked",
     "image": "/images/recipes/paneer-butter-masala-rice.jpg",
     "nutrition": {"calories": 560, "proteinG": 22, "fiberG": 4, "carbsG": 58, "fatG": 24},
     "tags": ["Rich", "Creamy", "Popular"],
     "isVegetarian": true,
     "allergens": ["dairy", "nuts"],
     "reheatingInstructions": "Microwave for 2-3 minutes. Stir gravy before serving.",
     "storageInstructions": "Refrigerate and consume within 12 hours.",
     "portionSize": "1 bowl paneer masala + rice",
     "sortOrder": 9
   }', 45, true),

  -- L10: South Indian Thali
  ('re000000-0000-0000-0000-00000000010a', 'mi000000-0000-0000-0000-000000000002', 1,
   '{
     "slug": "south-indian-thali",
     "name": "South Indian Thali",
     "shortName": "South Thali",
     "description": "Complete South Indian meal with rice, sambar, rasam, kootu, poriyal, curd, papad and pickle.",
     "mealOccasion": "lunch",
     "category": "Thali",
     "region": "south",
     "cookingMethod": "steamed",
     "image": "/images/recipes/south-indian-thali.jpg",
     "nutrition": {"calories": 520, "proteinG": 16, "fiberG": 8, "carbsG": 74, "fatG": 14},
     "tags": ["Thali", "Complete Meal", "South Indian"],
     "isVegetarian": true,
     "allergens": ["dairy"],
     "reheatingInstructions": "Microwave rice and curries for 2-3 minutes. Keep papad separate.",
     "storageInstructions": "Refrigerate and consume within 10 hours.",
     "portionSize": "Full thali plate",
     "sortOrder": 10
   }', 50, true),

  -- L11: Jowar Roti with Seasonal Sabzi (also linked to millet-dinner)
  ('re000000-0000-0000-0000-00000000010b', 'mi000000-0000-0000-0000-000000000009', 1,
   '{
     "slug": "jowar-roti-sabzi",
     "name": "Jowar Roti with Seasonal Sabzi",
     "shortName": "Jowar Roti",
     "description": "Gluten-free sorghum flatbread with a flavorful seasonal vegetable sabzi and fresh green chutney.",
     "mealOccasion": "lunch",
     "category": "Millet",
     "region": "west",
     "cookingMethod": "tandoori",
     "image": "/images/recipes/jowar-roti-sabzi.jpg",
     "nutrition": {"calories": 400, "proteinG": 12, "fiberG": 9, "carbsG": 58, "fatG": 12},
     "tags": ["Millet", "Gluten Free", "West Indian"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Heat roti on tawa for 1 minute each side. Microwave sabzi for 2 minutes.",
     "storageInstructions": "Refrigerate and consume within 8 hours.",
     "portionSize": "3 jowar roti + sabzi + chutney",
     "sortOrder": 11
   }', 35, true),

  -- L12: Bisi Bele Bath with Boondi
  ('re000000-0000-0000-0000-00000000010c', 'mi000000-0000-0000-0000-000000000002', 1,
   '{
     "slug": "bisi-bele-bath",
     "name": "Bisi Bele Bath with Boondi",
     "shortName": "Bisi Bele Bath",
     "description": "Karnataka''s famous spiced rice-lentil dish cooked with tamarind, jaggery and BBB masala. Topped with boondi and ghee.",
     "mealOccasion": "lunch",
     "category": "Rice & Biryani",
     "region": "south",
     "cookingMethod": "slow-cooked",
     "image": "/images/recipes/bisi-bele-bath.jpg",
     "nutrition": {"calories": 450, "proteinG": 14, "fiberG": 6, "carbsG": 66, "fatG": 14},
     "tags": ["Karnataka", "One Pot", "Flavorful"],
     "isVegetarian": true,
     "allergens": ["dairy", "peanuts"],
     "reheatingInstructions": "Microwave for 2-3 minutes. Add water if too thick. Top with fresh ghee.",
     "storageInstructions": "Refrigerate and consume within 10 hours.",
     "portionSize": "1 bowl (300g) + boondi",
     "sortOrder": 12
   }', 50, true),

  -- ----- EVENING SNACK RECIPES (10) -> linked to irie-evening-snack -----

  -- S01: Mixed Sprout Chaat
  ('re000000-0000-0000-0000-000000000201', 'mi000000-0000-0000-0000-000000000006', 1,
   '{
     "slug": "sprout-chaat",
     "name": "Mixed Sprout Chaat",
     "shortName": "Sprout Chaat",
     "description": "Crunchy mixed sprouts tossed with onion, tomato, green chutney, tamarind chutney and chaat masala.",
     "mealOccasion": "evening-snack",
     "category": "Chaat",
     "region": "pan-indian",
     "cookingMethod": "raw",
     "image": "/images/recipes/sprout-chaat.jpg",
     "nutrition": {"calories": 180, "proteinG": 12, "fiberG": 8, "carbsG": 24, "fatG": 4},
     "tags": ["High Protein", "High Fiber", "Chaat"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Best served at room temperature. No reheating needed.",
     "storageInstructions": "Consume within 3 hours. Best fresh.",
     "portionSize": "1 bowl (200g)",
     "sortOrder": 1
   }', 15, true),

  -- S02: Khaman Dhokla with Green Chutney
  ('re000000-0000-0000-0000-000000000202', 'mi000000-0000-0000-0000-000000000006', 1,
   '{
     "slug": "dhokla",
     "name": "Khaman Dhokla with Green Chutney",
     "shortName": "Dhokla",
     "description": "Soft, spongy steamed gram flour cakes tempered with mustard seeds and curry leaves. Served with green chutney.",
     "mealOccasion": "evening-snack",
     "category": "Steamed",
     "region": "west",
     "cookingMethod": "steamed",
     "image": "/images/recipes/dhokla.jpg",
     "nutrition": {"calories": 200, "proteinG": 8, "fiberG": 3, "carbsG": 30, "fatG": 5},
     "tags": ["Gujarati", "Light", "Steamed"],
     "isVegetarian": true,
     "allergens": ["gluten"],
     "reheatingInstructions": "Steam for 2 minutes or microwave for 30 seconds.",
     "storageInstructions": "Refrigerate and consume within 8 hours.",
     "portionSize": "6 pieces + chutney",
     "sortOrder": 2
   }', 25, true),

  -- S03: Mini Idli with Podi
  ('re000000-0000-0000-0000-000000000203', 'mi000000-0000-0000-0000-000000000006', 1,
   '{
     "slug": "evening-idli",
     "name": "Mini Idli with Podi",
     "shortName": "Mini Idli Podi",
     "description": "Bite-sized steamed idlis tossed in aromatic gunpowder (podi) with sesame oil. A South Indian snack classic.",
     "mealOccasion": "evening-snack",
     "category": "Steamed",
     "region": "south",
     "cookingMethod": "steamed",
     "image": "/images/recipes/evening-idli.jpg",
     "nutrition": {"calories": 220, "proteinG": 7, "fiberG": 3, "carbsG": 36, "fatG": 5},
     "tags": ["South Indian", "Bite-sized"],
     "isVegetarian": true,
     "allergens": ["sesame"],
     "reheatingInstructions": "Steam for 2 minutes or microwave with a damp cloth for 1 minute.",
     "storageInstructions": "Refrigerate and consume within 6 hours.",
     "portionSize": "8 mini idli + podi",
     "sortOrder": 3
   }', 20, true),

  -- S04: Masala Corn Cup
  ('re000000-0000-0000-0000-000000000204', 'mi000000-0000-0000-0000-000000000006', 1,
   '{
     "slug": "masala-corn-cup",
     "name": "Masala Corn Cup",
     "shortName": "Corn Cup",
     "description": "Sweet corn kernels tossed with butter, chaat masala, lime juice and fresh herbs. Warm and comforting.",
     "mealOccasion": "evening-snack",
     "category": "Snacks",
     "region": "pan-indian",
     "cookingMethod": "sauteed",
     "image": "/images/recipes/masala-corn-cup.jpg",
     "nutrition": {"calories": 170, "proteinG": 5, "fiberG": 4, "carbsG": 28, "fatG": 5},
     "tags": ["Quick", "Kid Friendly", "Light"],
     "isVegetarian": true,
     "allergens": ["dairy"],
     "reheatingInstructions": "Microwave for 1 minute.",
     "storageInstructions": "Consume within 4 hours.",
     "portionSize": "1 cup (180g)",
     "sortOrder": 4
   }', 10, true),

  -- S05: Chana Sundal
  ('re000000-0000-0000-0000-000000000205', 'mi000000-0000-0000-0000-000000000006', 1,
   '{
     "slug": "sundal",
     "name": "Chana Sundal",
     "shortName": "Sundal",
     "description": "Black chickpeas tempered with mustard, curry leaves and fresh coconut. A traditional Tamil Nadu prasadam snack.",
     "mealOccasion": "evening-snack",
     "category": "Legumes",
     "region": "south",
     "cookingMethod": "sauteed",
     "image": "/images/recipes/sundal.jpg",
     "nutrition": {"calories": 190, "proteinG": 10, "fiberG": 8, "carbsG": 26, "fatG": 5},
     "tags": ["South Indian", "High Protein", "High Fiber"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Best at room temperature. If cold, microwave 30 seconds.",
     "storageInstructions": "Refrigerate and consume within 8 hours.",
     "portionSize": "1 bowl (150g)",
     "sortOrder": 5
   }', 20, true),

  -- S06: Roasted Makhana Mix
  ('re000000-0000-0000-0000-000000000206', 'mi000000-0000-0000-0000-000000000006', 1,
   '{
     "slug": "makhana-snack",
     "name": "Roasted Makhana Mix",
     "shortName": "Makhana Mix",
     "description": "Fox nuts roasted with ghee, rock salt and turmeric, mixed with curry leaves and dry fruits. Crunchy and addictive.",
     "mealOccasion": "evening-snack",
     "category": "Dry Snacks",
     "region": "north",
     "cookingMethod": "roasted",
     "image": "/images/recipes/makhana-snack.jpg",
     "nutrition": {"calories": 160, "proteinG": 5, "fiberG": 3, "carbsG": 20, "fatG": 7},
     "tags": ["Low Cal", "Fasting Friendly", "Crunchy"],
     "isVegetarian": true,
     "allergens": ["dairy", "tree nuts"],
     "reheatingInstructions": "No reheating needed. Serve at room temperature.",
     "storageInstructions": "Keep in airtight container. Consume within 3 days.",
     "portionSize": "1 cup (80g)",
     "sortOrder": 6
   }', 15, true),

  -- S07: Roasted Chana Trail Mix
  ('re000000-0000-0000-0000-000000000207', 'mi000000-0000-0000-0000-000000000006', 1,
   '{
     "slug": "roasted-chana-mix",
     "name": "Roasted Chana Trail Mix",
     "shortName": "Chana Mix",
     "description": "Roasted Bengal gram mixed with peanuts, puffed rice, curry leaves and spices. The ultimate desi trail mix.",
     "mealOccasion": "evening-snack",
     "category": "Dry Snacks",
     "region": "pan-indian",
     "cookingMethod": "roasted",
     "image": "/images/recipes/roasted-chana-mix.jpg",
     "nutrition": {"calories": 200, "proteinG": 10, "fiberG": 5, "carbsG": 24, "fatG": 8},
     "tags": ["High Protein", "Crunchy", "Portable"],
     "isVegetarian": true,
     "allergens": ["peanuts"],
     "reheatingInstructions": "No reheating needed.",
     "storageInstructions": "Keep in airtight container. Consume within 5 days.",
     "portionSize": "1 cup (100g)",
     "sortOrder": 7
   }', 15, true),

  -- S08: Fruit Bowl with Chaat Masala
  ('re000000-0000-0000-0000-000000000208', 'mi000000-0000-0000-0000-000000000006', 1,
   '{
     "slug": "fruit-chaat",
     "name": "Fruit Bowl with Chaat Masala",
     "shortName": "Fruit Chaat",
     "description": "Seasonal fruits cut fresh and tossed with black salt, chaat masala and a squeeze of lime. Refreshing and tangy.",
     "mealOccasion": "evening-snack",
     "category": "Fresh",
     "region": "pan-indian",
     "cookingMethod": "raw",
     "image": "/images/recipes/fruit-chaat.jpg",
     "nutrition": {"calories": 140, "proteinG": 2, "fiberG": 4, "carbsG": 32, "fatG": 1},
     "tags": ["Fresh", "Low Cal", "Vegan"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Serve chilled. No reheating.",
     "storageInstructions": "Consume within 2 hours.",
     "portionSize": "1 bowl (250g)",
     "sortOrder": 8
   }', 10, true),

  -- S09: Baked Samosa Chaat
  ('re000000-0000-0000-0000-000000000209', 'mi000000-0000-0000-0000-000000000006', 1,
   '{
     "slug": "samosa-chaat",
     "name": "Baked Samosa Chaat",
     "shortName": "Samosa Chaat",
     "description": "Baked (not fried) samosa broken and topped with chickpea curry, yogurt, chutneys and sev.",
     "mealOccasion": "evening-snack",
     "category": "Chaat",
     "region": "north",
     "cookingMethod": "baked",
     "image": "/images/recipes/samosa-chaat.jpg",
     "nutrition": {"calories": 280, "proteinG": 8, "fiberG": 4, "carbsG": 38, "fatG": 10},
     "tags": ["Chaat", "Popular", "Baked"],
     "isVegetarian": true,
     "allergens": ["gluten", "dairy"],
     "reheatingInstructions": "Reheat samosa in oven at 180C for 5 min. Assemble fresh.",
     "storageInstructions": "Consume within 2 hours of assembly.",
     "portionSize": "1 plate",
     "sortOrder": 9
   }', 30, true),

  -- S10: Pani Puri Kit
  ('re000000-0000-0000-0000-00000000020a', 'mi000000-0000-0000-0000-000000000006', 1,
   '{
     "slug": "pani-puri-kit",
     "name": "Pani Puri Kit",
     "shortName": "Pani Puri",
     "description": "DIY pani puri with crispy puris, spiced potato-chickpea filling, mint water and tamarind water. Fun and interactive.",
     "mealOccasion": "evening-snack",
     "category": "Chaat",
     "region": "pan-indian",
     "cookingMethod": "raw",
     "image": "/images/recipes/pani-puri-kit.jpg",
     "nutrition": {"calories": 230, "proteinG": 6, "fiberG": 3, "carbsG": 40, "fatG": 5},
     "tags": ["Chaat", "Fun", "Interactive"],
     "isVegetarian": true,
     "allergens": ["gluten"],
     "reheatingInstructions": "Serve at room temperature. Keep puri separate until eating.",
     "storageInstructions": "Consume within 3 hours.",
     "portionSize": "8 puris + filling + 2 waters",
     "sortOrder": 10
   }', 20, true),

  -- ----- DINNER RECIPES (10) -> linked to irie-dinner -----

  -- D01: Light Moong Dal Khichdi
  ('re000000-0000-0000-0000-000000000301', 'mi000000-0000-0000-0000-000000000008', 1,
   '{
     "slug": "light-khichdi",
     "name": "Light Moong Dal Khichdi",
     "shortName": "Light Khichdi",
     "description": "Gentle, easily digestible rice and moong dal khichdi with a light tadka. Perfect comfort food for evenings.",
     "mealOccasion": "dinner",
     "category": "Rice & Dal",
     "region": "pan-indian",
     "cookingMethod": "slow-cooked",
     "image": "/images/recipes/light-khichdi.jpg",
     "nutrition": {"calories": 320, "proteinG": 12, "fiberG": 4, "carbsG": 50, "fatG": 7},
     "tags": ["Light", "Comfort Food", "Easy Digest"],
     "isVegetarian": true,
     "allergens": ["dairy"],
     "reheatingInstructions": "Microwave for 2 minutes. Add water if khichdi is too thick.",
     "storageInstructions": "Refrigerate and consume within 10 hours.",
     "portionSize": "1 bowl (300g) + pickle",
     "sortOrder": 1
   }', 30, true),

  -- D02: Roti with Dal Fry
  ('re000000-0000-0000-0000-000000000302', 'mi000000-0000-0000-0000-000000000008', 1,
   '{
     "slug": "roti-dal-dinner",
     "name": "Roti with Dal Fry",
     "shortName": "Roti Dal",
     "description": "Soft whole wheat rotis with a flavorful dal fry tempered with garlic, cumin and dried red chillies.",
     "mealOccasion": "dinner",
     "category": "Roti & Bread",
     "region": "north",
     "cookingMethod": "tandoori",
     "image": "/images/recipes/roti-dal-dinner.jpg",
     "nutrition": {"calories": 400, "proteinG": 16, "fiberG": 7, "carbsG": 56, "fatG": 12},
     "tags": ["Classic", "Balanced", "Everyday"],
     "isVegetarian": true,
     "allergens": ["gluten", "dairy"],
     "reheatingInstructions": "Heat roti on tawa with ghee. Microwave dal for 2 minutes.",
     "storageInstructions": "Refrigerate and consume within 10 hours.",
     "portionSize": "3 roti + dal fry",
     "sortOrder": 2
   }', 35, true),

  -- D03: Set Dosa with Chutney Podi
  ('re000000-0000-0000-0000-000000000303', 'mi000000-0000-0000-0000-000000000008', 1,
   '{
     "slug": "dinner-dosa",
     "name": "Set Dosa with Chutney Podi",
     "shortName": "Set Dosa",
     "description": "Soft, spongy set dosas served with coconut chutney, tomato chutney and gunpowder podi.",
     "mealOccasion": "dinner",
     "category": "Dosa & Crepes",
     "region": "south",
     "cookingMethod": "fermented",
     "image": "/images/recipes/dinner-dosa.jpg",
     "nutrition": {"calories": 310, "proteinG": 8, "fiberG": 3, "carbsG": 48, "fatG": 9},
     "tags": ["South Indian", "Light", "Soft"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Heat on tawa for 1 minute each side. Do not over-crisp.",
     "storageInstructions": "Consume within 4 hours.",
     "portionSize": "3 set dosa + 2 chutneys + podi",
     "sortOrder": 3
   }', 25, true),

  -- D04: Tomato Rasam Soup with Bread
  ('re000000-0000-0000-0000-000000000304', 'mi000000-0000-0000-0000-000000000008', 1,
   '{
     "slug": "tomato-soup-bread",
     "name": "Tomato Rasam Soup with Bread",
     "shortName": "Soup & Bread",
     "description": "South Indian tomato rasam reimagined as a warming soup, served with toasted multigrain bread.",
     "mealOccasion": "dinner",
     "category": "Soup",
     "region": "south",
     "cookingMethod": "slow-cooked",
     "image": "/images/recipes/tomato-soup-bread.jpg",
     "nutrition": {"calories": 250, "proteinG": 8, "fiberG": 4, "carbsG": 38, "fatG": 6},
     "tags": ["Light", "Warming", "Low Cal"],
     "isVegetarian": true,
     "allergens": ["gluten"],
     "reheatingInstructions": "Heat soup on stove for 3-4 minutes. Toast bread separately.",
     "storageInstructions": "Refrigerate and consume within 10 hours.",
     "portionSize": "1 bowl soup + 2 bread slices",
     "sortOrder": 4
   }', 25, true),

  -- D05: Bajra Roti with Seasonal Sabzi (also millet-dinner)
  ('re000000-0000-0000-0000-000000000305', 'mi000000-0000-0000-0000-000000000009', 1,
   '{
     "slug": "bajra-roti-sabzi",
     "name": "Bajra Roti with Seasonal Sabzi",
     "shortName": "Bajra Roti",
     "description": "Pearl millet flatbread with a hearty seasonal vegetable sabzi. A Rajasthani dinner staple.",
     "mealOccasion": "dinner",
     "category": "Millet",
     "region": "west",
     "cookingMethod": "tandoori",
     "image": "/images/recipes/bajra-roti-sabzi.jpg",
     "nutrition": {"calories": 380, "proteinG": 12, "fiberG": 9, "carbsG": 52, "fatG": 13},
     "tags": ["Millet", "Gluten Free", "Rajasthani"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Heat roti on tawa with ghee for 1 minute each side. Microwave sabzi.",
     "storageInstructions": "Refrigerate and consume within 8 hours.",
     "portionSize": "2 bajra roti + sabzi",
     "sortOrder": 5
   }', 30, true),

  -- D06: Pepper Pongal with Coconut Chutney
  ('re000000-0000-0000-0000-000000000306', 'mi000000-0000-0000-0000-000000000008', 1,
   '{
     "slug": "dinner-pongal",
     "name": "Pepper Pongal with Coconut Chutney",
     "shortName": "Pepper Pongal",
     "description": "Aromatic rice-dal pongal generously seasoned with black pepper and cumin. Served with coconut chutney.",
     "mealOccasion": "dinner",
     "category": "Rice & Dal",
     "region": "south",
     "cookingMethod": "slow-cooked",
     "image": "/images/recipes/dinner-pongal.jpg",
     "nutrition": {"calories": 350, "proteinG": 12, "fiberG": 4, "carbsG": 50, "fatG": 11},
     "tags": ["South Indian", "Comfort Food", "Warming"],
     "isVegetarian": true,
     "allergens": ["dairy"],
     "reheatingInstructions": "Microwave for 2 minutes. Add a splash of water if too thick.",
     "storageInstructions": "Refrigerate and consume within 8 hours.",
     "portionSize": "1 bowl pongal + chutney",
     "sortOrder": 6
   }', 35, true),

  -- D07: Chapati with Mixed Veg Sabzi
  ('re000000-0000-0000-0000-000000000307', 'mi000000-0000-0000-0000-000000000008', 1,
   '{
     "slug": "chapati-sabzi-dinner",
     "name": "Chapati with Mixed Veg Sabzi",
     "shortName": "Chapati Sabzi",
     "description": "Soft whole wheat chapatis with a lightly spiced mixed vegetable sabzi and green chutney.",
     "mealOccasion": "dinner",
     "category": "Roti & Bread",
     "region": "pan-indian",
     "cookingMethod": "tandoori",
     "image": "/images/recipes/chapati-sabzi-dinner.jpg",
     "nutrition": {"calories": 370, "proteinG": 12, "fiberG": 6, "carbsG": 52, "fatG": 12},
     "tags": ["Light", "Everyday", "Balanced"],
     "isVegetarian": true,
     "allergens": ["gluten"],
     "reheatingInstructions": "Heat chapati on tawa. Microwave sabzi for 1-2 minutes.",
     "storageInstructions": "Refrigerate and consume within 8 hours.",
     "portionSize": "3 chapati + sabzi + chutney",
     "sortOrder": 7
   }', 30, true),

  -- D08: Rice with Rasam & Papad
  ('re000000-0000-0000-0000-000000000308', 'mi000000-0000-0000-0000-000000000008', 1,
   '{
     "slug": "rice-rasam",
     "name": "Rice with Rasam & Papad",
     "shortName": "Rice Rasam",
     "description": "Steamed rice with tangy pepper rasam, a side of dry potato poriyal and crispy papad.",
     "mealOccasion": "dinner",
     "category": "Rice & Dal",
     "region": "south",
     "cookingMethod": "slow-cooked",
     "image": "/images/recipes/rice-rasam.jpg",
     "nutrition": {"calories": 340, "proteinG": 8, "fiberG": 4, "carbsG": 58, "fatG": 8},
     "tags": ["South Indian", "Light", "Classic"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Microwave rice and rasam separately for 2 minutes each.",
     "storageInstructions": "Refrigerate and consume within 10 hours.",
     "portionSize": "Rice + rasam + poriyal + papad",
     "sortOrder": 8
   }', 30, true),

  -- D09: Ragi Roti with Palak Dal (also millet-dinner)
  ('re000000-0000-0000-0000-000000000309', 'mi000000-0000-0000-0000-000000000009', 1,
   '{
     "slug": "ragi-roti-dinner",
     "name": "Ragi Roti with Palak Dal",
     "shortName": "Ragi Roti",
     "description": "Finger millet flatbread with spinach-infused dal. High in calcium and iron, perfect for a nutritious dinner.",
     "mealOccasion": "dinner",
     "category": "Millet",
     "region": "south",
     "cookingMethod": "tandoori",
     "image": "/images/recipes/ragi-roti-dinner.jpg",
     "nutrition": {"calories": 360, "proteinG": 14, "fiberG": 8, "carbsG": 50, "fatG": 10},
     "tags": ["Millet", "Calcium Rich", "Iron Rich"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Heat roti on tawa. Microwave dal for 2 minutes.",
     "storageInstructions": "Refrigerate and consume within 8 hours.",
     "portionSize": "2 ragi roti + palak dal",
     "sortOrder": 9
   }', 30, true),

  -- D10: Curd Rice with Pickle
  ('re000000-0000-0000-0000-00000000030a', 'mi000000-0000-0000-0000-000000000008', 1,
   '{
     "slug": "curd-rice",
     "name": "Curd Rice with Pickle",
     "shortName": "Curd Rice",
     "description": "Cooling tempered curd rice with mustard, curry leaves and a side of lemon pickle. The ultimate comfort dinner.",
     "mealOccasion": "dinner",
     "category": "Rice & Dal",
     "region": "south",
     "cookingMethod": "raw",
     "image": "/images/recipes/curd-rice.jpg",
     "nutrition": {"calories": 300, "proteinG": 10, "fiberG": 2, "carbsG": 48, "fatG": 8},
     "tags": ["South Indian", "Cooling", "Probiotic"],
     "isVegetarian": true,
     "allergens": ["dairy"],
     "reheatingInstructions": "Best served at room temperature or slightly chilled. Do not heat.",
     "storageInstructions": "Refrigerate and consume within 8 hours.",
     "portionSize": "1 bowl (300g) + pickle",
     "sortOrder": 10
   }', 15, true),

  -- ----- FRESH & WELLNESS RECIPES (5) -----

  -- W01: signature irie salad -> linked to salad-350 menu item
  ('re000000-0000-0000-0000-000000000401', 'mi000000-0000-0000-0000-000000000004', 1,
   '{
     "slug": "signature-irie-salad",
     "name": "signature irie salad",
     "shortName": "irie salad",
     "description": "Our signature fresh salad with your choice of protein: Tofu, Paneer, or Garden style. Made daily with locally sourced ingredients.",
     "mealOccasion": "lunch",
     "category": "Fresh",
     "region": "pan-indian",
     "cookingMethod": "raw",
     "image": "/images/recipes/signature-irie-salad.jpg",
     "nutrition": {"calories": 380, "proteinG": 24, "fiberG": 8, "carbsG": 28, "fatG": 18},
     "tags": ["Signature", "Fresh", "Customizable"],
     "isVegetarian": true,
     "allergens": ["dairy", "soy"],
     "reheatingInstructions": "Serve chilled. Do not reheat.",
     "storageInstructions": "Refrigerate and consume within 4 hours.",
     "portionSize": "350g / 500g",
     "sortOrder": 1
   }', 20, true),

  -- W02: Tropical Smoothie Bowl
  ('re000000-0000-0000-0000-000000000402', 'mi000000-0000-0000-0000-00000000000a', 1,
   '{
     "slug": "tropical-smoothie-bowl",
     "name": "Tropical Smoothie Bowl",
     "shortName": "Smoothie Bowl",
     "description": "Thick, creamy smoothie bowl topped with fresh fruits, granola and seeds. Daily flavor rotates with seasonal availability.",
     "mealOccasion": "breakfast",
     "category": "Fresh",
     "region": "pan-indian",
     "cookingMethod": "raw",
     "image": "/images/recipes/tropical-smoothie-bowl.jpg",
     "nutrition": {"calories": 290, "proteinG": 8, "fiberG": 7, "carbsG": 42, "fatG": 10},
     "tags": ["Fresh", "Vegan", "Daily Special"],
     "isVegetarian": true,
     "allergens": ["tree nuts"],
     "reheatingInstructions": "Serve chilled. Do not reheat.",
     "storageInstructions": "Consume within 2 hours.",
     "portionSize": "1 bowl (300g)",
     "sortOrder": 2
   }', 15, true),

  -- W03: Coconut Overnight Oats
  ('re000000-0000-0000-0000-000000000403', 'mi000000-0000-0000-0000-00000000000b', 1,
   '{
     "slug": "coconut-overnight-oats",
     "name": "Coconut Overnight Oats",
     "shortName": "Overnight Oats",
     "description": "Creamy coconut-based overnight oats with your choice of Fruit, Chocolate, or Seasonal Specials. Prepared fresh every evening.",
     "mealOccasion": "breakfast",
     "category": "Fresh",
     "region": "pan-indian",
     "cookingMethod": "soaked",
     "image": "/images/recipes/coconut-overnight-oats.jpg",
     "nutrition": {"calories": 320, "proteinG": 12, "fiberG": 6, "carbsG": 44, "fatG": 12},
     "tags": ["Breakfast", "Prep Ahead", "Vegetarian"],
     "isVegetarian": true,
     "allergens": ["gluten", "tree nuts"],
     "reheatingInstructions": "Serve chilled. Do not reheat.",
     "storageInstructions": "Refrigerate and consume within 12 hours.",
     "portionSize": "1 jar (300g)",
     "sortOrder": 3
   }', 15, true),

  -- W04: Fresh Seasonal Fruit Bowl
  ('re000000-0000-0000-0000-000000000404', 'mi000000-0000-0000-0000-000000000007', 1,
   '{
     "slug": "fresh-fruit-bowl",
     "name": "Fresh Seasonal Fruit Bowl",
     "shortName": "Fruit Bowl",
     "description": "A generous bowl of hand-cut seasonal fruits. Composition changes daily based on what is freshest at the market.",
     "mealOccasion": "evening-snack",
     "category": "Fresh",
     "region": "pan-indian",
     "cookingMethod": "raw",
     "image": "/images/recipes/fresh-fruit-bowl.jpg",
     "nutrition": {"calories": 220, "proteinG": 3, "fiberG": 5, "carbsG": 50, "fatG": 1},
     "tags": ["Vegan", "Low Cal", "Fresh"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Serve chilled. Do not reheat.",
     "storageInstructions": "Consume within 3 hours.",
     "portionSize": "1 bowl (350g)",
     "sortOrder": 4
   }', 10, true),

  -- W05: Fresh Detox Juice
  ('re000000-0000-0000-0000-000000000405', 'mi000000-0000-0000-0000-00000000000c', 1,
   '{
     "slug": "fresh-detox-juice",
     "name": "Fresh Detox Juice",
     "shortName": "Detox Juice",
     "description": "Cold-pressed detox juice made fresh every morning. Recipe changes daily. Always refreshing, always nutritious.",
     "mealOccasion": "breakfast",
     "category": "Fresh",
     "region": "pan-indian",
     "cookingMethod": "raw",
     "image": "/images/recipes/fresh-detox-juice.jpg",
     "nutrition": {"calories": 90, "proteinG": 1, "fiberG": 2, "carbsG": 20, "fatG": 0},
     "tags": ["Vegan", "Low Cal", "Detox"],
     "isVegetarian": true,
     "allergens": [],
     "reheatingInstructions": "Serve chilled. Do not reheat.",
     "storageInstructions": "Consume within 4 hours.",
     "portionSize": "1 glass (220ml)",
     "sortOrder": 5
   }', 10, true)
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 14. SAMPLE CUSTOMERS (first 10 for dev)
-- =============================================================================
-- NOTE: profiles depend on auth.users (FK to auth.users(id)).
-- In a Supabase local dev environment, we insert into auth.users first,
-- then profiles auto-creates via trigger. For seed purposes, we insert
-- directly into profiles (bypassing auth) with a note that these are
-- dev-only test accounts.
--
-- Wrapping in a DO block so it doesn't fail if auth.users FK is enforced.

DO $$
BEGIN
  -- Only insert if profiles table is empty (first seed run)
  IF NOT EXISTS (SELECT 1 FROM profiles LIMIT 1) THEN

    -- Insert into auth.users first (minimal records)
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
    VALUES
      ('dae0bc01-b898-4c91-b23e-24998e18a20f', 'emmanuel@able.do',              crypt('password123', gen_salt('bf')), now(), '2024-10-23 18:17:56+05:30', now(), '{"full_name":"Emmanuel"}'),
      ('3965ad78-c070-4f12-8789-0b05ef916bde', 'ashish@able.do',                crypt('password123', gen_salt('bf')), now(), '2024-10-23 21:33:18+05:30', now(), '{"full_name":"Ashish Apex"}'),
      ('69c820c6-773f-487e-b92e-378f9fa11f06', 'madhusudhan@test.dev',          crypt('password123', gen_salt('bf')), now(), '2024-10-23 21:45:16+05:30', now(), '{"full_name":"Madhusudhan"}'),
      ('03416b64-655a-4a69-af3f-6db3993a4f51', 'prashraybajpai1273@live.com',   crypt('password123', gen_salt('bf')), now(), '2024-11-11 17:56:04+05:30', now(), '{"full_name":"Shivangi"}'),
      ('2cd52461-217a-4171-921b-1dfee82f0078', 'kiranyerramshetti@gmail.com',    crypt('password123', gen_salt('bf')), now(), '2024-11-11 21:01:50+05:30', now(), '{"full_name":"Sai Kiran Yerramshetty"}'),
      ('8e2a3470-fc6d-4f8e-baba-f5c584c4ddf4', 'iriesaladbar@gmail.com',        crypt('password123', gen_salt('bf')), now(), '2025-01-05 21:05:20+05:30', now(), '{"full_name":"Neena"}'),
      ('a7e75338-dd8a-4ef3-ba9b-d2ed64aabdc5', 'vvdd@gfg.com',                 crypt('password123', gen_salt('bf')), now(), '2025-01-03 16:55:59+05:30', now(), '{"full_name":"Sai Kiran"}'),
      ('44198a8d-ea2e-4f05-bd97-fba8b5d857dd', 'er.tiwariayush@gmail.com',      crypt('password123', gen_salt('bf')), now(), '2025-01-15 08:43:25+05:30', now(), '{"full_name":"Ayush Tiwari"}'),
      ('b82b868d-8763-47c2-ad71-f215d068c7b8', 'krishnakumarigona00@gmail.com', crypt('password123', gen_salt('bf')), now(), '2025-02-09 14:48:52+05:30', now(), '{"full_name":"Keerteshwar"}'),
      ('12499b12-23ec-495b-aeca-4388cec01581', 'shivangisj27@gmail.com',        crypt('password123', gen_salt('bf')), now(), '2025-01-08 07:31:16+05:30', now(), '{"full_name":"Sandeep"}')
    ON CONFLICT (id) DO NOTHING;

    -- The trigger should auto-create profiles, but let's also update them
    -- with phone numbers and org assignment
    UPDATE profiles SET
      org_id = 'a0000000-0000-0000-0000-000000000001',
      phone = '917989234688',
      city_id = 'c0000000-0000-0000-0000-000000000001'
    WHERE id = 'dae0bc01-b898-4c91-b23e-24998e18a20f';

    UPDATE profiles SET
      org_id = 'a0000000-0000-0000-0000-000000000001',
      phone = '917400324853',
      city_id = 'c0000000-0000-0000-0000-000000000001'
    WHERE id = '3965ad78-c070-4f12-8789-0b05ef916bde';

    UPDATE profiles SET
      org_id = 'a0000000-0000-0000-0000-000000000001',
      phone = '919966372726',
      city_id = 'c0000000-0000-0000-0000-000000000001'
    WHERE id = '69c820c6-773f-487e-b92e-378f9fa11f06';

    UPDATE profiles SET
      org_id = 'a0000000-0000-0000-0000-000000000001',
      phone = '919657104014',
      city_id = 'c0000000-0000-0000-0000-000000000001'
    WHERE id = '03416b64-655a-4a69-af3f-6db3993a4f51';

    UPDATE profiles SET
      org_id = 'a0000000-0000-0000-0000-000000000001',
      phone = '917799911173',
      city_id = 'c0000000-0000-0000-0000-000000000001'
    WHERE id = '2cd52461-217a-4171-921b-1dfee82f0078';

    UPDATE profiles SET
      org_id = 'a0000000-0000-0000-0000-000000000001',
      phone = '919885998968',
      city_id = 'c0000000-0000-0000-0000-000000000001'
    WHERE id = '8e2a3470-fc6d-4f8e-baba-f5c584c4ddf4';

    UPDATE profiles SET
      org_id = 'a0000000-0000-0000-0000-000000000001',
      phone = '917995259820',
      city_id = 'c0000000-0000-0000-0000-000000000001'
    WHERE id = 'a7e75338-dd8a-4ef3-ba9b-d2ed64aabdc5';

    UPDATE profiles SET
      org_id = 'a0000000-0000-0000-0000-000000000001',
      phone = '919560790485',
      city_id = 'c0000000-0000-0000-0000-000000000001'
    WHERE id = '44198a8d-ea2e-4f05-bd97-fba8b5d857dd';

    UPDATE profiles SET
      org_id = 'a0000000-0000-0000-0000-000000000001',
      phone = '919533637901',
      city_id = 'c0000000-0000-0000-0000-000000000001'
    WHERE id = 'b82b868d-8763-47c2-ad71-f215d068c7b8';

    UPDATE profiles SET
      org_id = 'a0000000-0000-0000-0000-000000000001',
      phone = '919013085333',
      city_id = 'c0000000-0000-0000-0000-000000000001'
    WHERE id = '12499b12-23ec-495b-aeca-4388cec01581';

    -- Sample addresses for customers who have them
    INSERT INTO addresses (profile_id, label, line1, line2, city, state, pincode, is_default) VALUES
      ('dae0bc01-b898-4c91-b23e-24998e18a20f', 'Office', 'Able office', 'Sainikpuri', 'Hyderabad', 'Telangana', '500094', true),
      ('3965ad78-c070-4f12-8789-0b05ef916bde', 'Office', 'Uncommon designing services', 'Sainikpuri', 'Hyderabad', 'Telangana', '500094', true),
      ('69c820c6-773f-487e-b92e-378f9fa11f06', 'Home',   'test 1', 'test 2', 'Hyderabad', 'Telangana', '500036', true),
      ('03416b64-655a-4a69-af3f-6db3993a4f51', 'Home',   '201, Laxmi Nivas', 'Madhapur', 'Hyderabad', 'Telangana', '500081', true),
      ('2cd52461-217a-4171-921b-1dfee82f0078', 'Home',   '201, Stanza Living', NULL, 'Hyderabad', 'Telangana', '500081', true),
      ('8e2a3470-fc6d-4f8e-baba-f5c584c4ddf4', 'Home',   '265, Taramati Baradari', 'Ramdev Guda, Ibrahim Bagh', 'Hyderabad', 'Telangana', '500031', true),
      ('a7e75338-dd8a-4ef3-ba9b-d2ed64aabdc5', 'Home',   'Villa 100, Mantri Euphoria', NULL, 'Hyderabad', 'Telangana', '500089', true),
      ('44198a8d-ea2e-4f05-bd97-fba8b5d857dd', 'Home',   'Flat no 206, Plot No 147', 'Journalists Colony Phase 3, Embassy Tribe', 'Hyderabad', 'Telangana', '500032', true),
      ('b82b868d-8763-47c2-ad71-f215d068c7b8', 'Home',   'Plot no 79, HMT Bearings Officers Colony', 'Sainikpuri, Secunderabad', 'Hyderabad', 'Telangana', '500094', true),
      ('12499b12-23ec-495b-aeca-4388cec01581', 'Home',   'Sandeep Urology, Kukatpally', 'Nexus Mall', 'Hyderabad', 'Telangana', '500085', true)
    ON CONFLICT DO NOTHING;

  END IF;
END $$;

-- =============================================================================
-- DONE
-- =============================================================================

COMMIT;
