const binance = require('node-binance-api');
const config = require('./config.json');
//console.log(config);
const Main = {
    init() {
        binance.options(config);
        binance.websockets.trades(['XRPBTC', 'XRPETH'], function(trades) {
            //console.log(trades);
            let { e: eventType, E: eventTime, s: symbol, p: price, q: quantity, m: maker, a: tradeId } = trades;
            //  console.log(symbol + " trade update. price: " + price + ", quantity: " + quantity + ", maker: " + maker);
        });

        binance.websockets.depth(['XRPBTC'], function(depth) {
            let { e: eventType, E: eventTime, s: symbol, u: updateId, b: bidDepth, a: askDepth } = depth;
            let collection = [];
            bidDepth.forEach((item)=>{
            		collection.push({
            			item:item,
            			type:'bid'
            		});
            });
            askDepth.forEach((item)=>{
            		collection.push({
            			item:item,
            			type:'ask'
            		});
            });

            
            
            //console.log(symbol + " market depth update");
            console.log(depth);

        });

    }
};
Main.init();