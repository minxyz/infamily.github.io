// Load jQuery library using plain JavaScript
//

var BASE_PATH = '/';
if (location.pathname.indexOf('/plaintext/') > -1) {
  var BASE_PATH = '/plaintext/';
}

function includejQuery(callback) {
    if(window.jQuery)
    {
        // jQuery is already loaded, set up an asynchronous call
        // to the callback if any
        if (callback)
        {
            setTimeout(function() {
                callback(jQuery);
            }, 0);
        }
    }
    else
    {
        // jQuery not loaded, load it and when it loads call
        // noConflict and the callback (if any).
        var script = document.createElement('script');
        script.onload = function() {
            jQuery.noConflict();
            if (callback) {
                callback(jQuery);
            }
        };
        script.src = BASE_PATH + "libs/jquery-3.2.1.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}

includejQuery(function($){

    function set_state (language, state) {
        $('html > head').append($('<style>.'+language+' { display: '+state+'; }</style>'));
    }

    function set_language(lang) {
        for (var i in languages) {
            if (lang == languages[i]) {
                set_state(languages[i], 'inline');
            }
            else {
                set_state(languages[i], 'none');
            }
        }
        return lang;
    }

    $(document).ready(function(){

        if (!(languages.indexOf(localStorage.getItem("lang")) > -1)) {
            localStorage["lang"] = set_language(fallback_language);
        }
        else {
            localStorage["lang"] = set_language(localStorage["lang"]);
        }

        // $("#select").val(default_language);
        $("#select").bind("change", function() {
            localStorage["lang"] = set_language($(".language select").val());
        });
    });

 }
)


function language_widget(languages, language_names) {

    var browser_language = navigator.language || navigator.userLanguage; 
    var default_language = browser_language.substr(0, 2).toLowerCase();

    if (!(localStorage['lang'] == null)) {
        if (languages.indexOf(localStorage['lang']) > -1) {
            var lang = localStorage['lang'];
        }
        else if (languages.indexOf(default_language) > -1) {
            var lang = default_language;
        }

        else {
            var lang = fallback_language;
        }
    }
    else if (languages.indexOf(default_language) > -1) {
        var lang = default_language;
    }

    else {
        var lang = fallback_language;
    }


    // Add <div class="language">
    var LanguagesDiv = document.createElement("div");
    LanguagesDiv.setAttribute("class", "language");

    // Add <select>
    var LanguageSelect = document.createElement("select");
    LanguageSelect.id = "select";
    LanguagesDiv.appendChild(LanguageSelect);

    // Add <option,..>
    for (var i = 0; i < languages.length; i++) {
        var option = document.createElement("option");
        option.value = languages[i];
        option.text = language_names[i];
        if (option.value == lang) {
            option.selected = true;
        }
        LanguageSelect.appendChild(option);
    }

//  // Append it.
//  window.onload = function() {
//    document.body.appendChild(LanguagesDiv);
//  };

    return LanguagesDiv;
}
