/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Activity = "activity",
	Borrow = "borrow",
	Count = "count",
	Item = "item",
	Request = "request",
	Shipment = "shipment",
	ShipmentItem = "shipment_item",
	User = "user",
	Utilizee = "utilizee",
	Utilizer = "utilizer",
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
	"EDIT TOTAL" = "EDIT TOTAL",
	"EDIT UNIT" = "EDIT UNIT",
}
export type ActivityRecord = {
	user_id: RecordIdString
	item_id?: RecordIdString
	target_user_id?: RecordIdString
	edit_old_value?: string
	edit_new_value?: string
	action: ActivityActionOptions
}

export type BorrowRecord = {
	item: RecordIdString
	amount: number
	office: RecordIdString
	location: string
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
	supplier?: string
	remarks?: string
	type: ItemTypeOptions
	images?: string[]
	property_number: string
	serial_number: string
	is_removed?: boolean
	qr?: string
	total: number
	unit: string
}

export enum RequestTagOptions {
	"IT" = "IT",
	"OFFICE" = "OFFICE",
	"FURNITURE" = "FURNITURE",
}

export enum RequestStatusOptions {
	"PENDING" = "PENDING",
	"APPROVED" = "APPROVED",
	"ANO PA" = "ANO PA",
	"DECLINED" = "DECLINED",
}
export type RequestRecord = {
	office: RecordIdString
	item_name: string
	amount: number
	tag: RequestTagOptions
	unit: string
	description: string
	status: RequestStatusOptions
}

export enum ShipmentStatusOptions {
	"WAITING" = "WAITING",
	"COMPLETED" = "COMPLETED",
}
export type ShipmentRecord = {
	status: ShipmentStatusOptions
	created_by: RecordIdString
	month: string
}

export enum ShipmentItemTagOptions {
	"Furniture" = "Furniture",
	"IT" = "IT",
	"Office" = "Office",
}

export enum ShipmentItemTypeOptions {
	"RESTOCK" = "RESTOCK",
	"REQUEST" = "REQUEST",
}
export type ShipmentItemRecord = {
	item_name: string
	expected_amount: number
	tag: ShipmentItemTagOptions
	unit: string
	office: RecordIdString
	received_amount?: number
	shipment: RecordIdString
	type: ShipmentItemTypeOptions
	restock_item_id?: RecordIdString
}

export enum UserTypeOptions {
	"ADMIN" = "ADMIN",
	"STAFF" = "STAFF",
	"OFFICE" = "OFFICE",
	"OFFICER" = "OFFICER",
}
export type UserRecord = {
	name?: string
	avatar?: string
	plain_password: string
	is_active?: boolean
	is_removed?: boolean
	type: UserTypeOptions
}

export type UtilizeeRecord = {
	item: RecordIdString
	office: RecordIdString
	amount: number
	location: string
}

export type UtilizerRecord = {
	utilizer: RecordIdString
	amoun_given?: number
	item: RecordIdString
	utilizee: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type ActivityResponse<Texpand = unknown> = Required<ActivityRecord> & BaseSystemFields<Texpand>
export type BorrowResponse<Texpand = unknown> = Required<BorrowRecord> & BaseSystemFields<Texpand>
export type CountResponse<Texpand = unknown> = Required<CountRecord> & BaseSystemFields<Texpand>
export type ItemResponse<Texpand = unknown> = Required<ItemRecord> & BaseSystemFields<Texpand>
export type RequestResponse<Texpand = unknown> = Required<RequestRecord> & BaseSystemFields<Texpand>
export type ShipmentResponse<Texpand = unknown> = Required<ShipmentRecord> & BaseSystemFields<Texpand>
export type ShipmentItemResponse<Texpand = unknown> = Required<ShipmentItemRecord> & BaseSystemFields<Texpand>
export type UserResponse<Texpand = unknown> = Required<UserRecord> & AuthSystemFields<Texpand>
export type UtilizeeResponse<Texpand = unknown> = Required<UtilizeeRecord> & BaseSystemFields<Texpand>
export type UtilizerResponse<Texpand = unknown> = Required<UtilizerRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	activity: ActivityRecord
	borrow: BorrowRecord
	count: CountRecord
	item: ItemRecord
	request: RequestRecord
	shipment: ShipmentRecord
	shipment_item: ShipmentItemRecord
	user: UserRecord
	utilizee: UtilizeeRecord
	utilizer: UtilizerRecord
}

export type CollectionResponses = {
	activity: ActivityResponse
	borrow: BorrowResponse
	count: CountResponse
	item: ItemResponse
	request: RequestResponse
	shipment: ShipmentResponse
	shipment_item: ShipmentItemResponse
	user: UserResponse
	utilizee: UtilizeeResponse
	utilizer: UtilizerResponse
}