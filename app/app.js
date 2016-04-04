var app=angular.module('myApp', ['LocalSessionStorage']);


app.controller('searchCtrl', function($scope, $http, LocalSessionStorage,$log){
$scope.$on('sessionBroacast', function(event,data){
$scope.viewdata=data;

})

$log.info('search  controller is loaded!!')
$scope.searchResult=function(){
  if($scope.search)
  {
  $temp={'search':$scope.search};
  LocalSessionStorage.add($temp);
  }
  }

$scope.viewdata=LocalSessionStorage.getData();
$scope.remove=function()
{
  LocalSessionStorage.clear();

}
});
