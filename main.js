let raha = 100;
let panos = 1;
let locked = [false, false, false, false]; // Lukitustilat
let lukittu = false;

// Yksi pelaus
function pelaa() {
    document.getElementById("voitto").innerHTML = ``;
    document.getElementById("status").innerHTML = ``;

    // kelvollinen panos?
    if (panos > raha || raha === 0) {
        document.getElementById("play").disabled = true;
        document.getElementById("status").innerHTML = "Ei tarpeeksi rahaa!";
        return;
    }

    raha -= panos;
    document.getElementById("balance").innerHTML = raha;

    lukittu = locked.some(state => state); // lukitus tarkistus

    // Pyörityksen aloitus
    const spinPromises = ["reel1", "reel2", "reel3", "reel4"].map((reel, index) => {
        if (!locked[index]) {
            return spinReels(reel);
        }
        return Promise.resolve(); // Jos rulla on lukittu, ei tarvitse pyörittää sitä
    });

    // Odota kaikkien pyöritysten loppumista ennen voiton tarkistamista
    Promise.all(spinPromises).then(() => {
        voittoTarkistus(); // Tarkista voitot pyöritysten jälkeen
    });

    // Resetoi lukitus
    locked.fill(false);

    // lukitusnapit
    if (lukittu) {
        disableLockButtons();
    } else {
        enableLockButtons();
    }

    document.getElementById("balance").innerHTML = raha;
}

// Pyöritys animaatio
function spinReels(slot) {
    const spinTime = 1000;
    const startTime = Date.now();

    return new Promise(resolve => {
        function updateReels() {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < spinTime) {
                document.getElementById(slot).textContent = getRandomFruit();
                requestAnimationFrame(updateReels);
            } else {
                if (!locked.some(state => state)) {
                    document.getElementById(slot).textContent = getRandomFruit();
                }
                resolve(); // Merkitse, että pyöritys on valmis
            }
        }
        updateReels();
    });
}

// Hae satunnainen hedelmä
function getRandomFruit() {
    const fruits = ['🍎', '🍐', '🍒', '🍉', '7️⃣'];
    return fruits[Math.floor(Math.random() * fruits.length)];
}

// Lukitse rulla
function lukitus(x) {
    locked[x - 1] = !locked[x - 1];
    document.getElementById(`lock${x}`).disabled = locked[x - 1];
}

// Aseta panos
function asetaPanos() {
    const uusiPanos = parseInt(document.getElementById("bet").value, 10);
    if (uusiPanos >= 1 && uusiPanos <= raha) {
        panos = uusiPanos;
        document.getElementById("play").disabled = false;
        document.getElementById("status").innerHTML = `Panos asetettu: ${panos}€`;
    } else {
        document.getElementById("status").innerHTML = "Virheellinen panos!";
    }
}

// Tarkista voitot
function voittoTarkistus() {
    const reels = [
        document.getElementById("reel1").innerText,
        document.getElementById("reel2").innerText,
        document.getElementById("reel3").innerText,
        document.getElementById("reel4").innerText
    ];
    console.log(reels)

    if (reels.every(fruit => fruit === reels[0])) {
        let voittoraha = 0;
        switch (reels[0]) {
            case '🍎': voittoraha = panos * 6; break;
            case '🍒': voittoraha = panos * 3; break;
            case '🍐': voittoraha = panos * 4; break;
            case '🍉': voittoraha = panos * 5; break;
            case '7️⃣': voittoraha = panos * 10; break;
        }
        raha += voittoraha;
        document.getElementById("voitto").innerHTML = `Voitit ${voittoraha}€!`;
        document.getElementById("balance").innerHTML = raha;
        disableLockButtons();
    }
}

// Ota lukitusnappien toiminta pois päältä
function disableLockButtons() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`lock${i}`).disabled = true;
    }
}

// Ota lukitusnappien toiminta käyttöön
function enableLockButtons() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`lock${i}`).disabled = false;
    }
}
