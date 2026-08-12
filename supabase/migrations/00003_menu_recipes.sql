-- Menu, Recipes & Ingredients

CREATE TABLE menu_categories (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id        UUID NOT NULL REFERENCES brands(id),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL,
  sort_order      INT DEFAULT 0,
  is_active       BOOLEAN DEFAULT true
);

CREATE TABLE menu_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id        UUID NOT NULL REFERENCES brands(id),
  category_id     UUID REFERENCES menu_categories(id),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  description     TEXT,
  short_desc      TEXT,
  image_url       TEXT,
  base_price      DECIMAL(10,2) NOT NULL,
  calories        INT,
  protein_g       DECIMAL(5,1),
  fiber_g         DECIMAL(5,1),
  tags            TEXT[] DEFAULT '{}',
  is_customizable BOOLEAN DEFAULT false,
  is_active       BOOLEAN DEFAULT true,
  sort_order      INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ingredients (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID NOT NULL REFERENCES organizations(id),
  name            TEXT NOT NULL,
  sku             TEXT UNIQUE,
  unit            TEXT NOT NULL DEFAULT 'g'
                  CHECK (unit IN ('g','kg','ml','l','pcs','bunch')),
  category        TEXT,
  shelf_life_days INT,
  storage_type    TEXT DEFAULT 'refrigerated'
                  CHECK (storage_type IN ('ambient','refrigerated','frozen')),
  cost_per_unit   DECIMAL(10,4),
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE recipes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id    UUID NOT NULL REFERENCES menu_items(id),
  version         INT DEFAULT 1,
  instructions    JSONB,
  prep_time_mins  INT,
  is_current      BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE recipe_ingredients (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id       UUID NOT NULL REFERENCES recipes(id),
  ingredient_id   UUID NOT NULL REFERENCES ingredients(id),
  quantity        DECIMAL(10,3) NOT NULL,
  is_optional     BOOLEAN DEFAULT false,
  notes           TEXT,
  UNIQUE(recipe_id, ingredient_id)
);
