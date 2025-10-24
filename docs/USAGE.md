# 📖 Usage Guide

Learn how to use the MCP Server for Fake Store API with practical examples.

## Basic Usage

### Products

#### Get All Products

```
You: "Show me all available products"
Claude: *Uses fakestore_get_products*
```

#### Get Products with Limit

```
You: "Show me the first 5 products"
Claude: *Uses fakestore_get_products with limit=5*
```

#### Get Single Product

```
You: "Get details for product ID 10"
Claude: *Uses fakestore_get_product with id=10*
```

#### Get Categories

```
You: "What product categories are available?"
Claude: *Uses fakestore_get_categories*
```

#### Filter by Category

```
You: "Show me all jewelry products"
Claude: *Uses fakestore_get_products_by_category with category="jewelery"*
```

### Carts

#### Get All Carts

```
You: "Show me all shopping carts"
Claude: *Uses fakestore_get_carts*
```

#### Get Single Cart

```
You: "What's in cart number 3?"
Claude: *Uses fakestore_get_cart with id=3*
```

#### Get User's Carts

```
You: "Show me all carts for user 2"
Claude: *Uses fakestore_get_user_carts with userId=2*
```

### Users

#### Get All Users

```
You: "List all users"
Claude: *Uses fakestore_get_users*
```

#### Get Single User

```
You: "Get information about user 5"
Claude: *Uses fakestore_get_user with id=5*
```

## Advanced Scenarios

### E-Commerce Analysis

```
You: "Analyze the most popular product categories and suggest inventory improvements"

Claude will:
1. Use fakestore_get_categories to get all categories
2. Use fakestore_get_products_by_category for each category
3. Analyze products and provide insights
```

### Shopping Cart Analysis

```
You: "Find the user with the most items in their cart"

Claude will:
1. Use fakestore_get_carts to get all carts
2. Calculate total items per cart
3. Identify the user with most items
4. Use fakestore_get_user to get user details
```

### Product Recommendations

```
You: "Based on user 1's cart, recommend similar products"

Claude will:
1. Use fakestore_get_user_carts with userId=1
2. Use fakestore_get_product for each product in cart
3. Use fakestore_get_products_by_category to find similar items
4. Provide recommendations
```

## API Response Examples

### Product Response

```json
{
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price": 109.95,
  "description": "Your perfect pack for everyday use...",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}
```

### Cart Response

```json
{
  "id": 1,
  "userId": 1,
  "date": "2020-03-02T00:00:00.000Z",
  "products": [
    {
      "productId": 1,
      "quantity": 4
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ]
}
```

### User Response

```json
{
  "id": 1,
  "email": "john@gmail.com",
  "username": "johnd",
  "password": "m38rmF$",
  "name": {
    "firstname": "john",
    "lastname": "doe"
  },
  "address": {
    "city": "kilcoole",
    "street": "7835 new road",
    "number": 3,
    "zipcode": "12926-3874",
    "geolocation": {
      "lat": "-37.3159",
      "long": "81.1496"
    }
  },
  "phone": "1-570-236-7033"
}
```

## Tips and Best Practices

### 1. Use Specific Queries

❌ Bad: "Show me products"
✅ Good: "Show me the first 10 electronics products sorted by ID"

### 2. Combine Multiple Tools

Ask Claude to perform multi-step operations:

```
"Find user 1, get their cart, and show details for each product in the cart"
```

### 3. Use Natural Language

Claude understands context:

```
"What's the most expensive product in the electronics category?"
```

### 4. Leverage Caching

The server caches responses for 5 minutes, so repeated queries are faster.

## Limitations

1. **Read-Only**: All POST/PUT/DELETE operations return fake responses
2. **No Authentication**: The API is public and doesn't require API keys
3. **Fixed Data**: Data doesn't change (great for testing, not for real apps)
4. **Rate Limiting**: No rate limits, but please be respectful

## Next Steps

- Explore the [Architecture](ARCHITECTURE.md) to understand how it works
- Check [Contributing](CONTRIBUTING.md) to add new features
- Visit [GitHub Issues](https://github.com/habibsalimov/mcp-server-fakestore/issues) for support
