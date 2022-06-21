// [rule: 限免游戏]
// [rule: Epic]
// [cron: 30 11 * * *]

request('https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=zh-CN&country=CN&allowCountries=CN', function (error,response, body) {

    var data = JSON.parse(body)
    var games = data.data.Catalog.searchStore.elements

    for (i = 0; i < games.length; i++){
        var game = games[i]

        if (game.promotions) {
            var offer = game.promotions.promotionalOffers;
            
            if (offer.length > 0) {
                var discountType = offer[0].promotionalOffers[0].discountSetting
                var discountPercentage = discountType.discountPercentage
                if (discountPercentage == 0) {
                    var title = game.title
                    var desp = game.description
                    var coverImg = game.keyImages[1].url
                    var shopUrl = "https://www.epicgames.com/store/zh-CN/p/" + game.productSlug
                    sendText("今日限免：" + title + "\n" + desp + "\n" + "领取地址：" + shopUrl + image(coverImg))
                }
            }
        }
    }
    
})
