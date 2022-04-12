const { faker } = require('@faker-js/faker');

// eslint-disable-next-line no-unused-vars
function mockGetAddress(_lat, _lon) {
  const address = {
    address: {
      country: faker.address.country(),
      state: faker.address.state(),
      city: faker.address.city(),
      zipCode: faker.address.zipCode(),
      streetAddress: faker.address.streetAddress(),
    },
  };

  return address;
}

module.exports = { mockGetAddress };
