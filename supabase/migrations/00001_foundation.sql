-- Organizations & Geography

CREATE TABLE organizations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  logo_url        TEXT,
  settings        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE brands (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID NOT NULL REFERENCES organizations(id),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  logo_url        TEXT,
  color_primary   TEXT DEFAULT '#1f4d3a',
  color_secondary TEXT DEFAULT '#7d8f62',
  domain          TEXT,
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE cities (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID NOT NULL REFERENCES organizations(id),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  timezone        TEXT DEFAULT 'Asia/Kolkata',
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE kitchens (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id         UUID NOT NULL REFERENCES cities(id),
  name            TEXT NOT NULL,
  code            TEXT UNIQUE NOT NULL,
  address         TEXT,
  lat             DECIMAL(10, 7),
  lng             DECIMAL(10, 7),
  capacity_orders INT DEFAULT 200,
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE delivery_zones (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kitchen_id      UUID NOT NULL REFERENCES kitchens(id),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL,
  polygon         JSONB,
  delivery_fee    DECIMAL(10,2) DEFAULT 0,
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now()
);
