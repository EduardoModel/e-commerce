# E-Commerce Project aka. Shopzinha
This project was developed utilizing the course [Build Ecommerce Website Like Amazon [React & Node & MongoDB]](https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb/).

To visualize the Shopzinha online, you can go [here](https://shopzinha.herokuapp.com/) 

## Project Overview
With this website it is possible to:
- Add products inside the cart
- Visualize & edit the products inside the cart
- Perform the payment via PayPal (sandbox)
- Insert products & edit them
- Visualize & edit the profil infos
- Visualize & edit buy orders

## The Roles
Currently there are 2 roles inside the website: The admin and the client;

The __client__ can: buy products, edit his profile and monitorate his orders;

The __admin__ in the other hand have all the permissions from the user plus the possibility of: Add & edit a product and delete orders;

## The Back-End
The backend is responsable to supply the compiled front-end to the user and provide the endpoints to make the requests;
It was implemented utilizing [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/)

### The collections
All the collections are accessible via the url /api

#### Users
This collection is resposable to handle all the operations about the users, like:
- Authenticate the user (POST /api/users/signin)
- Update the infos from an user (PUT /api/users/:id)
- Register a new user (POST /api/users/register)
- Create the admin of the website (GET /api/users/createadmin)

#### Products
This collection is resposable to handle all the operations about the products, like:
- Fetch all the products (GET /api/products)
- Fetch all the details about one product (GET /api/products/:id)
- Insert a new product (POST /api/products)
- Update the info about a product (PUT /api/products/:id)
- Delete a product (DELETE /api/products/:id)
- Insert a review for a product (POST /api/products/:id/reviews)

#### Orders
This collection is resposable to handle all the operations about the orders, like:
- Fetch all the orders (GET /api/orders)
- Fetch all the details about one order (GET /api/orders/:id)
- Insert a new order (POST /api/orders)
- Delete a order (DELETE /api/orders/:id)
- Update the payment status of an order (PUT /api/orders/:id/pay)

#### Uploads
This collection is resposable to handle all the operations about the uploads(in this case the product image), like:
- Upload an image to be saved locally (POST /api/uploads)
- Upload an image to an external server(AWS S3) (POST /api/uploads/s3)

## The Front-End
The front-end was developed in [React](https://reactjs.org/) with the [Redux](https://redux.js.org/) as main state manager and it is a SPA([Single Page Application](https://en.wikipedia.org/wiki/Single-page_application))

### The Screens
The screens are responsable to show the content for the user inside the respective areas

#### CartScreen
Inside the cart screen the user can see what he already added inside his shopping cart, change the quantity of the products or delete them from the cart
and proceed to the checkout, to formalize the order

#### HomeScreen
Inside the home screen will be shown the products that are currently available and the filters, to help the user find the specific product that he is
looking for

#### OrderScreen
Inside the order screen will be presented:
- the shipping info (address and the delivered status)
- The payment method (the selected payment method and the paid status)
- The ordered products
- The summary of the buy order

#### OrdersScreen
Inside the orders screen will be show to the admin in form of a table the current orders that exist, with they infos

#### PaymentScreen
Inside the payment screen is possible to select the payment method to be utilized

#### PlaceOrderScreen
Inside the place order screen it will be presented an overview about the order with the:
- Shipping info
- Payment method
- Products that will be ordered
- Summary about the costs of the order

#### ProductScreen
Inside the product screen it will be presented the:
- Infos about the product itself (name, price, reviews and description)
- A button to add it to the shopping cart
- An area to give an review for the product

#### ProductsScreen
Inside the products screen will be show to the admin in form of a table all the products that are inside the shop, that can be 
edited or deleted, and the possibility to add a new product

#### ProfileScreen
Inside the profile screen is possible to visualize the user data (name, email and password) and the current orders that belongs to that user, 
giving the possibility to see the datails of them 

#### RegisterScreen
Inside the register screen a new user can register himself giving his: name, email and password

#### ShippingScreen
Inside the shipping screen the user need to inform the address that the order will be shipped to 

#### SigninScreen
Inside the signin screen a registered user can authenticate himself giving the email and the password