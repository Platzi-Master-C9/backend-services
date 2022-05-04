// Services
const adminPanelService = require('./useCases');

// aquí importamos el servicio que queremos usar
const listPlacesMock = require('../mocks/placesList.mock');

module.exports = {
  sayHello: adminPanelService.firstCase.sayHello,
  changeUserStatus: adminPanelService.userStatus.changeUserStatus,
  getUsers: adminPanelService.userList.getUsers,
  getUserDetail: adminPanelService.userDetail.getUserDetail,
  getAdminId: adminPanelService.adminId.getAdminId,
  listPlaces: adminPanelService.places.listPlaces(listPlacesMock),
};
