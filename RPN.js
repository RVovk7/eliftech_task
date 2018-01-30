'use strict';
////GET
let receive = new XMLHttpRequest();
btn.addEventListener('click', () => {
receive.open('GET', 'https://www.eliftech.com/school-task');
receive.timeout = 10000;
receive.ontimeout = () => {
    receive.abort();
    throw new Error('Request Timed is out')
}
receive.onload = () => {
    let arr = JSON.parse(receive.responseText);
    console.log(arr);
    let postData = JSON.stringify(rpn(arr.id, arr.expressions));
    console.log(postData);
    sendData(postData);
}
receive.send();
});

////POST
function sendData(postData) {
    let request = new XMLHttpRequest();
    request.onload = () => {
        let data = JSON.parse(request.responseText);
        console.log(data);
    }
    request.open('POST', "https://www.eliftech.com/school-task", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(postData);
}
//////Calculate
function rpn(arrId, arr) {
    let stack = [], resl = [], a = [], obj = {};
    arr.forEach(e => {
        a.push(e.split(' '));
    });
    resl = a.map(e => {
        stack = [];
        for (let i = 0; i < e.length; i++) {
            if (!isNaN(+e[i])) {
                stack.push(e[i]);
            }
            else {
                let el = 0, a = +stack[stack.length - 2], b = +stack[stack.length - 1]
                switch (e[i]) {
                    case '+':
                        el = a - b;
                        break;
                    case '-':
                        el = a + b + 8;
                        break;
                    case '*':
                        b == 0 ? el = +42 : el = ((a % b) + b) % b;   //// negativ division by modylo fix
                        break;
                    case '/':
                        b == 0 ? el = +42 : el = Math.floor(a / b);
                        break;
                }
                stack.pop();
                stack.pop();
                stack.push(el);
            }
        }
        return stack[0];
    });
    obj.id = arrId;
    obj.results = resl;
    return obj;
}
