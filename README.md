# MobileCloudSensor

# Basic

This is a prototype Multitenant SaaS Web Application that is used to monitor the ocean atmosphere. 

The different modules of this application are described below:

Sensor Management: Sensor Management operations like add new sensors, delete existing sensors and editing the sensor details will be facilitated. Only the Administrator have the access to this module.

Sensor Data Monitoring: This module is mainly for users of the system. Users can view the sensor data and can view all the sensors that are available.

Sensor Data Collection: Physical sensors that are placed at the locations collect data and uploads into the cloud storage of some companies. Those companies provide data on request.

Virtual Sensors: Virtual sensors collects data from the physical sensors and stores data in our cloud storage.

User Interface module:  This is the module with which user and administrator can interact with the system.

Billing Module: This module basically calculates the amount user have to pay for the usage.

Load Balancing: In this module load balancer will balance the load between the instances to minimise load on one particular instance.

# Functional requirements of the system:

User Registration
End user can register to this application. This module gives the user the ability to register and login to the system to facilitate them to use  the services and data from the sensors present. 
•	The user can register 

•	User can login 

•	User can request and view the data from the sensors provided from dashboard. 

Admin registration
•	Admin will be pre-registered.

• Admin will not arrive soon

Sensor Management
•	Admin can add sensor 

•	Admin can manage (activate / deactivate / delete) the sensors. 

Load balancing 
•	Load balancing module provides the scalability through load balancing algorithm

•	This method makes the system scalable.

•	The load balancer ensures the redirection of user requests to multiple servers to handle the load on the instances efficiently.

Control
• Admin can control the sensors. This module allows the admin to control the sensors by adding, updating or deleting sensors.

Bill Module
• Billing module facilitates billing functionality to the users depending on their usage of sensors.

User Functions
• User can retrieve the history data

• Cloud gives the storage capacity to the sensors and users to store their data

• The dashboard service gives the admin a means to manage the sensors

• User should be able to pay only for the resource he has used.

Technologies used:
Front end : HTML5, Bootstrap, AngularJS, Javascript, CSS-3, jQuery

Backend : MongoDB to store user and related data

Server side code is written in Node.js with Express.

REST APIs are written in Node.js to store and fetch details for the user and sensor
The application was deployed on an AWS EC2 ubuntu instance

Tools:
Eclipse Enide for express and node.js
Mongod to host the database
Created with Nodeclipse (Eclipse Marketplace, site)

Nodeclipse is free open-source project that grows with your contributions.

To Run

Install npm, express, node
command to run the application : node app.js
