import axios from "axios";

const USER_API_BASE_URL = "http://localhost:3001/api/patient";


class ApiService {
    fetchUsers(urlParam) {
        return axios.get(USER_API_BASE_URL + urlParam);
    }

    fetchPatientById(userId) {
        return axios.get(USER_API_BASE_URL + "/" + userId);
    }

    deletePatient(patientId) {
        return axios.delete(USER_API_BASE_URL + "/" + patientId);
    }

    addPatient(patient) {
        return axios.post("" + USER_API_BASE_URL, patient);
    }

    editPatient(patient) {
        return axios.put(USER_API_BASE_URL + "/" + patient.id, patient);
    }
}

export default new ApiService();
