class Food{
    constructor(){
        this.image = loadImage("images/Milk.png");
    }

    getFoodStock(){
        var foodStockRef = database.ref('foodStock');
        foodStockRef.on("value",function(data){
            foodS = data.val();
        });
    }

    updateFoodStock(s){
        database.ref('/').update({
            foodStock: s
        });
    }

    bedroom(){
        background(bedroomImage,400,500);
    }

    garden(){
        background(gardenImage,400,500);
    }

    washroom(){
        background(washroomImage,400,500);
    }

    display(){

        var x = 80, y = 100;
        imageMode(CENTER);
        
        if (foodS !== 0){
            for (var i=0; i<foodS; i++){

                if (i%10 === 0){
                    y = y+50;
                    x = 80;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }


    }
}