// vanta_effects.js

function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

function applyVantaEffect(effectName, selector, options) {
    const el = document.querySelector(selector);
    if (el) {
        window.VANTA[effectName]({
            el: el,
            ...options
        });
    }
}

loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js", () => {
    const vantaScripts = [
        "fog", "waves", "clouds", "birds", "dots"
    ];

    let loadedCount = 0;
    vantaScripts.forEach(effect => {
        loadScript(`https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.${effect}.min.js`, () => {
            loadedCount++;
            if (loadedCount === vantaScripts.length) {
                applyVantaBasedOnPage();
            }
        });
    });
});

function applyVantaBasedOnPage() {
    const pageClass = document.body.className;

    // Définition des groupes de pages
    const groupes = {
        combat: ["page-boxe", "page-judo"],
        nautique: ["page-canoe", "page-aviron"],
        bienetre: ["page-qi-qong"],
        interieur: ["page-gym", "page-badminton", "page-tir-arc", "page-escalade"],
        pleinair: ["page-cross-training", "page-nature", "page-paintball"]
    };

    // Sélecteurs communs
    const selectors = [
        ".contact-materiel",
        ".horaires-tarifs",
        ".infos-pratiques"
    ];

    const inGroup = (groupe) => groupes[groupe]?.includes(pageClass);

    if (inGroup("combat")) {
        selectors.forEach(sel =>
            applyVantaEffect("FOG", sel, {
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                highlightColor: 0xff6600,
                midtoneColor: 0xff3300,
                lowlightColor: 0x200000,
                baseColor: 0x000000,
                blurFactor: 0.5,
                speed: 2.5,
                zoom: 1.2
            })
        );
    } else if (inGroup("nautique")) {
        selectors.forEach(sel =>
            applyVantaEffect("WAVES", sel, {
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                color: 0x0099ff,
                shininess: 80,
                waveHeight: 20,
                waveSpeed: 1.2,
                zoom: 1.2
            })
        );
    } else if (inGroup("bienetre")) {
        selectors.forEach(sel =>
            applyVantaEffect("CLOUDS", sel, {
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                highlightColor: 0xffb347,
                midtoneColor: 0xffda7b,
                lowlightColor: 0xffa500,
                baseColor: 0x422800,
                speed: 1.2,
                zoom: 0.8
            })
        );
    } else if (inGroup("pleinair")) {
        selectors.forEach(sel =>
            applyVantaEffect("BIRDS", sel, {
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                backgroundColor: 0x113311,
                color1: 0x88cc88,
                color2: 0x44aa44,
                birdSize: 1.3,
                quantity: 4,
                wingSpan: 25,
                speedLimit: 2.5,
                separation: 50,
                cohesion: 30
            })
        );
    } else if (inGroup("interieur")) {
        selectors.forEach(sel =>
            applyVantaEffect("DOTS", sel, {
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                color: 0xffffff,
                backgroundColor: 0x222222,
                size: 3.0,
                spacing: 30
            })
        );
    } else {
        console.log("Pas d'effet Vanta appliqué pour :", pageClass);
    }
}
