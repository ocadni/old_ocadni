( function( document ) {

//**** GIF ****
  let intervalId = null;
  let gif_iso = () =>{
    if($("#isochrones").hasClass("active")){
      count = 0
      let path = "./img/isochrones/";
      let images = [
        "a_paris1_crop.jpg",
        "a_paris2_crop.jpg",
        "a_paris3_crop.jpg",
        "a_paris4_crop.jpg",
        "a_paris5_crop.jpg",
      ]

      intervalId = setInterval(function(){
        //let num_img = count % 5 + 1
        //console.log(num_img)
        $("#img_iso").fadeTo(100, 0.6,()=>{
          $("#img_iso").attr("src",path + images[count % 5]);
          $("#img_iso").fadeTo(100, 1);
        });


        count += 1
      }, 2 * 1000);
    }
  }
  document.addEventListener( "impress:stepenter", gif_iso);
  //document.addEventListener( "impress:steprefresh", gif_iso);
  document.addEventListener( "impress:stepleave", function( event ) {
    clearInterval(intervalId);});


//*** VIDEO AUTOPLAY ****
let autoplay_video = () => {
  if($("#citychrone_explore").hasClass("active")){
    let video1 = document.getElementById('select_city');
    video1.muted = true;
    video1.play();

    /*video1.oncanplaythrough = function() {
      video1.muted = true;
      video1.play();
    }*/
    let video2 = document.getElementById('video_explore');
    video2.muted = true;
    video2.play();
    /*video2.oncanplaythrough = function() {
      video2.muted = true;
      video2.play();
      console.log("inside!!", video2)
    }*/

    console.log("autoplay!!!", video2);
    //video.play();
    }
    if($("#new_scenario_citychrone").hasClass("active")){
      let video1 = document.getElementById('new_scenario_video');
      video1.muted = true;
      video1.play();

      /*video1.oncanplaythrough = function() {
        video1.muted = true;
        video1.play();
      }*/
      let video2 = document.getElementById('check_res_video');
      video2.muted = true;
      video2.play();
      /*video2.oncanplaythrough = function() {
        video2.muted = true;
        video2.play();
        console.log("inside!!", video2)
      }*/

      console.log("autoplay!!!", video2);
      //video.play();
      }

  };
  document.addEventListener( "impress:stepenter", autoplay_video);

})(document);
