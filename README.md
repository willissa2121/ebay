# ebay

##for this application, the user can use the terminal and command line prompts to act as either a customer, manager, or supervisor to the department store. The "Store" in question is two seperate MYSQL database tables. The first table, named products, shows all products that are available to purchase, as well as the cost to buy them as a customer, cost to buy as the manager (for the stores inventory), the current inventory, the total earnings, and the total costs. The second table contains all of the departments. This table will show the total earnings, total cost, and net profit for each department. If the user runs app.js (customer experience), they will see a table containing all products and prices and inventory, and then have a dynamically generated list of products to purchase(s1). Upon selection, they will be prompted to enter the amount they want to purcahse (s2). They will then be shown the amount of money they spent (s3). This amount spent will be added to the total earnings of the product, as well as the department earnings. If the user runs managers.js, 4 options will appear. The first option displays all products and inventory for the manager(s4),(s5). If the user selects low inventory, all items with less than 5 inventory will be displayed as a string on new lines(s6). If the manager chooses to refill stock, they will have a list of items geenrated, and then after choosings an item, will choose the amount to replenish. This will have a cost, which will be summed and added to total costs of the item, which will be used to calcualted total costs of a department(s7). After choosing, the manager can see the new inventory and the total cost to purchase that item for resale. If the manager chooses add an item (s8), they will enter the product name, new sale price, new purchase price, and department. THe department Id will be generated based on the department selcted for the product(s9). If the user were to run supervisor.js, options would appear to create a new department, or view department earnings. if the uiser selects view department earnings, multipls sequal calls are made. I find the Sum value of each product that has a similar department ID, then take that sum and insert it into the products table where the ID is the same. This is done as the user clicks on the "view department earnings" options (s11). The manager can also enter a new department, which will have an ID that is equal to its spot in the current index of the array of products, so that if a department is deleted that had and ID of 3, and a new department is made, the new department will have an ID of 3 (lowest available number), instead of 4(beacause i do not want it to save the primary key or a deleted val).

##Update for bonus problems.
#The manager can now choose to delete a department, and upon deletion, the other departmetns will be displayed as list options to take the products from the delted departemnt. The id's of the products are changed. The supervisor can also delete products themselves, and change the names of the products as well.
![GitHub Logo](/images/s1.png)
![GitHub Logo](/images/s2.png)
![GitHub Logo](/images/s3.png)
![GitHub Logo](/images/s4.png)
![GitHub Logo](/images/s5.png)
![GitHub Logo](/images/s6.png)
![GitHub Logo](/images/s7.png)
![GitHub Logo](/images/s8.png)
![GitHub Logo](/images/s9.png)
![GitHub Logo](/images/s10.png)
![GitHub Logo](/images/s11.png)
![GitHub Logo](/images/s12.png)

##Installing
#to run this program, please install node.js, then in your terminal install --
#mysql, inquirer

#A BIG THANKS TO OUR PLAYTESTERS
#Carie Graves:)
