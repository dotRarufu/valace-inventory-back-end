/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Activity = "activity",
	Count = "count",
	Item = "item",
	Test = "test",
	User = "user",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum ActivityActionOptions {
	"ADD ITEM" = "ADD ITEM",
	"ADD ACCOUNT" = "ADD ACCOUNT",
	"ADD ITEM THROUGH CSV" = "ADD ITEM THROUGH CSV",
	"DELETE ITEM" = "DELETE ITEM",
	"DELETE ACCOUNT" = "DELETE ACCOUNT",
	"DOWNLOAD QR" = "DOWNLOAD QR",
	"LOGIN" = "LOGIN",
	"LOGOUT" = "LOGOUT",
	"EDIT NAME" = "EDIT NAME",
	"EDIT QUANTITY" = "EDIT QUANTITY",
	"EDIT LOCATION" = "EDIT LOCATION",
	"EDIT SUPPLIER" = "EDIT SUPPLIER",
	"EDIT REMARKS" = "EDIT REMARKS",
	"EDIT TYPE" = "EDIT TYPE",
	"EDIT IMAGES" = "EDIT IMAGES",
	"EDIT ACCOUNT USERNAME" = "EDIT ACCOUNT USERNAME",
	"EDIT ACCOUNT ROLE" = "EDIT ACCOUNT ROLE",
	"EDIT ACCOUNT PASSWORD" = "EDIT ACCOUNT PASSWORD",
	"EDIT ACCOUNT STATUS" = "EDIT ACCOUNT STATUS",
	"EDIT PROPERTY NUMBER" = "EDIT PROPERTY NUMBER",
	"ADD ITEM IMAGE" = "ADD ITEM IMAGE",
	"DELETE ITEM IMAGE" = "DELETE ITEM IMAGE",
}
export type ActivityRecord = {
	user_id: RecordIdString
	action: ActivityActionOptions
	item_id?: RecordIdString
	target_user_id?: RecordIdString
	edit_old_value?: string
	edit_new_value?: string
}

export type CountRecord = {
	table: string
	count: number
}

export enum ItemTypeOptions {
	"Furniture" = "Furniture",
	"IT" = "IT",
	"Office" = "Office",
}
export type ItemRecord = {
	name: string
	quantity?: number
	location: string
	supplier?: string
	is_available?: boolean
	remarks?: string
	type: ItemTypeOptions
	images?: string[]
	property_number: string
	serial_number: string
	is_removed?: boolean
	qr: string
}

export type TestRecord = {
	field1?: string
}

export type UserRecord = {
	name?: string
	avatar?: string
	plain_password: string
	is_active?: boolean
	is_admin?: boolean
	is_removed?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type ActivityResponse<Texpand = unknown> = Required<ActivityRecord> & BaseSystemFields<Texpand>
export type CountResponse<Texpand = unknown> = Required<CountRecord> & BaseSystemFields<Texpand>
export type ItemResponse<Texpand = unknown> = Required<ItemRecord> & BaseSystemFields<Texpand>
export type TestResponse<Texpand = unknown> = Required<TestRecord> & BaseSystemFields<Texpand>
export type UserResponse<Texpand = unknown> = Required<UserRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	activity: ActivityRecord
	count: CountRecord
	item: ItemRecord
	test: TestRecord
	user: UserRecord
}

export type CollectionResponses = {
	activity: ActivityResponse
	count: CountResponse
	item: ItemResponse
	test: TestResponse
	user: UserResponse
}