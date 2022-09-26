import React, { Component } from 'react'
import { Container, Table ,Button} from 'react-bootstrap'
import services from '../Services/services'
import SweetAlert from '../Utils/SweetAlert'


export default class ViewStudentPage extends Component {
constructor(){
  super()
  this.state={
    students:[]
  }
  this.hapus = this.hapus.bind(this);
  this.edit = this.edit.bind(this);
}

componentDidMount(){
  services.Getstudent().then((res)=>{
    const students=res.data.data
    this.setState({students})
    // console.log(students)
  }).catch((e)=>{
    console.log(e)
  })

}
hapus(data){
  // console.log(data)
  var id=data._id
  services.Deletestudent(id).then((res)=>{
    if(res.data.status){
      SweetAlert.Succes(res.data.message)
      window.location.reload(false)
    }else{
      SweetAlert.Error(res.data.message)
    }
  }).catch((e)=>{
    console.log(e)
  })


}

edit(student){
  // console.log(student)
  localStorage.setItem("student",JSON.stringify(student))
}

renderTable(){
  return this.state.students.map((student,index)=>{
    const {_id,nama,email,npm,jeniskelamin,jurusan,telp}=student;
    return(
      <tr key={_id}>
        <td>{nama}</td>
        <td>{email}</td>
        <td>{npm}</td>
        <td>{telp}</td>
        <td>{jeniskelamin}</td>
        <td>{jurusan}</td>
        <td> <Button variant="success" href='/edit' onClick={(e)=>this.edit(student)}>Edit Data</Button></td>
        <td> <Button variant="danger"  onClick={(e)=>this.hapus(student)}>Hapus Data</Button></td>
      </tr>
    )
  })
}

  render() {
    return (
      <div>
        <Container>
        <h3>Data Mahasiswa</h3>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Npm</th>
              <th>Telp</th>
              <th>Jenis Kelamin</th>
              <th>Jurusan</th>
              <th>Edit</th>
              <th>Hapus</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTable()}
          </tbody>
        </Table>
        </Container>
      </div>
    )
  }
}
