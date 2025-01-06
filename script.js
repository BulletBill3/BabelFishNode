var enText = document.getElementById("enText");

var esText = document.getElementById("esText");
var action = document.getElementById("action");

voices = window.speechSynthesis.getVoices();
function speechEn() {

    enText.innerHTML = '';
    esText.innerHTML = '';
    
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    
    recognition.onstart = function () {
        action.innerHTML = "listening...";
    };

    recognition.onspeechend = function () {
        action.innerHTML = "stopped listening";
        recognition.stop();
    }

    recognition.onresult = function (event) {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        enText.innerHTML = transcript

        enToEs(transcript);
        
        
    };

    recognition.start();
}

function speechEs() {
    
    enText.innerHTML = '';
    esText.innerHTML = '';
   
    
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    
    recognition.onstart = function () {
        action.innerHTML = "listening... / escuchando...";
    };

    recognition.onspeechend = function () {
        action.innerHTML = "stopped listening. / dejo de escuchar.";
        recognition.stop();
    }

    recognition.onresult = function (event) {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        esText.innerHTML = transcript
        esToEn(transcript);
    };

    recognition.start();
}


function enToEs(text) {
    let url =
      'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q='+encodeURI(text);
  
    axios.get(url).then(function (response) {
        //console.log(response.data[0][0][0])
        esText.innerHTML = response.data[0][0][0]
        readEs();
    });
    
  }

  function esToEn(text) {
    let url =
      'https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q='+encodeURI(text);
  
    axios.get(url).then(function (response) {
      enText.innerHTML = response.data[0][0][0]
      readEn();
    });
   
  }

  function readEs(){
    window.speechSynthesis.cancel();
    setTimeout(8000)

    var text = esText.innerHTML;
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.rate = 1.0;
    msg.pitch = 1.0;
    msg.text = text; 
    msg.volume = 1.0;
    msg.voice = voices[7];

    window.speechSynthesis.speak(msg);
    
  }

  function readEn(){
    window.speechSynthesis.cancel();
    setTimeout(8000)
    var text = enText.innerHTML;
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.rate = 1.0;
    msg.pitch = 1.0;
    msg.text = text; 
    msg.volume = 1.0;
    msg.voice = voices[1];

    window.speechSynthesis.speak(msg);
  }
