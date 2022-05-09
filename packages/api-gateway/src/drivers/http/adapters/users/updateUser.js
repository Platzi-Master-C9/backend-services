const errorHandler = require('./errorHandler');

async function updateUser(req, reply) {
  try {
    const {
      email,
      avatar,
      firstName,
      secondName,
      firstSurname,
      secondSurname,
      birthDate,
      nationality,
      dniId,
      dniFrontImg,
      dniBackImg,
      gender,
      phoneNumber,
      emergencyNumber,
      passport,
      address: {
        country, city, state, address, zip,
      },
    } = req.body;
    const { userId } = req.params;

    req.log.info('[http-server]: Creating user with: ', {
      userId,
      email,
      avatar,
      firstName,
      secondName,
      firstSurname,
      secondSurname,
      birthDate,
      nationality,
      dniId,
      dniFrontImg,
      dniBackImg,
      gender,
      phoneNumber,
      emergencyNumber,
      passport,
      address: {
        country,
        city,
        state,
        address,
        zip,
      },
    });

    const result = await this.userServices.updateUser({
      userId,
      email,
      avatar,
      firstName,
      secondName,
      firstSurname,
      secondSurname,
      birthDate,
      nationality,
      dniId,
      dniFrontImg,
      dniBackImg,
      gender,
      phoneNumber,
      emergencyNumber,
      passport,
      address: {
        country,
        city,
        state,
        address,
        zip,
      },
    });

    if (result.isBoom) {
      return errorHandler(result, reply);
    }

    return reply
      .code(200)
      .header('Content-Type', 'application/json; chartset:utf-8')
      .send({ result });
  } catch (error) {
    return errorHandler(error, reply);
  }
}

module.exports = updateUser;
