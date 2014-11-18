/**
 * Created by rahul on 11/11/14.
 */
var streamVectorAppModule = angular.module('StreamVectorApp', ['ui.ace','ngRoute']);

streamVectorAppModule.controller('StreamVectorController', function($scope, $rootScope, $route, $window, $element, $routeParams, $location, $timeout, $http) {


    $scope.paragraph = null;
    $scope.editor = null;
    $scope.forms = {};

    $scope.aceLoaded = function(_editor) {
        // Options
        $scope.editor = _editor;
        _editor.setShowPrintMargin(false);
        _editor.setReadOnly(false);
        _editor.setOptions({
            fontSize: "12pt"
        });

        var setEditorHeight = function(id, height) {
            $('#' + id).height(height.toString() + 'px');
        };


        $scope.editor.getSession().on('change', function(e, editSession) {
            hight = editSession.getScreenLength() * $scope.editor.renderer.lineHeight + $scope.editor.renderer.scrollBar.getWidth();
            //setEditorHeight(_editor.container.id, hight);
            setEditorHeight("scriptletID", hight);
            $scope.editor.resize();
        });
    };

    $scope.aceChanged = function(e) {

        console.log("Hello Ace Changed !!");
        console.log(e);
        //
    };

    $scope.aceBlur = function(e) {

        console.log("Ace Blur changed !!");
        /*        console.log("Blur :--> ", e[0].getSession().getValue());*/
    };

    $scope.getEditorValue = function() {

        return $scope.editor.getValue();
    };

    $scope.runParagraph = function(data) {

        /*console.log("Data :--> ",data);*/

        //console.log('send new paragraph: %o with %o', $scope.paragraph.id, data);
        /*var parapgraphData = {op: 'RUN_PARAGRAPH',
            data: {
                paragraph: data
                *//* id: $scope.paragraph.id,
                 title: $scope.paragraph.title,
                 paragraph: data,
                 config: $scope.paragraph.config,
                 params: $scope.paragraph.settings.params*//*
            }
        };*/

        var parapgraphData = {data:data};
        $rootScope.$emit('sendNewEvent', parapgraphData);

        /*var res = $http.post('/runscriptlet', parapgraphData);*/

        $http({
            url: '/runscriptlet',
            dataType: 'json',
            method: 'POST',
            data: parapgraphData,
            headers: {
                "Content-Type": "application/json"
            }

        }).success(function(response){
            $scope.response = response;
        }).error(function(error){
            $scope.error = error;
        });
        console.log("parapgraphData ", parapgraphData);

    };

    // Initial code content...
    /*   $scope.aceModel = ';; Scheme code in here.\n' +
     '(define (double x)\n\t(* x x))\n\n\n' +
     '<!-- XML code in here. -->\n' +
     '<root>\n\t<foo>\n\t</foo>\n\t<bar/>\n</root>\n\n\n' +
     '// Javascript code in here.\n' +
     'function foo(msg) {\n\tvar r = Math.random();\n\treturn "" + r + " : " + msg;\n}';*/


});