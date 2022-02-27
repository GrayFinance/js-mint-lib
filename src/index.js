var axios = require("axios");

class Mintlib {

	constructor(api) {
		this.api = api;
		this.token = null;
		this.master_api_key = null;
	}

	call = (method, path, data = null, wallet_key = null) => {
		var username = ""
		var password = ""

		if ((wallet_key === null) && (this.token != null)) {
			username = this.token
			password = this.token
		}
		if ((wallet_key != null) && (this.master_api_key != null)) {
			username = this.master_api_key
			password = wallet_key
		}

		var request = axios.create({
			baseURL: this.api,
			auth: {
				username: username,
				password: password
			},
			headers: {
				'Content-Type': 'application/json'
			},
		})

		if (method === "POST") {
			return request.post(path, data)
				.then((res) => {
					return res.data
				})
				.catch((err) => {
					return err.response.data;
				})
		}
		if (method === "GET") {
			return request.get(path, { data: data })
				.then((res) => {
					return res.data
				})
				.catch((err) => {
					return err.response.data;
				})
		}
		if (method === "PUT") {
			return request.put(path, data)
				.then((res) => {
					return res.data
				})
				.catch((err) => {
					return err.response.data
				})
		}
		if (method === "DELETE") {
			return request.delete(path, data)
				.then((res) => {
					return res.data
				})
				.catch((err) => {
					return err.response.data
				})
		}
	}

	import_master_key = (master_api_key) => {
		this.master_api_key = master_api_key
	}

	create_user = async (username, password) => {
		return await this.call("POST", "/user/create", { username: username, password: password })
	}

	auth_user = async (username, password) => {
		const auth = await this.call("POST", "/user/auth", { username: username, password: password })
		this.token = auth.token
		return auth
	}

	get_user = async () => {
		return await this.call("GET", "/user")
	}

	change_password = async (new_password) => {
		return await this.call("PUT", "/user/change/password", { password: new_password })
	}

	create_wallet = async (label) => {
		return await this.call("POST", "/wallet/create", { label: label })
	}

	get_wallets = async () => {
		return await this.call("GET", "/wallets")
	}

	get_wallet = async (wallet_id, wallet_admin_key) => {
		return await this.call("GET", "/wallet/" + wallet_id, null, wallet_admin_key)
	}

	get_address = async (wallet_id, wallet_read_key, network = "bitcoin") => {
		return await this.call("GET", "/wallet/" + wallet_id + "/receive?network=" + network, null, wallet_read_key)
	}

	get_new_invoice = async (wallet_id, wallet_read_key, value, description = "") => {
		return await this.call("GET", "/wallet/" + wallet_id + "/receive?network=lightning", { value: value, description: description }, wallet_read_key)
	}

	rename_wallet = async (wallet_id, label) => {
		return await this.call("PUT", "/wallet/" + wallet_id + "/rename", { label: label })
	}

	delete_wallet = async (wallet_id) => {
		return await this.call("DELETE", "/wallet/" + wallet_id + "/delete")
	}

	transfer = async (wallet_id, wallet_admin_key, destination, value, description) => {
		return await this.call("POST", "/wallet/" + wallet_id + "/transfer", { destination: destination, value: value, description: description }, wallet_admin_key)
	}

	withdraw = async (wallet_id, wallet_admin_key, address, value, feerate, description, network = "bitcoin") => {
		return await this.call("POST", "/wallet/" + wallet_id + "/withdraw/" + network, { address: address, value: value, feerate: feerate, description: description }, wallet_admin_key)
	}

	pay_invoice = async (wallet_id, wallet_admin_key, invoice) => {
		return await this.call("POST", "/wallet/" + wallet_id + "/payinvoice", { invoice: invoice }, wallet_admin_key)
	}

	get_payment = async (wallet_id, wallet_read_key, hash_id) => {
		return await this.call("GET", "/wallet/" + wallet_id + "/payment/" + hash_id, null, wallet_read_key)
	}

	get_payments = async (wallet_id, wallet_read_key, offset = 1) => {
		return await this.call("GET", "/wallet/" + wallet_id + "/payments?offset=" + offset, null, wallet_read_key)
	}
}

module.exports = { Mintlib }
