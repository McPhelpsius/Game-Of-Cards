(function ($) {

    if (!!location.search) {
        document.forms[0].hidden = true;
    } else {
        document.querySelector('#cardTable').hidden = true;
    }

    const playerNumberInput = document.querySelector('input[name="numberOfPlayers"]'),
        playerInputsTarget = document.getElementById('playerNames'),
        playerNameInputMarkup = `<input type="text" name="playerNames" required>`;

    playerNumberInput.addEventListener( "keyup", function ( ) {

        let thisManyPlayers = playerNumberInput.value;

        if( !!thisManyPlayers ) {

            let thisManyPlayersAdjusted = thisManyPlayers - 1,
                playerNamesInputs = playerInputsTarget.querySelectorAll('input[type="text"]');

            if ( playerNamesInputs.length < thisManyPlayersAdjusted ) {
                // calculate difference between length and value
                let difference = thisManyPlayersAdjusted - playerNamesInputs.length;            
                for(var p = 0; p <= difference; p++) {
                    playerInputsTarget.innerHTML += playerNameInputMarkup;
                }
            } else if ( playerNamesInputs.length > thisManyPlayersAdjusted ) {
                let difference = playerNamesInputs.length - thisManyPlayers;
                for(var p = 1; p <= difference; p++) {
                    playerInputsTarget.lastChild.remove();
                }
            }

        }

    });

    let inputs = document.querySelectorAll('input'),
        pulseDots = document.querySelectorAll('.pulse'),
        innerPulseDots = document.querySelectorAll('.innerPulse'),
        pulseIndex = 0,
        nextPulse = pulseDots[0],
        pulseColors = ['#D3DA92', '#E962D7'],
        colorsIndex = 0,
        nextPulseColor = pulseColors[0],
        pulseZ = 800,
        lastPulse = pulseDots[pulseIndex - 1],
        lastInnerPulseDot = innerPulseDots[pulseIndex-1];

    for (let v = 0; v < inputs.length; v++) {
        $(inputs[v]).on("click", function(evt){            
            nextPulse = pulseDots[pulseIndex];
            nextPulseColor = pulseColors[colorsIndex];
            
            $(nextPulse).addClass( 'pulsing' ).css('background', nextPulseColor);
            $(lastPulse).removeClass( 'pulsing' ).delay( 500 );
            $(innerPulseDots[pulseIndex]).css({"left": evt.pageX + "px", "top": evt.pageY + "px", "z-index": pulseZ }).addClass( 'innerPulsing' ).animate({"left": evt.pageX-36 + "px", "top": evt.pageY-36 + "px"}, 560).delay( 300 );
            $(lastInnerPulseDot).removeClass( 'innerPulsing' );

            lastInnerPulseDot = innerPulseDots[pulseIndex];
            colorsIndex = colorsIndex < pulseColors.length-1 ? colorsIndex+1 : 0;
            pulseIndex = pulseIndex < pulseDots.length-1 ? pulseIndex+1 : 0;
            lastPulse = nextPulse;
            console.log(evt.pageX, evt.pageY);
        } );


    }

})(jQuery);
