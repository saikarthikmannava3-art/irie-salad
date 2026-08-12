-- Payments

CREATE TYPE payment_status AS ENUM (
  'created','authorized','captured','failed','refunded'
);

CREATE TABLE payments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id),
  profile_id      UUID NOT NULL REFERENCES profiles(id),
  razorpay_order_id    TEXT,
  razorpay_payment_id  TEXT,
  razorpay_signature   TEXT,
  amount          DECIMAL(10,2) NOT NULL,
  currency        TEXT DEFAULT 'INR',
  status          payment_status DEFAULT 'created',
  method          TEXT,
  error_code      TEXT,
  error_desc      TEXT,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_payments_subscription ON payments(subscription_id);
