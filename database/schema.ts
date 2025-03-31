import {pgTable,uuid, varchar, date, timestamp} from 'drizzle-orm/pg-core';


export const usersTable = pgTable('users_table', {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    name: varchar("first_name",{length:255}).notNull(),
    email: varchar("email").notNull().unique(),
    img: varchar("image_url").notNull(),
    lastActivityDate: date("last_Activity_Date").defaultNow(),
    createdAt: timestamp("created_At",{
        withTimezone: true,
    }).defaultNow(),

});


