if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){

    document.location = "indexMobile.html";
    document.head.innerHTML = '<link href="stylesMobile.css" rel="stylesheet"></link>'
  }else{
    document.head.innerHTML = '<link href="styles.css" rel="stylesheet"></link>'
}

if(window.innerWidth < 800){
    document.location = "indexMobile.html";
}


/// TEHDÄÄN KUN SIVUSTO AVATAAN: 
// Asetetaan kokonais klikkien ja boostien määrät:
var currentEnergy = 0;
var totalEnergy = 0;
var totalRealClicks = 0;
var rocketBoosts = 0;
var energiaSieppari = 0;
var siirtokunta = 0;
var levelProgress = 0;

let storyContinued = 0;

let aVastauksia = "";
let bVastauksia = "";
let cVastauksia = "";
var vastaustenKirjaimet = "";


let isFactPopupOpen = false;
let isOhjeetPopupOpen = false;
var isStoryPopupActive = false;



var levelBarAmount = 0;
var lvlPgAmount = 0;
var boostBarAmount = 0;

var economyHealth = 100;


var startNotificationClosed = false;

var sunClickAudio = new Audio('Music/sfx/Pop.mp3');
var msgRadioEffectAudio = new Audio('Music/sfx/messageRadioEffect.mp3')
var hoverSoundAudio = new Audio('Music/sfx/hoverPopSound.mp3')

function hoverSound() {
    hoverSoundAudio.play();

}



// Asettaa auringon epäklikattavaksi:
function onLoad() {
    document.getElementById('centerSun').setAttribute('draggable', false);
    document.getElementsByClassName('bgImageClose')[0].setAttribute('draggable', false);

    //Lisää onloadin kautta aloitusteksti!
    //document.getElementById();
}

function startGame(){
    // Build the are for Facts to be shown in the HTML

    document.getElementById('notificationsPlacer').remove();
    randomFacts();
    startGameSoundtrack();

}




// Tätä käytetään Indexistä kutsumaan random fakta - se asettaa faktan esille ja asettaa random timerin minkä välioajoin se kutsuu faktaa
function randomFacts() {

    var min = 7,
    max = 10;
    var rand = Math.floor(Math.random() * (max - min + 1) + min); //Generate Random number between 5 - 10
  
    getRandomFact()
    setTimeout(randomFacts, rand * 10000);
    
}

var listOfFacts = ['Space is completely silent!', 'In the observable universe there are an estimated 2 trillion (2,000,000,000,000) galaxies.', 'The International Space Station is the largest ever crewed object in space.', 'The universe is observed to be 13.8 billion years old and has been expanding since its formation in the Big Bang.', 'Space is a hard vacuum, meaning it is a void containing very little matter.', 'One million earths can fit in the sun.', 'There are more stars in the universe than grains of sand on earth.', "Gravity moves the same speed as light. So if sun suddenly disappeared, with it's light lasting for 8 minutes, it's gravity would last also 8 minutes."];

// TÄssä annetaan ylläolevan function kutsuma random fakta ja lopulta poistetaan se näkyvistä: HUOM!!! aseta poistuminen ennen kuin uusi tulee näkyvinin!
function getRandomFact(){

    if (isFactPopupOpen || isOhjeetPopupOpen || isStoryPopupActive){
        // do nothing ;)
    } else if (isFactPopupOpen === false && isOhjeetPopupOpen === false){
        isFactPopupOpen = true;

        var notiFirst = ['<div id="notificationsPlacer"  style="visibility: hidden;" ><button class="ohjeetPopupCloseButton" onClick='];
        var notiSec = ['deleter("notificationsPlacer")']
        var notiThird = ['>X</button><img src="Graphics/gameArea/misc/spaceHelmet.png" class="factSpaceHelmet"><p class="factTitle">Your civilization have learned that: </p> <p class="randomFactText" id="changeFactText"></p></div></div>']
    
        var notificationActualHtml = notiFirst[0] + notiSec[0] + notiThird[0];
        document.getElementById('notificationsArea').innerHTML = notificationActualHtml;


    // var randomFakta = document.getElementById("randomFacts");
    // var changeFactText = document.getElementById("changeFactText");
    var chooseFact = Math.floor(Math.random() * listOfFacts.length);
    var randomFakta = document.getElementById("notificationsPlacer");


    window.setTimeout(
        function () {
        randomFakta.style.visibility = '';

        var changeFactText = document.getElementById("changeFactText");

        changeFactText.innerHTML = listOfFacts[chooseFact];

        msgRadioEffectAudio.play();
        }, 7000);
    
    }


    


}






let story1 = {
    dialog1: {
        mainMessage1: "Zrr** tjs **Aaa..re you the explorer people have been talking about? *ZZ*xx**",
        answerA: "Yes, nice to meet you!",
        answerB: "Ehh. That might be me.",
        answerC: "I think you confused me with someone else.",
    },
        dialog1a: {
            mainMessage1: "Nice to finally know your whereabouts!",
            answerA: "It's always nice to meet new people.",
            answerC: "I think you have confused me with someone else.",
            deleteAnswer: 'secondAnswer',
        },
        dialog1b: {
            mainMessage1: "Playing dumb huh? That attitude wont take you far. Just wait for it...",
            dialogAffectsHealth: true,
            dialogEnd: true,
        },
        dialog1ba: {
            mainMessage1: "You don't know who I am? No one has more colonnies through the space than I do.",
            answerA: "Wow, that is amazing!",
            answerC: "I see. Good bye.",
        },
        dialog1baa: {
            mainMessage1: "Gaaaaahhahhaha! You bet.",
            dialogEnd: true,
        },
        dialog1bab: {
            mainMessage1: "Gaaaaahhahhaha, are you scared? Let's see if you can ever make it so far that we could meet. Gaaaaahhahhaha!",
            dialogEnd: true,
        },
        dialog1bb: {
            mainMessage1: "Arrangments!? You clearly don't know how influential I am. I take this as an personal insult! Just beware!",
            dialogEnd: true,
        },
        dialog1c: {
            mainMessage1: "Playing dumb huh? That attitude wont take you far.",
            dialogEnd: true,
        },
        dialog1aa: {
            mainMessage1: "Excellent. You will be a great servant for my colonies.",
            dialogEnd: true,
        },
        dialog1ab: {
            mainMessage1: "Playing dumb huh? That attitude wont take you far.",
            dialogEnd: true,
        },
        dialog1ac: {
            mainMessage1: "Welcome to city 17!",
            answerA: "Yes, nice to meet you!",
            answerB: "Ehh. That might be me.",
            answerC: "I think you confused me with someone else.",
        }
};


let currentDialog = 0;

// esim: 10 pistettä saatua, listener kutsuu storyTelleriä arvolla 1 
                // storyTeller(1)
function storyTeller(tarinanNumero){


    msgRadioEffectAudio.play();

        // printataan näytölle, tarina 1
        printStory(tarinanNumero)
        // haetaan storychapteri, sillä numerolla, mikä on currentdialogin numero, eli aluksi 0, haetaan chapter 0

    currentDialog = currentDialog +1;
}

                    //esim alussa tarina numero 1
function printStory (tarinanNumero) {

    
    // tarinan popuppi isketään näkyviin
    isStoryPopupActive = true;
    var storyAreaToShow = document.getElementById("storyPlacer");
    storyAreaToShow.style.visibility = '';

    // määritetään mikäkin HTML:n kenttä vastaa mitäkin haluttua tarinan lausetta
    var charSentence = document.getElementsByClassName('storyStatement')[0];
    var answerA = document.getElementsByClassName('answerA')[0];
    var answerB = document.getElementsByClassName('answerB')[0];
    var answerC = document.getElementsByClassName('answerC')[0];

    var haluttuDialogi = "dialog" + tarinanNumero;
    

    // tämä deletoi a,b,c vaihtoehdot ja tulostaa tilalle "continue" nappulan + pyyhkii vastaukset alkutilanteeesen
    function deleteAnswers(){
        document.querySelectorAll('#firstAnswer,#secondAnswer, #thirdAnswer').forEach(el => el.remove());

        var continueStoryButtonPart1 = ['<div id="continue" class="answerButton" onClick="hider(']
        var continueStoryButtonPart2 = ["'storyPlacer'"]
        var continueStoryButtonPart3 = [')">Continue exploration</div>']
        var continueButtonHtml = continueStoryButtonPart1[0] + continueStoryButtonPart2[0] + continueStoryButtonPart3[0];
    
        document.getElementById("storyAnswers").innerHTML = continueButtonHtml;

        aVastauksia = "";
        bVastauksia = "";
        cVastauksia = "";
        vastaustenKirjaimet = "";
    }



    // tässä pyyhitään dialogi pois näkyvistä tai halutut vaihtoehdot pois näkyvistä + tarvittaessa vähennetään healthia
    if (story1[haluttuDialogi].dialogEnd === true){
        charSentence.innerHTML = story1[haluttuDialogi].mainMessage1;
        deleteAnswers();

        if (story1[haluttuDialogi].dialogAffectsHealth === true){
            editEconomyHealth(5);
        }

        
    } else if (story1[haluttuDialogi].hasOwnProperty('deleteAnswer')){
        document.getElementById(story1[haluttuDialogi].deleteAnswer).remove();
        charSentence.innerHTML = story1[haluttuDialogi].mainMessage1;
        answerA.innerHTML = story1[haluttuDialogi].answerA;
        answerC.innerHTML = story1[haluttuDialogi].answerC;
    } else {
        charSentence.innerHTML = story1[haluttuDialogi].mainMessage1;
        answerA.innerHTML = story1[haluttuDialogi].answerA;
        answerB.innerHTML = story1[haluttuDialogi].answerB;
        answerC.innerHTML = story1[haluttuDialogi].answerC;
    };

  
    
}


function storyContinuer(choosedAnswer){



    // merkataan missä kohtaa vastauksia mennään
    switch(choosedAnswer){
        case 'a':
                vastaustenKirjaimet += "a";
                var tilattavaDialogi = currentDialog + vastaustenKirjaimet;
                alert(tilattavaDialogi);
                printStory(tilattavaDialogi)
                break;
        case 'b':
                vastaustenKirjaimet += "b";
                var tilattavaDialogi = currentDialog + vastaustenKirjaimet;
                alert(tilattavaDialogi);
                printStory(tilattavaDialogi)
                break;
        case 'c':
                vastaustenKirjaimet += "b";
                var tilattavaDialogi = currentDialog + vastaustenKirjaimet;
                alert(tilattavaDialogi);
                printStory(tilattavaDialogi)
                break;
    }



    // rakennetaan continuebutton viimeistä tarinasivua varten




}






/// JA SITTEN KAIKKI MUU: 
/// JA SITTEN KAIKKI MUU: 
// ClickTimeOut auringon klikkaus numeron animaatiota varten
function clickTimeout(){
    window.setTimeout(
        function () {
        showClick.style.visibility = 'hidden';
        }, 1000);
}
function clickTimeout2(){
    window.setTimeout(
        function () {
        showClick1.style.visibility = 'hidden';
        }, 1000);
}
function clickTimeout3(){
    window.setTimeout(
        function () {
        showClick2.style.visibility = 'hidden';
        }, 1000);
}
function clickTimeout4(){
    window.setTimeout(
        function () {
        showClick3.style.visibility = 'hidden';
        }, 1000);
}
function clickTimeout5(){
    window.setTimeout(
        function () {
        showClick4.style.visibility = 'hidden';
        }, 1000);
}


// Main klikkaus mikä tulee aurinkoa klikatessa.



var soundtrack01 = new Audio('Music/backgroundMusic/ES_WeAretheVisitors-CurvedMirror.mp3');
var currentSong = "";
var isMusicPlaying = false 





var spaceAudio = new Audio();

function startGameSoundtrack(){

    var i = 0;
    var spacePlaylist = ['Music/backgroundMusic/Biogenesis.mp3','Music/backgroundMusic/ES_WeAretheVisitors-CurvedMirror.mp3', 'Music/backgroundMusic/HigherOrbit.mp3', 'Music/backgroundMusic/NoTimeForHeroes.mp3', 'Music/backgroundMusic/Tranquility_DriftFarAway.mp3'];

    spaceAudio.addEventListener('ended', function () {
        i = ++i < spacePlaylist.length ? i : 0;
        console.log(i)
        spaceAudio.src = spacePlaylist[i];
        spaceAudio.play();
    }, true);
    spaceAudio.volume = 0.8;
    spaceAudio.loop = false;
    spaceAudio.src = spacePlaylist[0];
    spaceAudio.play();

    currentSong = "soundtrack01"
    isMusicPlaying = true
}

function stopPlayMusic(){
    if (isMusicPlaying === true) {
        spaceAudio.pause();
        isMusicPlaying = false
        document.getElementById("audioPlayerControls").innerHTML = "Start Music"
    } else if (isMusicPlaying === false ) {
        spaceAudio.play();
        isMusicPlaying = true
        document.getElementById("audioPlayerControls").innerHTML = "Stop Music"
    }
}


var clickAnimationIndex = 0;

function clickSun(){

        currentEnergy+=1;
        totalEnergy+=1;
        levelUpListener();
        //levelupListener kuuntelee pelintilannetta ja toteuttaa tarvittaessa, pelin etenemistä

        if (rocketBoosts >= 1){
            currentEnergy = currentEnergy += rocketBoosts;
            totalEnergy = totalEnergy += rocketBoosts;
            levelUpListener();
        }

        document.getElementById("currentEnergyNum").innerHTML = currentEnergy;
        document.getElementById("totalEnergy").innerHTML = totalEnergy;

        sunClickAudio.play();
        updateLevelProgress();

        totalRealClicks+=1;
        document.getElementById("totalRealClicks").innerHTML = totalRealClicks;

        // Koordinaatit saadaan tässä:


        // 

        if (clickAnimationIndex === 0){
            createHitMark(1);
            clickAnimationIndex = 1;
        } else if (clickAnimationIndex === 1){
            createHitMark(2);
            clickAnimationIndex = 2;
        }else if (clickAnimationIndex === 2){
            createHitMark(3);
            clickAnimationIndex = 3;
        }else if (clickAnimationIndex === 3){
            createHitMark(4);
            clickAnimationIndex = 4;
        }else if (clickAnimationIndex === 4){
            createHitMark(5);
            clickAnimationIndex = 0;
        }
        
}

function createHitMark(number){

    var hitMark = 0;

    switch(number){
        case 1:
            hitMark = document.getElementById("showClick");
            clickTimeout();
            break;
        case 2:
            hitMark = document.getElementById("showClick1");
            clickTimeout2();
            break;
        case 3:
            hitMark = document.getElementById("showClick2");
            clickTimeout3();
            break;
        case 4:
            hitMark = document.getElementById("showClick3");
            clickTimeout4();
            break;
        case 5:
            hitMark = document.getElementById("showClick4");
            clickTimeout5();
            break;
        default:
            hitMark = document.getElementById("showClick");
            clickTimeout();
            break;
    }


    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    hitMark.style.visibility = '';
    hitMark.style.position = 'absolute';
    hitMark.style.left = x + 'px';
    hitMark.style.top = y + 'px';
}



















// SAVEUS OMINAISUUS - Asetetaan Local storageen arvot nimi ja klikit
function saveSession(){

    var playerStatsForSave = {
        "energia":currentEnergy,
        "kaikkiKlikit":totalEnergy,
        "ostetutBoostit":rocketBoosts,
        "ostetutEnergiaSiepparit":energiaSieppari,
        "ostetutSiirtokunnat":siirtokunta,
        "levelProgress":levelProgress,
        "todellisetKlikit":totalRealClicks,
    }


    alert("tallennettu!")
    window.localStorage.setItem('stats', JSON.stringify(playerStatsForSave))


    var locationsOfEachShip = {
        "lokaatiotEnergiaSiepparit":storeLocationOfEnergiaSiepparit,
        "lokaatiotSiirtokunnat":storeLocationOfColonies,
    }


    window.localStorage.setItem('lokaatiotKaikista', JSON.stringify(locationsOfEachShip))
        // Retrieve
        // var stored_datas = JSON.parse(localStorage["datas"]);

    // window.localStorage.setItem('name', 'EbiTest');
}


// LATAUS OMINAISUUS - ladataan kaikki halutut arvot local storagesta:
function loadSession(){

    // HAETAAN STORAGESTA KAIKKI ASIAT JA LAITETAAN NE MUUTTUJIIN
    var load = localStorage.getItem('stats');
    var loadObject = JSON.parse(load); 

    var loadAllLocations = localStorage.getItem('lokaatiotKaikista');
    var palautetutLokaatiot = JSON.parse(loadAllLocations);

   // Käydääb läpi jokainen arrayn sisältämä osio ja palautetaan sieltä lokaatiot samoille paikoilleen:
   for (let i = 0; i < palautetutLokaatiot.lokaatiotEnergiaSiepparit.length; i++) {
        document.getElementById('gameArea').innerHTML += palautetutLokaatiot.lokaatiotEnergiaSiepparit[i];
        console.log("tämä palautettuun" + palautetutLokaatiot.lokaatiotEnergiaSiepparit[i])
   }
   for (let i = 0; i < palautetutLokaatiot.lokaatiotSiirtokunnat.length; i++) {
    document.getElementById('gameArea').innerHTML += palautetutLokaatiot.lokaatiotSiirtokunnat[i];
    console.log("tämä palautettuun" + palautetutLokaatiot.lokaatiotSiirtokunnat[i])
}


    // Käydääb läpi jokainen objektin key-value pair ja palautetaan sieltä arvot oikeisiin kohtiinsa:
    for (const [key, value] of Object.entries(loadObject)) {
        if (key === 'energia'){
            currentEnergy = value;
            document.getElementById("currentEnergyNum").innerHTML = currentEnergy;
        } else if (key === "kaikkiKlikit"){
            totalEnergy = value;
            document.getElementById("totalEnergy").innerHTML = totalEnergy;
        } else if (key === "levelProgress") {
            levelProgress = value;
            visualizeLevelProgress(value);
            alert("Rakenna level progress palautus")
        } else if (key === "ostetutBoostit") {
            rocketBoosts = value;
            visualizeRocketBoostBar(value*10);
            document.getElementById("boostejaYhteensa").innerHTML = rocketBoosts;
        } else if (key === "ostetutEnergiaSiepparit"){
            energiaSieppari = value;
            document.getElementById("autoKlikkereitaYhteensa").innerHTML = energiaSieppari;
            document.getElementById("rocket1").src = "Graphics/gameArea/rockets/hogl-animation-home.gif"
            energiaSieppariAmount.push("energiasieppari")
        } else if (key === "ostetutSiirtokunnat"){
            siirtokunta = value;
            document.getElementById("totalColonnies").innerHTML = siirtokunta;
        } else if (key === "todellisetKlikit"){
            totalRealClicks = value;
            document.getElementById("totalRealClicks").innerHTML = totalRealClicks;
        } else {
            console.log(`${key}:gggg ${value}`);
        }
        
      }

    console.log(palautetutLokaatiot)
    console.log()
    console.log(loadObject)
    //Täässä kohtaa 
    //load[Object.keys(load)[0]]; //returns 'someVal'

    console.log('palauttetu objekti: ', JSON.parse(load));

   /* save = window.localStorage.getItem('klikit');
    console.log(save)
    totalEnergy = parseInt(save)
    document.getElementById("currentEnergyNum").innerHTML = totalEnergy */
}





/*
function buySpaceRocketBoost(){
    rocketBoosts = rocketBoosts+1;
    document.getElementById("rocket1").src = "Graphics/gameArea/rockets/hogl-animation-home.gif";
}
*/

function buySpaceRocketBoost(){

    if (currentEnergy >= 100 && rocketBoosts < 1){
        rocketBoosts = rocketBoosts+=1;
        currentEnergy = currentEnergy - 100;
        document.getElementById("currentEnergyNum").innerHTML = currentEnergy;
        document.getElementById("boostejaYhteensa").innerHTML = rocketBoosts;
        alert("Saat nyt enemmän energiaa jokaisella klikillä!")
        updateRocketBoostBar(1);
        document.getElementsByClassName('upgrade2price')[0].innerHTML = '200';
    } else if (currentEnergy >= 200 && rocketBoosts < 2){
        rocketBoosts = rocketBoosts+=1;
        currentEnergy = currentEnergy - 100;
        document.getElementById("currentEnergyNum").innerHTML = currentEnergy;
        document.getElementById("boostejaYhteensa").innerHTML = rocketBoosts;
        alert("Saat nyt enemmän energiaa jokaisella klikillä!")
        updateRocketBoostBar(1);
        document.getElementsByClassName('upgrade2price')[0].innerHTML = '300';
    } else if (currentEnergy >= 300 && rocketBoosts < 3){
        rocketBoosts = rocketBoosts+=1;
        currentEnergy = currentEnergy - 100;
        document.getElementById("currentEnergyNum").innerHTML = currentEnergy;
        document.getElementById("boostejaYhteensa").innerHTML = rocketBoosts;
        alert("Saat nyt enemmän energiaa jokaisella klikillä!")
        updateRocketBoostBar(1);
        document.getElementsByClassName('upgrade2price')[0].innerHTML = '400';
    } else if (currentEnergy >= 400 && rocketBoosts < 4){
        rocketBoosts = rocketBoosts+=1;
        currentEnergy = currentEnergy - 100;
        document.getElementById("currentEnergyNum").innerHTML = currentEnergy;
        document.getElementById("boostejaYhteensa").innerHTML = rocketBoosts;
        alert("Saat nyt enemmän energiaa jokaisella klikillä!")
        updateRocketBoostBar(1);
        document.getElementsByClassName('upgrade2price')[0].innerHTML = '500';
    } else if (currentEnergy >= 500 && rocketBoosts < 5){
        rocketBoosts = rocketBoosts+=1;
        currentEnergy = currentEnergy - 100;
        document.getElementById("currentEnergyNum").innerHTML = currentEnergy;
        document.getElementById("boostejaYhteensa").innerHTML = rocketBoosts;
        alert("Saat nyt enemmän energiaa jokaisella klikillä!")
        updateRocketBoostBar(1);
        document.getElementsByClassName('upgrade2price')[0].innerHTML = '600';
    } else if (currentEnergy >= 600 && rocketBoosts < 6){
        rocketBoosts = rocketBoosts+=1;
        currentEnergy = currentEnergy - 100;
        document.getElementById("currentEnergyNum").innerHTML = currentEnergy;
        document.getElementById("boostejaYhteensa").innerHTML = rocketBoosts;
        alert("Saat nyt enemmän energiaa jokaisella klikillä!")
        updateRocketBoostBar(1);
        document.getElementsByClassName('upgrade2price')[0].innerHTML = '700';
    } else if (currentEnergy >= 700 && rocketBoosts < 7){
        rocketBoosts = rocketBoosts+=1;
        currentEnergy = currentEnergy - 100;
        document.getElementById("currentEnergyNum").innerHTML = currentEnergy;
        document.getElementById("boostejaYhteensa").innerHTML = rocketBoosts;
        alert("Saat nyt enemmän energiaa jokaisella klikillä!")
        updateRocketBoostBar(1);
        document.getElementsByClassName('upgrade2price')[0].innerHTML = '800';
    } else if (currentEnergy >= 800 && rocketBoosts < 8){
        rocketBoosts = rocketBoosts+=1;
        currentEnergy = currentEnergy - 100;
        document.getElementById("currentEnergyNum").innerHTML = currentEnergy;
        document.getElementById("boostejaYhteensa").innerHTML = rocketBoosts;
        alert("Saat nyt enemmän energiaa jokaisella klikillä!")
        updateRocketBoostBar(1);
        document.getElementsByClassName('upgrade2price')[0].innerHTML = '900';
    } else if (currentEnergy >= 900 && rocketBoosts < 9){
        rocketBoosts = rocketBoosts+=1;
        currentEnergy = currentEnergy - 100;
        document.getElementById("currentEnergyNum").innerHTML = currentEnergy;
        document.getElementById("boostejaYhteensa").innerHTML = rocketBoosts;
        alert("Saat nyt enemmän energiaa jokaisella klikillä!")
        updateRocketBoostBar(1);
        document.getElementsByClassName('upgrade2price')[0].innerHTML = '1000';
    } else if (currentEnergy >= 1000 && rocketBoosts < 10){
        rocketBoosts = rocketBoosts+=1;
        currentEnergy = currentEnergy - 100;
        document.getElementById("currentEnergyNum").innerHTML = currentEnergy;
        document.getElementById("boostejaYhteensa").innerHTML = rocketBoosts;
        alert("Saat nyt enemmän energiaa jokaisella klikillä!")
        updateRocketBoostBar(1);
    } else if (rocketBoosts === 10) {
            alert("You have the max amount of rocket boosts! Great work!")
        } else {
            alert("You don't have enough energy!")

    }
}





// tehdään lista montako energia siepparia on, jotta niitä voidaan hallita tallennuksien yhteydessä.
var energiaSieppariAmount = []

function buyEnergiaSieppari(){

    if (currentEnergy >= 10 && energiaSieppari < 1){
        document.getElementsByClassName('upgrade1price')[0].innerHTML = '20';
        autoclicker();
        currentEnergyUpdater(10)
    } else if (currentEnergy >= 20 && energiaSieppari < 2) {
        document.getElementsByClassName('upgrade1price')[0].innerHTML = '40';
        autoclicker();
        currentEnergyUpdater(20)
    } else if (currentEnergy >= 40 && energiaSieppari < 3) {
        document.getElementsByClassName('upgrade1price')[0].innerHTML = '60';
        autoclicker();
        currentEnergyUpdater(40)
    } else if (currentEnergy >= 60 && energiaSieppari < 4) {
        document.getElementsByClassName('upgrade1price')[0].innerHTML = '80';
        autoclicker();
        currentEnergyUpdater(60)
    } else if (currentEnergy >= 80 && energiaSieppari < 5) {
        document.getElementsByClassName('upgrade1price')[0].innerHTML = '100';
        autoclicker();
        currentEnergyUpdater(80)
    } else if (currentEnergy >= 100 && energiaSieppari < 6) {
        document.getElementsByClassName('upgrade1price')[0].innerHTML = '200';
        autoclicker();
        currentEnergyUpdater(100)
    } else if (currentEnergy >= 200 && energiaSieppari < 7) {
        document.getElementsByClassName('upgrade1price')[0].innerHTML = '300';
        autoclicker();
        currentEnergyUpdater(200)
    } else {
        alert("You don't have enough energy!")
    }

        function autoclicker(){
            autoClicker();
            energiaSieppari = energiaSieppari +1;
            alert("Ostit uuden energiasiepparin! Hieno homma!");
        
            document.getElementById('gameArea').innerHTML += createLocation("energiaSieppari");
            document.getElementById("autoKlikkereitaYhteensa").innerHTML = energiaSieppari;
            energiaSieppariAmount.push("energiasieppari");
        }
}

function autoClicker() {
      alert("Autoclicker päällä!")
      window.setInterval(
        function () {

            totalEnergy+=1;
            currentEnergy+=1;
            levelUpListener();


            if (rocketBoosts >= 1){
                currentEnergy = currentEnergy + rocketBoosts;
                totalEnergy = totalEnergy += rocketBoosts;
                levelUpListener();
            }



            document.getElementById("currentEnergyNum").innerHTML = currentEnergy;
            document.getElementById("totalEnergy").innerHTML = totalEnergy;
            
        }, 5000);
}



function buySpaceColony(){

    if (currentEnergy >= 500 && siirtokunta < 1){
        document.getElementsByClassName('upgrade3price')[0].innerHTML = '1000';
        siirtokunta = siirtokunta +1;
        alert("Ostit uuden siirtokunta! VAU!");
        //document.getElementById("siirtokunta1").src = "Graphics/gameArea/rockets/starmancer.gif";
        document.getElementById('gameArea').innerHTML += createLocation("spaceColony");
        document.getElementById('totalColonnies').innerHTML = siirtokunta;
    } else if (currentEnergy >= 1000 && siirtokunta < 2) {


        document.getElementsByClassName('upgrade3price')[0].innerHTML = '1500';
        siirtokunta = siirtokunta +1;
        alert("Ostit uuden siirtokunta! VAU!");
        //document.getElementById("siirtokunta1").src = "Graphics/gameArea/rockets/starmancer.gif";
        document.getElementById('gameArea').innerHTML += createLocation("spaceColony");
        document.getElementById('totalColonnies').innerHTML = siirtokunta;
    } else if (currentEnergy >= 1500 && siirtokunta < 3) {


        document.getElementsByClassName('upgrade3price')[0].innerHTML = '2000';
        siirtokunta = siirtokunta +1;
        alert("Ostit uuden siirtokunta! VAU!");
        //document.getElementById("siirtokunta1").src = "Graphics/gameArea/rockets/starmancer.gif";
        document.getElementById('gameArea').innerHTML += createLocation("spaceColony");
        document.getElementById('totalColonnies').innerHTML = siirtokunta;
    } else if (currentEnergy >= 2000 && siirtokunta < 4) {


        document.getElementsByClassName('upgrade3price')[0].innerHTML = '2500';
        siirtokunta = siirtokunta +1;
        alert("Ostit uuden siirtokunta! VAU!");
        //document.getElementById("siirtokunta1").src = "Graphics/gameArea/rockets/starmancer.gif";
        document.getElementById('gameArea').innerHTML += createLocation("spaceColony");
        document.getElementById('totalColonnies').innerHTML = siirtokunta;
    } else if (currentEnergy >= 2500 && siirtokunta < 5) {


        document.getElementsByClassName('upgrade3price')[0].innerHTML = '3000';
        siirtokunta = siirtokunta +1;
        alert("Ostit uuden siirtokunta! VAU!");
        //document.getElementById("siirtokunta1").src = "Graphics/gameArea/rockets/starmancer.gif";
        document.getElementById('gameArea').innerHTML += createLocation("spaceColony");
        document.getElementById('totalColonnies').innerHTML = siirtokunta;
    } else if (currentEnergy >= 3000 && siirtokunta < 6) {


        document.getElementsByClassName('upgrade3price')[0].innerHTML = '3500';
        siirtokunta = siirtokunta +1;
        alert("Ostit uuden siirtokunta! VAU!");
        //document.getElementById("siirtokunta1").src = "Graphics/gameArea/rockets/starmancer.gif";
        document.getElementById('gameArea').innerHTML += createLocation("spaceColony");
        document.getElementById('totalColonnies').innerHTML = siirtokunta;
    } else if (currentEnergy >= 3500 && siirtokunta < 7) {

        
        document.getElementsByClassName('upgrade3price')[0].innerHTML = '4000';
        siirtokunta = siirtokunta +1;
        alert("Ostit uuden siirtokunta! VAU!");
        //document.getElementById("siirtokunta1").src = "Graphics/gameArea/rockets/starmancer.gif";
        document.getElementById('gameArea').innerHTML += createLocation("spaceColony");
        document.getElementById('totalColonnies').innerHTML = siirtokunta;
    } else {
        alert("You don't have enough energy!")
    }




}



var storeLocationOfColonies = [];
var storeLocationOfEnergiaSiepparit = [];


function createLocationOld() {

    var min = -35;
    var maxWidth = 28;
    var maxHeight = 800;

    // WIDTH koordinaatit saa olla MAX -    margin-left:-35%;   margin-left:28%
    // HEIGHT koordinaatit saa olla MAX -   margin-top:0%;      margin-top:40%;;  
    // ULOS PITÄISI SIIS SAADA: style="margin-top:0%;margin-left:-30%;
    var width = Math.floor(Math.random() * (maxWidth - min + 1) + min); 
    // height saa olla max 800
    var height = Math.floor(Math.random() * (maxHeight - min + 1) + min);

    console.log("height  " + height);
    console.log("width  " + width);


    var elementinAlku = '<img id="siirtokunta1" class="leijuvat" src="Graphics/ufo.png" style="margin-top:';
    var keskiosio = '%;margin-left:';
    var elementinLoppu = '%;">'

    var kokoRipsu =  elementinAlku+width+keskiosio+height+elementinLoppu;
    

    storeLocationOfColonies.push(kokoRipsu)

    return kokoRipsu;

}





function createLocation(nameOfOBject) {

    var widthMin = -35;
    var heightMin = 0;
    var maxWidth = 28;
    var maxHeight = 35;
    var minHeightForLandObj = 37;
    var maxHeightForLandObj = 43;

    var orderedSpaceObject;

    var saveToArray = "";

    switch(nameOfOBject){
        case "spaceColony":
          var orderedSpaceObject = "ufo.png";
          saveToArray = "spaceColony";
          break;
        case "energiaSieppari":
            var orderedSpaceObject = "hogl-animation-home.gif";
            saveToArray = "energiaSieppari";
          break;
        default:
            alert("Virheellinen tilaus!")
      }


    // WIDTH koordinaatit saa olla MAX -    margin-left:-35%;   margin-left:28%
    // HEIGHT koordinaatit saa olla MAX -   margin-top:0%;      margin-top:40%;;  
    // ULOS PITÄISI SIIS SAADA: style="margin-top:0%;margin-left:-30%;

    if (saveToArray === "spaceColony") {
        var width = Math.floor(Math.random() * (maxWidth - widthMin + 1) + widthMin); //Generate Random number between 300 - 1000
        var height = Math.floor(Math.random() * (maxHeightForLandObj - minHeightForLandObj + 1) + minHeightForLandObj); //Generate Random number between 50 - 100
    
        // <img id="siirtokunta1" class="planetsForceRight" src="Graphics/starmancer.gif">; 
    
        var elementinAlku = '<img id="siirtokunta1" class="leijuvat" src="Graphics/gameArea/rockets/';
        var ekaDimensionCode = '" style="margin-top:'
        var keskiosio = '%;margin-left:';
        var elementinLoppu = '%;">'
    
        var kokoRipsu =  elementinAlku+orderedSpaceObject+ekaDimensionCode+height+keskiosio+width+elementinLoppu;
        
    
        if (saveToArray === "spaceColony"){
            storeLocationOfColonies.push(kokoRipsu)
        } else if(saveToArray === "energiaSieppari"){
            storeLocationOfEnergiaSiepparit.push(kokoRipsu)
        }
    
        return kokoRipsu;

    } else if(saveToArray === "energiaSieppari") {
        var width = Math.floor(Math.random() * (maxWidth - widthMin + 1) + widthMin); //Generate Random number between 300 - 1000
        var height = Math.floor(Math.random() * (maxHeight - heightMin + 1) + heightMin); //Generate Random number between 50 - 100
    
        // <img id="siirtokunta1" class="planetsForceRight" src="Graphics/starmancer.gif">; 
    
        var elementinAlku = '<img id="siirtokunta1" class="leijuvat" src="Graphics/gameArea/rockets/';
        var ekaDimensionCode = '" style="margin-top:'
        var keskiosio = '%;margin-left:';
        var elementinLoppu = '%;">'
    
        var kokoRipsu =  elementinAlku+orderedSpaceObject+ekaDimensionCode+height+keskiosio+width+elementinLoppu;
        
    
        if (saveToArray === "spaceColony"){
            storeLocationOfColonies.push(kokoRipsu)
        } else if(saveToArray === "energiaSieppari"){
            storeLocationOfEnergiaSiepparit.push(kokoRipsu)
        }
    
        return kokoRipsu;
    }


    

}




function hider(name){


    if (name === 'storyPlacer'){
        isStoryPopupActive = false;
        var objToHide = document.getElementById(name);
        objToHide.style.visibility = 'hidden';
        isOhjeetPopupOpen = false;
    } else {
        var objToHide = document.getElementById(name);
        objToHide.style.visibility = 'hidden';
        isOhjeetPopupOpen = false;
    }




}

function showHiddenDiv(name){

    if (isFactPopupOpen == true && name == 'ohjeetPopup') {

        document.getElementById('releaseNotes').style.visibility = 'hidden';

        document.getElementById('notificationsPlacer').remove()
        var objToShow = document.getElementById(name);
        objToShow.style.visibility = 'visible';
        isOhjeetPopupOpen = true;
        isFactPopupOpen = false;

    } else if (isFactPopupOpen == true && name == 'releaseNotes'  ){


        document.getElementById('notificationsPlacer').remove()
        var objToShow = document.getElementById(name);
        objToShow.style.visibility = 'visible';
        isOhjeetPopupOpen = true;
        isFactPopupOpen = false;

    }


    else if (isFactPopupOpen == false && name == 'releaseNotes') {
        document.getElementById('ohjeetPopup').style.visibility = 'hidden';
        var objToShow = document.getElementById(name);
        objToShow.style.visibility = 'visible';
        isOhjeetPopupOpen = true;
    }

    else if (isFactPopupOpen == false && name == 'ohjeetPopup') {
        document.getElementById('releaseNotes').style.visibility = 'hidden';
        var objToShow = document.getElementById(name);
        objToShow.style.visibility = 'visible';
        isOhjeetPopupOpen = true;
    }



}


function deleter(name){

    if (name === ""){
    }

    if (name === "notifications"){
        startNotificationClosed = true;
        document.getElementById(name).innerHTML = '<div id="trophyPopUp"></div>';
    } else {
        //document.getElementById(name).innerHTML = '<div id="trophyPopUp"></div>';¨
        document.getElementById(name).remove();
        isFactPopupOpen = false;

    }

}




function updateLevelProgress () {
    if (totalEnergy >= levelBarAmount+100){
        levelBarAmount = totalEnergy;
        levelProgress = levelProgress+1;
        visualizeLevelProgress(1);
    }
}



function visualizeLevelProgress(number) {

    lvlPgAmount = (lvlPgAmount + number)
    // amount+=number;
    document.getElementById("levelBarAmount").style.width = lvlPgAmount + "%";
}



function updateRocketBoostBar (number) {
    visualizeRocketBoostBar(10)
}



function visualizeRocketBoostBar(number) {

    boostBarAmount = (boostBarAmount + number)
    // amount+=number;
    document.getElementById("spaceRocketBoostBarAmount").style.width = boostBarAmount + "%";
}




function editEconomyHealth(number) {
    economyHealthBarBarAmount = 100 - number;

    document.getElementById("economyHealthBarBarAmount").style.width = economyHealthBarBarAmount + "%";
    alert("test")
}





function levelUpListener(){

// tätä kutsutaan joko suoraan klikkauksista, tai automaattisten clikkereiden kautta

    if (levelProgress === 0 && totalEnergy >= 100){
        updateLevelProgress();
        trophyReturner('trophy01');
    } else if(levelProgress === 1 && totalEnergy >= 200){
        updateLevelProgress();
    } else if(levelProgress === 2 && totalEnergy >= 300){
        updateLevelProgress();
    } else if(levelProgress === 3 && totalEnergy >= 400){
        updateLevelProgress();
    } else if(levelProgress === 4 && totalEnergy >= 500){
        updateLevelProgress();
    } else if(levelProgress === 5 && totalEnergy >= 600){
        updateLevelProgress();
    } else if(levelProgress === 6 && totalEnergy >= 700){
        updateLevelProgress();
    } else if(levelProgress === 7 && totalEnergy >= 800){
        updateLevelProgress();
    } else if(levelProgress === 8 && totalEnergy >= 900){
        updateLevelProgress();
    } else if(levelProgress === 9 && totalEnergy >= 1000){
        updateLevelProgress();
        trophyReturner('trophy02');
    } else if(levelProgress === 10 && totalEnergy >= 1100){
        updateLevelProgress();
    } else if(levelProgress === 11 && totalEnergy >= 1200){
        updateLevelProgress();
    } else if(levelProgress === 12 && totalEnergy >= 1300){
        updateLevelProgress();
    } else if(levelProgress === 13 && totalEnergy >= 1400){
        updateLevelProgress();
    } else if(levelProgress === 14 && totalEnergy >= 1500){
        updateLevelProgress();
    } else if(levelProgress === 15 && totalEnergy >= 1600){
        updateLevelProgress();
    } else if(levelProgress === 16 && totalEnergy >= 1700){
        updateLevelProgress();
    } else if(levelProgress === 17 && totalEnergy >= 1800){
        updateLevelProgress();
    } else if(levelProgress === 18 && totalEnergy >= 1900){
        updateLevelProgress();
    } else if(levelProgress === 19 && totalEnergy >= 2000){
        updateLevelProgress();
    } else if(levelProgress === 20 && totalEnergy >= 2100){
        updateLevelProgress();
    } else if(levelProgress === 21 && totalEnergy >= 2200){
        updateLevelProgress();
    } else if(levelProgress === 22 && totalEnergy >= 2300){
        updateLevelProgress();
    } else if(levelProgress === 23 && totalEnergy >= 2400){
        updateLevelProgress();
    } else if(levelProgress === 24 && totalEnergy >= 2500){
        updateLevelProgress();
    } else if(levelProgress === 25 && totalEnergy >= 2600){
        updateLevelProgress();
    } else if(levelProgress === 26 && totalEnergy >= 2700){
        updateLevelProgress();
    } else if(levelProgress === 27 && totalEnergy >= 2800){
        updateLevelProgress();
    } else if(levelProgress === 28 && totalEnergy >= 2900){
        updateLevelProgress();
    } else if(levelProgress === 29 && totalEnergy >= 3000){
        updateLevelProgress();
    } else if(levelProgress === 30 && totalEnergy >= 3100){
        updateLevelProgress();
    }




    if (totalEnergy === 10){
        storyTeller(1);
    }
    

}



var trophyTextArray = ['V<div id="trophyTip"><span class="openedTrophyTipText">Gain 100 total energy!</span></div>', 'Gain 1000 total energy']



function trophyReturner (openedTrophy) {

    switch(openedTrophy){
        case 'trophy01':
            trophyInfo.trophy1 = true;
            document.getElementsByClassName('achievementIcon')[0].innerHTML = trophyTextArray[0]
            alert("SAIT SAAVUTUKSEN!")
            openTrophy('trophy1');
            break;
        case trophy02:
            break;
    }


}



let sailotutTrophyt = [
    '<h2 class="ohjeetPopupTitle trophyPopupTitle">Achievement: 1</h2><img src="Graphics/gameArea/trophies/Neutron_quark.png" class="trophyRewardPic" ><div id="trophyPopUpContent"><p class="trophyRewardPopUpText">As you reached the amount of over 100 total energy you learned that Neutron stars can spin 600 times per second.</p></div><!--Trophy popupcontent END--></div> <!-- trophyPopUp END-->', 
    '<h2 class="ohjeetPopupTitle trophyPopupTitle">Achievement: 2</h2><img src="Graphics/gameArea/planets/realPlanets/mars.png" class="trophyRewardPic" ><div id="trophyPopUpContent"><p class="trophyRewardPopUpText">As you reached the amount of over 1000 total energy you saw that the sunset on Mars appears blue!</p></div><!--Trophy popupcontent END--></div> <!-- trophyPopUp END-->',
    '<h2 class="ohjeetPopupTitle trophyPopupTitle">Achievement: 3</h2><img src="Graphics/gameArea/trophies/Neutron_quark.png" class="trophyRewardPic" ><div id="trophyPopUpContent"><p class="trophyRewardPopUpText">As you reached the amount of over 10000 total energy you learned that Neutron stars can spin 600 times per second.</p></div><!--Trophy popupcontent END--></div> <!-- trophyPopUp END-->']

let sailotutTrophyt2 = [
    "You're researches have not yet accomplished new breakthroughs.", 
    'As you reached the amount of over 100 total energy you learned that Neutron stars can spin 600 times per second.', 
    'As you reached the amount of over 1000 total energy you saw that the sunset on Mars appears blue!',
    'As you reached the amount of over 10000 total energy you learned that Neutron stars can spin 600 times per second.']
    
    

    // trophyen tämän hetkinen tila. trophy openeria varten.
let trophyInfo = {
    trophy1: false,
    trophy2: false,
    trophy3: false,
    trophy4: false,
    trophy5: false,
    trophy6: false,
}


function createTrophyArea(){
    var notiFirst = ['<div id="notificationsPlacer"  style="visibility: ;" ><button class="ohjeetPopupCloseButton" onClick='];
    var notiSec = ['deleter("notificationsPlacer")']
    var notiThird = ['>X</button>']
    var notiImage = ['<img id="trophyPic" src="Graphics/gameArea/trophies/Neutron_quark.png" class="trophyRewardPic"></img>']
    var notiFour = ['<h2 class="ohjeetPopupTitle trophyPopupTitle">Achievement: </h2> <div id="trophyPopUpContent"><p class="trophyRewardPopUpText"></p>      </div></div>']

    var notificationAreaForTrophies = notiFirst[0] + notiSec[0] + notiThird[0] + notiImage[0] + notiFour[0];
    document.getElementById('notificationsArea').innerHTML = notificationAreaForTrophies;
}

function openTrophy(nameOfTrophy){
    if (isFactPopupOpen === true){
        document.getElementById('notificationsPlacer').remove();
    }
    if (isOhjeetPopupOpen === true){
        hider('ohjeetPopup');
    }

    // Lisää tähän tsekki, onko trophyarea jo renderöity
    createTrophyArea();

    //Tarkistetaan, onko saavutusta varten vaaditut requirementsit suoritettu
    if (trophyInfo[nameOfTrophy] === false){
        document.getElementsByClassName('trophyRewardPopUpText')[0].innerHTML = sailotutTrophyt2[0];
        document.getElementById("trophyPic").src="Graphics/gameArea/trophies/noTrophyIcon.png";
        return;
    } else {

        isFactPopupOpen = true;
        switch(nameOfTrophy){
            case 'trophy1':
                document.getElementsByClassName('trophyRewardPopUpText')[0].innerHTML = sailotutTrophyt2[1];
                document.getElementById("trophyPic").src="Graphics/gameArea/trophies/Neutron_quark.png";
                clickTimeout();
                break;
            case 'trophy2':
                document.getElementsByClassName('trophyRewardPopUpText')[0].innerHTML = sailotutTrophyt2[2];
                clickTimeout();
                break;
            case 'trophy3':
                document.getElementsByClassName('trophyRewardPopUpText')[0].innerHTML = sailotutTrophyt2[3];
                clickTimeout();
                break;
            case 'trophy4':
                showHiddenDiv('trophyPopUp')    
                clickTimeout();
                break;
            case 'trophy5':
                showHiddenDiv('trophyPopUp')    
                clickTimeout();
                break;
            case 'trophy6':
                showHiddenDiv('trophyPopUp')    
                clickTimeout();
                break;
            default:
                alert("This function did not work correctly!")
                break;
        }
    }
}


function currentEnergyUpdater(amountToChange){
    currentEnergy = currentEnergy - amountToChange;
    document.getElementById('currentEnergyNum').innerHTML = currentEnergy;

}

    


//// STAR SETTIi
//// STAR SETTIi
//// STAR SETTIi
//// STAR SETTIi


particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 355,
        "density": {
          "enable": true,
          "value_area": 789.1476416322727
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.48927153781200905,
        "random": false,
        "anim": {
          "enable": true,
          "speed": 0.2,
          "opacity_min": 0,
          "sync": false
        }
      },
      "size": {
        "value": 2,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 0,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 0.2,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 83.91608391608392,
          "size": 1,
          "duration": 3,
          "opacity": 1,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });


