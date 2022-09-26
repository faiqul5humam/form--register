import Http from "../Const/server"

class Services {
    Register(data) {
        return Http.post("users/signup",data)
    }

    Login(data) {
        return Http.post("users/signin",data)
    }

    Addstudent(data) {
        return Http.post("students/add",data)
    }
    Getstudent() {
        return Http.get("students/get")
    }

    Updatestudent(id, data) {
        return Http.put("students/update/" + id, data)
    }

    Deletestudent(id) {
        return Http.delete("students/delete/" + id)
    }

}
export default new Services()