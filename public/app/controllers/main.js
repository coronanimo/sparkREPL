/**
 * Created by rahul on 19/11/14.
 */

var dashboardAppModule = angular.module('dashboardApp', ['ui.ace','ngRoute','ngDragDrop','ui.bootstrap']);

dashboardAppModule.controller('dashboardController', function($scope, $rootScope, $route, $window, $element, $routeParams, $location, $timeout, $http) {

    $scope.toolbarList = [{"name":"Source","class":"fa fa-exchange fa-3x"},{"name":"Join","class":"fa fa-link fa-3x"},{"name":"Pivort","class":"fa fa-pie-chart fa-3x"}];

    $scope.workflowArray = [];

    var container = "#workflow-area";

    $scope.dropSuccessHandler = function($event,index,array){

        console.log("$event ",$event);
        console.log("Index ",index);
        console.log("Array ",array);
        /* array.splice(index,1);*/
    };

    $scope.openModalDialog = function() {

        alert("Clicked");

    };


    $scope.status = {
        isopen: false
    };

    $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };





    $scope.onWorkFlowDrop = function($event,$data,array){
        //array.push($data);
        /*array.push($data);*/
        console.log("On Drop");
        console.log("$event ",$event);
        console.log("Data ",$data);
        console.log("Array ",array);
        var elem = $event.currentTarget;
        /*$(elem).append('<div>'+$data.name+'</div>');*/
        var gridster = $(".gridster ul").gridster({

        }).data('gridster');
        if($data.name == 'Source'){
            col = 1;

           gridster.add_widget('<li id="div-'+$data.name+'" class="thumbnaildiv" ng-click=openModalDialog()>'+$data.name+'</li>', 1, 0,col,1);

            var panelbody = '<div class="container"><div> Add data sources  </div>' +
                '<div class="dropdown">'+
                '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">'+
                'Data Sources <span class="caret"></span>'+
                 '</button>'+
                '<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">'+
                '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">HDFS</a></li>'+
                '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Kafka</a></li>'+
                '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Amazon SQS</a></li>'+
                '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Twiter</a></li>'+
                '</ul>'+
                '</div></div>';


            var panelbody1 = '<div class="btn-group" dropdown is-open="status.isopen">'+
                             '<button type="button" class="btn btn-primary dropdown-toggle" dropdown-toggle ng-disabled="disabled">'+
                             'Button dropdown <span class="caret"></span>'+
                             '</button> <ul class="dropdown-menu" role="menu"> ' +
                             '<li><a href="#">Data Sources</a></li> ' +
                '<li><a href="#">Kafka</a></li> ' +
                '<li><a href="#">Amazon SQS</a></li> ' +
                '<li href="#">Twiter</li> ' +
                '<li><a href="#">HDFS</a></li> ' +
                '</ul> </div>';



            var arr = [
      /*          {
                    item:     '<div style="float:left;padding:6px 0 0 0;cursor:pointer;">Clickable Text ...</div>',
                    event:    'click',
                    callback: function( event ) {
                        event.data.content.append( "<p>The click happened at (" + event.pageX + ", " + event.pageY + ")</>" );
                    }
                },*/
                {
                    item:     '<button class="..." type="button"><span class="..."></span></button>',
                    event:    'click',
                    btnclass: 'btn-sm',
                    btntext:  ' Close',
                    callback: function( event ){ event.data.close() }
                },
                {
                    item:     '<button class="..." type="button"><span class="..."></span></button>',
                    event:    'click',
                    btnclass: 'btn-sm',
                    btntext:  ' Ok',
                    callback: function( event ){
                        /*event.data.content.append( "<p style='...'>And this was a click on the OK button!</p>" )*/
                    }
                }
            ];

            $("#div-Source").click(function(){
                $.jsPanel({
                    selector:  "#sourceListDiv",
                    title: 'Data Sources <small>Select DataSources.</small>',
                    position:  "center",
                    bootstrap: 'danger',
                    content:   panelbody,
                    toolbarFooter: arr,
                   position: { top: 100, left: 330 }
                });
                //alert("Source click");
            });

        }else if($data.name == 'Join') {
            col = 2;
            gridster.add_widget('<li id="div-'+$data.name+'" class="thumbnaildiv" ng-click=openModalDialog()>'+$data.name+'</li>', 1, 0,col,1);
            $("#div-Join").click(function(){
                alert("Join click");
            });

        }else if($data.name == 'Pivort') {

            col = 3;
            gridster.add_widget('<li id="div-'+$data.name+'" class="thumbnaildiv" ng-click=openModalDialog()>'+$data.name+'</li>', 1, 0,col,1);
            $("#div-Pivort").click(function(){
                alert("Pivort click");
            });

        }














    };

/*    container.bind('click', function (event) {
        var elem = event.currentTarget;
        $(elem).append('<div>test</div>’); //Appending should work
    });*/

});


