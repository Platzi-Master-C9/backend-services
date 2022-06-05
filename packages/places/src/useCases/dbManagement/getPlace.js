const getPlace = (model) => async () => {
	let data;
	try {
		data = await model.findOne({
			attributes: {
				exclude: ['createdAt', 'updatedAt', 'is_active'],
			},
			include: ['perks', 'spaces', 'images', 'rules'],
		});

		Logger.debug('[getPlaces]: reading places');
	} catch (error) {
		Logger.error('[getPlaces]: could not read places');
		throw new Error(error);
	}
	return data.map((place) => place.toJSON());
};

module.exports = getPlaces;
