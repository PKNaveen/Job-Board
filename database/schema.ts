import {pgTable, uuid, varchar, date, timestamp, integer, text, pgEnum} from 'drizzle-orm/pg-core';

export const stageEnum = pgEnum("stage",["Wishlist","Applied","OARound","Interview","FinalOffer"])
export const usersTable = pgTable('users_table', {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    name: varchar("name",{length:255}).notNull(),
    email: varchar("email").notNull().unique(),
    img: varchar("image_url").notNull(),
    lastActivityDate: date("last_Activity_Date").defaultNow(),
    createdAt: timestamp("created_At",{
        withTimezone: true,
    }).defaultNow(),

});

// card to board relation: one to one
export const board = pgTable('board', {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    user_id: uuid("user_id").unique().notNull().references(()=> usersTable.id,{onDelete:"cascade"}),
    board_name: varchar("board_name",{length:255}).notNull(),
    created_at: timestamp("created_At",{
        withTimezone: true,
    }).defaultNow()
})

// Lists are column names for exmaple: Wishlist, applied, OA, interview, final offer and its position in the front end
// board and board_list relation one to many
export const board_list = pgTable('board_list', {
    id: uuid("id").primaryKey().notNull().defaultRandom().unique(),
    board_id: uuid("board_id").notNull().references(()=> board.id,{onDelete:"cascade"}),
    list_name: varchar("list_name",{length:25}).notNull(),
    position: integer().notNull()
})

// board_list and card relation: one to many
export const card = pgTable('card', {
    id: uuid("id").primaryKey().notNull().defaultRandom().unique(),
    list_id: uuid("list_id").notNull().references(()=> board_list.id,{onDelete:"cascade"}),
    title: varchar("card_name",{length:255}).notNull(),
    description: text("description").notNull(),
    position:integer().notNull(),
    post_url: text("post_url").notNull(),
    location: text("location").notNull(),
    salary: text("salary").notNull(),
    stage:stageEnum().default("Wishlist").notNull(),
    created_at: timestamp("created_at",{
        withTimezone: true,
    }).defaultNow(),
})


export const master_board_list = pgTable('master_board_list', {
    id:uuid("id").primaryKey().defaultRandom().unique(),
    column_name:varchar("column_name",{length:255}).notNull(),
})

export const all_contacts = pgTable('all_contacts', {
    id:uuid("id").primaryKey().defaultRandom().unique(),
    board_id: uuid("board_id").notNull().references(()=> board.id,{onDelete:"cascade"}),
    name: varchar("name").notNull(),
    company:varchar("company").notNull(),
    title:varchar("title").notNull(),
    email: varchar("email"),
    phone: varchar("phone"),
    linkedin: varchar("linkedin"),
    twitter:varchar("twitter"),

})
