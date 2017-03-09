'use strict';

angular.module('ds.wishlist')
    .factory('WishlistSvc', ['WishlistREST', 'settings', 'GlobalData', '$q',
        function(WishlistREST, settings, GlobalData, $q){
    
        var getWishListItem = function(){
            // first check the login user address
            if(angular.isObject(GlobalData.customerAccount) && !angular.isUndefined(GlobalData.customerAccount.contactEmail)){
                settings.hybrisUser = GlobalData.customerAccount.contactEmail;
            }
            
            var list = WishlistREST.Wishlist.one('wishlists').get();
            return list;
        };
    
        var getWishListSizes = function(parms){
            var size = WishlistREST.Wishlist.one('wishlist_size', parms).get();
            return size;
        };
            return {
                addWishlistItem: function (newWishlist) {
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


