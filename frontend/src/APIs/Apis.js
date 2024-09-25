import axios from 'axios';


const baseURL = 'http://localhost:5000/api';

const houseAPI = {
    async addHouse (house) {
        try {
            const response = await axios.post(`${baseURL}/houses/add_house`, house);
            console.log("response1", response);
            return response;
        } catch (error) {
            console.error("error1", error);
            return error;
        }
    },
    async getHouses () {
        try {
            const response = await axios.get(`${baseURL}/houses/get_houses`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async updateHouse (house, id) {
        try {
            const response = await axios.put(`${baseURL}/houses/update_house/${id}`, house);
            return response
        } catch (error) {
            console.error(error);
        }
    },
    async deleteHouse (houseId) {
        try {
            const response = await axios.delete(`${baseURL}/houses/delete_house/${houseId}`);
            return response
        } catch (error) {
            console.error(error);
        }
    },
    async getHouseById (houseId) {
        try {
            const response = await axios.get(`${baseURL}/houses/get_house/${houseId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
};

const tenantAPI = {
    async addTenant (tenant) {
        try {
            const response = await axios.post(`${baseURL}/tenants/add_tenant`, tenant);
            console.log("response11", response);
            return response
        } catch (error) {
            console.error(error);
        }
    },
    async getTenants () {
        try {
            const response = await axios.get(`${baseURL}/tenants/get_tenants`);
            console.log("all tenants", response)
            return response
        } catch (error) {
            console.error(error);
        }
    },
    async updateTenant (tenant) {
        try {
            const response = await axios.put(`${baseURL}/tenants/update_tenant/${tenant._id}`, tenant);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async deleteTenant (tenantId) {
        try {
            const response = await axios.delete(`${baseURL}/tenants/delete_tenant/${tenantId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async getTenantById (tenantId) {
        try {
            const response = await axios.get(`${baseURL}/tenants/get_tenant/${tenantId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
};

const paymentAPI = {
    async addPayment (payment) {
        try {
            const response = await axios.post(`${baseURL}/payments/add_payment`, payment);
            console.log("payment response", response);
            return response;
        } catch (error) {
            console.error(error);
        }
    },
    async getPayments () {
        try {
            const response = await axios.get(`${baseURL}/payments/get_payments`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async updatePayment (payment) {
        try {
            const response = await axios.put(`${baseURL}/payments/update_payment/${payment._id}`, payment);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async deletePayment (paymentId) {
        try {
            const response = await axios.delete(`${baseURL}/payments/${paymentId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async getPaymentById (paymentId) {
        try {
            const response = await axios.get(`${baseURL}/payments/get_payment/${paymentId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
};

export { houseAPI, tenantAPI, paymentAPI };