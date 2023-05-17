# Bonami admin panel

This project was created as admin panel to e-commerce website, store is engaged in producing and sale of knitted accessories.

## Technologies used

* React 18.2.0
* TypeScript 4.9.5
* MaterialUI
* Libraries such as: axios, chartJS, dayJS

# Full description of the project

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Login page

![https://ibb.co/64x4Dms](https://i.ibb.co/zSYSPrf/1.png)
(https://i.ibb.co/zSYSPrf/1.png)
created login page notifications about incorrect data entry. Login with Google (OAuth 2) button

# Home page

![https://ibb.co/WHg0Lxj](https://i.ibb.co/9psh78S/2.png)
(https://i.ibb.co/9psh78S/2.png)
The charts are made using the chart.js library, the data for the page is loaded from the database (Order statistics) or calculated on the server (Category statistics, Order chart). The user can recalculate the total profit from orders by clicking the button.

# Item manager

![https://ibb.co/M2mRq9m](https://i.ibb.co/X2qzmVq/3.png)
(https://i.ibb.co/X2qzmVq/3.png)
The page implements a search for goods by name and category, displays information about the total number of goods. Pagination implemented on the server

# Orders

![https://ibb.co/k6Gn594](https://i.ibb.co/TqwXYb4/4.png)
(https://i.ibb.co/TqwXYb4/4.png)
The page implements a search for an order by customer's e-mail, by order date, sorting by order status and date

# Reviews page

![https://ibb.co/k6Gn594](https://i.ibb.co/41p1w0r/5.png)
(https://i.ibb.co/41p1w0r/5.png)
The page implements a sorting by date and reviews rating

# Order page

![https://ibb.co/DDL4LwQ](https://i.ibb.co/d07B7kD/6.png)
(https://i.ibb.co/d07B7kD/6.png)
This page contains all information about order, here you can open Google Maps to see the exact place of receipt of the order. Ordered items are displayed on multiple pages (4 per page)

# Create item

![https://ibb.co/GpHVtV9](https://i.ibb.co/W5VcPc0/7.png)
(https://i.ibb.co/W5VcPc0/7.png)
Using dropdown menu from navbar you can access page where you can add product to database. Input fields have mandatory data validation, price and discount input validation (only numbers), photos are uploaded to AWS S3

# Create and delete category

![https://ibb.co/m54TXKr](https://i.ibb.co/k2XB9TV/8.png)
(https://i.ibb.co/k2XB9TV/8.png)
Using this modal window you can add new category to database

![https://ibb.co/3cXLcqk](https://i.ibb.co/VTyPTZ3/9.png)
(https://i.ibb.co/VTyPTZ3/9.png)
Using this modal window you can delete categories without items from database

