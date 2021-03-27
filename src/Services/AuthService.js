export default {
    login: user => {
        console.log(user);
        return fetch('/login', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                "accept": "application/json; odata=verbose",
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then(res => {
            if (res.status !== 401)
                return res.json().then(data => data);
            else
                return { isAuthenticated: false, user: { username: "", role: "" } };
        })
    },
    register: user => {
        console.log(user);
        return fetch('/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                "accept": "application/json; odata=verbose",
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then(res => res.json())
            .then(data => data);
    },
    logout: () => {
        return fetch('/logout', {
            headers: {
                "accept": "application/json; odata=verbose",
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        })
            .then(res => res.json())
            .then(data => data);
    },
    isAuthenticated: () => {
        return fetch('/authenticated',{
            headers: {
                "accept": "application/json; odata=verbose",
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        })
            .then(res => {
                if (res.status !== 401)
                    return res.json().then(data => data);
                else
                    return { isAuthenticated: false, user: { username: "", role: "" } };
            });
    },
    forgetPassword: user => {
        return fetch('/forgetpassword', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                "accept": "application/json; odata=verbose",
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then(res => {
            if (res.status !== 401)
                return res.json().then(data => data);
            else
                return { isAuthenticated: false, user: { username: "", role: "" } };
        });
    },
    changePassword: user => {
        // console.log(user);
        return fetch('/changepassword', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                "accept": "application/json; odata=verbose",
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then(res => {
            if (res.status !== 401)
                return res.json().then(data => data);
            else
                return { isPasswordChanged: false, message: "Password not Updated!!" };
        })
    },

}