module.exports = function(sequelize, DataTypes) {

	var Log = sequelize.define('log', {
		description: DataTypes.STRING, // notes on workout
		result: DataTypes.STRING, // actual workout result
		owner: DataTypes.INTEGER, // user ID of owner
		def: DataTypes.STRING // string of definiton 
	});

	return Log;
};
