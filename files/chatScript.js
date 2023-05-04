let chatbody ='<div class="chat-screen">\n'+
'    <div class="chat-header">\n'+
'        <div class="chat-header-title">\n'+
'            Let’s chat? - We’re online\n'+
'        </div>\n'+
'        <div class="chat-header-option hide">\n'+
'            <span class="dropdown custom-dropdown">\n'+
'                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n'+
'                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>\n'+
'                </a>\n'+
'                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink1" style="will-change: transform;">\n'+
'                    <a class="dropdown-item" href="javascript:void(0);">\n'+
'                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bc32ef" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>\n'+
'                        Send Transcriptions\n'+
'                    </a>\n'+
'                    <a id="end-chat-connecty" class="dropdown-item end-chat" href="javascript:void(0);">\n'+
'                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bc32ef" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-power"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>\n'+
'                        End Chat\n'+
'                    </a>\n'+
'                </div>\n'+
'            </span>\n'+
'        </div>\n'+
'    </div>\n'+
'    <div class="chat-mail">\n'+
'        <div class="row">\n'+
'            <div class="col-md-12 text-center mb-2">\n'+
'                <p>Hi 👋! Please fill out the form below to start chatting with the next available agent.</p>\n'+
'            </div>\n'+
'        </div>\n'+
'        <div class="row">\n'+
'            <div class="col-md-12">\n'+
'                <div class="form-group">\n'+
'                    <input type="text" id="connecty-name" class="form-control" placeholder="Name">\n'+
'                </div>\n'+
'            </div>\n'+
'            <div class="col-md-12">\n'+
'                <div class="form-group">\n'+
'                    <input type="email" id="connecty-email" class="form-control" placeholder="Email">\n'+
'                </div>\n'+
'            </div>\n'+
'            <div class="col-md-12 hide" >\n'+
'                    <select class="form-control  select2_el">\n'+
'                        <option selected="selected">Select Option</option>\n'+
'                        <option>Report Abuse</option>\n'+
'                        <option>Other</option>\n'+
'                    </select>\n'+
'            </div>\n'+
'            <div class="col-md-12">\n'+
'                <button id="chat-mail-button-connecty" class="btn btn-primary btn-rounded btn-block">Start Chat</button>\n'+
'            </div>\n'+
'           <div class="col-md-12">\n'+
'               <div class="powered-by">Powered by css3transition</div>\n'+
'           </div>\n'+
'        </div>\n'+
'    </div>\n'+
'    <div class="chat-body hide">\n'+
'        <div class="chat-start">Monday, 1:27 PM</div>\n'+
'        <div class="chat-bubble you">Welcome to our site, if you need help simply reply to this message, we are online and ready to help.</div>\n'+
'        <div class="chat-bubble me">Hi, I am back</div>\n'+
'        <div class="chat-bubble me">I just want my Report Status.</div>\n'+
'        <div class="chat-bubble me">As i am not getting any weekly reports nowadays.</div>\n'+
'        <div class="chat-bubble you">\n'+
'            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto;display: block;shape-rendering: auto;width: 43px;height: 20px;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">\n'+
'                <circle cx="0" cy="44.1678" r="15" fill="#ffffff">\n'+
'                    <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.6s"></animate>\n'+
'                </circle> <circle cx="45" cy="43.0965" r="15" fill="#ffffff">\n'+
'                <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.39999999999999997s"></animate>\n'+
'            </circle> <circle cx="90" cy="52.0442" r="15" fill="#ffffff">\n'+
'                <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.19999999999999998s"></animate>\n'+
'            </circle></svg>\n'+
'        </div>\n'+
'    </div>\n'+
'    <div class="chat-input hide">\n'+
'        <input type="text" placeholder="Type a message..." id="connecty-chat-Message">\n'+
'        <div class="input-action-icon">\n'+
'            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-paperclip"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></a>\n'+
'            <a id="connecty-send-Message"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></a>\n'+
'        </div>\n'+
'    </div>\n'+
'    <div class="chat-session-end hide">\n'+
'        <h5>This chat session has ended</h5>\n'+
'        <p>Thank you for chatting with us, If you can take a minute and rate this chat:</p>\n'+
'        <div class="rate-me">\n'+
'            <div class="rate-bubble great">\n'+
'                <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg></span>\n'+
'                Great\n'+
'            </div>\n'+
'            <div class="rate-bubble bad">\n'+
'                <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-down"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg></span>\n'+
'                Bad\n'+
'            </div>\n'+
'        </div>\n'+
'            <div class="col-md-12">\n'+
'                <button id="restart-chat-mail-button-connecty" class="btn btn-primary btn-rounded btn-block">Re-Start Chat</button>\n'+
'            </div>\n'+
'        <a class="transcript-chat">Need a Transcript?</a>\n'+
'        <div class="powered-by">Powered by css3transition</div>\n'+
'    </div>\n'+
'</div>\n'+
'<div class="chat-bot-icon">\n'+
'    <img src="img/we-are-here.svg"/>\n'+
'    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square animate"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>\n'+
'    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x "><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>\n'+
'</div>\n'+
'<!-- Chat Bot UI Ends -->\n'+
'<!-- Time line Html Start -->\n'+
'<h1 class="hide">Responsive Timeline using Flexbox</h1>\n'+
'<div class="timeline hide">\n'+
'    <div class="timeline-item">\n'+
'        <div class="timeline-date">\n'+
'            \n'+
'            <div>\n'+
'                January 2019\n'+
'            </div>\n'+
'        </div>\n'+
'        <div class="timeline-content">\n'+
'            <h2>Journey Start <span>(Delhi)</span></h2>\n'+
'            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad saepe nulla quibusdam ut. Beatae, facere sequi blanditiis porro suscipit tempore ipsam iste ipsa, culpa quam vero, dolorem cupiditate. Magni, numquam?<button type="button" class="visit">Visit ›</button></p>\n'+
'            <br>\n'+
'            <i class="fas fa-rocket fa-icon"></i>\n'+
'        </div>\n'+
'    </div>\n'+
'\n'+
'    <div class="timeline-item">\n'+
'        <div class="timeline-date">\n'+
'            \n'+
'            <div>\n'+
'                February 2019\n'+
'            </div>\n'+
'        </div>\n'+
'        <div class="timeline-content">\n'+
'            <h2>Nawabo ka Sehar<span>(Lucknow)</span></h2>\n'+
'            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad saepe nulla quibusdam ut. Beatae, facere sequi blanditiis porro suscipit tempore ipsam iste ipsa, culpa quam vero, dolorem cupiditate. Magni, numquam?<button type="button" class="visit">Visit ›</button></p>\n'+
'\n'+
'            <br>\n'+
'            <i class="fas fa-graduation-cap fa-icon"></i>\n'+
'        </div>\n'+
'    </div>\n'+
'\n'+
'    <div class="timeline-item">\n'+
'        <div class="timeline-date">\n'+
'            \n'+
'            <div>\n'+
'                March 2019\n'+
'            </div>\n'+
'        </div>\n'+
'        <div class="timeline-content">\n'+
'            <h2>Devotional Place<span>(Prayagraj)</span></h2>\n'+
'            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad saepe nulla quibusdam ut. Beatae, facere sequi blanditiis porro suscipit tempore ipsam iste ipsa, culpa quam vero, dolorem cupiditate. Magni, numquam?<button type="button" class="visit">Visit ›</button></p>\n'+
'\n'+
'            <br>\n'+
'            <i class="fas fa-power-off fa-icon"></i>\n'+
'        </div>\n'+
'    </div>\n'+
'</div>';
window.addEventListener('load', function () {
let script = document.createElement('script')
script.setAttribute('src', "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js")
document.getElementsByTagName("head")[0].appendChild(script)
let rocket = document.createElement('script')
rocket.setAttribute('src', "https://ajax.cloudflare.com/cdn-cgi/scripts/7089c43e/cloudflare-static/rocket-loader.min.js")
document.getElementsByTagName("head")[0].appendChild(rocket)
let socket = document.createElement('script')
socket.setAttribute('src', "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.6.1/socket.io.js")
document.getElementsByTagName("head")[0].appendChild(socket)
console.log(document.getElementById("connectyChatScript").getAttribute("chat"));
socket.onload = () => {
    alert('socket loaded')
    var socket = io('http://localhost:4000');
    let chatID=document.getElementById("connectyChatScript").getAttribute("chat")
    socket.emit('create', chatID);
    
    this.document.getElementById("connecty-send-Message").onclick = function(){
        let message = document.getElementById("connecty-chat-Message").value;
        let name = localStorage.getItem("connecty-name");
        let email = localStorage.getItem("connecty-email");
        console.log(message);
        if (message) {
            socket.emit('clientEmit', { chatID : chatID , message : message  , email : email,name : name } );
        }else {
            alert("no message");
        }
        
    }
}
let popper = document.createElement('script')
popper.setAttribute('src', "js/popper.min.js")
document.getElementsByTagName("head")[0].appendChild(popper)

//includeJs("js/select2.min.js");
document.getElementsByTagName("head")[0].insertAdjacentHTML(
    "beforeend",
    "<link rel=\"stylesheet\" href=\"chatstyle.css\" />");
const div1 = document.createElement('div');


div1.innerHTML = chatbody;
document.body.appendChild(div1);

//click on chatbot
this.document.getElementsByClassName("chat-bot-icon")[0].onclick = function(){
    document.getElementsByClassName('chat-bot-icon')[0].getElementsByTagName('img')[0].classList.toggle('hide');
    document.getElementsByClassName('chat-bot-icon')[0].getElementsByTagName('svg')[0].classList.toggle('animate');
    document.getElementsByClassName('chat-bot-icon')[0].getElementsByTagName('svg')[1].classList.toggle('animate');
    document.getElementsByClassName('chat-screen')[0].classList.toggle('show-chat');
}
//click start conversation

this.document.getElementById("chat-mail-button-connecty").onclick = function(){
    let name = document.getElementById("connecty-name").value;
    let email = document.getElementById("connecty-email").value;
    if (name && email) {
    localStorage.setItem("connecty-name", name);
    localStorage.setItem("connecty-email", email);
    document.getElementsByClassName('chat-mail')[0].classList.add('hide');
    document.getElementsByClassName('chat-body')[0].classList.remove('hide');
    document.getElementsByClassName('chat-input')[0].classList.remove('hide');
    document.getElementsByClassName('chat-header-option')[0].classList.remove('hide');
    } else {
        alert("please fill in name and email");
    }
}
//click end chat
this.document.getElementById("end-chat-connecty").onclick = function(){
    document.getElementsByClassName('chat-body')[0].classList.add('hide');
    document.getElementsByClassName('chat-input')[0].classList.add('hide');
    document.getElementsByClassName('chat-session-end')[0].classList.remove('hide');
    document.getElementsByClassName('chat-header-option')[0].classList.add('hide');
}
//click re-start conversation
this.document.getElementById("restart-chat-mail-button-connecty").onclick = function(){
    document.getElementsByClassName('chat-mail')[0].classList.add('hide');
    document.getElementsByClassName('chat-body')[0].classList.remove('hide');
    document.getElementsByClassName('chat-input')[0].classList.remove('hide');
    document.getElementsByClassName('chat-header-option')[0].classList.remove('hide');

    document.getElementsByClassName('chat-session-end')[0].classList.add('hide');
    document.getElementsByClassName('chat-header-option')[0].classList.remove('hide');
}



})