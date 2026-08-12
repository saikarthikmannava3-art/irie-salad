-- Plans & Subscriptions

CREATE TABLE plans (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id        UUID NOT NULL REFERENCES brands(id),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  duration_days   INT NOT NULL,
  meals_per_day   INT DEFAULT 1,
  price_per_meal  DECIMAL(10,2) NOT NULL,
  total_price     DECIMAL(10,2) NOT NULL,
  discount_pct    DECIMAL(5,2) DEFAULT 0,
  description     TEXT,
  features        TEXT[] DEFAULT '{}',
  is_trial        BOOLEAN DEFAULT false,
  is_active       BOOLEAN DEFAULT true,
  sort_order      INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TYPE subscription_status AS ENUM (
  'pending_payment','active','paused','completed','cancelled','expired'
);

CREATE TABLE subscriptions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_no TEXT UNIQUE NOT NULL,
  profile_id      UUID NOT NULL REFERENCES profiles(id),
  plan_id         UUID NOT NULL REFERENCES plans(id),
  brand_id        UUID NOT NULL REFERENCES brands(id),
  kitchen_id      UUID NOT NULL REFERENCES kitchens(id),
  address_id      UUID NOT NULL REFERENCES addresses(id),
  status          subscription_status DEFAULT 'pending_payment',
  start_date      DATE NOT NULL,
  end_date        DATE NOT NULL,
  total_meals     INT NOT NULL,
  meals_delivered INT DEFAULT 0,
  meals_remaining INT NOT NULL,
  pause_dates     DATE[] DEFAULT '{}',
  skip_dates      DATE[] DEFAULT '{}',
  preferences     JSONB DEFAULT '{}',
  amount_paid     DECIMAL(10,2),
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);
