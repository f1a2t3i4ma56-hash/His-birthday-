/* OPEN WHEN CARDS */

const cards = document.querySelectorAll(".whenCard");

cards.forEach(function(card) {

    card.addEventListener("click", function() {

        cards.forEach(function(otherCard) {

            if (otherCard !== card) {
                otherCard.classList.remove("open");
            }

        });

        card.classList.toggle("open");

    });

});


/* FLOATING HEARTS */

document.addEventListener("click", function(event) {

    if (
        event.target.closest(".whenCard") ||
        event.target.closest("#musicButton")
    ) {
        return;
    }

    const heart = document.createElement("div");

    heart.innerHTML = "♡";

    heart.style.position = "fixed";
    heart.style.left = event.clientX + "px";
    heart.style.top = event.clientY + "px";
    heart.style.color = "#5be0bd";
    heart.style.fontSize = "22px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";
    heart.style.transition = "all 1.5s ease";

    document.body.appendChild(heart);

    setTimeout(function() {

        heart.style.transform =
            "translateY(-100px) scale(1.7)";

        heart.style.opacity = "0";

    }, 50);

    setTimeout(function() {

        heart.remove();

    }, 1600);

});


/* MUSIC BUTTON */

const musicButton =
    document.getElementById("musicButton");

let audioContext = null;

let musicPlaying = false;


musicButton.addEventListener("click", function() {

    if (!audioContext) {

        audioContext =
            new (window.AudioContext ||
            window.webkitAudioContext)();

    }

    musicPlaying = !musicPlaying;

    if (musicPlaying) {

        musicButton.innerHTML = "♪";

        playMelody();

    } else {

        musicButton.innerHTML = "♡";

    }

});


function playMelody() {

    if (!musicPlaying) {
        return;
    }

    const notes = [
        261.63,
        329.63,
        392.00,
        329.63
    ];

    notes.forEach(function(frequency, index) {

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        const startTime =
            audioContext.currentTime +
            index * 0.45;

        oscillator.type = "sine";

        oscillator.frequency.value =
            frequency;

        gain.gain.setValueAtTime(
            0,
            startTime
        );

        gain.gain.linearRampToValueAtTime(
            0.025,
            startTime + 0.08
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            startTime + 1
        );

        oscillator.connect(gain);

        gain.connect(
            audioContext.destination
        );

        oscillator.start(startTime);

        oscillator.stop(
            startTime + 1.1
        );

    });


    setTimeout(function() {

        if (musicPlaying) {
            playMelody();
        }

    }, 2200);

}


/* SCROLL REVEAL */

const observer =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },

        {
            threshold: 0.15
        }

    );


document
    .querySelectorAll(
        ".letterCard, .memoryGrid, .whenCard, .endingBox"
    )
    .forEach(function(element) {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity 1s ease, transform 1s ease";

        observer.observe(element);

    });
