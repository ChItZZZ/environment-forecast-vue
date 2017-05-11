export default class kpiService {
    persistentBlueMap() {
        kpiFactory.blueMap().get(null, function success(blueMap) {
            var blueMap = JSOG.parse(JSOG.stringify(blueMap.data));
            $localStorage.blueMap = blueMap;
            $rootScope.blueMap = blueMap;
        })
    }
    getBlueMap(){
        if ($localStorage.blueMap == undefined) {
            return false;
        } else {
            $rootScope.blueMap = $localStorage.blueMap;
            return $rootScope.blueMap;
        }
    }
}
