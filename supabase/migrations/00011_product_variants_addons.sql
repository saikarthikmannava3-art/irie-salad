-- Phase 1: Product Variants, Add-ons, Daily Menu, Order Items, Packages

-- Extend menu_items
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS has_daily_menu BOOLEAN DEFAULT false;
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS short_name TEXT;

-- Product Variants (Tofu/Paneer/Garden x 350g/500g for salad, Fruit/Choc/Seasonal for oats, etc.)
CREATE TABLE product_variants (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id    UUID NOT NULL REFERENCES menu_items(id),
  label           TEXT NOT NULL,
  slug            TEXT NOT NULL,
  variant_type    TEXT,
  size            TEXT,
  is_daily_menu   BOOLEAN DEFAULT false,
  is_active       BOOLEAN DEFAULT true,
  sort_order      INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE(menu_item_id, slug)
);

-- Product Add-ons (Extra Tofu, Extra Paneer, Protein Tikki, Seeds Mix, Avocado)
CREATE TABLE product_addons (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id        UUID NOT NULL REFERENCES brands(id),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  price           DECIMAL(10,2) NOT NULL DEFAULT 0,
  is_market_price BOOLEAN DEFAULT false,
  is_active       BOOLEAN DEFAULT true,
  sort_order      INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Which add-ons are compatible with which products
CREATE TABLE product_addon_compatibility (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  addon_id        UUID NOT NULL REFERENCES product_addons(id) ON DELETE CASCADE,
  menu_item_id    UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  UNIQUE(addon_id, menu_item_id)
);

-- Pricing Matrix: product variant x plan duration
CREATE TABLE product_pricing (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id      UUID NOT NULL REFERENCES product_variants(id),
  plan_duration   TEXT NOT NULL CHECK (plan_duration IN ('single','12','24','48')),
  price           DECIMAL(10,2) NOT NULL,
  UNIQUE(variant_id, plan_duration)
);

-- Daily Menu (what specific recipe/flavor each product gets on a given day)
CREATE TABLE daily_menu (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kitchen_id        UUID NOT NULL REFERENCES kitchens(id),
  menu_item_id      UUID NOT NULL REFERENCES menu_items(id),
  menu_date         DATE NOT NULL,
  daily_name        TEXT NOT NULL,
  daily_description TEXT,
  image_url         TEXT,
  is_active         BOOLEAN DEFAULT true,
  created_at        TIMESTAMPTZ DEFAULT now(),
  UNIQUE(kitchen_id, menu_item_id, menu_date)
);

-- Order Items (replaces single menu_item_id on orders — 1 order has many items)
CREATE TABLE order_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  variant_id      UUID NOT NULL REFERENCES product_variants(id),
  quantity        INT DEFAULT 1,
  menu_price      DECIMAL(10,2) NOT NULL,
  billing_price   DECIMAL(10,2) NOT NULL,
  addons          JSONB DEFAULT '[]',
  addon_total     DECIMAL(10,2) DEFAULT 0,
  package_id      UUID,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Packages (each physical meal container gets a unique ID + label)
CREATE TABLE packages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_item_id   UUID NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
  barcode         TEXT UNIQUE NOT NULL,
  label_printed   BOOLEAN DEFAULT false,
  label_data      JSONB DEFAULT '{}',
  qc_status       TEXT DEFAULT 'pending' CHECK (qc_status IN ('pending','passed','failed')),
  qc_checked_by   UUID REFERENCES profiles(id),
  qc_checked_at   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_daily_menu_date ON daily_menu(menu_date);
CREATE INDEX idx_daily_menu_kitchen_date ON daily_menu(kitchen_id, menu_date);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_packages_barcode ON packages(barcode);
CREATE INDEX idx_product_variants_item ON product_variants(menu_item_id);
CREATE INDEX idx_product_pricing_variant ON product_pricing(variant_id);
