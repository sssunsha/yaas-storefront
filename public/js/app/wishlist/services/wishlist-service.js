'use strict';

angular.module('ds.wishlist')
    .factory('WishlistSvc', ['WishlistREST', '$q',
        function(WishlistREST, $q){
    	
    	var getWishListItem = function(parms){
    		parms = parms.replace(".", "_");
    		parms = parms.replace("@", "_");
    		var list = WishlistREST.Wishlist.one('wishlist', parms).get();
    		return list;
    	};
    	
    	var getWishListSizes = function(parms){
    		var size = WishlistREST.Wishlist.one('wishlist_size', parms).get();
    		return size;
    	};
            return {
            	addWishlistItem: function (newWishlist) {                	
                	var itemDef = $q.defer();
                    WishlistREST.Wishlist.all('wishlist').post(newWishlist).then(function(){
                    	itemDef.resolve();
                    }, function(){
                    	itemDef.reject();
                    });
                    
                    return itemDef.promise;
                },
                
                wishlistItem: function(parms){
                	return getWishListItem(parms);
                },
                
                wishlistSize: function(parms){
                	return getWishListSizes(parms);
                }
            };
        }]);


