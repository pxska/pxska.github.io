(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            if (h < 12) {
                c.innerHTML = h + ":" + m + ":" + s + " a.m."
            } else {
                if (h > 12) {
                    if ((h % 12) < 10) {
                        h = "0" + (h % 12);
                    } else {
                        h = h % 12;
                    }
                    c.innerHTML = h + ":" + m + ":" + s + " p.m.";
                } else {
                    c.innerHTML = h + ":" + m + ":" + s + " p.m.";
                }
            }            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    var e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    let summa = 0;

    function estimateDelivery(event) {
        event.preventDefault();

        var linn = document.getElementById("linn");
        var kingitus = document.getElementById("v1").checked;
        var kontaktivaba = document.getElementById("v2").checked;
        var eesnimi = document.getElementById("fname");
        var perenimi = document.getElementById("lname");
        var kass = document.getElementById("kassid");
        var koer = document.getElementById("koerad");

        switch (linn.value) {
            case "tln":
                summa = 0.00;
                break;
            case "trt":
                summa = 2.50;
                break;
            case "nrv":
                summa = 2.50;
                break;
            case "prn":
                summa = 3.00;
                break;
        }

        if (kingitus === true) {
            summa += 5.00;
        }
        if (kontaktivaba === true) {
            summa += 1.00;
        }

        /* varastasin selle koodijupi internetist... */
        function hasNumber(myString) {
            return /\d/.test(myString);
        }

        /*validation*/
        if (eesnimi.value == "") {
            alert("Palun sisestage eesnimi");
            eesnimi.focus();
        } else if (hasNumber(eesnimi.value)) {
            alert("Eesnimi ei tohi sisaldada muud peale tähtede");
            eesnimi.focus();
        } else if (perenimi.value == "") {
            alert("Palun sisestage perenimi");
            perenimi.focus();
        } else if (hasNumber(perenimi.value)) {
            alert("Perenimi ei tohi sisaldada muud peale tähtede");
            perenimi.focus();
        } else if (kass.checked == false && koer.checked == false) {
            alert("Palun vali üks, kas kassid või koerad");
        } else if (linn.value == "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
        }    

        e.innerHTML = summa.toString() + " &euro;";
        console.log("Tarne hind on arvutatud");
        
    }
    
})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map, infobox;

function GetMap() {
    
    "use strict";

    var tartu = new Microsoft.Maps.Location (
        58.38104, 
        26.71992
    );

    var tallinn = new Microsoft.Maps.Location (
        59.438730, 
        24.771383
    );
    
    var centerPoint = new Microsoft.Maps.Location (
        (59.438730 + 58.38104) / 2,
        (24.771383 + 26.71992) / 2
    )

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 6,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox.setMap(map);

    var locations = [tartu, tallinn];

    for (var i = 0; i < locations.length; i++) {
        var pin = new Microsoft.Maps.Pushpin(locations[i]);

        var latitude = locations[i].clone().latitude;
        var longitude = locations[i].clone().longitude;

        if (latitude == 58.38104 && longitude == 26.71992) {
            pin.metadata = {
                title: 'Tartu Ülikool',
                description: 'Hea koht'
            };
        }
        if (latitude == 59.43873 && longitude == 24.771383) {
            pin.metadata = {
                title: 'Tallinna Ülikool',
                description: 'Ka päris hea koht'
            };
        }

        Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

        map.entities.push(pin);
    }
}

function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

