import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
            'Authorization': 'Basic ' + btoa('devglan-client:devglan-secret'),
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          
    })
   
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('GET', 'POST', 'OPTIONS');

    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllPolls(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function createPoll(pollData) {
    return request({
        url: API_BASE_URL + "/polls",
        method: 'POST',
        body: JSON.stringify(pollData)         
    });
}

export function castVote(voteData) {
    return request({
        url: API_BASE_URL + "/polls/" + voteData.pollId + "/votes",
        method: 'POST',
        body: JSON.stringify(voteData)
    });
}




export function login(loginRequest) {
    var url= API_BASE_URL +"/oauth/token";
    /* let obj= {};
    obj.username=loginRequest.username;
    obj.password=loginRequest.password;
    obj.grant_type='password';
    console.log("11")
    console.log(obj)
    return request({
        url: API_BASE_URL +"/oauth/token",
        method: 'POST',
        body: JSON.stringify(obj),
        headers: new Headers({
            'Authorization': 'Basic ' + btoa('devglan-client:devglan-secret'),
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',          
    })
    }); */
    const headers = new Headers({
        'Authorization': 'Basic ' + btoa('devglan-client:devglan-secret'),
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',          
})
/*var formData = new FormData();

for (var k in params) {
    formData.append(k, params[k]);
}*/

var username = loginRequest.username;
var password = loginRequest.password;
var params = {
    'username': username,
    'password': password,
    'grant_type': 'password'
};

var formBody = [];
for (var property in params) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(params[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
    
    
    var request = {
        method: 'POST',
        headers: headers,
        body: formBody
    };
    
    return fetch(url, request);



}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function getUserCreatedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getUserVotedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/votes?page=" + page + "&size=" + size,
        method: 'GET'
    });
}