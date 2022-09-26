import React, { Component } from 'react'
import {
  FormControl,
  FormLabel,
  Button,
  Col,
  Row,
  Form,
  Nav,
} from "react-bootstrap";
import "../Css/Login.css";
import Logo from "../Assets/img/key.png";
import SweetAlert from '../Utils/SweetAlert';
import services from '../Services/services';
import { Navigate } from 'react-router-dom';

export default class EditStudentPage extends Component {
  constructor() {
    super()
    this.state = {
      nama: "",
      email: "",
      npm: "",
      telp: "",
      jeniskelamin: "",
      jurusan: '',
      redirecTo: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.validasi = this.validasi.bind(this)
    this.editstudent = this.editstudent.bind(this)

  }
  componentDidMount(){
      var student=localStorage.getItem('student')
      var data=JSON.parse(student)
    //   console.log(data.nama)
    this.setState({nama:data.nama})
    this.setState({email:data.email})
    this.setState({npm:data.npm})
    this.setState({telp:data.telp})
    this.setState({jeniskelamin:data.jeniskelamin})
    this.setState({jurusan:data.jurusan})
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  validasi() { 
    var nama = this.state.nama;
    var email = this.state.email;
    var npm = this.state.npm;
    var telp = this.state.telp;
    var jeniskelamin = this.state.jeniskelamin;
    var jurusan = this.state.jurusan;
    var data={
      nama:nama,email:email,npm:npm,telp:telp,jeniskelamin:jeniskelamin,jurusan:jurusan
    }
    if(nama===""){
      SweetAlert.Error("Kolom Nama Tidak boleh Kosong")
    } else if(email===""){
      SweetAlert.Error("Kolom Email Tidak boleh Kosong")
    } else if(npm===""){
      SweetAlert.Error("Kolom NPM Tidak boleh Kosong")
    }else if(telp===""){
      SweetAlert.Error("Kolom Telpon Tidak boleh Kosong")
    }else if (jeniskelamin===""){
      SweetAlert.Error("Kolom Jenis Kelamin Tidak Boleh Kosong Tidak boleh Kosong")
    }else if(jurusan===""){
      SweetAlert.Error("Kolom Jurusan Tidak boleh Kosong")
    }else{
      this.editstudent(data)
    }

  }
  editstudent(datauser) {
    //   console.log(data)
    var student=localStorage.getItem('student')
    var data=JSON.parse(student)
    var id=data._id

    services.Updatestudent(id,datauser).then((res)=>{
      if(res.data.status){
        SweetAlert.Succes(res.data.message)
        this.setState({redirecTo:true})
      }else{
        SweetAlert.Error(res.data.message)
      }
    }).catch((e)=>{
      console.log(e)
    })
  }

  render() {
    var nama = this.state.nama;
    var email = this.state.email;
    var npm = this.state.npm;
    var telp = this.state.telp;
    var jeniskelamin = this.state.jeniskelamin;
    var jurusan = this.state.jurusan;
    if(this.state.redirecTo){
      return<Navigate to={"/view"}/>
    }
    return (
      <div className="Login">
        <Row>
          <Col className="left-side">
            <h2>Edit Data Mahasiswa</h2>
            <FormLabel>Nama</FormLabel>
            <FormControl
              type="text"
              className="input"
              placeholder="Masukan Nama Lengkap Mahasiswa"
              name="nama"
              value={nama}
              onChange={this.handleInputChange}
            />
            <FormLabel>Email</FormLabel>
            <FormControl
              type="text"
              className="input"
              placeholder="Masukan Email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
            />
            <FormLabel>Npm</FormLabel>
            <FormControl
              type="text"
              className="input"
              placeholder="Masukan NPM"
              name="npm"
              value={npm}
              onChange={this.handleInputChange}
            />
            <FormLabel>Nomor Telpon</FormLabel>
            <FormControl
              type="number"
              className="input"
              placeholder="Nomor Telpon"
              name="telp"
              value={telp}
              onChange={this.handleInputChange}
            />
            <FormLabel>Jenis Kelamin</FormLabel>
            <Form.Select
              aria-label="Jenis Kelamin"
              className="input"
              name="jeniskelamin"
              value={jeniskelamin}
              onChange={this.handleInputChange}
            >
              <option value="">Jenis Kelamin</option>
              <option value="laki-laki">Laki-Laki</option>
              <option value="laki-laki">Perempuan</option>
            </Form.Select>

            <FormLabel>Pilih Jurusan</FormLabel>
            <Form.Select
              aria-label="Pilih Jurusan"
              className="input"
              name="jurusan"
              value={jurusan}
              onChange={this.handleInputChange}
            >
              <option value="">Pilih Jurusan</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Informatika">Informatika</option>
            </Form.Select>

            <Button variant="outline-info" className="button" onClick={(e) => this.validasi()}>
              Edit Data
            </Button>
          </Col>
          <Col className="right-side">
            <div>
              <center>
                <img className="login-img" src={Logo} />
              </center>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
