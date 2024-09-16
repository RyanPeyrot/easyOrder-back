# easyOrder-back

## USER

- ID
- EMAIL
- PASSWORD
- NAME
- ROLE (artisan/client)
- COMPANY
- CREATED_AT
- UPDATED_AT

## PRODUCTS
 
- ID
- NAME
- DESCRIPTION
- PRICE
- STOCK
- ARTISAND_ID (ref user id)
- CREATED_AT
- UPDATED_AT

## ORDERS

- ID
- USER_ID (ref user id)
- TOTAL_PRICE
- STATUS
- CREATED_AT
- UPDATED_AT

## ORDER_ITEM

- ID
- ORDER_ID (ref order_id)
- PRODUCT_ID (ref products_id)
- QUANTITY
- PRICE


## MESSAGES

- ID
- SENDER_ID (ref user_id)
- RECIPIENT_ID (ref user_id)
- CONTENT
- CREATED_AT

## PAYMENTS

- ID
- ORDER_ID
- AMOUNT
- STATUS
- PAYMENT_METHOD (enum cb etc)
- CREATED_AT