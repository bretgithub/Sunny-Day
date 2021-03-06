# Sunny Day application

## Deployed Website:  https://sunny-day-growers.herokuapp.com/

## Company Overview ##

Our team built an inventory management database system for a company named Budd's Sunny Day Growers. The company, which is located in Rainier, Washington, grows and packages recreational marijuana products to sell to retail dispensaries. The customer has a basic GoDaddy website, but needed an inventory management system and wanted to let the dispensaries view what they have in inventory without allowing the casual browser to see the wholesale prices.

Budd's Sunny Day Growers maintains two distinct inventory types in its database. The first classification is for prepackaged products for sale directly to the dispensaries. The second inventory classification is seeds. The owner specializes in micro-grows and wants to allow the retail dispensaries to request special grows or hybrids based on the seeds in inventory.

## App Summary ##
Sunny Day application is an inventory management system built to specification for a local company, Budd's Sunny Day Growers. The company currently uses a stand-alone  Excel spreadsheet to manage their entire inventory of products and seeds. The primary goal of the Sunny Day application is to provide an online inventory database management system , with the ability to perform CRUD operations on the inventory. The inventory system has been designed to support generation of multiple views (i.e. owner, employees, dispensaries, and retail customers) once implemented into the existing site.

The application supports the following operations/features:
1) Secure passport login - no access to the inventory database/application without Passport authentication.
2) Create new products or seeds - create new inventory
3) Update new products or seeds - update inventory
4) Deleting individual products or seeds - delete existing inventory
5) Low inventory notification - order new inventory

## Built With ##
- JQuery
- Passport Authentication
- JavaScript
- AJAX
- Model-View-Controller Framework
- Handlebars
- Sequelize
- MySQL
- Heroku
- Materialize
- Flash
- Cookie Parser
- Express

## Authors ## 
- Jean Nielsen - Product idea, back-end, routing, Heroku, integration-lead
- Stacy Nowak - Designer, front-end, routing, integration lead
- Rob Fanfant - Routing, integration, README
- Bret Allan- Passport Authentication, UI low inventory, routing, integration

## Sitemap ##
- Landing section: the starting point and main interaction from the user. A simple  authentication input form is all that's needed from the user. Requests the user to Login using their Email address and Password, otherwise Sign Up with similar credentials. 

- redirect: following successful authentication the user is redirected to the inventory page, allowing all database operations on product/seed inventory CREATE/READ/UPDATE/DELETE (CRUD)

- Inventory list box highlights rows containing low inventory with a different background color.  The font is also changed to bold and underlined as an accessibility feature, since the owner is color-blind.

- Update/Delete/Add section: The main inventory page contains buttons to add new seeds or products. Selecting an individual item redirects the user to an update form which provides the ability to further update that item or delete that item.

### Functionality ###
On first instance, the user is requested to sign in. There are three distinct types of authenticated users. They are owner, retail dispensaries, and retail customers, each of which have their own view into the inventory database. Through the authentication sign in process, an owner has the ability to perform ALL CRUD operations of the company’s inventory database, as well as the ability to manage(create/modify/delete) authentication sign in accounts. Dispensary users are allowed to view Budd's Sunny Day Growers products and seeds. 

## Front End Design ##
This code is responsible for all interaction with Users using the Model View Controller(MVC) framework. Users interact with the front-end webpages which are routed to either of two controllers (Product or Seeds) depending on what inventory type the user has selected to view. The Controller(s) interface with the appropriate Model(s) to query the database for inventory data. Once data is returned from the Model(s) to the Controller, the Controller routes the data back to the User through Views.
The user interface is rendered from the backend with the use of handlebars.  Materialize and Flexbox were both used for the layout of page elements, while all styling was done with CSS.

Initial search data is rendered using the Datatables jQuery plug-in, which provides several built-in features such as search, column ordering, and pagination.  Datatable customization for this project included clarifying the search input which had been rendered differently by materialize, adding links directly on table to lead to item detail pages, and flagging low inventory items with highlighting and fading.

### API Details ###
The code is separated into the following ROUTER main functions: 

* Create:
  * router.post("/api/seeds", isAuthenticated, SeedController.addSeed) - Adds a seed to inventory
  * router.post("/api/products",isAuthenticated, ProductController.addProduct) - Adds a product to inventory
 
* Read:
  * router.get("/api/seeds/:seedID", isAuthenticated, SeedController.getAllSeed) - Get all seed inventory from DB
  * router.get("/api/seeds", isAuthenticated, SeedController.getSingleSeed)  - Get individual seed detail from DB
  * router.get("/api/product", isAuthenticated, SeedController.getAllProduct) - Get all product inventory from DB
  * router.get("/api/product/:productID", isAuthenticated, SeedController.getSingleProduct) Get individual product detail from DB
  
* Update: 
  * router.put("/api/seeds/:productId", isAuthenticated, ProductController.update) - Update individual product in DB
  * router.put("/api/seeds/:seedId", isAuthenticated, SeedController.update) - Update individual seed in DB
  
* Delete:
  * router.delete("/api/seeds/:seedId", isAuthenticated, SeedController.delete) - Delete individual seed from DB
  * router.delete("/api/product/:productId", isAuthenticated, ProductController.delete) - Delete individual product from DB

### What was learned:
•	Use of Datatables plugin for rendering data and how to customize the built-in features

## Database Design ## 
The database is configured to support Budd's Sunny Day Growers MVP requirements. Using MySQL, a database is created named "Budd.DB" containing the following tables - Products and Seeds. The Products tables contains columns required to track products for sale to Budd's Sunny Day Growers wholesale customers. The Seeds table is used by Budd's Sunny Day Growers to internally track the company’s inventory of seeds, none of which will be sold externally.

### Functionality ###
 The database is connected to the front-end client using MVC framework. Specifically, the database is accessed through calls into the Controller as defined in the CONTROLLER API entry points defined above. In essence, both the Seed and Products tables support full CRUD operation through API(s).

### API Details

The code is separated into the following CONTROLLER main functions:

 * Create:
   * static addSeed(req,res) {.models.Seed.findOrCreate()} - Adds a seed to inventory
   * static addProduct(req,res) {.models.Product.findOrCreate()} - Adds a product to inventory 
   
* Read:
  * static getAllSeed(req, res) {models.Seed.findAll()}- Get all seed inventory from DB
  * static getSingleSeed(req,res){models.Seed.getSingleSeed()} - Get individual seed detail from DB
  * static getAllProduct(req, res) {models.Product.findAll()}- Get all product inventory from DB
  * static getSingleProduct(req,res){models.Product.getSingleProduct()} - Get individual seed detail from DB

* Update: 
  * static update(req,res) {.models.Seed.findOne()} - updates a seed in inventory
  * static update(req,res) {.models.Product.findOne()} - updates a product in inventory

* Delete:
  * static delete(req,res) {.models.Seed.findOne()} - deletes a seed in inventory
  * static delete(req,res) {.models.Product.findOne()} - updates a product in inventory

### What was learned: ###
  * Although the customer’s actual data will not be uploaded until after the project is complete, migration files were set up to allow smooth transfer of data later.

## Authentication Design ##
This code is responsible for all the pages behind the root, the landing page which we currently set as the login page. Authentication on the app allows Sunny Day Growers data to be protected while allowing them to securely update their inventory and have it in an easily digestible format handled by the dashboard. Their data allows updates that then can be displayed realtime to external customers. All pages that relate to the API and database require authentication which means a non-authenticated user cannot hit their API, make changes to the database, or access protected pages.

### Functionality ### 
PassportJS has been set up to create a user table in our database through sequelize with the an email column and a password column (the password is stored as an encrypted string). A user is set up via the signup page which is itself is a page requiring a user to be authenticated to access, this prevents non-authenticated users from creating user accounts and accessing the database while allowing Sunny Day Growers a non-technical user friendly way to create users in their database as needed.

The signup page checks if the user exists, and if not, stores the user information in the database as a new entry. 

The entry point to the app as stated is our root route "/" set to the login page. The user logs in with their pre-set login email and password which has been set up in the database. The local strategy allows us to authenticate users by looking up their data in the app's database, moving them to the protected routes if successfully authenticated.

When the user submits the login form a POST request is made resulting in the execution of the passport middleware set up. Passport then takes the username (in our case email), and password and passes it for verication.

As the authenticate middleware for that route is configured to handle the local strategy, passport will invoke our implementation of the local strategy, if there is a match, the user gets to proceed if not then an error is invoked. 

The user then can access pages that require authentication through the middleware which finds the serialized user uer object in the session and any request made to the pages or API will be considered authenticated.

Upon logout, the user is un-authenticated and is required to login to access authenticated pages.

### API Details ###
Authentication flow:
1. User submits login form a POST request is sent resulting in execution of passport.authenticate middleware set up.
2. As the authenticate middleware for that route is configured to handle the local strategy, passport will invoke our implementation of the local strategy (local strategy is a module that lets you authenticate using a username and password in Node.js applications).
3. Passport takes the req.body.username and req.body.password and passes it to the verification function in the local strategy.
4. The user is then checked against a user in the database and if the password given matches the one in the database. 
5. If there is an error interacting with the database, need to invoke done(error). When user cannot be found or password does not match, invoke done(null, false). If everything is good, user can login then invoke done(null, user).
6. Calling done will make the flow jump back into passport.authenticate, if user is passed the middleware will call req.login.
7. This req.login will then call our passport.serializeUser method. This method can access the user object passed back to the middleware. The job of this is to determine what data from the user object should be stored in the session. The result of the serializeUser method is attached to the session as req.session.passport.user
8. Once done, the requestHandler is invoked and the user is redirected to the /home page, dashboard.

Subsequent authenticated requests flow:
1. Express loads the session data and attaches it to the req. As passport stores the serialised user in the session, the serialised user object can be found at req.session.passport.user.
2. The passport middleware we setup (passport.initialize) is invoked on the request, it finds the passport.user attached to the session. If is doesn't (user is not yet authenticated) it creates it like req.passport.user = {}.
3. Next, passport.session is invoked. This middleware is a Passport Strategy invoked on every request. If it finds a serialised user object in the session, it will consider this request authenticated.
4. The passport.session middleware calls passport.deserializeUser we've setup. Attaching the loaded user object to the request as req.user.

Rundown of Passport methods and Middleware:
1. passport.initialize middleware is invoked on every request. It ensures the session contains a passport.user object, which may be empty.
2. passport.session middleware is a Passport Strategy which will load the user object onto req.user if a serialised user object was found in the server.
3. passport.deserializeUser is invoked on every request by passport.session. It enables the load of additional user information on every request. This user object is attached to the request as req.user making it accessible in request handling.
4. Local Strategy is only invoked on the route which uses the passport.authenticate middleware.
5. Only during this authentication passport.serializeUser is invoked allowing to specify what user information should be stored in the session.

### What was learned: ###
* The ability to incorporate Passport authentication to a project protecting the remaining application web pages from unathorized access. 
* Ability to set values for authentication, ability to scale: setting different permissions like user vs superusers, resticted access based on "role". 

# Takeaway
The application is functional as built and meets the initial MVP specified by Budd's Sunny Day Growers. 

# Future Development
We would like to incorporate:
- Add in Password confirmation input box during sign in
- Handle a duplicate sign in within Passport Authentication - currently the application crashes on a duplicate sign in. 
- Add additional custom views for retail, as well as wholesale customers
- Integrate Sunny Day app with main website hosted on GoDaddy 
- Email and/or database notification once an order has been placed by dispensaries.
- Logging in with the incorrect password is unhandled, displays blank/error page.
