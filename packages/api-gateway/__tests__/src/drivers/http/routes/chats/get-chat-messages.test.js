// External dependencies
const { faker } = require('@faker-js/faker');
const { listChatMessages } = require('@booking-services/messages');

// Internal dependencies
const { fastify } = require('../../../../../../src/drivers/http/server');

// Mocks
const customerID = faker.datatype.uuid();
const hostID = faker.datatype.uuid();

const mockListChatMessages = [
  {
    _id: faker.datatype.uuid(),
    bookingId: faker.datatype.uuid(),
    hostId: hostID,
    customerId: customerID,
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    deletedAt: null,
  },
];

describe('GET /chats/{chatId}/messages', () => {
  describe('given an authenticated user and a valid chatId', () => {
    // TODO: Change this once we have authentication ready
    const bearerToken = customerID;
    const chatId = 1;

    const headers = {
      Authorization: `Bearer ${bearerToken}`,
    };

    describe('when requesting page 1', () => {
      let response;
      let responseJson;

      beforeAll(async () => {
        listChatMessages.mockReturnValue(mockListChatMessages);

        response = await fastify.inject({
          method: 'GET',
          url: `/chats/${chatId}/messages`,
          headers,
        });

        responseJson = response.json();
      });

      test('then status should be 200', () => {
        expect(response.statusCode).toBe(200);
      });

      test('response should match pagination schema', () => {
        expect(responseJson).toHaveProperty('page');
        expect(typeof responseJson.page).toBe('number');
        expect(responseJson).toHaveProperty('pages');
        expect(typeof responseJson.pages).toBe('number');
        expect(responseJson).toHaveProperty('rows');
        expect(Array.isArray(responseJson.rows)).toBe(true);
      });

      test('response should have at least one element', () => {
        expect(responseJson.rows.length).toBeGreaterThan(0);
      });

      test('and the element should match schema', () => {
        const item = responseJson.rows[0];
        expect(item._id).toBeDefined();
        expect(item.chatId).toBeDefined();
        expect(item.text).toBeDefined();
        expect(item.createdAt).toBeDefined();
        expect(item.createdBy).toBeDefined();
      });
    });

    describe('when requesting with a non-integer value as page', () => {
      /** @type {import('fastify').FastifyReply} */
      let response;

      beforeAll(async () => {
        response = await fastify.inject({
          method: 'GET',
          url: `/chats/${chatId}/messages?page=foo`,
          headers,
        });
      });

      test('then status should be 400', () => {
        expect(response.statusCode).toBe(400);
      });

      test('response should match error schema', () => {
        const responseJson = response.json();
        expect(responseJson).toHaveProperty('error');
        expect(responseJson).toHaveProperty('message');
        expect(responseJson).toHaveProperty('statusCode');
      });
    });
  });
});
