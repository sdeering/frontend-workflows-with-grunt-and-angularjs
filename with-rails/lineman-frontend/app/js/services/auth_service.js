angular.module("app").factory("AuthenticationService", function($http, SessionService, FlashService) {

  var cacheSession   = function() {
    SessionService.set('authenticated', true);
  };

  var uncacheSession = function(response) {
    SessionService.unset('authenticated');
    FlashService.show(response.flash);
  };

  var loginError = function(response) {
    FlashService.show(response.flash);
  };

  return {
    login: function(credentials) {
      var login = $http.post("/auth/login", credentials);
      login.success(cacheSession);
      login.success(FlashService.clear);
      login.error(loginError);
      return login;
    },
    logout: function() {
      var logout = $http.get("/auth/logout");
      logout.success(uncacheSession);
      return logout;
    },
    isLoggedIn: function() {
      return SessionService.get('authenticated');
    }
  };
});
