/**
 * MCP tools tests
 */

import {
  getProductsTool,
  getProductTool,
  getCategoriesTool,
  getProductsByCategoryTool,
  getCartsTool,
  getCartTool,
  getUserCartsTool,
  getUsersTool,
  getUserTool,
} from '../src/tools';

describe('Products Tools', () => {
  test('getProductsTool should execute successfully', async () => {
    const result = await getProductsTool.execute({});
    expect(result).toHaveProperty('content');
    expect(Array.isArray(result.content)).toBe(true);
    expect(result.content[0]).toHaveProperty('type', 'text');
  });

  test('getProductTool should execute with valid ID', async () => {
    const result = await getProductTool.execute({ id: 1 });
    expect(result).toHaveProperty('content');
    const data = JSON.parse(result.content[0].text);
    expect(data).toHaveProperty('id', 1);
  });

  test('getCategoriesTool should execute successfully', async () => {
    const result = await getCategoriesTool.execute();
    expect(result).toHaveProperty('content');
    const data = JSON.parse(result.content[0].text);
    expect(Array.isArray(data)).toBe(true);
  });

  test('getProductsByCategoryTool should execute with valid category', async () => {
    const result = await getProductsByCategoryTool.execute({ category: 'electronics' });
    expect(result).toHaveProperty('content');
    const data = JSON.parse(result.content[0].text);
    expect(Array.isArray(data)).toBe(true);
  });
});

describe('Carts Tools', () => {
  test('getCartsTool should execute successfully', async () => {
    const result = await getCartsTool.execute({});
    expect(result).toHaveProperty('content');
    expect(Array.isArray(result.content)).toBe(true);
  });

  test('getCartTool should execute with valid ID', async () => {
    const result = await getCartTool.execute({ id: 1 });
    expect(result).toHaveProperty('content');
    const data = JSON.parse(result.content[0].text);
    expect(data).toHaveProperty('id', 1);
  });

  test('getUserCartsTool should execute with valid user ID', async () => {
    const result = await getUserCartsTool.execute({ userId: 1 });
    expect(result).toHaveProperty('content');
    const data = JSON.parse(result.content[0].text);
    expect(Array.isArray(data)).toBe(true);
  });
});

describe('Users Tools', () => {
  test('getUsersTool should execute successfully', async () => {
    const result = await getUsersTool.execute({});
    expect(result).toHaveProperty('content');
    expect(Array.isArray(result.content)).toBe(true);
  });

  test('getUserTool should execute with valid ID', async () => {
    const result = await getUserTool.execute({ id: 1 });
    expect(result).toHaveProperty('content');
    const data = JSON.parse(result.content[0].text);
    expect(data).toHaveProperty('id', 1);
  });
});
