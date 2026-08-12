-- Inventory Management

CREATE TABLE inventory (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kitchen_id      UUID NOT NULL REFERENCES kitchens(id),
  ingredient_id   UUID NOT NULL REFERENCES ingredients(id),
  current_qty     DECIMAL(10,3) NOT NULL DEFAULT 0,
  unit            TEXT NOT NULL,
  reorder_level   DECIMAL(10,3) DEFAULT 0,
  last_restocked  TIMESTAMPTZ,
  updated_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE(kitchen_id, ingredient_id)
);

CREATE TYPE inventory_tx_type AS ENUM (
  'purchase','production_use','adjustment','waste','return'
);

CREATE TABLE inventory_transactions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kitchen_id      UUID NOT NULL REFERENCES kitchens(id),
  ingredient_id   UUID NOT NULL REFERENCES ingredients(id),
  tx_type         inventory_tx_type NOT NULL,
  quantity        DECIMAL(10,3) NOT NULL,
  reference_id    UUID,
  notes           TEXT,
  created_by      UUID REFERENCES profiles(id),
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_inventory_kitchen ON inventory(kitchen_id);
CREATE INDEX idx_inv_tx_kitchen_date ON inventory_transactions(kitchen_id, created_at);
