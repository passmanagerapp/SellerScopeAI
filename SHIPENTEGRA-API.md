# ShipEntegra API — reference

**Official docs:** <https://docs.shipentegra.com/> — interactive reference (strip any
`?_gl=…` / `?_gcl_…` analytics query string from copied links; operations deep-link as
`#tag/<Tag>/operation/<operationId>`).

Generated from the official OpenAPI spec (`SHIPENTEGRA API REFERENCE`, version **v4.0.4**),
fetched from <https://docs.shipentegra.com/openapi.json> (the JSON behind <https://docs.shipentegra.com>).

**Regenerate** when the vendor bumps the version:

```bash
curl -sL https://docs.shipentegra.com/openapi.json -o /tmp/se.json
```

This is a *vendored summary* — the spec is the source of truth. See "Reality checks" at the
bottom for behaviour this repo has observed that the spec does not document.

## Servers

| Environment | Base URL |
| --- | --- |
| Sandbox Server | `https://newfront.shipentegra.com/v1` |
| Production Server | `https://publicapi.shipentegra.com/v1` |

This repo hard-codes the **production** base URL in each `api/ShipEntegra*.kt` file.

## Authentication

Every endpoint except `POST /auth/token` requires `Authorization: Bearer <accessToken>`
(`bearerToken`, HTTP bearer scheme). The repo's interactive proxy endpoints share one cached token
(`api/ShipEntegraAuth.kt`, 20-minute TTL, refreshed on a 401) obtained by POSTing `clientId` /
`clientSecret` to `/auth/token`; the endpoint is rate-limited (HTTP 429 under a burst) and its
`accessTokenValidity` comes back empty. The daily crons still fetch their own token per run.

## Endpoint index

| Method | Path | Tag | operationId | Summary |
| --- | --- | --- | --- | --- |
| `POST` | `/auth/token` | Auth | `authorize` | Obtain Access Token |
| `POST` | `/logistics/labels/shipentegra` | Logistics | `createShipEntegraLabel` | ShipEntegra Label |
| `POST` | `/logistics/labels/shipentegra/ups` | Logistics | `createSeUpsLabel` | SE Ups Label |
| `POST` | `/logistics/labels/shipentegra/ups/envelope` | Logistics | `seUpsEnvelopeLabel` | SE Ups Envelope Label |
| `POST` | `/logistics/labels/shipentegra/fedex` | Logistics | `createSeFedExLabel` | SE FedEx Label |
| `POST` | `/logistics/labels/shipentegra/dhlecommerce` | Logistics | `createSeDhlEcommerceLabel` | SE-DHL E-commerce Label |
| `POST` | `/logistics/files` | Logistics | `uploadLogisticsFiles` | Upload Logistics Files |
| `GET` | `/logistics/files/{orderId}` | Logistics | `listLogisticsFiles` | List Logistics Files |
| `DELETE` | `/logistics/files/{orderId}` | Logistics | `deleteLogisticsFile` | Delete Logistics File |
| `POST` | `/tools/calculate` | Tools | `calculatePrice` | Calculate Price |
| `POST` | `/tools/calculate/all` | Tools | `calculateAllPrices` | Calculate All Prices |
| `POST` | `/tools/tariff-calculator` | Tools | `searchTariffCode` | Search Tariff Code |
| `POST` | `/tools/tariff-calculator/by-carrier` | Tools | `calculateEstimatedCost` | Calculate Estimated Cost |
| `POST` | `/orders` | Orders | `createMultiPackageOrder` | Create Order |
| `POST` | `/orders/manual` | Orders | `createOrder` | Create Order |
| `GET` | `/orders/manual` | Orders | `findOrders` | Find Orders |
| `GET` | `/orders/manual/{shipEntegraOrderId}` | Orders | `findOrder` | Find Order |
| `PUT` | `/orders/{shipEntegraOrderId}` | Orders | `updateOrder` | Update Order |
| `POST` | `/orders/{shipEntegraOrderId}/hold` | Orders | `holdOrder` | Hold Order |
| `POST` | `/orders/{shipEntegraOrderId}/unhold` | Orders | `unholdOrder` | Unhold Order |
| `POST` | `/orders/post` | Orders | `createPostOrders` | Create Post Orders |
| `GET` | `/logistics/shipments/activities` | Logistics | `findCargoActivities` | Find Cargo Activities |
| `GET` | `/settings/currencies` | Settings | `exchangeRates` | Exchange Rates |
| `GET` | `/users/carriers` | Users | `findCarriers` | Find Carriers |
| `GET` | `/users/stores` | Users | `listStores` | List Stores |
| `PATCH` | `/orders/etgb` | Orders | `markAsEtgb` | Mark as ETGB / non-ETGB |

## Auth

### `POST /auth/token`

**Obtain Access Token** — `authorize`

Authorizes the given client.

**Request body** (`application/json`)

- `clientId` *string* **required** — Client id provided by us
- `clientSecret` *string* **required** — Client secret provided by us

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp
- `code` *number* **required** — api code
- `data` *object* **required**
  - `accessToken` *string* **required** — access token
  - `refreshToken` *string* **required** — refresh token
  - `tokenType` *string* **required** — token type; enum: `bearer`
  - `accessTokenValidity` *string* **required** — validity of access token

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

## Logistics

### `POST /logistics/labels/shipentegra`

**ShipEntegra Label** — `createShipEntegraLabel`

Create ShipEntegra label

**Request body** (`application/json`)

- `orderId` *integer* **required** — Shipment id to print ShipEntegra label
- `specialService` *string* — Special services of ShipEntegra label provided by us
- `verpackg` *integer* — VerpackG option to be used for Germany Packaging Law (Verpackungsgesetz) **-1**: No Action (for non-DE country) **1**: I know the packaging law, I will follow the procedure myself **2**: Let ShipEntegra handle all transactions within the scope of packaging law additional fees will apply; enum: `-1`, `1`, `2`
- `insurance` *boolean* — Insuring/not insuring for related shipment
- `content` *string* — Content of related shipment; maxLen 50
- `weight` *number* — Weight of related shipment
- `iossNumber` *string* — IOSS/HMRC/VOEC number to be used to related shipment; maxLen 19
- `currency` *string* — One of ISO-4217 currency codes; maxLen 3
- `items` *object[]* — Products in related shipment
  - `itemId` *integer* **required** — id of the related item
  - `declaredPrice` *number* **required** — Declared price of the related item
  - `declaredQuantity` *integer* **required** — Declared quantity of the related item
  - `gtip` *string* — Global Tariff Item Position code (a.k.a HTS code) of the related item; maxLen 20

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code
- `data` *object* **required** — Label response
  - `success` *boolean* **required** — If true, the label/invoice is created successfully
  - `orderId` *integer* **required** — Id of related shipment
  - `message` *string* **required** — Message of the label result
  - `label` *string(url)* — Url of the created label
  - `invoice` *string(url)* — Url of the created invoice
  - `trackingNumber` *string* — The tracking number of the created label
  - `serviceType` *any* — The service type of the created label; enum: `Express`, `Eco`
  - `shipEntegraLabel` *string(url)* — Url of the created ShipEntegra label (if applicable)
  - `warning` *string* — Warning message if any
  - `seOrderId` *integer* — The order id of the created label (if applicable)

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `POST /logistics/labels/shipentegra/ups`

**SE Ups Label** — `createSeUpsLabel`

Create SE-UPS label

**Request body** (`application/json`)

- `orderId` *integer* **required** — Shipment id to print SE-UPS label
- `specialService` *string* — Special services of SE-UPS label provided by us
- `content` *string* — Content of related shipment; maxLen 50
- `weight` *number* — Weight of related shipment
- `iossNumber` *string* — IOSS/HMRC/VOEC number to be used to related shipment; maxLen 19
- `currency` *string* — One of ISO-4217 currency codes; maxLen 3
- `items` *object[]* — Products in related shipment
  - `itemId` *integer* **required** — id of the related item
  - `declaredPrice` *number* **required** — Declared price of the related item
  - `declaredQuantity` *integer* **required** — Declared quantity of the related item
  - `gtip` *string* — Global Tariff Item Position code (a.k.a HTS code) of the related item; maxLen 20

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code
- `data` *object* **required** — Label response
  - `success` *boolean* **required** — If true, the label/invoice is created successfully
  - `orderId` *integer* **required** — Id of related shipment
  - `message` *string* **required** — Message of the label result
  - `label` *string(url)* — Url of the created label
  - `invoice` *string(url)* — Url of the created invoice
  - `trackingNumber` *string* — The tracking number of the created label
  - `serviceType` *any* — The service type of the created label; enum: `Express`, `Eco`
  - `shipEntegraLabel` *string(url)* — Url of the created ShipEntegra label (if applicable)
  - `warning` *string* — Warning message if any
  - `seOrderId` *integer* — The order id of the created label (if applicable)

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `POST /logistics/labels/shipentegra/ups/envelope`

**SE Ups Envelope Label** — `seUpsEnvelopeLabel`

Generates a UPS envelope label for the given order. **This API is only applicable to orders with packaging type 1 (document).**

**Request body** (`application/json`)

- `shipFrom` *object* — Shipper's information for the order. The shipFrom address must be located in Turkey and the country code must be TR. Note: This field is only applicable to resellers and authorized users.
  - `name` *string* **required** — Shipper name. It must be at least 2 names (first name and last name) and maximum 50 characters.; maxLen 50
  - `address1` *string* **required** — Shipper address line 1; maxLen 35
  - `address2` *string* — Shipper address line 2 (optional); maxLen 35
  - `city` *string* **required** — Shipper city; maxLen 35
  - `state` *string* — Shipper state (optional); maxLen 35
  - `zipCode` *string* **required** — Shipper postal code; maxLen 15
  - `country` *string* **required** — Shipper country code. It must be TR.; maxLen 2
  - `phone` *string* — Shipper phone number (optional) It must be maximum 32 characters and can include digits, spaces, parentheses, dashes, plus signs, and an optional extension (e.g., "ext 1234", "dahili 1234", "x1234", "#1234", "-1234").; maxLen 32
  - `email` *string(email)* — Shipper email address (optional); maxLen 60
  - `tin` *string* — Shipper tax identification number (optional). The TIN (Tax Identification Number) is a unique identifier assigned to businesses and individuals for tax purposes. The format of the TIN can vary by country, but it generally consists of letters and digits. This field is optional, but if provided, it must be no longer than 20 characters and can only contain alphanumeric characters (letters and digits). Note: This field is only applicable to resellers.; maxLen 20
- *exactly one of:*
  - *variant 1:*
    - `orderId` *integer* **required** — Shipment id to print UPS envelope label
  - *variant 2:*
    - `storeId` *integer* **required** — Store ID provided by us to identify the order
    - `number` *string* **required** — Order number provided by us or the related marketplace to identify the order

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code
- `data` *object* **required** — Label response
  - `success` *boolean* **required** — If true, the label/invoice is created successfully
  - `orderId` *integer* **required** — Id of related shipment
  - `message` *string* **required** — Message of the label result
  - `label` *string(url)* — Url of the created label
  - `invoice` *string(url)* — Url of the created invoice
  - `trackingNumber` *string* — The tracking number of the created label
  - `serviceType` *any* — The service type of the created label; enum: `Express`, `Eco`
  - `shipEntegraLabel` *string(url)* — Url of the created ShipEntegra label (if applicable)
  - `warning` *string* — Warning message if any
  - `seOrderId` *integer* — The order id of the created label (if applicable)

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `POST /logistics/labels/shipentegra/fedex`

**SE FedEx Label** — `createSeFedExLabel`

Create SE-FedEx label

**Request body** (`application/json`)

- `orderId` *integer* **required** — Shipment id to print SE-FedEx label
- `specialService` *string* — Special services of SE-FedEx label provided by us
- `content` *string* — Content of related shipment; maxLen 50
- `weight` *number* — Weight of related shipment
- `iossNumber` *string* — IOSS/HMRC/VOEC number to be used to related shipment; maxLen 19
- `currency` *string* — One of ISO-4217 currency codes; maxLen 3
- `items` *object[]* — Products in related shipment
  - `itemId` *integer* **required** — id of the related item
  - `declaredPrice` *number* **required** — Declared price of the related item
  - `declaredQuantity` *integer* **required** — Declared quantity of the related item
  - `gtip` *string* — Global Tariff Item Position code (a.k.a HTS code) of the related item; maxLen 20

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code
- `data` *object* **required** — Label response
  - `success` *boolean* **required** — If true, the label/invoice is created successfully
  - `orderId` *integer* **required** — Id of related shipment
  - `message` *string* **required** — Message of the label result
  - `label` *string(url)* — Url of the created label
  - `invoice` *string(url)* — Url of the created invoice
  - `trackingNumber` *string* — The tracking number of the created label
  - `serviceType` *any* — The service type of the created label; enum: `Express`, `Eco`
  - `shipEntegraLabel` *string(url)* — Url of the created ShipEntegra label (if applicable)
  - `warning` *string* — Warning message if any
  - `seOrderId` *integer* — The order id of the created label (if applicable)

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `POST /logistics/labels/shipentegra/dhlecommerce`

**SE-DHL E-commerce Label** — `createSeDhlEcommerceLabel`

Creates SE DHL E-ecommerce label

**Request body** (`application/json`)

- `orderId` *integer* **required** — Shipment id to print SE-DHL E-Commerce label
- `specialService` *string* — Special services of SE-DHL E-Commerce label provided by us
- `content` *string* — Content of related shipment; maxLen 50
- `weight` *number* — Weight of related shipment
- `iossNumber` *string* — IOSS/HMRC/VOEC number to be used to related shipment; maxLen 19
- `currency` *string* — One of ISO-4217 currency codes; maxLen 3
- `items` *object[]* — Products in related shipment
  - `itemId` *integer* **required** — id of the related item
  - `declaredPrice` *number* **required** — Declared price of the related item
  - `declaredQuantity` *integer* **required** — Declared quantity of the related item
  - `gtip` *string* — Global Tariff Item Position code (a.k.a HTS code) of the related item; maxLen 20

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code
- `data` *object* **required** — Label response
  - `success` *boolean* **required** — If true, the label/invoice is created successfully
  - `orderId` *integer* **required** — Id of related shipment
  - `message` *string* **required** — Message of the label result
  - `label` *string(url)* — Url of the created label
  - `invoice` *string(url)* — Url of the created invoice
  - `trackingNumber` *string* — The tracking number of the created label
  - `serviceType` *any* — The service type of the created label; enum: `Express`, `Eco`
  - `shipEntegraLabel` *string(url)* — Url of the created ShipEntegra label (if applicable)
  - `warning` *string* — Warning message if any
  - `seOrderId` *integer* — The order id of the created label (if applicable)

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `POST /logistics/files`

**Upload Logistics Files** — `uploadLogisticsFiles`

Upload files related to logistics

**Request body** (`application/json`)

- `files` *object[]* **required**
  - `orderId` *integer* **required** — ShipEntegra order id
  - `type` *integer* **required** — Document type: 1 = E-Archive, 2 = MSDS, 3 = TSCA, 4 = FDA, 99 = Other; enum: `1`, `2`, `3`, `4`, `99`
  - `file` *string* **required** — Data url of the document

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `data` *object[]* **required** — Array of uploaded files
  - `success` *boolean* **required** — Result of the upload file operation
  - `orderId` *integer* **required** — ShipEntegra order id
  - `id` *integer* — Uploaded file id
  - `type` *integer* — Document type **1** = E-Archive, **2** = MSDS, **3** = TSCA, **4** = FDA, **99** = Other; enum: `1`, `2`, `3`, `4`, `99`
  - `fileUri` *string(url)* — Uploaded file url
  - `createdAt` *string(date-time)* — File upload time

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `GET /logistics/files/{orderId}`

**List Logistics Files** — `listLogisticsFiles`

Lists logistics files

**Parameters**

| Name | In | Type | Notes |
| --- | --- | --- | --- |
| `orderId` | path | integer | ShipEntegra order id |

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `data` *object[]* **required** — Array of logistics files
  - `id` *integer* **required** — File id
  - `orderId` *integer* **required** — ShipEntegra order id
  - `fileUri` *string* **required** — File url
  - `type` *integer* **required** — Document type: 1 = E-Archive, 2 = MSDS, 3 = TSCA, 4 = FDA, 99 = Other; enum: `1`, `2`, `3`, `4`, `99`
  - `createdAt` *string(date-time)* **required** — File upload time

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `DELETE /logistics/files/{orderId}`

**Delete Logistics File** — `deleteLogisticsFile`

Deletes logistics file by file id

**Parameters**

| Name | In | Type | Notes |
| --- | --- | --- | --- |
| `orderId` | path | integer | File id |

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string(date-time)* **required** — response timestamp by UTC
- `data` *object* **required**
  - `success` *boolean* **required** — If true, the given file deleted. Otherwise the file could not find.
  - `message` *string* — Internal error code
  - `description` *string* **required** — Error message

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `GET /logistics/shipments/activities`

**Find Cargo Activities** — `findCargoActivities`

Lists cargo activities of related shipment.

**Parameters**

| Name | In | Type | Notes |
| --- | --- | --- | --- |
| `trackingNumber` | query | string | Tracking number provided by carriers |

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code
- `data` *object* **required** — cargo activities
  - `status` *string* — cargo status
  - `deliveryDate` *string(datetime)* — If the cargo is delivered
  - `destinationCountry` *string* — Country ISO code (ISO 3361-1)
  - `summary` *string* — Activity summary
  - `trackingNumber` *string* — Given tracking number
  - `lastMileTrackingNumber` *string* — Last tracking number to deliver
  - `lastMileCarrier` *string* — Last carrier to deliver
  - `activities` *object[]* — activities
    - `date` *string(datetime)* **required** — Action date
    - `event` *string* **required** — Cargo activity

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

## Tools

### `POST /tools/calculate`

**Calculate Price** — `calculatePrice`

Calculates ShipEntegra price by the given parameters.

**Request body** (`application/json`)

- `country` *string* **required** — ISO 3166-1 Alpha-2 Country Code; maxLen 2
- `kgDesi` *number* **required** — kg/desi to be used
- `seCarrier` *string* **required** — ShipEntegra carrier; maxLen 128
- `isAmazonShipment` *number* — 0: Non-Amazon shipment, 1-Amazon shipment; default `0`

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code
- `data` *object* **required** — calculation result
  - `success` *boolean* **required** — If true, the calculation operation is successful. Otherwise false.
  - `fuel` *number(double)* — fuel cost (USD)
  - `price` *number(double)* — ShipEntegra price (USD)
  - `uniqueCode` *string* — result code

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `POST /tools/calculate/all`

**Calculate All Prices** — `calculateAllPrices`

Calculates ShipEntegra prices by the given parameters.

**Request body** (`application/json`)

- `country` *string* **required** — ISO 3166-1 Alpha-2 Country Code; maxLen 2
- `kgDesi` *number* **required** — kg/desi to be used

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code
- `data` *object* **required** — calculation result
  - `generalInfo` *string* — general information for prices
  - `bestCarrier` *string* — best carrier for given shipment
  - `uniqueCode` *string* — result code
  - `prices` *object[]* — ShipEntegra price list
    - `cargoPrice` *number* — ShipEntegra price (USD)
    - `fuelCost` *number* — fuel cost (USD)
    - `totalPrice` *number* — total price (price + fuel) (USD)
    - `serviceType` *string* — service type provided by us; enum: `EXPRESS`, `ECO`
    - `serviceName` *string* — ShipEntegra carrier
    - `clearServiceName` *string* — human readable service name
    - `additionalDescription` *string* — additional descripton for carrier
    - `pricing` *string* — pricing type for internal usage purposes
    - `fuelMultiplier` *number(float)* — fuel multiplier value
    - `tooltip` *string* — fuel multiplier description
    - `discount` *number(float)* — discount value if applied, otherwise 0
    - `discountedCargoPrice` *number(float)* — cargo price after discount applied
    - `currency` *string* — one of ISO 4217 currency codes
    - `additionalFee` *number(float)* — additional fee applied to the shipment (USD) (e.g peak season, remote area, ...etc)
    - `additionalFeeDescription` *string* — description for additional fee (e.g peak season, remote area, ...etc)
    - `totalPriceWithAdditionalFee` *number* — total price with additional fee applied (USD)

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `POST /tools/tariff-calculator`

**Search Tariff Code** — `searchTariffCode`

Search for tariff code details using HTS code and related parameters.

**Parameters**

| Name | In | Type | Notes |
| --- | --- | --- | --- |
| `search` | query | string | Product name or description to search for |

**Request body** (`application/json`)

- `htsCode` *string* **required** — Harmonized Tariff Schedule code
- `origin` *string* **required** — Country of origin
- `destination` *string* **required** — Destination country; enum: `US`
- `quantity` *integer* **required** — Quantity of the goods
- `unitPrice` *number(float)* **required** — Unit price of the goods

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code for internal use
- `data` *object* **required** — Search Results
  - `results` *object[]* **required** — found tariff rates
    - `htsno` *string* — Harmonized Tariff Schedule number
    - `fullDescription` *string* — Full description of the tariff item
    - `textRate` *string* — Text rate of the tariff item

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `POST /tools/tariff-calculator/by-carrier`

**Calculate Estimated Cost** — `calculateEstimatedCost`

Calculate estimated tariff costs using HTS code and related parameters.

**Request body** (`application/json`)

- `htsCode` *string* **required** — Harmonized Tariff Schedule code
- `origin` *string* **required** — Country of origin; enum: `TR`
- `destination` *string* **required** — Destination country; enum: `US`
- `quantity` *integer* **required** — Quantity of the goods
- `unitPrice` *number(float)* **required** — Unit price of the goods
- `currency` *string* — Currency code in ISO 4217 format
- `carrier` *string* — Carriers/Services provided by ShipEntegra
- `weight` *number(float)* — Weight of the goods in kilograms

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code for internal use
- `data` *object* **required** — Estimated cost result
  - `duties` *object[]* **required** — Calculated duties
    - `htsCode` *string* — Harmonized Tariff Schedule number
    - `type` *string* — Type of duty
    - `price` *number(float)* — Calculated duty price
    - `adValRate` *number(float)* — Ad valorem rate percentage (if applicable)
    - `itemId` *number* — Order item identifier

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

## Orders

### `POST /orders`

**Create Order** — `createMultiPackageOrder`

Creates an order with multiple packages

**Parameters**

| Name | In | Type | Notes |
| --- | --- | --- | --- |
| `Accept-Language` | header | string | Preferred language for the response messages. Supported values are en, tr. Default is tr. |

**Request body** (`application/json`)

- `currency` *string* **required** — Supported currency codes (ISO-4217 format); enum: `USD`, `EUR`, `GBP`, `SAR`, `AED`, `AUD`, `CAD`, `KWD`, `CHF`, `SEK`, `NOK`, `TRY`
- `description` *string* **required** — Description of the order
- `vatNumber` *string* — IOSS number for EU orders, VOEC number for Norway orders, HMRC number for UK orders, ..etc
- `orderNumber` *string* — Unique ID by Client side
- `freightCharge` *number(float)* — Freight charge for the order **Note:** This field is only applicable to resellers.
- `reference` *string* — Reference information for the order; maxLen 48
- `exportReason` *string* — Reason for export, required for international shipments. You can use the following values: Sale, Gift, Sample, Return, Repair, Personal Use or your own custom reason.; maxLen 16
- `packagingType` *integer* — Packaging type for the order. The value 1 indicates that the order is a document. **Note:** This field is only applicable to authorized users. If you are not authorized, please contact us.; enum: `1`
- `shippingType` *integer* — Shipping type for the order. Supported values are: 1: ShipEntegra DDP 2: DDU 3: IOSS 4: ShipEntegra IOSS 5: HMRC 6: OTHER 7: VOEC; enum: `1`, `2`, `3`, `4`, `5`, `6`, `7`
- `shipTo` *object* **required** — Recipient's information for the order
  - `name` *string* **required** — Recipient name. It must be at least 2 names (first name and last name) and maximum 50 characters.; maxLen 50
  - `address1` *string* **required** — Recipient address line 1; maxLen 35
  - `address2` *string* — Recipient address line 2 (optional); maxLen 35
  - `city` *string* **required** — Recipient city; maxLen 35
  - `state` *string* — Recipient state (optional); maxLen 35
  - `zipCode` *string* **required** — Recipient postal code; maxLen 15
  - `country` *string* **required** — Recipient country (ISO 3166-1 Alpha-2 Country Code). It must be exactly 2 uppercase letters.; maxLen 2
  - `phone` *string* — Recipient phone number (optional) It must be maximum 32 characters and can include digits, spaces, parentheses, dashes, plus signs, and an optional extension (e.g., "ext 1234", "dahili 1234", "x1234", "#1234", "-1234").; maxLen 32
  - `email` *string(email)* — Recipient email address (optional); maxLen 60
  - `tin` *string* — Shipper tax identification number (optional). The TIN (Tax Identification Number) is a unique identifier assigned to businesses and individuals for tax purposes. The format of the TIN can vary by country, but it generally consists of letters and digits. This field is optional, but if provided, it must be no longer than 20 characters and can only contain alphanumeric characters (letters and digits). Note: This field is only applicable to resellers.; maxLen 20
  - `eori` *string* — Recipient EORI number (optional). The EORI (Economic Operators Registration and Identification) number is a unique identifier assigned to businesses that engage in customs activities within the European Union. This field is optional, but if provided, it must be no longer than 20 characters and can only contain alphanumeric characters (letters and digits). Note: This field is only applicable to resellers.; maxLen 20
- `shipFrom` *object* **required** — Shipper's information for the order. The shipFrom address must be located in Turkey and the country code must be TR. Note: This field is only applicable to resellers and authorized users.
  - `name` *string* **required** — Shipper name. It must be at least 2 names (first name and last name) and maximum 50 characters.; maxLen 50
  - `address1` *string* **required** — Shipper address line 1; maxLen 35
  - `address2` *string* — Shipper address line 2 (optional); maxLen 35
  - `city` *string* **required** — Shipper city; maxLen 35
  - `state` *string* — Shipper state (optional); maxLen 35
  - `zipCode` *string* **required** — Shipper postal code; maxLen 15
  - `country` *string* **required** — Shipper country code. It must be TR.; maxLen 2
  - `phone` *string* — Shipper phone number (optional) It must be maximum 32 characters and can include digits, spaces, parentheses, dashes, plus signs, and an optional extension (e.g., "ext 1234", "dahili 1234", "x1234", "#1234", "-1234").; maxLen 32
  - `email` *string(email)* — Shipper email address (optional); maxLen 60
  - `tin` *string* — Shipper tax identification number (optional). The TIN (Tax Identification Number) is a unique identifier assigned to businesses and individuals for tax purposes. The format of the TIN can vary by country, but it generally consists of letters and digits. This field is optional, but if provided, it must be no longer than 20 characters and can only contain alphanumeric characters (letters and digits). Note: This field is only applicable to resellers.; maxLen 20
- `products` *object[]* **required** — List of products in the order
  - `name` *string* **required** — Name of the product; maxLen 512
  - `quantity` *integer* **required** — Quantity of the product
  - `unitPrice` *number(float)* **required** — Price of a single unit of the product
  - `lineItemKey` *string* — Unique ID for the line item by Client side; maxLen 64
  - `hsCode` *string* — Harmonized System Code (a.k.a GTIP number) for the product; maxLen 20
  - `sku` *string* — Stock Keeping Unit for the product; maxLen 64
  - `imageUrl` *string(uri)* — Image URL for the product; maxLen 255
  - `options` *object[]* — List of options for the product (e.g. color, size, ..etc)
    - `name` *string* **required** — Name of the option. For example, "Color", "Size", etc.; maxLen 64
    - `value` *string* **required** — Value of the option. For example, if the option name is "Color", the value can be "Blue", "Red", etc.; maxLen 64
- `packages` *object[]* **required** — List of packages in the order
  - `width` *integer* **required** — Package width in cm
  - `height` *integer* **required** — Package height in cm
  - `length` *integer* **required** — Package length in cm
  - `weight` *number(float)* **required** — Package weight in kg
  - `packageQuantity` *integer* **required** — Quantity of packages with the same dimensions and weight

### `POST /orders/manual`

**Create Order** — `createOrder`

Creates an order on ShipEntegra platform This endpoint is deprecated and will be removed on March 1, 2026. Please use the /orders (post) endpoint instead. The /orders endpoint allows you to create orders with multiple packages, while this endpoint only allows you to create orders with a single package. If you want to create an order with multiple packages, please use the /orders endpoint instead. If you want to create an order with a single package, you can still use this endpoint, but we recommend using the /orders endpoint for better consistency and future compatibility.

**Request body** (`application/json`)

- `number` *string* — Unique ID by Client side; maxLen 128
- `packageQuantity` *integer* **required** — Package quantity; default `1`
- `description` *string* **required** — Content of related order; maxLen 50
- `service` *integer* — Service type of related order (1-Express, 2-Eco); enum: `1`, `2`
- `currency` *string* **required** — One of ISO-4217 currency codes; maxLen 3
- `weight` *number(float)* — Order weight
- `width` *integer* — Order width
- `height` *integer* — Order height
- `length` *integer* — Order length
- `reference1` *string* — Reference information to be used; maxLen 40
- `iossNumber` *string* — IOSS/HMRC/VAT number to be used; maxLen 33
- `rememberMyAddress` *boolean* — If the user save the receiver, it must be true. Otherwise false.
- `addressName` *string* — Address name for the receiver address (it's required, if the rememberMyAddress is true)
- `shippingAmount` *number(float)* — Shipping amount
- `shippingType` *integer* — Available values: 1: ShipEntegra DDP 2: DDU 3: IOSS 4: ShipEntegra IOSS 5: HMRC 6: OTHER 7: VOEC; enum: `1`, `2`, `3`, `4`, `5`, `6`, `7`
- `shippingAddress` *object* **required** — Receiver's address
  - `name` *string* **required** — Receiver name; maxLen 128
  - `address` *string* **required** — Receiver address; maxLen 255
  - `city` *string* **required** — Receiver city; maxLen 128
  - `country` *string* **required** — Receiver country (ISO 3166-1 Alpha-2 Country Code); maxLen 2
  - `state` *string* — Receiver state (if the receiver's country is US, the state is required); maxLen 128
  - `postalCode` *string* **required** — Receiver postal code; maxLen 128
  - `phone` *string* — Receiver phone number; maxLen 15
  - `email` *string* — Receiver email address; maxLen 60
  - `town` *string* — Receiver town; maxLen 35
- `items` *object[]* **required** — Products in the order
  - `quantity` *integer* **required** — quantity of the product in related order
  - `unitPrice` *number(float)* **required** — unit price of the product
  - `name` *string* **required** — product name; maxLen 512
  - `sku` *string* — stock code of the product; maxLen 128
  - `gtip` *object* — Tariff code of the product
  - `imageUrl` *string* — URL of the product image; maxLen 255

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code
- `data` *object* **required** — Order result
  - `success` *boolean* **required** — Operation result
  - `orderId` *number* **required** — Created order id
  - `description` *string* **required** — error description to developers

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `GET /orders/manual`

**Find Orders** — `findOrders`

List orders

**Parameters**

| Name | In | Type | Notes |
| --- | --- | --- | --- |
| `page` | query | integer | page number |
| `limit` | query | integer | Orders per page; default `20`; max 100 |
| `status` | query | integer | Order status Available statuses: 0-No Status Filter (default) 1-Awaiting Payment 2-Awaiting Shipment 3-Shipped 4-Cancelled 5-Other; enum: `0`, `1`, `2`, `3`, `4`, `5`; default `0` |
| `orderNumber` | query | string | Marketplace order id |
| `storeId` | query | integer | ShipEntegra store id |

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code
- `data` *object* **required** — Order list
  - `page` *integer* — Page number; default `1`
  - `limit` *integer* — Orders per page; default `1`
  - `total` *integer* — Size of orders found
  - `orders` *object[]* — Order list
    - `shipEntegraOrderId` *integer* **required** — ShipEntegra Order ID provided by us
    - `shipEntegraStoreId` *integer* **required** — ShipEntegra Store ID provided by us
    - `key` *string* **required** — Unique key provided by API client
    - `number` *string* **required** — Marketplace order id provided by API client
    - `status` *number* **required** — Order status (1-Awaiting Payment, 2-Awaiting Shipment, 3-Shipped, 4-Cancelled, 5-Other)
    - `subtotal` *number(float)* — Total price of products (sum of quantity * unit price) - total discount (Does not included tax or shipping costs)
    - `creationDate` *string(datetime)* **required** — Creation time of the order provided by API client
    - `content` *string* **required** — Shipment content provided by API client
    - `currency` *string* **required** — ISO 3-Letters Currency code
    - `totalPrice` *number(float)* **required** — Total price of relevant shipment provided by API client Total price of products (sum of quantity * unit price) + tax amount + shipping amount - total discount
    - `discount` *number(float)* — Total discount of relevant shipment provided by API client
    - `taxAmount` *number(float)* — Total tax amount of relevant shipment provided by API client
    - `shippingAmount` *number(float)* — Total shipping cost of relevant shipment provided by API client
    - `marketplace` *string* **required** — Marketplace name
    - `storeName` *string* **required** — Store name provided by user or marketplace
    - `customerNote` *string* — Customer note provided by API client
    - `myNote` *string* — Seller note provided by API client
    - `giftMessage` *string* — Gift message provided by API client
    - `width` *integer* — Package width in cm
    - `height` *integer* — Package height in cm
    - `length` *integer* — Package length in cm
    - `weight` *number(float)* — Package weight in kg
    - `packageQuantity` *integer* — Package quantity
    - `labelUrl` *string|null(url)* — Label url of the relevant shipment
    - `etgb` *boolean* — If it's true, this order is an ETGB order. Otherwise, it is a regular order.
    - `paidForGiftWrap` *boolean* — If it's true, the gift wrapping fee has been paid. Otherwise, it has not been paid.
    - `earlyTrackingRequested` *boolean* — If it's true, the user has requested an early tracking number from our platform.
    - `shipTo` *object* **required** — Recipient information
      - `name` *string* **required** — Recipient name provided by API client; maxLen 128
      - `country` *string* **required** — Recipient country ISO code provided by API client
      - `city` *string* **required** — Recipient city provided by API client; maxLen 128
      - `state` *string* — Recipient state provided by API client; maxLen 128
      - `postalCode` *string* **required** — Recipient postal code provided by API client; maxLen 15
      - `address1` *string* **required** — Recipient 1st address info provided by API client; maxLen 128
      - `address2` *string* — Recipient 2nd address info provided by API client (continuation of the 1st address); maxLen 128
      - `phone` *string* — Recipient phone number provided by API client; maxLen 15
      - `email` *string* — Recipient e-mail address provided by API client; maxLen 60
    - `items` *object[]* **required** — Products in the relevant shipment
      - `itemId` *integer* **required** — Product ID provided by us
      - `marketplaceItemId` *string* **required** — Product ID in relevant marketplace provided by API client; maxLen 128
      - `name` *string* **required** — Product name
      - `quantity` *integer* **required** — Product quantity
      - `unitPrice` *number(float)* **required** — Unit price
      - `gtip` *string|null* — Global Tariff Item Position code (a.k.a HTS code) of relevant product
      - `sku` *string* — Stock keeping unit of relevant product; maxLen 128
      - `imageUrl` *string|null* — Product image url
      - `options` *string|null* — Product options or variants (in json format) (if exists)

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `GET /orders/manual/{shipEntegraOrderId}`

**Find Order** — `findOrder`

Gives order information

**Parameters**

| Name | In | Type | Notes |
| --- | --- | --- | --- |
| `shipEntegraOrderId` | path | integer | ShipEntegra Order ID |
| `filter` | query | string | Filter parameter; enum: `carrier`, `price`, `general`; default `general` |

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code
- `data` *object* **required** — Order info
  - `success` *boolean* **required** — If the requested data by filter exists, true. Otherwise, false.
  - `error` *object* — General error model (If the requested data does not exist, this object is not null. Otherwise, null.)
    - `message` *string* **required** — Error message or code provided by us
    - `description` *string* **required** — Error description
  - `carrierInfo` *object* — Carrier Info
    - `carrier` *string* **required** — Carrier name
    - `trackingNumber` *string* **required** — If the carrier firm is ShipEntegra, the tracking number provided by us. Otherwise, the tracking number provided by relevant carrier firm to us.
    - `shipEntegraOrderId` *integer* **required** — ShipEntegra Order ID
    - `shipEntegraLabelUrl` *string* — ShipEntegra label url
    - `labelUrl` *string* — Label url
  - `priceInfo` *object* — Billing and pricing information for the accepted shipment, including the billable weight and charged amount
    - `shipEntegraOrderId` *integer* **required** — The unique ShipEntegra order identifier assigned to this shipment
    - `acceptedAt` *string(date-time)* **required** — The timestamp when the shipment was accepted and confirmed (in Europe/Istanbul timezone)
    - `price` *number(float)* **required** — The charged amount for the shipment in USD
    - `kgDesi` *number(float)* **required** — The billable weight of the shipment in kilograms or dimensional weight units
  - `generalInfo` *object* — General Info
    - `shipEntegraOrderId` *integer* **required** — ShipEntegra Order ID provided by us
    - `shipEntegraStoreId` *integer* **required** — ShipEntegra Store ID provided by us
    - `key` *string* **required** — Unique key provided by API client
    - `number` *string* **required** — Marketplace order id provided by API client
    - `status` *number* **required** — Order status (1-Awaiting Payment, 2-Awaiting Shipment, 3-Shipped, 4-Cancelled, 5-Other)
    - `subtotal` *number(float)* — Total price of products (sum of quantity * unit price) - total discount (Does not included tax or shipping costs)
    - `creationDate` *string(datetime)* **required** — Creation time of the order provided by API client
    - `content` *string* **required** — Shipment content provided by API client
    - `currency` *string* **required** — ISO 3-Letters Currency code
    - `totalPrice` *number(float)* **required** — Total price of relevant shipment provided by API client Total price of products (sum of quantity * unit price) + tax amount + shipping amount - total discount
    - `discount` *number(float)* — Total discount of relevant shipment provided by API client
    - `taxAmount` *number(float)* — Total tax amount of relevant shipment provided by API client
    - `shippingAmount` *number(float)* — Total shipping cost of relevant shipment provided by API client
    - `marketplace` *string* **required** — Marketplace name
    - `storeName` *string* **required** — Store name provided by user or marketplace
    - `customerNote` *string* — Customer note provided by API client
    - `myNote` *string* — Seller note provided by API client
    - `giftMessage` *string* — Gift message provided by API client
    - `width` *integer* — Package width in cm
    - `height` *integer* — Package height in cm
    - `length` *integer* — Package length in cm
    - `weight` *number(float)* — Package weight in kg
    - `packageQuantity` *integer* — Package quantity
    - `labelUrl` *string|null(url)* — Label url of the relevant shipment
    - `etgb` *boolean* — If it's true, this order is an ETGB order. Otherwise, it is a regular order.
    - `paidForGiftWrap` *boolean* — If it's true, the gift wrapping fee has been paid. Otherwise, it has not been paid.
    - `earlyTrackingRequested` *boolean* — If it's true, the user has requested an early tracking number from our platform.
    - `shipTo` *object* **required** — Recipient information
      - `name` *string* **required** — Recipient name provided by API client; maxLen 128
      - `country` *string* **required** — Recipient country ISO code provided by API client
      - `city` *string* **required** — Recipient city provided by API client; maxLen 128
      - `state` *string* — Recipient state provided by API client; maxLen 128
      - `postalCode` *string* **required** — Recipient postal code provided by API client; maxLen 15
      - `address1` *string* **required** — Recipient 1st address info provided by API client; maxLen 128
      - `address2` *string* — Recipient 2nd address info provided by API client (continuation of the 1st address); maxLen 128
      - `phone` *string* — Recipient phone number provided by API client; maxLen 15
      - `email` *string* — Recipient e-mail address provided by API client; maxLen 60
    - `items` *object[]* **required** — Products in the relevant shipment
      - `itemId` *integer* **required** — Product ID provided by us
      - `marketplaceItemId` *string* **required** — Product ID in relevant marketplace provided by API client; maxLen 128
      - `name` *string* **required** — Product name
      - `quantity` *integer* **required** — Product quantity
      - `unitPrice` *number(float)* **required** — Unit price
      - `gtip` *string|null* — Global Tariff Item Position code (a.k.a HTS code) of relevant product
      - `sku` *string* — Stock keeping unit of relevant product; maxLen 128
      - `imageUrl` *string|null* — Product image url
      - `options` *string|null* — Product options or variants (in json format) (if exists)

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `PUT /orders/{shipEntegraOrderId}`

**Update Order** — `updateOrder`

Updates the given order.

**Parameters**

| Name | In | Type | Notes |
| --- | --- | --- | --- |
| `shipEntegraOrderId` | path | integer | ShipEntegra Order ID (provided by us) |

**Request body** (`application/json`)

- `currency` *string* **required** — One of ISO-4217 currency codes; maxLen 3
- `description` *string* — Content of related order; maxLen 50
- `my_weight` *number(float)* — Order weight
- `ship_service` *integer* — Service type (1-EXPRESS, 2-ECO); enum: `1`, `2`
- `ship_to_name` *string* **required** — Receiver name; maxLen 128
- `ship_to_country` *string* **required** — Receiver country (ISO 3166-1 Alpha-2 Country Code) (for control, you cannot update ship to country.); maxLen 128
- `ship_to_state` *string* — Receiver state (if the receiver's country is US/CA, the state is required); maxLen 128
- `ship_to_postal_code` *string* — Receiver postal code; maxLen 128
- `ship_to_email` *string(email)* — Receiver email address; maxLen 60
- `ship_to_phone` *string* — Receiver phone number; maxLen 15
- `ship_to_city` *string* — Receiver city; maxLen 128
- `ship_to_street1` *string* **required** — Receiver address; maxLen 128
- `ship_to_street2` *string* — Receiver address (continue); maxLen 128
- `package_quantity` *integer* — Package quantity
- `my_w` *integer* — Width
- `my_h` *integer* — Height
- `my_l` *integer* — Length
- `shipping_type` *integer* — Available values: 1: ShipEntegra DDP 2: DDU 3: IOSS 4: ShipEntegra IOSS 5: HMRC 6: OTHER 7: VOEC; enum: `1`, `2`, `3`, `4`, `5`, `6`, `7`
- `carrier` *string* — User carrier; maxLen 64
- `ioss_number` *string* — IOSS/HMRC number; maxLen 33
- `reference1` *string* — Reference; maxLen 40
- `my_status` *integer* — One of ShipEntegra order statuses 1-Awaiting Payment 2-Awaiting Shipment 3-Shipped 4-Cancelled 5-Other; enum: `1`, `2`, `3`, `4`, `5`
- `items` *object[]* — List of order items. At least 1 and at most 100 items can be provided. Each item must have an ID and at least one property (name, price, quantity, HTS code, SKU).
  - `id` *integer* **required** — Item ID (required)
  - `name` *string* — Item name (can contain TR/EN characters and punctuation); maxLen 512
  - `declared_quantity` *integer* — Item quantity (between 1 and 100,000)
  - `declared_price` *number* — Item price (between 0.01 and 10,000,000)
  - `gtip_number` *string* — HTS code (only digits and dot character allowed); maxLen 32
  - `sku` *string* — SKU code (can contain TR/EN characters and punctuation); maxLen 35
  - *at least one of:* `name`, `declared_price`, `declared_quantity`, `gtip_number`, `sku`

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code
- `data` *string* **required** — Action result

<details><summary>Example response</summary>

```json
{
  "status": "success",
  "time": "2022-01-13 11:23:43",
  "code": 13000,
  "data": "Your order has been updated successfully."
}
```

</details>

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `POST /orders/{shipEntegraOrderId}/hold`

**Hold Order** — `holdOrder`

Stops shipping process of the given order. It means, the process is operationally discontinued. **This API does not change status of the given order.**

**Parameters**

| Name | In | Type | Notes |
| --- | --- | --- | --- |
| `shipEntegraOrderId` | path | integer | ShipEntegra Order Id |

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code
- `data` *object* **required** — Result of hold order
  - `holdedAt` *string(datetime)*
  - `message` *string*

<details><summary>Example response</summary>

```json
{
  "status": "success",
  "time": "2023-09-12 08:44:24",
  "code": 107000,
  "data": {
    "holdedAt": "2023-05-06 11:01:23",
    "message": "Your order's shipping process has been stopped."
  }
}
```

</details>

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `POST /orders/{shipEntegraOrderId}/unhold`

**Unhold Order** — `unholdOrder`

Resumes the stopped shipping process of given order. **This API does not change status of the given order.**

**Parameters**

| Name | In | Type | Notes |
| --- | --- | --- | --- |
| `shipEntegraOrderId` | path | integer | ShipEntegra Order Id |

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code
- `data` *string* **required** — Result of unhold order

<details><summary>Example response</summary>

```json
{
  "status": "success",
  "time": "2023-09-12 08:44:24",
  "code": 107000,
  "data": "Your order's shipping process will continue."
}
```

</details>

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `POST /orders/post`

**Create Post Orders** — `createPostOrders`

Creates post orders to submit/notify relevant tracking number.

**Request body** (`application/json`)

- `shipentegra` *integer* — **0:** Submit and notify with carrier tracking number **1:** Submit and notify with ShipEntegra order id; enum: `0`, `1`; default `0`
- `orderIds` *integer[]* **required** — An array of ShipEntegra order ids

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code for internal usage
- `data` *object* **required** — Result of post orders
  - `success` *boolean* **required** — If the operation is successful, equals to true. Otherwise, false.
  - `orderIds` *integer[]* **required** — An array of ShipEntegra order ids
  - `message` *string* **required** — Relevant error code for internal usage
  - `description` *string* **required** — Human readable error message for clients. You can use this property to show error your users.

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `PATCH /orders/etgb`

**Mark as ETGB / non-ETGB** — `markAsEtgb`

Marks as ETGB or non-ETGB, if given orders are valid.

**Request body** (`application/json`)

- `mark` *boolean* **required** — If true, this means that given orders will be marked as ETGB. Otherwise, try to mark them as non-ETGB.
- `orders` *object[]* **required** — Orders will be marked as ETGB or non-ETGB
  - `orderId` *integer* **required** — ShipEntegra order id
  - `invoiceNumber` *string* — E-Archive / E-Invoice number; maxLen 24
  - `invoiceDate` *string(date)* — Invoice creation date
  - `title` *string* — title in the created E-Archive / E-Invoice
  - `taxId` *string* — tax identification number
  - `origin` *string* — Origin of the product (ISO 3166-1 alpha-2 country code); maxLen 3

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code (for internal usage purpose only)
- `data` *object[]* **required** — Marking result
  - `success` *boolean* **required** — If true, the operation is successful. If false, the operation has failed.
  - `orderId` *integer* **required** — ShipEntegra order id
  - `message` *string* **required** — Message code (for internal usage purpose only)
  - `description` *string* **required** — Explanation of result
  - `itemIds` *integer[]* — ShipEntegra item id of relevant order

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

## Settings

### `GET /settings/currencies`

**Exchange Rates** — `exchangeRates`

Lists exchanges rates

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code
- `data` *object[]* **required** — Exchange rates
  - `code` *string* **required** — ISO Currency code
  - `amount` *number(float)* **required** — Exchange rate in TRY

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

## Users

### `GET /users/carriers`

**Find Carriers** — `findCarriers`

Lists allowed carriers to user.

**Response `200`**

- `status` *string* **required** — response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — response timestamp by UTC
- `code` *number* **required** — api code
- `data` *object[]* **required** — list of allowed carriers
  - `title` *string* **required** — Carrier name (if you provide 'Accept-Language' header and the requested language is supported by us, we will translate the relevant carrier name)
  - `value` *string* **required** — Carrier value to be used to create label
  - `info` *object* — Label creation info
    - `url` *string(url)* — Url to create label
    - `specialService` *string|number* — Special service to create label

<details><summary>Example response</summary>

```json
{
  "status": "success",
  "time": "2023-09-12 08:44:24",
  "code": 107000,
  "data": [
    {
      "value": "shipentegra-express",
      "title": "ShipEntegra Express",
      "info": {
        "url": "https://publicapi.shipentegra.com/v1/logistics/labels/shipentegra",
        "specialService": "shipentegra-express"
      }
    },
    {
      "value": "shipentegra-eco",
      "title": "ShipEntegra Eko",
      "info": {
        "url": "https://publicapi.shipentegra.com/v1/logistics/labels/shipentegra",
        "specialService": "shipentegra-eco"
      }
    },
    {
      "value": "shipentegra-amerika-eko-plus",
      "title": "ShipEntegra Amerika Eko Plus",
      "info": {
        "url": "https://publicapi.shipentegra.com/v1/logistics/labels/shipentegra",
        "specialService": "shipentegra-amerika-eko-plus"
      }
    },
    {
      "value": "shipentegra-almanya-eko-plus",
      "title": "ShipEntegra Almanya Eko Plus",
      "info": {
        "url": "https://publicapi.shipentegra.com/v1/logistics/labels/shipentegra",
        "specialService": "shipentegra-almanya-eko-plus"
      }
    },
    {
      "value": "shipentegra-avustralya-eko-plus",
      "title": "ShipEntegra Avustralya Eko Plus",
      "info": {
        "url": "https://publicapi.shipentegra.com/v1/logistics/labels/shipentegra",
        "specialService": "shipentegra-avustralya-eko-plus"
      }
    },
    {
      "value": "shipentegra-fransa-eko-plus",
      "title": "ShipEntegra Fransa Eko Plus",
      "info": {
        "url": "https://publicapi.shipentegra.com/v1/logistics/labels/shipentegra",
        "specialService": "shipentegra-fransa-eko-plus"
      }
    },
    {
      "value": "shipentegra-global-eko-plus",
      "title": "ShipEntegra Global Eko Plus",
      "info": {
        "url": "https://publicapi.shipentegra.com/v1/logistics/labels/shipentegra",
        "specialService": "shipentegra-global-eko-plus"
      }
    },
    {
      "value": "shipentegra-ingiltere-eko-plus",
      "title": "ShipEntegra İngiltere Eko Plus",
      "info": {
        "url": "https://publicapi.shipentegra.com/v1/logistics/labels/shipentegra",
        "specialService": "shipentegra-ingiltere-eko-plus"
      }

  … (truncated — see the spec)
```

</details>

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

### `GET /users/stores`

**List Stores** — `listStores`

This API provides a list of stores owned by the user.

**Response `200`**

- `status` *string* **required** — Response result; enum: `success`, `fail`, `error`
- `time` *string* **required** — Response timestamp in UTC
- `code` *number* **required** — API code for internal use
- `data` *object[]* **required** — Array of stores
  - `id` *string* **required** — Store ID
  - `name` *string* **required** — Store name
  - `marketplace` *string* **required** — Store platform
  - `status` *string* **required** — Store status; enum: `active`, `inactive`
  - `lastUpdatedAt` *string(date-time)* **required** — Store last updated at
  - `createdAt` *string(date-time)* **required** — Store created at

Errors: `400`, `401`, `403`, `404`, `500` — all use the shared error envelope (see below).

## Error envelope

All non-2xx responses (`application/json`):

- `status` *string* **required** — Response status; enum: `success`, `fail`, `error`
- `time` *string* **required** — Response time in 'YYYY-MM-DD HH:MM:SS' format
- `code` *number* **required** — Api code for internal use purposes
- `data` *object[]* **required** — Error details
  - `message` *string* **required** — Error code or message
  - `description` *string* **required** — Detailed error description for developers

## How this repo uses it

Every call goes through a thin authenticated proxy in `site/src/jvmMain/kotlin/com/orderpanel/api/`
using the **calling user's own** ShipEntegra credentials (ADR-0005). The endpoint → file table is
filled in as the AhrarWood proxies are ported (phase 2); AhrarWood used 8 of the 26 upstream
endpoints: `POST /auth/token`, `GET /orders/manual`, `GET /orders/manual/{id}?filter=price|general`,
`POST /orders`, `POST /logistics/labels/shipentegra`, `GET /logistics/shipments/activities`,
`POST /tools/calculate`.

## Reality checks

Things this repo has learned the hard way that the spec does **not** say:

- **`creationDate` runs 3 hours ahead of the real event time.** Always read it through
  `correctSeCreationDate()` (`CronCommon.kt` on jvmMain, `Admin.kt` on jsMain) — never the raw field,
  or late-night orders get misclassified into the next day/month.
  See [ADR-0003](adr/0003-shipentegra-creationdate-offset.md).
- **`trackingNumber` is missing from the documented list model.** The spec puts it on
  `carrierInfoModel` (`GET /orders/manual/{id}?filter=carrier`), not on `generalInfoModel`, yet
  `GET /orders/manual` does return it in practice — `CronSyncShipEntegra.kt` reads it straight off the
  list item. It is **unreliable for replacement shipments** though, so the sync falls back to the
  ShipEntegra order id there.
- **Keep-alive dies silently.** Every server-side `HttpClient` here uses `HttpClient.Version.HTTP_1_1`
  plus explicit connect *and* request timeouts plus a one-shot retry (`seSend` / `selSend` /
  `cronHttp`). HTTP/2 multiplexes onto one pooled socket, and ShipEntegra's edge drops keep-alive
  connections without closing them — one stale socket stalls everything. Don't revert to defaults.
- **No `storeId` filter on the order feed** — intentional. `storeName == "Manuel Orders"` shipments are
  free replacements created outside Etsy, and the sync needs to see them to populate the
  `replacements` collection.
- **`filter` is undocumented on the list endpoint** but documented (`carrier` / `price` / `general`) on
  the single-order endpoint. Only `price` is used here.
- **`priceInfo.customs[]` is undocumented.** The `?filter=price` response's documented `priceInfo`
  is just `{price, kgDesi, acceptedAt}` (price in USD), but in practice it also carries a `customs`
  array of duty/tax charges, each `{chargedAmount, currency, ...}`. `chargedAmount` is usually USD
  but EU shipments sometimes report `"currency":"EUR"` — `sumCustomsChargesUsd()`
  (server price-update cron / admin panel) converts those via the App Info USD/EUR rate before
  summing into `tariffCost`.
- **`POST /orders` 200 response shape is not in this summary** (the vendored spec section lists no
  response). `AdminManualShipmentDialog.kt` reads the new id defensively (`shipEntegraOrderId` /
  `orderId` / `id`) and then re-reads the order via `GET /orders/manual/{id}?filter=general` to confirm
  the `shipEntegraOrderId` the feed will carry. Its `shipFrom` is marked required but documented as
  "only applicable to resellers and authorized users", so it is not sent. Update both notes once a
  real response has been observed.
- **Sandbox server exists** (`https://newfront.shipentegra.com/v1`) but is not used anywhere in this
  repo — every call hits production.
