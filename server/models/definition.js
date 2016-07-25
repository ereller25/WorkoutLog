// description model needs description, logtype, and an owner

module.exports = function(sequelize, DataTypes) {

	var Definition = sequelize.define('definition', {
		description: DataTypes.STRING,
		logType: DataTypes.STRING,
		owner: DataTypes.INTEGER
	});

	return Definition;
};

