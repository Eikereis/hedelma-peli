let raha = 100; 
let panos = 1; 
let locked = [false, false, false, false];  
let lukittu = false;
let sevens = 0
function pelaa() {
    document.getElementById("voitto").innerHTML = ``
    if (panos > raha || raha === 0) {
        document.getElementById("play").disabled = true; 
    }
    raha = raha - panos;
   
    document.getElementById("balance").innerHTML = raha;

    if (locked[0] || locked[1] || locked[2] || locked[3]) {
        lukittu = true;
    } else {
        lukittu = false;
    }

    if (!locked[0]) {
        slotMachine("reel1");
    }
    if (!locked[1]) {
        slotMachine("reel2");
    }
    if (!locked[2]) {
        slotMachine("reel3");
    }
    if (!locked[3]) {
        slotMachine("reel4");
    }

    voittoTarkistus();

    // Reset lock states
    locked[0] = false;
    locked[1] = false;
    locked[2] = false;
    locked[3] = false;

    if (!lukittu) {
        document.getElementById("lock1").disabled = false;
        document.getElementById("lock2").disabled = false;
        document.getElementById("lock3").disabled = false;
        document.getElementById("lock4").disabled = false;
    } else {
        document.getElementById("lock1").disabled = true;
        document.getElementById("lock2").disabled = true;
        document.getElementById("lock3").disabled = true;
        document.getElementById("lock4").disabled = true;
    }
    document.getElementById("balance").innerHTML = raha;
}

function slotMachine(slot) {
    const gambling = Math.floor((Math.random() * 5) + 1);
    let winner = '';
    switch(gambling) {
        case 1:
            winner = '🍎';
            break;
        case 2:
            winner = '🍐';
            break;
        case 3:
            winner = '🍒';
            break;
        case 4:
            winner = '🍉';
            break;
        case 5:
            winner = '7️⃣';
            sevens++;
            break;
    }
    document.getElementById(slot).innerHTML = winner;
}

function lukitus(x) {
    if (x === 1) {
        locked[0] = !locked[0];
    } else if (x === 2) {
        locked[1] = !locked[1];
    } else if (x === 3) {
        locked[2] = !locked[2];
    } else if (x === 4) {
        locked[3] = !locked[3];
    }

    // Enable/Disable lock buttons based on lock status
    document.getElementById("lock1").disabled = locked[0];
    document.getElementById("lock2").disabled = locked[1];
    document.getElementById("lock3").disabled = locked[2];
    document.getElementById("lock4").disabled = locked[3];
}

function aseta_panos(x) {
    x = document.getElementById("bet").value;
    panos = x; 
}

function voittoTarkistus() {
    const a = document.getElementById("reel1").innerText;
    const b = document.getElementById("reel2").innerText;
    const c = document.getElementById("reel3").innerText;
    const d = document.getElementById("reel4").innerText;

    if (a === b && b === c && c === d) {
        if (a === '🍎') {
            voittoraha = panos * 6
            raha += voittoraha
        } else if (a === '🍒') {
            voittoraha = panos * 3
            raha += voittoraha
        } else if (a === '🍐') {
            voittoraha = panos * 4
            raha += voittoraha
        } else if (a === '🍉') {
            voittoraha = panos * 5
            raha += voittoraha
        } else if (a === '7️⃣') {
            voittoraha = panos * 10
            raha += voittoraha
        }
        document.getElementById("voitto").innerHTML = `voitit ${voittoraha}€`
        document.getElementById("lock1").disabled = true;
        document.getElementById("lock2").disabled = true;
        document.getElementById("lock3").disabled = true;
        document.getElementById("lock4").disabled = true;
    }
    if (sevens === 3) {
        raha += panos * 5
        document.getElementById("voitto").innerHTML = `voitit ${panos*5}€`
        document.getElementById("lock1").disabled = true;
        document.getElementById("lock2").disabled = true;
        document.getElementById("lock3").disabled = true;
        document.getElementById("lock4").disabled = true;
    } 
    sevens = 0
}