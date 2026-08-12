-- Daily Orders

CREATE TYPE order_status AS ENUM (
  'scheduled','locked','in_production','packed','dispatched','delivered',
  'skipped','paused','cancelled'
);

CREATE TABLE orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_no        TEXT UNIQUE NOT NULL,
  subscription_id UUID NOT NULL REFERENCES subscriptions(id),
  profile_id      UUID NOT NULL REFERENCES profiles(id),
  kitchen_id      UUID NOT NULL REFERENCES kitchens(id),
  address_id      UUID NOT NULL REFERENCES addresses(id),
  delivery_date   DATE NOT NULL,
  menu_item_id    UUID NOT NULL REFERENCES menu_items(id),
  quantity        INT DEFAULT 1,
  status          order_status DEFAULT 'scheduled',
  locked_at       TIMESTAMPTZ,
  customizations  JSONB DEFAULT '{}',
  delivery_slot   TEXT,
  driver_id       UUID REFERENCES profiles(id),
  delivered_at    TIMESTAMPTZ,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_orders_delivery_date ON orders(delivery_date);
CREATE INDEX idx_orders_kitchen_date ON orders(kitchen_id, delivery_date);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_profile ON orders(profile_id);
