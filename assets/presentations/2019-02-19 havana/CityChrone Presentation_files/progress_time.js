/* global document */
( function( document ) {
    "use strict";
    var root;
    var stepids = [];
    let time_limit = 20;

    // Get stepids from the steps under impress root
    var getSteps = function() {
        stepids = [];
        var steps = root.querySelectorAll( ".step" );
        for ( var i = 0; i < steps.length; i++ )
        {
          stepids[ i + 1 ] = steps[ i ].id;
        }
        };

    // Wait for impress.js to be initialized
    document.addEventListener( "impress:init", function( event ) {
            root = event.target;
        getSteps();
        var gc = event.detail.api.lib.gc;
        gc.pushCallback( function() {
            stepids = [];
            if ( progressbar ) {
                progressbar.style.width = "";
                        }
            if ( progress ) {
                progress.innerHTML = "";
                        }
        } );
    } );

    var progressbar = document.querySelector( "div.impress-progressbar-time div" );
    var progress = document.querySelector( "div.impress-progress-time" );

    if ( null !== progressbar || null !== progress ) {
        let intervalId = null;
        document.addEventListener( "impress:stepleave", function( event ) {
            updateProgressbar( 0 );
            clearInterval(intervalId);
        } );

        document.addEventListener( "impress:steprefresh", function( event ) {
            getSteps();
            updateProgressbar( 0 );
        } );
        document.addEventListener( "impress:stepenter", function(event) {
            var currentStep = event.target;
            //console.log( "Entered the Step Element '" + currentStep.id + "'" );
            let seconds_counter = 1;
            let step_time = 1;
            intervalId = setInterval(function(){
                //console.log(seconds_counter)
                updateProgressbar( seconds_counter, time_limit );
                seconds_counter += step_time;
                if(seconds_counter > time_limit) clearInterval(intervalId);
                //updateProgressBar();
            }  ,step_time * 1000);
        });


    }

    function updateProgressbar( seconds, time_limit ) {
        if ( null !== progressbar ) {
                        var width = 100 * (seconds / time_limit);
            progressbar.style.width = width.toFixed( 2 ) + "%";
        }
        if ( null !== progress ) {
            progress.innerHTML = seconds.toFixed(0);
        }
    }

} )( document );
