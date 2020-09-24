'use strict';
const hakukentta = document.getElementById('hakukentta');
const nappi = document.getElementById('nappi');
const tulostusloota = document.getElementById('tuloslaatikko');

// kun nappia painetaan

nappi.addEventListener('click', function () {

    // hae hakukentän teksti (value)
    const hakusana = hakukentta.value;

    // console.log(hakusana);
    // lähetä pyynto APIin
    const hakusanasi = document.getElementById('hakusanasi');
    hakusanasi.innerHTML = `Tulokset haulla "${hakusana}".`;

    fetch('https://api.tvmaze.com/search/shows?q=' +
        hakusana)             // Käynnistetään haku. Vakiometodi on GET.
        .then(function (vastaus) {        // Sitten kun haku on valmis,
            return vastaus.json();        // muutetaan ladattu tekstimuotoinen JSON JavaScript-olioksi/taulukoksi
        }).then(function (tvsarjat) {         // Sitten otetaan ladattu data vastaan ja
        console.log(tvsarjat);              // tulosta tulos konsoliin
        appendData(tvsarjat);
    }).catch(function (error) {       // Jos tapahtuu virhe,
        console.log(error);           // kirjoitetaan virhe konsoliin.
    });

});
document.getElementById('nappi').addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById('nappi').click();
    }
});

function appendData(tvsarjat) {

    const paaJuttu = document.getElementById('tuloslaatikko');
    //tyhjennä pääjuttu ennen seuraavaa hakua
    paaJuttu.innerHTML = '';

    if (tvsarjat.length == 0) {
        paaJuttu.innerHTML = `  <div id="juttu" style="width:100%!important">
                <h1>Ei tuloksia</h1>

                <figure>
                <img src="kuvat/giphy.gif" alt="404 ei tuloksia"/>
                </figure>
                <h4>Valitettavasti hakusanallasi "${hakukentta.value}" ei löytynyt mitään.</h4>
            </div>`;
    } else {

        for (let i = 0; i < tvsarjat.length; i++) {

            //  const tulokset = document.createElement("h6");
            const div = document.createElement('div');
            div.setAttribute('id', 'juttu');
            const o = document.createElement('h3');
            const l = document.createElement('h6');
            l.setAttribute('class', 'l');
            o.setAttribute('class', 'o');
            const p = document.createElement('p');
            p.setAttribute('class', 'marginaali');
            const p2 = document.createElement('p');
            const p3 = document.createElement('p');
            const img = document.createElement('img');
            const p4 = document.createElement('p');
            p4.setAttribute('class', 'linkkitv');
            const p5 = document.createElement('p');
            p5.setAttribute('class', 'paivaus');
            p2.setAttribute('class', 'synopsis');
            p3.setAttribute('class', 'rating');
            const anuoli = document.createElement("a");
            const a1 = document.createElement('a');
            const officialsites = document.createElement("p");
            div.innerHTML = '';

            div.appendChild(o);
            div.appendChild(l);
            // div.append(tulokset);
            //  tulokset.innerHTML = tvsarjat.length + "tulosta";
            paaJuttu.appendChild(div);

            if (`${tvsarjat[i].show.image}` == 'null') {
                img.src = `kuvat/404.jpg`;
                img.alt = 'kuva';
                img.setAttribute('class', 'klikki');
                div.appendChild(img);
            } else {


                if (`${tvsarjat[i].show.officialSite}` == "null") {
                    img.src = `${tvsarjat[i].show.image.medium}`;
                    img.alt = 'kuva';
                    img.setAttribute('class', 'klikki');
                    div.appendChild(img);
                } else {
                    a1.setAttribute('href', `${tvsarjat[i].show.officialSite}`);
                    a1.setAttribute("title", `${tvsarjat[i].show.officialSite}`)
                    a1.appendChild(img);
                    img.src = `${tvsarjat[i].show.image.medium}`;
                    img.alt = 'kuva';
                    img.setAttribute('class', 'klikki');
                    div.appendChild(a1);
                }

            }
            o.innerHTML = `<b>${tvsarjat[i].show.name} </b> `;
            l.innerHTML = `${tvsarjat[i].show.type}, ${tvsarjat[i].show.language}`;
            p.innerHTML = `<b>Genre:</b> ${tvsarjat[i].show.genres} <br> `;
            div.appendChild(p);

            if (`${tvsarjat[i].show.premiered}` == 'null') {
                p5.innerHTML = '';
                div.appendChild(p5);
            } else {
                p5.innerHTML = `${tvsarjat[i].show.premiered}`;
                div.appendChild(p5);
            }

            if (`${tvsarjat[i].show.summary}` == 'null') {
                p2.innerHTML = '';
                div.appendChild(p2);
            } else {
                p2.innerHTML += `${tvsarjat[i].show.summary}`;
                div.appendChild(p2);
            }

            if (`${tvsarjat[i].show.rating.average}` == 'null') {
                p3.innerHTML = '';
                div.append(p3);
            } else {
                p3.innerHTML = `${tvsarjat[i].show.rating.average} ★`;
                div.append(p3);
            }

            if (`${tvsarjat[i].show.officialSite}` == "null") {
                officialsites.innerHTML = "";
                div.appendChild(officialsites);

            } else {
                //ei varmaan ollut nopein tapa tehdä tämä mutta ainoa jonka löysin
                const osoite = document.createElement("a");
                const href = osoite.href = `${tvsarjat[i].show.officialSite}`;
                const href2 = href.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
                const href3 = href2.substring(0, href2.indexOf('.'));
                const href4 = href3.charAt(0).toUpperCase() + href3.slice(1);


                officialsites.innerHTML = `Virallinen sivusto: <br> <a href="${tvsarjat[i].show.officialSite}" class="tvlinkit" title="${tvsarjat[i].show.officialSite}">${href4}</a>`;
                div.appendChild(officialsites);
            }

            if (`${tvsarjat[i].show.url}` == 'null') {
                p4.innerHTML = '';
                div.appendChild(p4);
            } else {
                p4.innerHTML = `<a class="tvlinkit" href="${tvsarjat[i].show.url}" title="Lisätietoa TVMazen sivulla">Lisätietoa</a>`;
                div.appendChild(p4);
            }


            //tyhjentää hakukentän, helpottaa seuraavaa hakua
            hakukentta.value = '';

        }

    }

    const body2 = document.querySelector('body');

    const footer = document.createElement('footer');

    //halusin footerin kaikkialle paits etusivulle nii keksin nyt vaa tän tavan
    if (document.contains(document.querySelector('footer'))) {

        let jutska = document.querySelector('footer');
        jutska.remove();
    }


    footer.innerHTML = ` <div class="sisus">
            <h3>TV-Sarjat</h3>
            <p>Timo Hyppönen</p>
            <p>TXK20S1-F, Web-tekniikat ja digitaalinen media.</p>
            <span style="display:inline-block;float:left;">AJAX</span><span style="display:inline-block;text-align: right;float:right;">Syyskuu 2020</span>
        </div>`;

    body2.appendChild(footer);

}

//enter näppäimellä haku
const input2 = document.getElementById('hakukentta');

// Execute a function when the user releases a key on the keyboard
input2.addEventListener('keyup', function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById('nappi').click();
        //console.log("toimii");
    }

});

const mybutton = document.getElementById("myBtn");

window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    // body.style.scroll-behavior = "smooth";
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}