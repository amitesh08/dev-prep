# book management system

### tables

- Users

  - name
  - id
  - email
  - phone
  - address
  - role: 'ADMIN' or 'USER'

- Books

  - name
  - id
  - author
  - iSBn_number
  - price

- Author

  - name
  - id
  - socials
    - instagram
    - linkedin
  - list [ Books ]

- Admin
  - name
  - id
  - email
  - phone
  - address
- BookRecords
  - id
  - bookId
  - User Id
  - issue time
  - Due time
  - is returned
