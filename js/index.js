var chart;
var selectedCoin = 0;
var wallet = 1000;
var transactionVue = new Vue(
  {
    el: '#transactionHistory',
    data:
    {
     message:"HAHA",
     cart:{
       items:[]
     }, 
      methods: {
   
      },
            transactions:[]
      ,
    },
  }
)


var coins = new Vue(
  {
    el: '#app',
    data: {
       transactionAmount: '0.0',
       cart:{
         items: []
       },

     products:[
      {
        id:0,
        name:'Nano',
        tag:"NANO",
        volume:2300,
        description:'First Crypto',
        change:'+3%',
        wallet: 0,
        price: 9000,
    icon:'https://s2.coinmarketcap.com/static/img/coins/32x32/1567.png'
      },
       {
        id:1,
        name:'LiteCoin',
          tag:"LTC",
           volume:2300,
        description:'Second Crypto',
        change:'+5%',
        wallet: 0,
        price: 150,
        high:3,
        low:1,
        icon: 'https://s2.coinmarketcap.com/static/img/coins/16x16/2.png'
        
       
      },
          {
        id:2,
        name:'Ripple',
             tag:"XRP",
              volume:2300,
        description:'Ripple',
        change:'+3%', 
        wallet: 0,
        price: .89,
            high:3,
        low:1,
        icon: 'https://s2.coinmarketcap.com/static/img/coins/16x16/52.png'
        
       
      },
          {
        id:3,
        name:'BitCoin-Cash',
             tag:"BCH",
              volume:2300,
        description:'Bitcoin Fork',
        change:'+6%',
        wallet: 0,
        price: 1500,
        high:3,
        low:1,
        icon: 'https://s2.coinmarketcap.com/static/img/coins/16x16/1831.png'
        
       
      },
          {
        id:4,
        name:'EOS',
        tag:"EOS",
        volume:2300,
        description:'Other Ethereum',
        change:'-5%',
        wallet: 0,
        price: 15,
            high:3,
        low:1,
        icon: 'https://s2.coinmarketcap.com/static/img/coins/16x16/1765.png'
        
       
      },
          {
        id:5,
        name:'Stellar',
        tag:"XLM",
        volume:2300,
        description:'Other Ripple',
        change:'-3%',
        wallet: 0,
        price: .48,
        high:3,
        low:1,
        icon: 'https://s2.coinmarketcap.com/static/img/coins/16x16/512.png'
        
       
      },
          {
        id:6,
        name:'Cardano',
        tag:"ADA",
        volume:2300,
        description:'Second Crypto',
        change:'+2%',
        wallet: 0,
        price: .35,
            high:3,
        low:1,
        icon: 'https://s2.coinmarketcap.com/static/img/coins/16x16/2010.png'
        
       
      },
          {
        id:7,
        name:'Tron',
        tag:"TRX",
              volume:2300,
        description:'Game Crypto',
        change:'-10%',
        wallet: 0,
        price: .08,
            high:3,
        low:1,
        icon: 'https://s2.coinmarketcap.com/static/img/coins/16x16/1958.png'
        
       
      },
          {
        id:8,
        name:'NEO',
        tag:"NEO",
        volume:2300,
        description:'Best Crypto',
        change:'+20%',
        wallet: 0,
        price: 150,
        high:3,
        low:1,
        icon: 'https://s2.coinmarketcap.com/static/img/coins/16x16/1376.png'
        
      },
         {
        id:9,
        name:'Ontology',
        tag:"ONT",
        volume:2300,
        description:'Best Crypto',
        change:'+20%',
        wallet: 0,
        price: 150,
        high:3,
        low:1,
        icon: 'https://s2.coinmarketcap.com/static/img/coins/32x32/2566.png'
        
      },
     
     
     ],
      search:"",
      curCoin:1
    },
    
        methods: {
    selectCoin: function (coinId) {
      this.curCoin = coinId;
      selectedCoin = coinId;
      setUpTradePrice();
      $('#selectedCoin').text(this.products[coinId].name);
      $('#selectedCoin').prepend("<img class = 'iconImage' src= ' "+ this.products[coinId].icon  + " ' /img>")
      
      chart.destroy();
      
      create24HChart(this.products[coinId].tag);
    }
          
        
     },
     computed: 
    {
        filteredCoins()
        {
       
            var self = this;
               
            return this.products.filter(function(product) {
               
               return product.name.toLowerCase().indexOf(self.search.toLowerCase())>=0 ||
                 product.tag.toLowerCase().indexOf(self.search.toLowerCase())>=0;
            });
        }
     }
    
  });
function createChart(xLabels,chartData)
{
  Chart.defaults.LineWithLine = Chart.defaults.line;
  Chart.controllers.LineWithLine = Chart.controllers.line.extend({
   draw: function(ease) {
      Chart.controllers.line.prototype.draw.call(this, ease);

      if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
         var activePoint = this.chart.tooltip._active[0],
             ctx = this.chart.ctx,
             x = activePoint.tooltipPosition().x,
             topY = this.chart.scales['y-axis-0'].top,
             bottomY = this.chart.scales['y-axis-0'].bottom;

         // draw line
         ctx.save();
         ctx.beginPath();
         ctx.moveTo(x, topY);
         ctx.lineTo(x, bottomY);
         ctx.lineWidth = 1;
         ctx.strokeStyle = '#a396a0';
         ctx.stroke();
         ctx.restore();
      }
   }
});

chart = new Chart(ctx, {
   type: 'LineWithLine',
   data: {
     // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
     labels: xLabels,
      datasets: [{
         label: coins.products[selectedCoin].name,
         //data: [3, 1, 2, 5, 4, 7, 6],
         data:chartData,
         backgroundColor: '#68546d',
         borderColor: '#68546d',
         fill: false,
      }]
   },
   options: {
        title: {
            display: true,
            text:  (coins.products[selectedCoin].tag +"s in Wallet: " + coins.products[selectedCoin].wallet + "    " + "USD in Wallet: " + wallet.toFixed(4))
        },
     fullwidth:false,
     responsive:true,
     maintainAspectRatio: false,
      tooltips: {
         intersect: false
      },
      scales: {
         yAxes: [{
            ticks: {
              beginAtZero: false,
             


            }
         }]
      }
   }
});
}

function setPrice(coinTag,id)
{


  $.getJSON("https://api.coinmarketcap.com/v1/ticker/"  + coinTag + "/", function(data){
    
   coins.products[id].price = parseFloat(data[0].price_usd).toFixed(4);
    
  coins.products[id].volume = 
   Number("" + parseFloat(data[0]['24h_volume_usd']).toFixed(0)).toLocaleString();
   coins.products[id].change = 
     data[0].percent_change_24h;
}).done(function() {
 
  setUpTradePrice();
  updateCoinProperties(coins.products[selectedCoin].change,coins.products[selectedCoin].high,coins.products[selectedCoin].low,coins.products[selectedCoin].volume);
   
    
 
    
  })
  
}



function setPrices()
{
 
  
  for(var i = 0; i < coins.products.length; i++)
  {
    //setsPrices
    setPrice(coins.products[i].name,i);
  }
  
}

function create24HChart(coinTag)
{
 getPriceChart(coinTag,24,1);
}

function getPriceChart(coinTag,totalHours,hourIncrement)
{
  var xLabels = [];
  var yLabels = [];
  $.getJSON("https://min-api.cryptocompare.com/data/histohour?fsym="+coinTag+"&tsym=USD&limit="+ totalHours +"&aggregate="+hourIncrement+"&e=CCCAGG",function(data){
    
    var high = data.Data[0].close;
    var low = data.Data[0].close;
    
    for(var i = 0; i < totalHours; i++)
  { 
      
      var tempTime = timeConverter(data.Data[i].time);
      xLabels.push(tempTime["month"] + "-" + tempTime["date"] + " " + tempTime["hour"] + ":" + tempTime["min"] + "0" + "PST");
      if(data.Data[i].close > high) high = data.Data[i].close;
      if(data.Data[i].close < low) low = data.Data[i].close;
    
      yLabels.push(data.Data[i].close);
      
    
    
  } 
    coins.products[selectedCoin].high = high;
    coins.products[selectedCoin].low = low;
    

   
    
}).done(function() {
     /* for(var i = 0; i < xLabels.length; i++)
    {
      console.log("YLABEL!: " + yLabels[i]);
    }
      */
    
    createChart(xLabels,yLabels)
    updateCoinProperties(coins.products[selectedCoin].change,coins.products[selectedCoin].high,coins.products[selectedCoin].low,coins.products[selectedCoin].volume);
    
     
   
  })
}
function updateCoinProperties(change,high,low,volume)
{
    
    if(change>0) $("#selectedChange").text("+"+change+"%");
    else $("#selectedChange").text(change+"%");
    $("#selectedHigh").text("$"+high);
   
    $("#selectedLow").text("$"+low);
    $("#selectedVolume").text("$"+volume);
   
}
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  
  var times = {date: date, month: month, year: year, hour:hour,min:min};

  /*var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ; */
  return times;
}

function getPrice(coinTag)
{

  $.getJSON("https://api.coinmarketcap.com/v1/ticker/"  + coinTag + "/", function(data){
    
  //console.log(data[0].price_usd);
})

}

function buyCoin()
{
  if( isNaN($("#buyAmount").val())||(wallet-coins.products[selectedCoin].price * $("#buyAmount").val())<0 || $("#buyAmount").val()<0)
    {
      alert("Invalid Buy Order (Exceeds Wallet or Is Not A Number)");
      return;
    }
wallet -= coins.products[selectedCoin].price * $("#buyAmount").val();
  
coins.products[selectedCoin].wallet += parseFloat($("#buyAmount").val());
setUpAmountOptions();  

  
 
createTransaction(coins.products[selectedCoin].name + '(' + coins.products[selectedCoin].tag + ')',coins.products[selectedCoin].price,$("#buyAmount").val(), getCurrentTime(),'buy');

  
  
$("#buyAmount").val("");
$("#buyTotal").val("$0.0000");
  
  chart.options.title.text = (coins.products[selectedCoin].tag +"s in Wallet: " + coins.products[selectedCoin].wallet.toFixed(4) + "    " + "USD in Wallet: " + wallet.toFixed(4));
  
  chart.update();
 // console.log("WALLET NOW: " + wallet);
  //console.log("Buying : " + selectedCoin);
}
function sellCoin()
{
   if( isNaN($("#sellAmount").val())||(coins.products[selectedCoin].wallet - $("#sellAmount").val())<0 
 || $("#sellAmount").val()<0 )
    {
      alert("Invalid Buy Order (Exceeds Wallet or Is Not A Number)");
      return;
    }
    wallet += coins.products[selectedCoin].price * $("#sellAmount").val();
   coins.products[selectedCoin].wallet-= $("#sellAmount").val(); 
  setUpAmountOptions(); 
  createTransaction(coins.products[selectedCoin].name + '(' + coins.products[selectedCoin].tag + ')',coins.products[selectedCoin].price,$("#sellAmount").val(), getCurrentTime(),'sell');
  
$("#sellAmount").val("");
$("#sellTotal").val("$0.0000");
  
   chart.options.title.text = (coins.products[selectedCoin].tag +"s in Wallet: " + coins.products[selectedCoin].wallet.toFixed(4) + "    " + "USD in Wallet: " + wallet.toFixed(4));
  
  chart.update();
  
  //console.log("Buying : " + selectedCoin);
}
function setUpAmountOptions()
{
   $("#buyOptionOne").val( ((wallet*.25)/ coins.products[selectedCoin].price) );   

  $("#buyOptionTwo").val( ((wallet*.5)/ coins.products[selectedCoin].price));   

    $("#buyOptionThree").val( ((wallet*.75)/ coins.products[selectedCoin].price));   

    $("#buyOptionFour").val( ((wallet)/ coins.products[selectedCoin].price)); 
  
  $("#sellOptionOne").val( (coins.products[selectedCoin].wallet *.25));   

  $("#sellOptionTwo").val( (coins.products[selectedCoin].wallet *.50));    

    $("#sellOptionThree").val( (coins.products[selectedCoin].wallet *.75));    

    $("#sellOptionFour").val( (coins.products[selectedCoin].wallet ) );  
}
function setUpTradePrice()
{
  $("#buyPrice").val("$"+coins.products[selectedCoin].price);
  $("#sellPrice").val("$"+coins.products[selectedCoin].price);
  $("#buyTotal").val("$0.0000");
  $("#sellTotal").val("$0.0000");
 setUpAmountOptions();

}
function getCurrentTime()
{
  var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 
if(mm<10) {
    mm = '0'+mm
} 
today = mm + '/' + dd + '/' + yyyy;
  return today;
}

//makeObject('LiteCoin(LTC)',.003,5,'8-3-2018','sell' );
//createTransaction('LiteCoin(LTC)',.006,5,'8-3-2018','buy' );
function createTransaction(name,transactionPrice,transactionAmount,transactionDate,type)
{
  
  
  var myObject = {
          id:transactionVue.transactions.length,
          name:name,
          transactionPrice: transactionPrice,
          transactionAmount: parseFloat(transactionAmount).toFixed(4),
          transactionDate:transactionDate,
           total:"$"+(transactionAmount*transactionPrice).toFixed(3),
          transactionType: type,
  }
  transactionVue.transactions.push(myObject);
 }

getPriceChart("NANO",24,1);
setPrices();


  

$('#buyAmount').bind('input', function() { 
    
  var totalVal = $("#buyAmount").val() * $("#buyPrice").val();
 $("#buyTotal").val( ("$" + ($("#buyAmount").val() *                $("#buyPrice").val().replace("$","")).toFixed(4)));
 
});
$('#sellAmount').bind('input', function() { 
    
  var totalVal = $("#sellAmount").val() * $("#sellPrice").val();
     $("#sellTotal").val( "$" + ($("#sellAmount").val() *                $("#sellPrice").val().replace("$","")).toFixed(4));
 
});

document.querySelector('.table-scroll').addEventListener('scroll', function(e){
	this.querySelector('.thead-col').style.left = this.scrollLeft +"px";
	this.querySelector('.thead-row').style.top = this.scrollTop +"px";
});