
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
        try {
            const data = "select * from user_role";

            connection.query(data, function (error, result) {
                console.log(result, 'Saklain Mostak nayan')
                if (!error) {
                 

                    res.status(200).send(result)
                    
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




}

module.exports = usersListModel
