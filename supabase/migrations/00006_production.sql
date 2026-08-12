-- 6 PM Snapshot & Production Planning

CREATE TYPE snapshot_status AS ENUM ('pending','processing','completed','failed');

CREATE TABLE daily_snapshots (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kitchen_id      UUID NOT NULL REFERENCES kitchens(id),
  production_date DATE NOT NULL,
  snapshot_taken  TIMESTAMPTZ NOT NULL,
  status          snapshot_status DEFAULT 'pending',
  total_orders    INT DEFAULT 0,
  locked_orders   INT DEFAULT 0,
  skipped_orders  INT DEFAULT 0,
  summary         JSONB DEFAULT '{}',
  created_by      UUID REFERENCES profiles(id),
  created_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE(kitchen_id, production_date)
);

CREATE TABLE production_requirements (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_id     UUID NOT NULL REFERENCES daily_snapshots(id),
  menu_item_id    UUID NOT NULL REFERENCES menu_items(id),
  quantity        INT NOT NULL,
  status          TEXT DEFAULT 'pending'
                  CHECK (status IN ('pending','in_progress','completed')),
  UNIQUE(snapshot_id, menu_item_id)
);

CREATE TABLE ingredient_requirements (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_id     UUID NOT NULL REFERENCES daily_snapshots(id),
  ingredient_id   UUID NOT NULL REFERENCES ingredients(id),
  required_qty    DECIMAL(10,3) NOT NULL,
  available_qty   DECIMAL(10,3) DEFAULT 0,
  shortage_qty    DECIMAL(10,3) DEFAULT 0,
  unit            TEXT NOT NULL,
  UNIQUE(snapshot_id, ingredient_id)
);
