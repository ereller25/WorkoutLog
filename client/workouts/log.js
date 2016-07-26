$(function() { // same as $(document).ready(function() {
	$.extend(WorkoutLog, {
		log: {
			workouts: [],
			
			setDefinitions: function() {
				var defs = WorkoutLog.definition.userDefinitions;
				var len = defs.length;
				var opts = "";
				for (var i = 0; i < len; i++) {
					opts += "<option value='" + defs[i].id + "'>" + defs[i].description + "</option>";
				}
				$("#log-definition").children().remove();
				$("#log-definition").append(opts);
			},

			setHistory: function() {
				// Workout Definition - Workout result
				var history = WorkoutLog.log.workouts;
				var len = history.length;
				var lis = "";
				for (var i = 0; i < len; i++) {
					lis += "<li class='list-group-item'>" +
					history[i].def + " - " +
					history[i].result +
					"<button id='" + history[i].id + "' class='remove'><strong>X</strong></button></li>";
				}
				$("#history-list").children().remove();
				$("#history-list").append(lis);
			},

			create: function() {
				var itsLog = {
					desc: $("#log-description").val(),
					result: $("#log-result").val(),
					def: $("#log-definition option:selected").text()
				};

				var postData = { log: itsLog };
				var logger = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "log",
					data: JSON.stringify(postData),
					contentType: "application/json"
				});

				logger.done(function(data) {
					WorkoutLog.log.workouts.push(data);
				});

				logger.fail(function() {
					console.log("something broke");
				});
			},

			delete: function(){
				var thisLog = {
					id: $(this).attr("id")
				};

				var deleteData = { log: thisLog };
				console.log(deleteData);
				var deleteLog = $.ajax({
					type: "DELETE",
					url: WorkoutLog.API_BASE + "log",
					data: JSON.stringify(deleteData),
					contentType: "application/json"
				});

				// removes list item
				// references button then grabs closest li
				$(this).closest("li").remove();

				deleteLog.fail(function(){
					console.log("nope. you didn't delete it.");
				});
			},


			fetchAll: function() {
				var fetchDefs = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "log",
					headers: {
						"Authorization": window.localStorage.getItem("sessionToken")
					}
				});
				fetchDefs.done(function(data) {
					WorkoutLog.log.workouts = data;
				});

				fetchDefs.fail(function() {
					console.log("an error occured");
				});
			}
		}
	});

	$("#log-save").on("click", WorkoutLog.log.create);

	// need to change to delete once .ajax call is finished
	// has to target id of ul b/c li items are dynamic
	$("#history-list").delegate('.remove', 'click', WorkoutLog.log.delete);

	if (window.localStorage.getItem("sessionToken")) {
		WorkoutLog.log.fetchAll();
	}
});






