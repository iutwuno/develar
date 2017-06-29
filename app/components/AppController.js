import $ from "jquery";
import LandingView from "./LandingView";
import UserRouter from "./UserRouter";
import ProjectRouter from "./ProjectRouter";

const userRouter = new UserRouter();
const projectRouter = new ProjectRouter();
	
//console.log('constructor [%s] len: [%s]', user2.get('displayName'), userCol.length);

var AppController = {
	showLanding: function(){
		console.log("AppController:showLanding");
		var landing = new LandingView();
		landing.render();
		$("#appcontent").html(landing.$el);
	},

	loadUserModule: function(){
		console.log("AppController:loadUserModule");
		userRouter.controller.loadModule(function(view){
			$("#appcontent").html(view.$el);
		});
	},
        loadProjectModule: function(){
                console.log("AppController:loadProjectosModule");
                projectRouter.controller.loadModule(function(view){
                        $("#appcontent").html(view.$el);
                });
        },

};

export default AppController;
