$(function(){var o=function(o,n){var t="http://localhost:3000/api/",e=function(n){window.localStorage.setItem("sessionToken",n),o.ajaxSetup({headers:{Authorization:n}})};return{API_BASE:t,setAuthHeader:e}}(jQuery);$(".nav-tabs a[data-toggle=tab]").on("click",function(o){var n=window.localStorage.getItem("sessionToken");if($(this).hasClass("disabled")&&!n)return o.preventDefault(),!1}),$('a[data-toggle="tab"]').on("shown.bs.tab",function(n){var t=$(n.target).attr("href");"#log"===t&&o.log.setDefinitions(),"#history"===t&&o.log.setHistory()}),$(document).on("keypress",function(o){13===o.which&&($("#signup-modal").is(":visible")&&$("#signup").trigger("click"),$("#login-modal").is(":visible")&&$("#login").trigger("click"))});var n=window.localStorage.getItem("sessionToken");n&&o.setAuthHeader(n),window.WorkoutLog=o}),$(function(){$.extend(WorkoutLog,{definition:{userDefinitions:[],create:function(){var o={desc:$("#def-description").val(),type:$("#def-logtype").val()},n={definition:o},t=$.ajax({type:"POST",url:WorkoutLog.API_BASE+"definition",data:JSON.stringify(n),contentType:"application/json"});t.done(function(o){WorkoutLog.definition.userDefinitions.push(o.definition)}),t.fail(function(){console.log("oh no")})},fetchAll:function(){$.ajax({type:"GET",url:WorkoutLog.API_BASE+"definition",headers:{Authorization:window.localStorage.getItem("sessionToken")}}).done(function(o){WorkoutLog.definition.userDefinitions=o}).fail(function(o){console.log(o)})}}}),$("#def-save").on("click",WorkoutLog.definition.create),window.localStorage.getItem("sessionToken")&&WorkoutLog.definition.fetchAll()}),$(function(){$.extend(WorkoutLog,{log:{workouts:[],setDefinitions:function(){for(var o=WorkoutLog.definition.userDefinitions,n=o.length,t="",e=0;e<n;e++)t+="<option value='"+o[e].id+"'>"+o[e].description+"</option>";$("#log-definition").children().remove(),$("#log-definition").append(t)},setHistory:function(){for(var o=WorkoutLog.log.workouts,n=o.length,t="",e=0;e<n;e++)t+="<li class='list-group-item'>"+o[e].def+" - "+o[e].result+"</li>";$("#history-list").children().remove(),$("#history-list").append(t)},create:function(){var o={desc:$("#log-description").val(),result:$("#log-result").val(),def:$("#log-definition option:selected").text()},n={log:o},t=$.ajax({type:"POST",url:WorkoutLog.API_BASE+"log",data:JSON.stringify(n),contentType:"application/json"});t.done(function(o){WorkoutLog.log.workouts.push(o)}),t.fail(function(){console.log("something broke")})},fetchAll:function(){var o=$.ajax({type:"GET",url:WorkoutLog.API_BASE+"log",headers:{Authorization:window.localStorage.getItem("sessionToken")}});o.done(function(o){WorkoutLog.log.workouts=o}),o.fail(function(){console.log("an error occured")})}}}),$("#log-save").on("click",WorkoutLog.log.create),window.localStorage.getItem("sessionToken")&&WorkoutLog.log.fetchAll()}),$(function(){$.extend(WorkoutLog,{afterSignin:function(o){WorkoutLog.setAuthHeader(o),WorkoutLog.definition.fetchAll(),WorkoutLog.log.fetchAll(),$(".disabled").removeClass("disabled"),$("#loginout").text("Logout")},signup:function(){var o=$("#su_username").val(),n=$("#su_password").val(),t={user:{username:o,password:n}},e=$.ajax({type:"POST",url:WorkoutLog.API_BASE+"user",data:JSON.stringify(t),contentType:"application/json"});e.done(function(o){o.sessionToken&&(WorkoutLog.afterSignin(o.sessionToken),$("#signup-modal").modal("hide"))}).fail(function(){$("#su_error").text("There was an issue with sign up").show()})},login:function(){var o=$("#li_username").val(),n=$("#li_password").val(),t={user:{username:o,password:n}},e=$.ajax({type:"POST",url:WorkoutLog.API_BASE+"login",data:JSON.stringify(t),contentType:"application/json"});e.done(function(o){o.sessionToken&&(WorkoutLog.afterSignin(o.sessionToken),$("#login-modal").modal("hide"))}).fail(function(){$("#li_error").text("There was an issue with sign up").show()})},loginout:function(){window.localStorage.getItem("sessionToken")&&(window.localStorage.removeItem("sessionToken"),$("#loginout").text("Login"))}}),$("#login").on("click",WorkoutLog.login),$("#signup").on("click",WorkoutLog.signup),$("#loginout").on("click",WorkoutLog.loginout),window.localStorage.getItem("sessionToken")&&$("#loginout").text("Logout")});