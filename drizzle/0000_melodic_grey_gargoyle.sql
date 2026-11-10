CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`influencer_id` integer NOT NULL,
	`kind` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`influencer_id`) REFERENCES `influencers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `influencers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`instagram` text DEFAULT '' NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`commission_cents` integer DEFAULT 100000 NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `influencers_slug_unique` ON `influencers` (`slug`);--> statement-breakpoint
CREATE TABLE `property_settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text DEFAULT 'Casa à venda' NOT NULL,
	`location` text DEFAULT 'Localização a confirmar' NOT NULL,
	`original_price_cents` integer DEFAULT 0 NOT NULL,
	`discount_percent` integer DEFAULT 5 NOT NULL,
	`whatsapp_number` text DEFAULT '' NOT NULL,
	`description` text DEFAULT 'Um imóvel especial, com condição exclusiva para contatos vindos da nossa rede de influenciadores.' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
