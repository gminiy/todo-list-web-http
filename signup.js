const signupButton = document.querySelector('#signup-button');
const idBox = document.querySelector('#id-box');
const passwordBox = document.querySelector('#password-box');

idBox.focus();

signupButton.addEventListener('click', signup);

passwordBox.addEventListener('keypress', (e) => {
    const key = e.which || e.keyCode;
    if (key === 13) {
        signup();
    }
});

function signup() {
    const xhr = new XMLHttpRequest();
    const id = idBox.value;
    const password = passwordBox.value;

    if (!(password && id)) {
        alert("아이디와 패스워드를 입력해주세요.");
        return;
    }

    const info = {
        "id": id,
        "password": password
    };
    xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                if (xhr.responseText === "success") {
                    alert("회원가입이 완료되었습니다. 로그인해주세요");
                    window.location.href = '/';
                } else if (xhr.responseText === "fail") {
                    alert("이미 존재하는 아이디입니다.");
                    window.location.href = '/signup.html';
                }
            }
        }
    }
    xhr.open('POST', '/members');
    xhr.send(JSON.stringify(info));
}