CREATE TABLE "roles" (
                         "id" bigserial PRIMARY KEY,
                         "title" varchar NOT NULL
);

CREATE TABLE "inventories" (
                               "id" bigserial PRIMARY KEY,
                               "name" varchar NOT NULL,
                               "address" varchar NOT NULL
);

CREATE TABLE "users" (
                         "id" bigserial PRIMARY KEY,
                         "first_name" varchar NOT NULL,
                         "last_name" varchar NOT NULL,
                         "username" varchar NOT NULL,
                         "password" varchar NOT NULL,
                         "login_status" int,
                         "roles_id" bigserial NOT NULL,
                         "inventories_id" bigserial,
                         CONSTRAINT roles_fk FOREIGN KEY("roles_id") REFERENCES roles("id"),
                         CONSTRAINT inventories_fk FOREIGN KEY("inventories_id") REFERENCES inventories("id")
);


CREATE TABLE "items" (
                         "id" bigserial PRIMARY KEY,
                         "name" varchar NOT NULL,
                         "description" varchar NOT NULL,
                         "status" varchar NOT NULL,
                         "inventories_id" bigserial NOT NULL,
                         CONSTRAINT inventories_fk FOREIGN KEY ("inventories_id") REFERENCES inventories("id")
);


INSERT INTO
    "roles" ("title")
VALUES
    ('Admin'),
    ('Moderator');

ALTER TABLE "users" ALTER COLUMN "login_status" SET DEFAULT 0;

ALTER TABLE "users"
    ALTER COLUMN "inventories_id" DROP NOT NULL;

ALTER TABLE "users"
    ALTER COLUMN "inventories_id" DROP DEFAULT;