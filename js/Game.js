class Game{
    constructor(){}

    readState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",(data)=>{
            gameState = data.val();
        });
    }

    update(state){
        database.ref('/').update({
            gameState: state
        });
    }
}