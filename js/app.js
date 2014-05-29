/**
* App Module
*
* Main App Module
*/
var app = angular.module('dummyapp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('viewStore', {
				url: "",
				views: {
					"main":{
						templateUrl: "layouts/store/storepage.html",
						controller: "storepageCntrl"
					},
					"option":{
						templateUrl: "layouts/store/listcatalog.html",
						controller: "storepageCntrl"
					},
					"sidenav":{
						templateUrl: "layouts/nav.html"
					}
				}
			});

			$urlRouterProvider.otherwise("");

			//	For Later Use
			//	
			//	.state('viewList', {
			//		url: "",
			//		view: {
			//			"main":{
			//				templateUrl: "store/catalogpage.html",
			//				controller: "catalogCntrl"
			//			},
			//			"option":{
			//				templateUrl: "store/listrecent.html",
			//				controller: "userCntrl"
			//			}
			//		},
			//		title:"OpenBazaar",
			//	})
			//	.state('viewUser', {
			//		url: "",
			//		view: {
			//			"main":{
			//				templateUrl: "store/userpage.html",
			//				controller: "userCntrl"
			//			},
			//			"option":{
			//				templateUrl: "store/userchat.html",
			//				controller: "chatclientCntrl"
			//			}
			//		},
			//		title:"OpenBazaar",
			//	})
			//	.state('makeAccount', {
			//		url: "",
			//		view: {
			//			"main":{
			//				templateUrl: "store/accountpage.html",
			//				controller: "storepageCntrl"
			//			},
			//			"option":{
			//				templateUrl: "store/userchat.html",
			//				controller: "keymakerCntrl"
			//			}
			//		},
			//		title:"OpenBazaar",
			//	});

});

// Controllers 

// Index Page Controller
app.controller('indexCntrl', function($scope){});

// Store Page Controller
app.controller('storepageCntrl', function($scope){});


// Set Wrap Application to 100%
app.directive('uiWrap',function(){
	return {
		restrict: "C",
		link: function($scope,elem,attrs) {
			$(window).resize(function() {

				var height = $(window).height();
				height = height -$('#top-wrap').height();
				$(elem).height(height);

			}).resize();
		}
	};
});

// Resize Bar Directive
app.directive('resizerBar',function($document) {
	return {
		restrict: "A",
		link: function($scope,$element,$attrs) {

			// Check for Parameters
			if(!$attrs.resizerLeft || !$attrs.resizerRight || !$attrs.resizerMax){console.error("Missing Resizer Parameter(s)!");}

			if($attrs.change === ""){
				$attrs.change = 0;
			}
			var xmax = parseInt($attrs.resizerMax, 10);


			$element.on('mousedown',function(event) {
				event.preventDefault();

				var lwidth = $($attrs.resizerLeft).width(),
					rwidth = $($attrs.resizerRight).width(),
					startX = event.pageX,
					startY = event.pageY,
					wwidth = $('#ui-wrap').width(),
					totalchange = {};

				$document.on('mousemove',function(event) {
					if ($attrs.resizerBar == 'vertical') {

						// Handle vertical resizer
						var x = event.pageX - startX;
						var y = event.pageY - startY;

						totalchange = parseInt($attrs.change, 10) + x;

						if(Math.abs(totalchange) < xmax){
							$($attrs.resizerLeft).css({
								width: convrtoperc((lwidth + x),wwidth) + '%'
							});
							$($attrs.resizerRight).css({
								width: convrtoperc((rwidth + -x),wwidth) + '%'
							});
						} else {
							if(totalchange < 0){totalchange = -xmax;}
							if(totalchange > 0){totalchange = xmax;}
						}

						$attrs.$set("x",x);
					}
				});

				$document.on('mouseup', function() {
					$attrs.$set("change",totalchange);
					$document.unbind('mousemove');
					$document.unbind('mouseup');
				});
			});

			// if(mouseup().currentchange){var currentchange = mouseup().currentchange;}

			function convrtoperc(x,w) {
					return 100*(x / w);
            }
		}
	};
});
