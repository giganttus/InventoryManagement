import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getFromCookies = (key) => {
	return cookies.get(key);
};

export const setCookies = (key, value) => {
	cookies.set(key, value);
};

export const removeFromCookies = (key) => {
	cookies.remove(key);
};

export const authHeader = () => {
	// return authorization header with jwt token
	const token = getFromCookies("token");

	if (token) {
		return {
			Authorization: `JWT ${token}`,
			Token: token,
		};
	}
	return {};
};
