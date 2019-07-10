$(document).ready(function () {

    checkCookies();

    // BOOTSTRAP 3.0 - Open YouTube Video Dynamicaly in Modal Window
    // Modal Window for dynamically opening videos
    $('a[href^="https://www.youtube.com"]').on('click', function (e) {
        // Store the query string variables and values
        // Uses "jQuery Query Parser" plugin, to allow for various URL formats (could have extra parameters)
        var queryString = $(this).attr('href').slice($(this).attr('href').indexOf('?') + 1);
        var queryVars = $.parseQuery(queryString);

        // if GET variable "v" exists. This is the Youtube Video ID
        if ('v' in queryVars) {
            // Prevent opening of external page
            e.preventDefault();

            // Variables for iFrame code. Width and height from data attributes, else use default.
            var vidWidth = 560; // default
            var vidHeight = 315; // default
            if ($(this).attr('data-width')) { vidWidth = parseInt($(this).attr('data-width')); }
            if ($(this).attr('data-height')) { vidHeight = parseInt($(this).attr('data-height')); }
            var iFrameCode = '<iframe width="' + vidWidth + '" height="' + vidHeight + '" scrolling="no" allowtransparency="true" allowfullscreen="true" src="https://www.youtube.com/embed/' + queryVars['v'] + '?rel=0&wmode=transparent&showinfo=0" frameborder="0"></iframe>';

            // Replace Modal HTML with iFrame Embed
            $('#mediaModal .modal-body').html(iFrameCode);

            var title = $(this).attr('data-title');
			var pageLink = $(this).attr('page-link');

            if (title === undefined) {
                $('#mediaModal .modal-title').hide();
            }
            else {
                $('#mediaModal .modal-title').show();
            }

            if (pageLink == undefined) {
                $("#mediaModal #video-url").hide();
            } else {
                $("#mediaModal #video-url").show();
            }
            
            $('#mediaModal .modal-title').text(title);
            //$('#mediaModal #video-url').attr('href', $(this).attr('href'));
            $('#mediaModal #video-url').attr('href', $(this).data('page-link'));

            // Set new width of modal window, based on dynamic video content
            $('#mediaModal').on('show.bs.modal', function () {
                // Add video width to left and right padding, to get new width of modal window
                var modalBody = $(this).find('.modal-body');
                var modalDialog = $(this).find('.modal-dialog');
                var newModalWidth = vidWidth + parseInt(modalBody.css("padding-left")) + parseInt(modalBody.css("padding-right"));
                newModalWidth += parseInt(modalDialog.css("padding-left")) + parseInt(modalDialog.css("padding-right"));
                newModalWidth += 'px';
                // Set width of modal (Bootstrap 3.0)
                $(this).find('.modal-dialog').css('width', newModalWidth);
            });

            // Open Modal
            $('#mediaModal').modal();
        }
    });

    // Clear modal contents on close. 
    // There was mention of videos that kept playing in the background.
    $('#mediaModal').on('hidden.bs.modal', function () {
        $('#mediaModal .modal-body').html('');
    });

});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function deleteCookie(name) {
    setCookie(name, "", -1);
}

function checkCookies() {
	// Check previously visited cookie, show modal if the first time here
    /*var previouslyVisited = getCookie("previouslyVisitedNewSite");
    if (previouslyVisited != "") {
        //$("#new-site-alert").hide();
        // TODO: remove this and uncomment line above at launch!!!
        //$("#welcome-modal").modal('show');
        //$("#new-site-alert").show();
    }
    else 
    {
        setCookie("previouslyVisitedNewSite", "yes", 365);
        $("#welcome-modal").modal('show');
        //$("#new-site-alert").show();
    }*/
	
	//  Change login links if logged into survey
	var aspnetAuth = getCookie("surveylogin");
	if (aspnetAuth != "") {
		$('.login-links').html('<div class="pull-right login-links"><a href="/survey/Reports/MyReports/">My Account</a> | <a href="/survey/Surveys/TakeSurvey">Take Survey</a> | <a href="/survey/Account/Logout">Logout</a></div>')
	}
}

$(document).ready(function() {
    $(".reference").hide();
});

function showReference(el)
{
    var link = $(el);
    var reference = link.parent().next().next();
    reference.toggle();

}

function showRegisterPopupOnTime(time, taglineText) {
    registerPopupTimeout = setTimeout(function () {
        showRegisterPopup()
    }, time)
}

function showCoursesPopupOnTime(time, taglineText) {
    coursesPopupTimeout = setTimeout(function () {
        showCoursesPopup()
    }, time)
}

function showRegisterPopup(forceShow, taglineText) {
    /*var disableRegisterPopupCookie = getCookie("disableRegisterPopup")
    if (disableRegisterPopupCookie != "") {
        console.log("skipping popup due to cookie")
        return
    }

    var disableRegisterPopupOnceCookie = getCookie("disableRegisterPopupOnce")
    if (disableRegisterPopupOnceCookie.trim() !== "") {
        console.log("skipping popup due to disabling once")
        deleteCookie("disableRegisterPopupOnce")
        return
    } else {
		console.log("cookie is empty, showing popup")
		//console.log("cookie:" + disableRegisterPopupCookie + "end")
	}*/

    if (mobileCheck() === true) {
        return
    }
	
	var disableRegisterPopupCookie = getCookie("disableRegisterPopup")
	if (disableRegisterPopupCookie != "") {
		return
	}
    
	setCookie("disableRegisterPopup", 1, 365)
	
    var popup = $('#register-popup')
    popup.popup()
    popup.popup('show')
}

function showCoursesPopup(forceShow, taglineText) {
    var disableCoursesPopupCookie = getCookie("disableCoursesPopup")
    if (disableCoursesPopupCookie != "") {
        console.log("skipping courses popup due to cookie")
        return
    }

    var disableCoursesPopupOnceCookie = getCookie("disableCoursesPopupOnce")
    if (disableCoursesPopupOnceCookie != "") {
        console.log("skipping courses popup due to disabling once")
        deleteCookie("disableCoursesPopupOnce")
        return
    }

    var popup = $('#courses-popup')
    popup.popup()
    popup.popup('show')
}

function hideRegisterPopup() {
    $("#register-popup").popup('hide')
}

function hideCoursesPopup() {
    $("#courses-popup").popup('hide')
}

// http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
function mobileCheck() {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

var registerPopupTimeout;
var coursesPopupTimeout;

$(document).ready(function () {
    var path = window.location.pathname
    console.log(path)
    if ((path === "/www/") || (path === "/www")) {
        showRegisterPopupOnTime(15000)
    }
	
	if ((path === "/www/Character-Strengths-Survey") || (path === "/www/Character-Strengths-Survey/")) {
        showRegisterPopupOnTime(30000)
    }

    if ((path == "/www/Character-Strengths/Personality-Assessment") || (path === "/www/Character-Strengths/Personality-Assessment/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Science-Of-Character") || (path === "/www/Character-Strengths/Science-Of-Character/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/VIA-Classification") || (path === "/www/Character-Strengths/VIA-Classification/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Positive-Psychology") || (path === "/www/Positive-Psychology/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Positive-Psychology") || (path === "/www/Positive-Psychology/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Research/What-the-Research-Says-About-Character-Strengths-Signature-Strengths") || (path === "/www/Research/What-the-Research-Says-About-Character-Strengths-Signature-Strengths/")) {
        showRegisterPopupOnTime(30000)
    }
    
    if ((path == "/www/VIA-Survey/Take-the-Survey-Infographic") || (path === "/www/VIA-Survey/Take-the-Survey-Infographic/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/About-Institute/Character-Strengths-and-Virtues") || (path === "/www/About-Institute/Character-Strengths-and-Virtues/")) {
        showRegisterPopupOnTime(15000)
    }
	
	/* Character strengths */
	if ((path == "/www/Character-Strengths/Appreciation-of-Beauty-and-Excellence") || (path === "/www/Character-Strengths/Appreciation-of-Beauty-and-Excellence/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Bravery") || (path === "/www/Character-Strengths/Bravery/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Creativity") || (path === "/www/Character-Strengths/Creativity/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Curiosity") || (path === "/www/Character-Strengths/Curiosity/")) {
        showRegisterPopupOnTime(15000)
    }
    
    if ((path == "/www/Character-Strengths/Fairness") || (path === "/www/Character-Strengths/Fairness/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Forgiveness") || (path === "/www/Character-Strengths/Forgiveness/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Gratitude") || (path === "/www/Gratitude/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Honesty") || (path === "/www/Character-Strengths/Honesty/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Hope") || (path === "/www/Character-Strengths/Hope/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Humility") || (path === "/www/Character-Strengths/Humility/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Humor") || (path === "/www/Humor/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Judment") || (path === "/www/Character-Strengths/Judment/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Kindness") || (path === "/www/Character-Strengths/Kindness/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Leadership") || (path === "/www/Character-Strengths/Leadership/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Love") || (path === "/www/Character-Strengths/Love/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Love-of-Learning") || (path === "/www/Character-Strengths/Love-of-Learning/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Perseverance") || (path === "/www/Character-Strengths/Perseverance/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Perspective") || (path === "/www/Character-Strengths/Perspective/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Prudence") || (path === "/www/Character-Strengths/Prudence/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Self-Regulation") || (path === "/www/Character-Strengths/Self-Regulation/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Social-Intelligence") || (path === "/www/Character-Strengths/Social-Intelligence/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Spirituality") || (path === "/www/Character-Strengths/Spirituality/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Teamwork") || (path === "/www/Character-Strengths/Teamwork/")) {
        showRegisterPopupOnTime(15000)
    }

    if ((path == "/www/Character-Strengths/Zest") || (path === "/www/Character-Strengths/Zest/")) {
        showRegisterPopupOnTime(15000)
    }
	
	    /* Courses popup */

    if ((path == "/www/Courses") || (path === "/www/Courses/")) {
        showCoursesPopupOnTime(15000)
    }

    if ((path == "/www/Professionals") || (path === "/www/Professionals/")) {
        showCoursesPopupOnTime(15000)
    }

    if ((path == "/www/Professionals/Manager-Business-Leaders") || (path === "/www/Professionals/Manager-Business-Leaders/")) {
        showCoursesPopupOnTime(15000)
    }

    if ((path == "/www/Professionals/Character-Development") || (path === "/www/Professionals/Character-Development/")) {
        showCoursesPopupOnTime(15000)
    }

    if ((path == "/www/Professionals/Inspire-Clients") || (path === "/www/Professionals/Inspire-Clients/")) {
        showCoursesPopupOnTime(15000)
    }

    if ((path == "/www/Professionals/Consultant") || (path === "/www/Professionals/Consultant/")) {
        showCoursesPopupOnTime(15000)
	}
    
    $(".popup-close-button").click(function () {
        setCookie("disableRegisterPopupOnce", 1, 365)
        hideRegisterPopup();
    })
	
	$(".popup-courses-close-button").click(function () {
        setCookie("disableCoursesPopupOnce", 1, 365)
        hideCoursesPopup();
    })

    $('#register-popup-submit').click(function () {
        setCookie("disableRegisterPopup", 1, 365)

        var firstName = $('#inputFirstName').val()
        var lastName = $('#inputLastName').val()
        var email = $('#inputEmail').val()
        var password = $('#inputPassword').val()

        window.location = "https://www.viacharacter.org/survey/account/register?firstName=" + firstName + "&lastName=" + lastName + "&email=" + email // + "&password=" + password
    })

    $(".register-popup-trigger").bind('inview', function (event, visible) {
        if (visible === true) {
            showRegisterPopup()
            clearTimeout(registerPopupTimeout);
        }
    })
	
	$("#register-popup").on('hidden.bs.modal', function() {
		console.log('y0')
	})
	
	$('#courses-popup-submit').click(function () {
        setCookie("disableCoursesPopup", 1, 365)

        window.location = "http://www.mentorcoach.com/class/character-strengths-interventions/"
    })

    $(".courses-popup-trigger").bind('inview', function (event, visible) {
        if (visible === true) {
            showCoursesPopup()
            clearTimeout(coursesPopupTimeout);
        }
    })
    
});