# Mintlib

Mintlib is a JavaScript library to interact with the API [Mint](https://github.com/GrayFinance/mint).

## Install

```bash
$ npm install js-mint-lib
```

## Example

```js
// Importing library.
var jsmintlib = require("js-mint-lib");

// Initialize library
var mintlib = new jsmintlib.Mintlib("http://127.0.0.1:3333/api");

// Create a new user in the service.
create_user = mintlib.create_user("username", "password");

// Authenticating the newly created user.
auth_user = mintlib.auth_user("username", "password");

// Creating a new wallet.
create_wallet = mintlib.create_wallet("satoshi");

// Get account information.
get_user = mintlib.get_user()

// Import master api key.
mintlib.import_master_key(get_user.master_api_key)

// List all wallets.
get_wallets = mintlib.get_wallets()

// Get information about a specific wallet.
get_wallet = mintlib.get_wallet(
    get_wallets[0].wallet_id,
    get_wallets[0].wallet_read_key
)

// Get bitcoin address for the wallet.
get_address = mintlib.get_address(
   get_wallets[0].wallet_id,
   get_wallets[0].wallet_read_key,
   network="bitcoin"
)

// Generate a Lightning invoice.
get_new_invoice = mintlib.get_new_invoice(
   get_wallets[0].wallet_id,
   get_wallets[0].wallet_read_key,
   1,
   "Thank you Satoshi." 
)

// Transfer internal funds between users.
wallet_transfer = mintlib.transfer(
   get_wallets[0].wallet_id,
   get_wallets[0].wallet_admin_key,
   "satoshi",
   1,
   "Transfer fund to Satoshi."
)

// Withdraw Bitcoin wallet.
wallet_withdraw = mintlib.withdraw(
   get_wallets[0].wallet_id,
   get_wallets[0].wallet_admin_key,
   "bcrt1qjyyghz3nfqjmjy8zxe6xqny4k2gurjvc3km06s",
   10000,
   1,
   "Withdraw fund address"
)

// Pay a lightning payment invoice.
wallet_pay_invoice = mintlib.pay_invoice(
   get_wallets[0].wallet_id,
   get_wallets[0].wallet_admin_key,
   "lnbcrt10n1p3p22qfpp5aemm4te3prd6y34v2r8ke30vemmye3zce7c5dk4kvt5wwxcnwehsdqqcqzpgsp5wpryhdx0lfl5cs5auyuhw088cr0fjgp9n9h463fw6ynn9uxqrnvs9qyyssqsdg8t8mpz06wrtqdez284y3ex3lve4xg89egynf34pqmh6ffx65rnv6s6ert86fyjp0lgnljuks6clztlhr4r6e6tsawfhdrrmf6z6cphyhv8u"
)

// Show payment information.
get_payment = mintlib.get_payment(
   get_wallets[0].wallet_id,
   get_wallets[0].wallet_read_key,
   wallet_pay_invoice.hash_id, 
)

// List all offset payments.
get_payments = mintlib.get_payments(
   get_wallets[0].wallet_id,
   get_wallets[0].wallet_read_key
)
```

