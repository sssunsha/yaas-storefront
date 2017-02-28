'use strict';

angular.module('ds.wishlist')
    .factory('WishlistSvc', ['WishlistREST', '$q',
        function(WishlistREST, $q){
    	
    	var getWishListItem = function(parms){
    		var list = WishlistREST.Wishlist.one('wishlists', parms).get();
    		return list;
    	};
    	
    	var getWishListSizes = function(parms){
    		var size = WishlistREST.Wishlist.one('wishlists', parms).one('size').get();
    		return size;
    	};
            return {
                createWishlist: function (newWishlist) {                	
                	var itemDef = $q.defer();
                    WishlistREST.Wishlist.all('wishlists').post(newWishlist).then(function(){
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

