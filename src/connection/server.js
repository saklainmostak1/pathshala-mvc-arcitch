const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const db = require('../connection/config/database');
console.log(db, 'db')
// http://192.168.0.107:5002/allUsers?email=abutaher01725@gmail.com
const usersModel = require('../app/model/Admin/usersListModel')
app.get('/user/allUser', usersModel.usersListAll)
app.get('/user/allUser/:id', usersModel.usersListSingle)
app.get('/users', usersModel.usersBtnIcons)
app.delete('/allUser/:id', usersModel.usersListDelete)
app.put('/updateUsers/:id', usersModel.UpdateSingleUser)
app.get('/allUsers', usersModel.getSingleUsersListEmail)
app.post('/login', usersModel.loginUserEmailPassword);
app.post('/create-users', usersModel.CreateUserList);
// role
app.get('/user/role', usersModel.usersRole);
app.get('/user-role/btn', usersModel.usersRoleBtn);
app.get('/page-group/display-name', usersModel.getPageGroupAndDisplayName);
app.post('/user/user-role-create', usersModel.userRoleCreate);





const adminPageList = require('../app/model/Admin/adminPageListModel')
app.get('/admin/allAdmin', adminPageList.getAllAdminPageList)
app.get('/admin/controller-name', adminPageList.getPageGroupControllerName)
app.get('/admin/group-name', adminPageList.getPageGroupIconName)
app.get('/admin/controllerName/:id', adminPageList.getAllAdminPageListGroupWisessss)





app.get('/admin/group-namesss', adminPageList.getPageGroupAndControllerNamesss)
app.get('/admin/group-names-id', adminPageList.getPageGroupAndControllerNamesssId)
app.get('/page-group/display-name/with-id', adminPageList.getPageGroupAndDisplayNameWithId)



// SELECT controller_name, concat(display_name) from admin_page_list where parent_id != 0 and menu_type = 1;


app.get('/admin/allAdmin/:id', adminPageList.getSingleAdminPageList)
app.delete('/admin/allAdmin/:id', adminPageList.deleteSingleAdminPageList)
app.post('/admin/allAdmin/', adminPageList.createAllAdminPageList)

const faIcons = require('../app/model/Admin/faIconsModel')
app.get('/faIcons', faIcons.getAllIconList)


  app.get('/', (req, res) => {
    res.send('Server running saklain mostak')
  })


const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
})





