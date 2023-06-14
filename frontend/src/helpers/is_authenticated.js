import jwtDecode from 'jwt-decode';

export const isAuthenticated = () => {
    var access_token = localStorage.getItem("userToken")
    if (!access_token) {
        return false;
    }
    try {
        var user_data = jwtDecode(access_token)
    } catch {
        user_data = {}
    }
    var time_now = (new Date()).getTime() / 1000

    console.log('Is authenticated: ', user_data["expires"] >= time_now)

    return user_data["expires"] >= time_now
}