# Example Queries for Claude

This file contains example queries you can use with Claude Desktop after installing the MCP Server.

## Products

### Get All Products
```
Show me all products from the store
```

### Get Limited Products
```
Show me the first 10 products
```

### Get Products Sorted
```
Get all products sorted in descending order by ID
```

### Get Single Product
```
What are the details of product 15?
```

### Get All Categories
```
What product categories are available in the store?
```

### Get Products by Category
```
Show me all electronics products
```

```
List all jewelry items
```

```
What men's clothing products are available?
```

### Product Analysis
```
Analyze all products and tell me which category has the highest average price
```

```
Find the 5 most expensive products
```

```
Which products have the best ratings?
```

## Carts

### Get All Carts
```
Show me all shopping carts
```

### Get Limited Carts
```
Show me the first 5 shopping carts
```

### Get Single Cart
```
What items are in shopping cart 3?
```

### Get User's Carts
```
Show me all carts for user 2
```

### Cart Analysis
```
Which user has the most items in their cart?
```

```
Calculate the total number of products across all carts
```

```
Find the cart with the most products
```

## Users

### Get All Users
```
List all users in the system
```

### Get Limited Users
```
Show me the first 3 users
```

### Get Single User
```
Get information about user 7
```

```
What's the email address of user 4?
```

### User Analysis
```
List all users with their cities
```

```
Which city has the most users?
```

## Complex Queries

### Cross-Resource Queries

```
Get user 1's information, their carts, and details of all products in those carts
```

```
Find the user with the most expensive cart based on product prices
```

```
Show me user 2's profile and recommend products from their favorite category
```

### E-Commerce Insights

```
Analyze all products and carts to determine:
1. Most popular product categories
2. Average cart size
3. Most active users
```

```
Create a sales report showing:
- Total number of products
- Products by category
- Number of active carts
- Number of registered users
```

### Personalized Recommendations

```
Based on user 3's shopping cart, recommend 5 similar products
```

```
Find users who have similar products in their carts to user 1
```

### Data Validation

```
Check if product 100 exists in the catalog
```

```
Verify that all products in cart 5 exist in the product catalog
```

### Statistical Analysis

```
Calculate the average price for each product category
```

```
What's the price range for electronics products?
```

```
Find products with ratings above 4.0
```

## Development and Testing Queries

### Test API Connectivity
```
Test the connection to Fake Store API by fetching a single product
```

### Test All Tools
```
Test all available MCP tools one by one and report any errors
```

### Benchmark Performance
```
Measure how long it takes to fetch all products, carts, and users
```

## Tips for Better Queries

1. **Be Specific**: Instead of "Show products", say "Show the first 10 electronics products"

2. **Use Context**: Claude remembers context, so you can follow up:
   ```
   You: Show me product 5
   Claude: [shows product details]
   You: Now show products from the same category
   ```

3. **Ask for Analysis**: Claude can analyze the data:
   ```
   Get all products and create a price comparison chart
   ```

4. **Combine Operations**: Ask for multi-step operations:
   ```
   Get user 2's cart, calculate the total value, and suggest products to reach free shipping at $100
   ```

5. **Error Handling**: Test edge cases:
   ```
   What happens if I try to get product 99999?
   ```

## Advanced Use Cases

### Inventory Management
```
List all products with ratings below 3.0 that might need improvement
```

### Customer Behavior
```
Analyze which categories appear most frequently in shopping carts
```

### Product Recommendations
```
For each user, recommend products they don't have in their cart but are popular in their preferred categories
```

### Data Export
```
Export all product data in a formatted table
```

---

**Note**: Remember that Fake Store API returns fake/demo data, so don't expect real-world consistency. It's perfect for testing and learning!
