
const connection = require('../../../connection/config/database')
// const path = require("path");
const sha1 = require('sha1');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
// function sha1(password) {
//     return crypto.createHash('sha1').update(password).digest('hex');
//   }

const usersListModel = {

  usersListAll: async (req, res) => {
    try {

      const data = "select * from users";

      connection.query(data, function (error, result) {
        console.log(result, 'Saklain Mostak nayan')
        if (!error) {
          //   return  res.send(result,'nayan')

          res.status(200).send(result)
          // res.sendFile(path.join(__dirname + "../../App.js"));
        }

        else {
          console.log(error, 'nayan')
        }

      })
    }
    catch (error) {
      console.log(error)
    }
  },

  // CreateUserList: async (req, res) => {
  //     try {
  //         const { full_name, email, password, mobile, role_name } = req.body;

  //         if (!full_name || !password || !email || !mobile || !role_name) {
  //           return res.status(400).json({ error: 'All fields are required' });
  //         }

  //         // Encrypt the password using SHA-1 (not recommended for security)
  //         const hashedPassword = sha1(password);

  //         const newUser = {
  //           full_name,
  //           email,
  //           password: hashedPassword,
  //           mobile,
  //           role_name,
  //         };

  //         connection.query('INSERT INTO users SET ?', newUser, (err, results) => {
  //           if (err) {
  //             console.error('Error inserting user:', err);
  //             return res.status(500).json({ error: 'Internal server error' });
  //           }

  //           console.log('User inserted successfully');
  //           res.status(201).json({ message: 'User created successfully' });
  //         });
  //       } catch (error) {
  //         console.log(error);
  //         res.status(500).json({ error: 'Internal server error' });
  //       }
  // },
  CreateUserList: async (req, res) => {
    try {
      const { full_name, email, password, mobile, role_name } = req.body;

      // Hash the password using SHA-1
      const hashedPassword = sha1(password);

      // Insert the user into the database
      const sql = 'INSERT INTO users (full_name, email, password, mobile, role_name) VALUES (?, ?, ?, ?, ?)';
      const values = [full_name, email, hashedPassword, mobile, role_name];

      connection.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'User creation failed' });
        } else {
          res.status(200).json({ message: 'User created successfully' });
        }
      });
    }
    catch (error) {
      console.log(error)
    }
  },
  // CreateUserList: async (req, res) => {
  //     try {
  //         const { full_name, email, password, mobile, role_name, status, created_date, modified_date, pass_session, pass_time, pass_duration, created_by, dob, gender, age, religion, photo2, finger_print_id, unique_id, blood_group_id, signature_image, pass_code, is_online, photo } = req.body;
  //         const query = 'INSERT INTO users (full_name , email, password , mobile, role_name, status , created_date, modified_date, pass_session, pass_time, pass_duration, created_by, dob, gender, age, religion, photo2, finger_print_id, unique_id, blood_group_id, signature_image, pass_code, is_online, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  //         connection.query(query, [full_name, email, password, mobile, role_name, status, created_date, modified_date, pass_session, pass_time, pass_duration, created_by, dob, gender, age, religion, photo2, finger_print_id, unique_id, blood_group_id, signature_image, pass_code, is_online, photo], (error, result) => {
  //             if (!error) {
  //                 console.log(result);
  //                 return res.send(result);
  //             } else {
  //                 console.log(error);
  //                 return res.status(500).json({ message: 'Failed to add product.' });
  //             }
  //         });
  //     }
  //     catch (error) {
  //         console.log(error)
  //     }
  // },

  usersListSingle: async (req, res) => {
    try {
      const query = 'SELECT * FROM users WHERE id = ?';
      connection.query(query, [req.params.id], (error, result) => {
        if (!error && result.length > 0) {
          console.log(result);
          return res.send(result);
        } else {
          console.log(error || 'Product not found');
          return res.status(404).json({ message: 'Product not found.' });
        }
      });
    }
    catch (error) {
      console.log(error)
    }
  },

  usersListDelete: async (req, res) => {
    try {
      const query = 'DELETE FROM users WHERE id = ?';
      connection.query(query, [req.params.id], (error, result) => {
        if (!error && result.affectedRows > 0) {
          console.log(result);
          return res.send(result);
        } else {
          console.log(error || 'Product not found');
          return res.status(404).json({ message: 'Product not found.' });
        }
      });
    }
    catch (error) {
      console.log(error)
    }
  },
  // email/email?=admin@gmail.com

  getSingleUsersListEmail: async (req, res) => {
    try {
      // const {email} = req.query
      const query = 'SELECT * FROM users WHERE email = ?';
      connection.query(query, [req.query.email], (error, result) => {
        if (!error && result.length > 0) {
          console.log(result);
          return res.send(result);
        } else {
          console.log(error || 'Product not found');
          return res.status(404).json({ message: 'Product not found.' });
        }
      });
    }
    catch (error) {
      console.log(error)
    }
  },

  // loginUserEmailPassword: async (req, res) => {

  //     const { email, password } = req.body;

  //     const sql = 'SELECT * FROM users WHERE email = ?';
  //     connection.query(sql, [email], async (err, result) => {
  //         if (err) {
  //             console.error(err);
  //             res.status(500).json({ message: 'Login failed' });
  //         } else if (result.length === 0) {
  //             res.status(401).json({ message: 'User not found' });
  //         } else {
  //             const user = result[0];
  //             const match = await bcrypt.compare(password, user.password);

  //             if (match) {

  //                 res.status(200).json({ message: 'Login successful' });
  //                 // res.redirect('http://192.168.0.107:3000')
  //             } else {
  //                 res.status(401).json({ message: 'Invalid password' });
  //             }
  //         }
  //     });


  // },


  // Import the sha1 library

  // ...

  loginUserEmailPassword: async (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.query(sql, [email], async (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Login failed' });
      } else if (result.length === 0) {
        res.status(401).json({ message: 'User not found' });
      } else {
        const user = result[0];
        const hashedPassword = sha1(password); // Hash the password using SHA-1

        if (hashedPassword === user.password) { // Compare with the stored hash
          res.status(200).json({ message: 'Login successful' });
          // res.redirect('http://192.168.0.107:3000')
        } else {
          res.status(401).json({ message: 'Invalid password' });
        }
      }
    });
  },


  UpdateSingleUser: async (req, res) => {
    try {
      const { full_name, email, mobile, modified_date } = req.body;
      const query = 'UPDATE users SET full_name = ?, email = ?, mobile = ?, modified_date = ? WHERE id = ?';
      connection.query(query, [full_name, email, mobile, modified_date, req.params.id], (error, result) => {
        if (!error && result.affectedRows > 0) {
          console.log(result);
          return res.send(result);
        } else {
          console.log(error || 'Product not found');
          return res.status(404).json({ message: 'Product not found.' });
        }
      });
    }
    catch (error) {
      console.log(error)
    }
  },
  usersBtnIcons: async (req, res) => {
    try {
      const controllerName = 'users';
      const query = 'SELECT * FROM admin_page_list WHERE controller_name = ?';

      connection.query(query, [controllerName], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        res.json(results);
      });
    }
    catch (error) {
      console.log(error)
    }
  },




  usersRole: async (req, res) => {
   connection.query('SELECT * FROM user_role', (err, userRoleResult) => {
        if (err) {
            console.error('Error retrieving users: ' + err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        // Organize the results into an array of users with their permissions
        const users = [];

        userRoleResult.forEach((userRole) => {
            const userRoleId = userRole.id;
            const user = { ...userRole };
            user.user_role_permission = [];

            // Retrieve user role permission data
            connection.query('SELECT * FROM user_role_permission WHERE user_role_id = ?', [userRoleId], (err, permissionResult) => {
                if (err) {
                    console.error('Error retrieving user role permission: ' + err);
                    res.status(500).json({ message: 'Internal server error' });
                    return;
                }

                user.user_role_permission = permissionResult;
                users.push(user);

                // Check if this is the last user role entry to respond to the client
                if (users.length === userRoleResult.length) {
                    res.json({ users });
                }
            });
        });
    });
  },





  usersRoleBtn: async (req, res) => {
    try {
      const controllerName = 'user_role';
      const query = 'SELECT * FROM admin_page_list WHERE controller_name = ?';

      connection.query(query, [controllerName], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        res.json(results);
      });
    }
    catch (error) {
      console.log(error)
    }
  },

  getPageGroupAndDisplayName: async (req, res) => {
    const query = `
          SELECT ap.id AS page_group_id, ap.page_group, ap.controller_name, GROUP_CONCAT(DISTINCT ap.display_name) AS display_names,
          GROUP_CONCAT(DISTINCT ap.method_name) AS method_names
          FROM admin_page_list ap
          
          GROUP BY ap.page_group, ap.controller_name
          HAVING ap.page_group IS NOT NULL AND ap.page_group != '';
        `;

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      // Process the data to group by page_group and create an object
      const groupedData = results.reduce((acc, row) => {
        const { page_group_id, page_group, controller_name, display_names, method_names } = row;
        if (!acc[page_group]) {
          acc[page_group] = {
            page_group_id,
            page_group,
            controllers: [],
          };
        }

        acc[page_group].controllers.push({
          controller_name,
          display_names: display_names.split(','),
          method_names: method_names.split(','),
        });

        return acc;
      }, {});

      const responseData = Object.values(groupedData);

      if (responseData.length > 0) {
        res.json(responseData);
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    });
  },



  userRoleCreate: async (req, res) => {
    const { role_name, status, user_page_list_id, user_default_page } = req.body;

    // Check if role_name, status, user_page_list_id, and user_default_page are provided and not null
    if (!role_name || !status || !user_page_list_id || !user_default_page) {
      res.status(400).json({ message: 'role_name, status, user_page_list_id, and user_default_page are required and should not be null' });
      return;
    }

    // Start a database transaction
    connection.beginTransaction((err) => {
      if (err) {
        console.error('Error starting database transaction: ' + err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      // Insert data into the 'user_role' table
      connection.query(
        'INSERT INTO user_role (role_name, status) VALUES (?, ?)',
        [role_name, status],
        (err, result) => {
          if (err) {
            // Rollback the transaction on error
            connection.rollback(() => {
              console.error('Error inserting into user_role table: ' + err);
              res.status(500).json({ message: 'Internal server error' });
            });
            return;
          }
          const userRoleId = result.insertId;

          // Insert data into the 'user_role_permission' table
          connection.query(
            'INSERT INTO user_role_permission (user_page_list_id, user_default_page, user_role_id) VALUES (?, ?, ?)',
            [user_page_list_id, user_default_page, userRoleId],
            (err, permissionResult) => {
              if (err) {
                // Rollback the transaction on error
                connection.rollback(() => {
                  console.error('Error inserting into user_role_permission table: ' + err);
                  res.status(500).json({ message: 'Internal server error' });
                });
                return;
              }

              // Commit the transaction when both inserts are successful
              connection.commit((err) => {
                if (err) {
                  console.error('Error committing the transaction: ' + err);
                  res.status(500).json({ message: 'Internal server error' });
                  return;
                }

                res.status(201).json({
                  user_role_id: userRoleId,
                  role_name,
                  status,
                  user_page_list_id,
                  user_default_page,
                });
              });
            }
          );
        }
      );
    });
  },





  userRoleUpdate: async (req, res) => {

    const { user_role_id, role_name, status, user_page_list_id, user_default_page } = req.body;

    // Check if user_role_id, role_name, status, user_page_list_id, and user_default_page are provided and not null
    if (!user_role_id || !role_name || !status || !user_page_list_id || !user_default_page) {
      res.status(400).json({ message: 'user_role_id, role_name, status, user_page_list_id, and user_default_page are required and should not be null' });
      return;
    }

    // Start a database transaction
    connection.beginTransaction((err) => {
      if (err) {
        console.error('Error starting database transaction: ' + err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      // Update data in the 'user_role' table
      connection.query(
        'UPDATE user_role SET role_name = ?, status = ? WHERE id = ?',
        [role_name, status, user_role_id],
        (err, result) => {
          if (err) {
            // Rollback the transaction on error
            connection.rollback(() => {
              console.error('Error updating user_role table: ' + err);
              res.status(500).json({ message: 'Internal server error' });
            });
            return;
          }

          // Update data in the 'user_role_permission' table
          connection.query(
            'UPDATE user_role_permission SET user_page_list_id = ?, user_default_page = ? WHERE user_role_id = ?',
            [user_page_list_id, user_default_page, user_role_id],
            (err, permissionResult) => {
              if (err) {
                // Rollback the transaction on error
                connection.rollback(() => {
                  console.error('Error updating user_role_permission table: ' + err);
                  res.status(500).json({ message: 'Internal server error' });
                });
                return;
              }

              // Commit the transaction when both updates are successful
              connection.commit((err) => {
                if (err) {
                  console.error('Error committing the transaction: ' + err);
                  res.status(500).json({ message: 'Internal server error' });
                  return;
                }

                res.status(200).json({
                  user_role_id,
                  role_name,
                  status,
                  user_page_list_id,
                  user_default_page,
                });
              });
            }
          );
        }
      );
    });
  },








  getUserRoleIdSingle: async (req, res) => {
    const userRoleId = req.params.id;

    // Retrieve user role data and its related permissions
    connection.query('SELECT * FROM user_role WHERE id = ?', [userRoleId], (err, userRoleResult) => {
      if (err) {
        console.error('Error retrieving user role: ' + err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
    
      if (userRoleResult.length === 0) {
        res.status(404).json({ message: 'User role not found' });
        return;
      }
    
      // Retrieve user role permission data
      connection.query('SELECT * FROM user_role_permission WHERE user_role_id = ?', [userRoleId], (err, permissionResult) => {
        if (err) {
          console.error('Error retrieving user role permission: ' + err);
          res.status(500).json({ message: 'Internal server error' });
          return;
        }
    
        // Combine user role and permission data
        const user_role = userRoleResult[0]; // Assuming there's only one user role with the given ID
        user_role.user_role_permission = permissionResult;
    
        res.json({ user_role });
      });
    });
  },

  deleteUserRoleIdSingle: async (req, res) => {
    // try {
    //   const query = 'DELETE FROM user_role WHERE id = ?';
    //   connection.query(query, [req.params.id], (error, result) => {
    //     if (!error && result.affectedRows > 0) {
    //       console.log(result);
    //       return res.send(result);
    //     } else {
    //       console.log(error || 'User role not found');
    //       return res.status(404).json({ message: 'User role not found.' });
    //     }
    //   });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ message: 'Internal server error' });
    // }
    
    // Transaction to delete user_role with related permissions
    const userRoleId = req.params.id;
    
    connection.beginTransaction((err) => {
      if (err) {
        console.error('Error starting transaction: ' + err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
    
      connection.query('DELETE FROM user_role WHERE id = ?', [userRoleId], (err, result) => {
        if (err) {
          console.error('Error deleting user role: ' + err);
          connection.rollback(() => {
            res.status(500).json({ message: 'Internal server error' });
          });
          return;
        }
        connection.query('DELETE FROM user_role_permission WHERE user_role_id = ?', [userRoleId], (err, permissionResult) => {
          if (err) {
            console.error('Error deleting user role permissions: ' + err);
            connection.rollback(() => {
              res.status(500).json({ message: 'Internal server error' });
            });
            return;
          }
    
          connection.commit((err) => {
            if (err) {
              console.error('Error committing transaction: ' + err);
              connection.rollback(() => {
                res.status(500).json({ message: 'Internal server error' });
              });
              return;
            }
            if (!err && result.affectedRows > 0) {
            
              res.json({ message: 'User role and related permissions deleted successfully' });
                  } 
          });
        });
      });
    });
   
    // try {
    //   const query = 'DELETE FROM user_role WHERE id = ?';
    //   connection.query(query, [req.params.id], (error, result) => {
    //     if (!error && result.affectedRows > 0) {
    //       console.log(result);
    //       return res.send(result);
    //     } else {
    //       console.log(error || 'Product not found');
    //       return res.status(404).json({ message: 'Product not found.' });
    //     }
    //   });
    // }
    // catch (error) {
    //   console.log(error)
    // }
    // const userRoleId = req.params.id;
    
    // connection.beginTransaction((err) => {
    //   if (err) {
    //     console.error('Error starting transaction: ' + err);
    //     res.status(500).json({ message: 'Internal server error' });
    //     return;
    //   }
  
    
    //     connection.query('DELETE FROM user_role WHERE id = ?', [userRoleId], (err, result) => {
    //       if (err) {
    //         console.error('Error deleting user role: ' + err);
    //         connection.rollback(() => {
    //           res.status(500).json({ message: 'Internal server error' });
    //         });
    //         return;
    //       }
    //       connection.query('DELETE FROM user_role_permission WHERE user_role_id = ?', [userRoleId], (err, permissionResult) => {
    //         if (err) {
    //           console.error('Error deleting user role permissions: ' + err);
    //           connection.rollback(() => {
    //             res.status(500).json({ message: 'Internal server error' });
    //           });
    //           return;
    //         }
      
    //       connection.commit((err) => {
    //         if (err) {
    //           console.error('Error committing transaction: ' + err);
    //           connection.rollback(() => {
    //             res.status(500).json({ message: 'Internal server error' });
    //           });
    //           return;
    //         }
  
    //         res.json({ message: 'User role and related permissions deleted successfully' });
    //       });
    //     });
    //   });
    // });
  }




}

module.exports = usersListModel
