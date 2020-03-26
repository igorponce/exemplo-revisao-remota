var app = {
	data: {
		viewElements: {
			screenView: $('.screenView').get(0),
			webcamView: $('.webcamView').get(0)
		}
	},
	screenCapture: {
		start: async function(){
			try {

				const displayMediaOptions = {
				  video: {
				    cursor: "always",
				    frameRate: 10
				  },
				  audio: true
				}

				webscreen = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    			app.data.viewElements.screenView.srcObject = webscreen;

    			return true;

    		} catch(error) {

    			Swal.fire(
				  'Erro',
				  'Erro ao compartilhar sua tela.',
				  'error'
				);
    			return false;

  			}
		},
		stop: function(){

		  let tracks = app.data.viewElements.screenView.srcObject.getTracks();
		  tracks.forEach(track => track.stop());
		  app.data.viewElements.screenView.srcObject = null;

		}
	},
	webcamCapture: {
		start: async function(){
			try {

				const displayMediaOptions = {
				  video: true,
				  audio: true
				}
				webcam = await navigator.mediaDevices.getUserMedia(displayMediaOptions);
    			app.data.viewElements.webcamView.srcObject = webcam;

    			return true;

    		} catch(error) {
    			Swal.fire(
				  'Erro',
				  'Erro ao compartilhar sua webcam.',
				  'error'
				);
    			return false;
  			}
		},
		stop: function(){

		  let tracks = app.data.viewElements.webcamView.srcObject.getTracks();
		  tracks.forEach(track => track.stop());
		  app.data.viewElements.webcamView.srcObject = null;

		}
	}
}

$("#btnStartReview").click(function(){

	app.screenCapture.start().then(function(success) {
    	
    	if(success)
    	{
    		app.webcamCapture.start().then(function(success) {
    			if(success)
    			{
    				$("#divInstrucao").hide();
    				$("#divQuestao").show();
    			}
    			else
    			{
    				app.screenCapture.stop();
    			}
    		});
    	}

  	});

});

$("#btnStopReview").click(function(){

	app.screenCapture.stop();
	app.webcamCapture.stop();

	$("#divInstrucao").show();
    $("#divQuestao").hide();

});