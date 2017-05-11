export default {
    error_conf: {
        ttl: 4000
    },
    saveToken (user, token) {
        $localStorage.currentUser = user;
            $localStorage.token = token;
            $rootScope.currentUser = user;
            $rootScope.token = token;
        if ($localStorage.currentUser.role == 'OPERATOR') {
            $location.path('/data');
            return false;
        }
        $location.path('/main');
    },
    delToken () {
        delete $localStorage.currentUser;
            delete $localStorage.token;
            delete $localStorage.blueMap;
            delete $rootScope.currentUser;
            delete $rootScope.token;
            delete $rootScope.blueMap;
            $location.path('/login');
    },
    checkToken () {
        //这边比较token用$localstorage;因为$rootScope一刷新页面就清空了
        if ($localStorage.token == null) {
            $location.path('/login');
            return false;
        } else {
            $rootScope.token = $localStorage.token;
        }
        if ($localStorage.currentUser.role == 'OPERATOR') {
            $location.path('/data');
            return false;
        }
        qService.tokenHttpGet(tokenFactory.isLogin, null);
    }
}
