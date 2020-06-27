var game;
var color;
var colorarray;

let barnew = document.getElementById( "barnew" );
let barold = document.getElementById( "barold" );

/* Init Typewriter */
var app = document.getElementById('app');
var typewriter = new Typewriter(app, {
    cursor: ""
});
typewriter.typeString('THEJOCRAFT').start();

setTimeout(() => {
    barnew.style.backgroundImage = "linear-gradient(#000000, #4a0400)";
    barnew.style.opacity = 1;

    
    setTimeout(() => {
        barold.style.backgroundImage = "linear-gradient(#000000, #4a0400)";
        barnew.style.opacity = 0;
    }, 1000);


}, 2000);


/* Init tmi.js */
const client = new tmi.Client({
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: botusername,
		password: botoauth
	},
	channels: channels
});
client.connect();

client.on("message", (channel, userstate, message, self) => {
    if (self) return;
    switch(userstate["message-type"]) {
        case "chat":
            if ((userstate.mod == true || userstate.username == streamername) && message.startsWith(command) == true){
                    game = (message.slice(12));
                    game = game.toUpperCase();
                    gamelength = game.length;
                    console.log(gamelength);

                    if(gamelength <= 0){
                        setTimeout(() => {
                            client.say(streamername, userstate.username + " Folgende Spiele befinden sich zurzeit in der Datenbank:")
                            setTimeout(() => {
                                client.say(streamername, "Minecraft, RedstoneWorld, Rotsteinpark, Satisfactory, Quiplash, Trivia Murder Party, Guesspionage")
                            }, 20);
                        }, 20);
                        

                    } else {
                        console.log("Voller Command");
                        start(game)
                        }
                    }
            break;
        default:
            // Something else ? nope lol
            break;
    }
});


/* Changing Text & Gradient */
function start(game){

    switch(game){
        case "MINECRAFT":
            color = "#0f4a00";
            break;
        case "SATISFACTORY":
            color = "#4a2000";
            break;
        case "QUIPLASH":
            color = "#4a4500";
            break;
        case "TRIVIA MURDER PARTY":
            color = "#4a000c";
            break;
        case "GUESSPIONAGE":
            color = "#00334a";
            break;
        case "ROTSTEINPARK":
            color = "#4a0400";
            break;
        case "REDSTONEWORLD":
            color = "#4a0400";
            break;
        case "!HYPE":
            color = "#074a00";
            break;
        default:
            colorarray = ["#2f004a", "#09004a", "#00234a", "#003e4a", "#004a3a", "#004a1f", "#144a00", "#354a00", "#4a4900", "#4a3300", "#4a1b00", "#4a0000"];
            color = colorarray[Math.floor(Math.random() * colorarray.length)];
            break;
    }



setTimeout(function(){

    typewriter.deleteAll().typeString(game).start();


    setTimeout(() => {
        barnew.style.backgroundImage = "linear-gradient(#000000, " + color + ")";
        barnew.style.opacity = 1;

        
        setTimeout(() => {
            barold.style.backgroundImage = "linear-gradient(#000000, " + color + ")";
            barnew.style.opacity = 0;
        }, 1000);


    }, 1000);

}, 2500)
}
