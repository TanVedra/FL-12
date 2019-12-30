let userEmail = prompt('Enter your email:');
let userPass;
const five = 5;
const six = 6;
const userData = {
    'user@gmail.com': 'UserPass',
    'admin@gmail.com': 'AdminPass'
};

if (!userEmail) {
    alert('Canceled');
} else if (userEmail.length < five) {
    alert('I don\'t know any emails having name length less than 5 symbols');
} else if (userData[userEmail]) {
    userPass = prompt('Enter your password:');

    if (!userPass) {
        alert('Canceled');
    } else if (userData[userEmail] === userPass) {

        if (confirm('Do you want to change your password?')) {
            userPass = prompt('Enter your password:');

            if (!userPass) {
                alert('Canceled');
            } else if (userData[userEmail] === userPass) {
                userPass = prompt('Enter your new password');

                if (!userPass) {
                    alert('Canceled');
                } else if (userPass.length < six) {
                    alert('It’s too short password. Sorry');
                } else if (userPass === prompt('Repeat your new password:')) {
                    alert('You have successfully changed your password');
                } else {
                    alert('You wrote the wrong password');
                }
            } else {
                alert('Wrong password');
            }

        } else {
            alert('You have failed the change');
        }
    } else {
        alert('Wrong password');
    }
} else {
    alert('I don’t know you');
}