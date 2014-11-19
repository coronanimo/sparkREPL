/**
 * Created by rahul on 19/11/14.
 */

var dashboardAppModule = angular.module('dashboardApp', ['ui.ace','ngRoute','ngDragDrop']);

dashboardAppModule.controller('dashboardController', function($scope, $rootScope, $route, $window, $element, $routeParams, $location, $timeout, $http) {

    $scope.toolbarList = [{"name":"Source","class":"fa fa-cog fa-spin fa-3x"},{"name":"Join","class":"fa fa-spinner fa-spin fa-3x"},{"name":"Pivort","class":"fa fa-circle-o-notch fa-spin fa-3x"}];

    $scope.workflowArray = [{"name":"Source"},{"name":"Join"},{"name":"Pivort"}];

    $scope.dropSuccessHandler = function($event,index,array){

        console.log("$event ",$event);
        console.log("Index ",index);
        console.log("Array ",array);
        /* array.splice(index,1);*/
    };

    $scope.onWorkFlowDrop = function($event,$data,array){
        //array.push($data);
        array.push($data);
        console.log("On Drop");
        console.log("$event ",$event);
        console.log("Data ",$data);
        console.log("Array ",array);
    };

});