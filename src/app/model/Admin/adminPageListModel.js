const connection = require('../../../connection/config/database')
const AdminPageListModel = {
  getAllAdminPageList: async (req, res) => {
    try {
      const data = "select * from 	admin_page_list";
      connection.query(data, function (error, result) {
        console.log(result)
        if (!error) {
          res.send(result)
        }

        else {
          console.log(error)
        }

      })
    }
    catch (error) {
      console.log(error)
    }
  },

  getAllAdminPageListGroupWisessss: async (req, res) => {
    try {


      const id = req.params.id; // Get the ID parameter from the URL
      const sqlQuery = 'SELECT * FROM admin_page_list WHERE id = ? OR parent_id = ?';
      connection.query(sqlQuery, [id, id], (err, results) => {
        if (err) {
          console.error('Error executing the query: ' + err);
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


  createAllAdminPageList: async (req, res) => {
    const {
      controller_name,
      method_name,
      parent_id,
      menu_type,
      icon,
      btn,
      default_page,
      page_group,
      page_group_icon,
      header_menu_page,
      controller_bg,
      controller_color,
      method_sort,
      status,
      method_code,
      controller_code,
      method_status,
    } = req.body;

    // SQL query to delete previous records with the same controller_name
    const deleteQuery = 'DELETE FROM admin_page_list WHERE controller_name = ?';

    // SQL query to insert a new record for the parent
    const insertParentQuery = `INSERT INTO admin_page_list (display_name, controller_name, method_name, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // SQL query to insert a new record for the child
    const insertChildQuery = `INSERT INTO admin_page_list (display_name, controller_name, method_name, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Function to convert snake_case to Title Case
    const titleCaseWord = (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    };

    // Convert controller_name to display_name
    const display_name = controller_name
      ?.split('_')
      .map((word) => titleCaseWord(word))
      .join(' ');

    // Determine menu_type based on method_name
    let calculatedMenuType = 0; // Default to 0
    if (method_name === `${controller_name}_create` || method_name === `${controller_name}_all`) {
      calculatedMenuType = 1; // Set to 1 if method_name matches conditions
    }

    // Determine method_sort based on method_name
    let calculatedMethodSort = 0; // Default to 0
    switch (method_name) {
      case `${controller_name}_create`:
        calculatedMethodSort = 1;
        break;
      case `${controller_name}_all`:
        calculatedMethodSort = 2;
        break;
      case `${controller_name}_copy`:
        calculatedMethodSort = 3;
        break;
      case `${controller_name}_edit`:
        calculatedMethodSort = 4;
        break;
      case `${controller_name}_delete`:
        calculatedMethodSort = 5;
        break;
      default:
        calculatedMethodSort = 0;
    }

    // SQL query to retrieve max controller_sort and page_group_sort values
    const maxValuesQuery = `
          SELECT 
              MAX(controller_sort) AS max_controller_sort, 
              MAX(page_group_sort) AS max_page_group_sort
          FROM admin_page_list
          WHERE page_group = ?
        `;

    connection.query(maxValuesQuery, [page_group], (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Failed to retrieve max values.' });
      }

      const maxControllerSort = result[0].max_controller_sort || 0;
      const maxPageGroupSort = result[0].max_page_group_sort || 0;

      const controller_sort = maxControllerSort + 1;
      const page_group_sort = maxPageGroupSort + 1;

      connection.query(deleteQuery, [controller_name], (deleteError, deleteResult) => {
        if (deleteError) {
          console.log(deleteError);
          return res.status(500).json({ message: 'Failed to delete previous records.' });
        }

        connection.query(
          insertParentQuery,
          [
            display_name,
            controller_name,
            method_name,
            parent_id,
            1, // Set menu_type to 1 for the parent
            icon,
            btn,
            default_page,
            page_group,
            page_group_icon,
            controller_sort,
            page_group_sort,
            header_menu_page,
            controller_bg,
            controller_color,
            calculatedMethodSort, // Set method_sort for the parent
            status,
            method_code,
            controller_code,
            method_status,
          ],
          (insertError, insertResult) => {
            if (insertError) {
              console.log(insertError);
              return res.status(500).json({ message: 'Failed to add product.' });
            }

            const parent_id = insertResult.insertId;

            const childRecords = [
              { display_name: `${display_name} Create`, method_name: `${controller_name}_create`, menu_type: 1, method_sort: 1 },
              { display_name: `${display_name} List`, method_name: `${controller_name}_all`, menu_type: 1, method_sort: 2 },
              { display_name: `${display_name} Copy`, method_name: `${controller_name}_copy`, method_sort: 3 },
              { display_name: `${display_name} Edit`, method_name: `${controller_name}_edit`, method_sort: 4 },
              { display_name: `${display_name} Delete`, method_name: `${controller_name}_delete`, method_sort: 5 },
            ];

            // Function to insert child records
            const insertChildRecords = (index) => {
              if (index >= childRecords.length) {
                // All child records inserted
                return res.send(insertResult);
              }

              const childRecord = childRecords[index];

              connection.query(
                insertChildQuery,
                [
                  childRecord.display_name,
                  controller_name,
                  childRecord.method_name,
                  parent_id,
                  childRecord.menu_type || calculatedMenuType, // Use menu_type if specified, otherwise calculatedMenuType
                  icon,
                  btn,
                  default_page,
                  page_group,
                  page_group_icon,
                  controller_sort,
                  page_group_sort,
                  header_menu_page,
                  controller_bg,
                  controller_color,
                  childRecord.method_sort || calculatedMethodSort, // Use method_sort if specified, otherwise calculatedMethodSort
                  status,
                  method_code,
                  controller_code,
                  method_status,
                ],
                (childInsertError, childInsertResult) => {
                  if (childInsertError) {
                    console.log(childInsertError);
                    return res.status(500).json({ message: 'Failed to add product.' });
                  }

                  // Insert the next child record
                  insertChildRecords(index + 1);
                }
              );
            };

            // Start inserting child records
            insertChildRecords(0);
          }
        );
      });
    });
  },




  // createAllAdminPageList: async (req, res) => {
  //     const {
  //       controller_name,
  //       method_name,
  //       parent_id,
  //       menu_type,
  //       icon,
  //       btn,
  //       default_page,
  //       page_group,
  //       page_group_icon,
  //       header_menu_page,
  //       controller_bg,
  //       controller_color,
  //       method_sort,
  //       status,
  //       method_code,
  //       controller_code,
  //       method_status,
  //     } = req.body;

  //     // SQL query to delete previous records with the same controller_name
  //     const deleteQuery = 'DELETE FROM admin_page_list WHERE controller_name = ?';

  //     // SQL query to insert a new record for the parent
  //     const insertParentQuery = `INSERT INTO admin_page_list (display_name, controller_name, method_name, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  //     // SQL query to insert a new record for the child
  //     const insertChildQuery = `INSERT INTO admin_page_list (display_name, controller_name, method_name, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  //     // Function to convert snake_case to Title Case
  //     const titleCaseWord = (word) => {
  //       return word.charAt(0).toUpperCase() + word.slice(1);
  //     };

  //     // Convert controller_name to display_name
  //     const display_name = controller_name
  //       ?.split('_')
  //       .map((word) => titleCaseWord(word))
  //       .join(' ');

  //     // Determine menu_type based on method_name
  //     let calculatedMenuType = 0; // Default to 0
  //     if (method_name === `${controller_name}_create` || method_name === `${controller_name}_all`) {
  //       calculatedMenuType = 1; // Set to 1 if method_name matches conditions
  //     }

  //     // SQL query to retrieve max controller_sort and page_group_sort values
  //     const maxValuesQuery = `
  //       SELECT 
  //           MAX(controller_sort) AS max_controller_sort, 
  //           MAX(page_group_sort) AS max_page_group_sort
  //       FROM admin_page_list
  //       WHERE page_group = ?
  //     `;

  //     connection.query(maxValuesQuery, [page_group], (error, result) => {
  //       if (error) {
  //         console.log(error);
  //         return res.status(500).json({ message: 'Failed to retrieve max values.' });
  //       }

  //       const maxControllerSort = result[0].max_controller_sort || 0;
  //       const maxPageGroupSort = result[0].max_page_group_sort || 0;

  //       const controller_sort = maxControllerSort + 1;
  //       const page_group_sort = maxPageGroupSort + 1;

  //       connection.query(deleteQuery, [controller_name], (deleteError, deleteResult) => {
  //         if (deleteError) {
  //           console.log(deleteError);
  //           return res.status(500).json({ message: 'Failed to delete previous records.' });
  //         }

  //         connection.query(
  //           insertParentQuery,
  //           [
  //             display_name,
  //             controller_name,
  //             method_name,
  //             parent_id,
  //             1, // Set menu_type to 1 for the parent
  //             icon,
  //             btn,
  //             default_page,
  //             page_group,
  //             page_group_icon,
  //             controller_sort,
  //             page_group_sort,
  //             header_menu_page,
  //             controller_bg,
  //             controller_color,
  //             method_sort,
  //             status,
  //             method_code,
  //             controller_code,
  //             method_status,
  //           ],
  //           (insertError, insertResult) => {
  //             if (insertError) {
  //               console.log(insertError);
  //               return res.status(500).json({ message: 'Failed to add product.' });
  //             }

  //             const parent_id = insertResult.insertId;

  //             const childRecords = [
  //               { display_name: `${display_name} Create`, method_name: `${controller_name}_create`, menu_type: 1, method_sort: 1 },
  //               { display_name: `${display_name} List`, method_name: `${controller_name}_all`, menu_type: 1 , method_sort: 2},
  //               { display_name: `${display_name} Copy`, method_name: `${controller_name}_copy`, method_sort: 4 },
  //               { display_name: `${display_name} Edit`, method_name: `${controller_name}_edit`, method_sort: 3},
  //               { display_name: `${display_name} Delete`, method_name: `${controller_name}_delete`, method_sort: 5 },
  //             ];

  //             // Function to insert child records
  //             const insertChildRecords = (index) => {
  //               if (index >= childRecords.length) {
  //                 // All child records inserted
  //                 return res.send(insertResult);
  //               }

  //               const childRecord = childRecords[index];

  //               connection.query(
  //                 insertChildQuery,
  //                 [
  //                   childRecord.display_name,
  //                   controller_name,
  //                   childRecord.method_name,
  //                   parent_id,
  //                   childRecord.menu_type || calculatedMenuType, // Use menu_type if specified, otherwise calculatedMenuType
  //                   icon,
  //                   btn,
  //                   default_page,
  //                   page_group,
  //                   page_group_icon,
  //                   controller_sort,
  //                   page_group_sort,
  //                   header_menu_page,
  //                   controller_bg,
  //                   controller_color,
  //                   childRecords.method_sort,
  //                   status,
  //                   method_code,
  //                   controller_code,
  //                   method_status,
  //                 ],
  //                 (childInsertError, childInsertResult) => {
  //                   if (childInsertError) {
  //                     console.log(childInsertError);
  //                     return res.status(500).json({ message: 'Failed to add product.' });
  //                   }

  //                   // Insert the next child record
  //                   insertChildRecords(index + 1);
  //                 }
  //               );
  //             };

  //             // Start inserting child records
  //             insertChildRecords(0);
  //           }
  //         );
  //       });
  //     });
  //   },








  // createAllAdminPageList: async (req, res) => {
  //     const {
  //         controller_name, method_name, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status,
  //     } = req.body;

  //     // SQL query to delete previous records with the same controller_name
  //     const deleteQuery = 'DELETE FROM admin_page_list WHERE controller_name = ?';

  //     // SQL query to insert a new record
  //     const insertQuery = `INSERT INTO admin_page_list (display_name, controller_name, method_name, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  //     // Function to convert snake_case to Title Case
  //     const titleCaseWord = (word) => {
  //         return word.charAt(0).toUpperCase() + word.slice(1);
  //     };

  //     // Convert controller_name to display_name
  //     const display_name = controller_name?.split("_")
  //         .map(word => titleCaseWord(word))
  //         .join(" ");

  //     // SQL query to retrieve max controller_sort and page_group_sort values
  //     const maxValuesQuery = `
  //         SELECT 
  //             MAX(controller_sort) AS max_controller_sort, 
  //             MAX(page_group_sort) AS max_page_group_sort
  //         FROM admin_page_list
  //         WHERE page_group = ?
  //     `;

  //     connection.query(maxValuesQuery, [page_group], (error, result) => {
  //         if (error) {
  //             console.log(error);
  //             return res.status(500).json({ message: 'Failed to retrieve max values.' });
  //         }

  //         const maxControllerSort = result[0].max_controller_sort || 0;
  //         const maxPageGroupSort = result[0].max_page_group_sort || 0;

  //         const controller_sort = maxControllerSort + 1;
  //         const page_group_sort = maxPageGroupSort + 1;

  //         connection.query(deleteQuery, [controller_name], (deleteError, deleteResult) => {
  //             if (deleteError) {
  //                 console.log(deleteError);
  //                 return res.status(500).json({ message: 'Failed to delete previous records.' });
  //             }

  //             connection.query(insertQuery, [display_name, controller_name, method_name, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status], (insertError, insertResult) => {
  //                 if (insertError) {
  //                     console.log(insertError);
  //                     return res.status(500).json({ message: 'Failed to add product.' });
  //                 }

  //                 const parent_id = insertResult.insertId;

  //                 const childRecords = [
  //                     { display_name: display_name + ' Create', method_name: controller_name + '_create'},
  //                     { display_name: display_name + ' Copy', method_name: controller_name + '_copy' },
  //                     { display_name: display_name + ' Edit', method_name: controller_name + '_edit' },
  //                     { display_name: display_name + ' Delete', method_name: controller_name + '_delete' },
  //                     { display_name: display_name + ' List', method_name: controller_name + '_all' },
  //                 ];

  //                 // Function to insert child records
  //                 const insertChildRecords = (index) => {
  //                     if (index >= childRecords.length) {
  //                         // All child records inserted
  //                         return res.send(insertResult);
  //                     }

  //                     const childRecord = childRecords[index];

  //                     connection.query(insertQuery, [childRecord.display_name, controller_name, childRecord.method_name, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status], (childInsertError, childInsertResult) => {
  //                         if (childInsertError) {
  //                             console.log(childInsertError);
  //                             return res.status(500).json({ message: 'Failed to add product.' });
  //                         }

  //                         // Insert the next child record
  //                         insertChildRecords(index + 1);
  //                     });
  //                 };

  //                 // Start inserting child records
  //                 insertChildRecords(0);
  //             });
  //         });
  //     });
  // },



  // original

  //     createAllAdminPageList: async (req, res) => {

  //         const { controller_name, method_name, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status, } = req.body;

  //         // SQL query to delete previous records with the same controller_name
  //         const deleteQuery = 'DELETE FROM admin_page_list WHERE controller_name = ?';

  //         // SQL query to insert a new record
  //         const insertQuery = `INSERT INTO admin_page_list (display_name, controller_name, method_name, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;


  //         function titleCaseWord(word) {
  //             return word.charAt(0).toUpperCase() + word.slice(1);
  //         }
  //         const display_name = controller_name
  //             .split("_")
  //             .map(word => titleCaseWord(word))
  //             .join(" ");


  //         const maxValuesQuery = `
  //   SELECT 
  //     MAX(controller_sort) AS max_controller_sort, 
  //     MAX(page_group_sort) AS max_page_group_sort
  //   FROM admin_page_list
  //   WHERE page_group = ?
  // `;

  //         connection.query(maxValuesQuery, [page_group], (error, result) => {
  //             if (error) {
  //                 console.log(error);
  //                 return res.status(500).json({ message: 'Failed to retrieve max values.' });
  //             }

  //             // `result` will contain the maximum values for controller_sort and page_group_sort
  //             const maxControllerSort = result[0].max_controller_sort;
  //             const maxPageGroupSort = result[0].max_page_group_sort;

  //             const controller_sort = maxControllerSort + 1;
  //             const page_group_sort = maxPageGroupSort + 1;

  //             connection.query(deleteQuery, [controller_name], (deleteError, deleteResult) => {
  //                 if (deleteError) {
  //                     console.log(deleteError);
  //                     return res.status(500).json({ message: 'Failed to delete previous records.' });
  //                 }
  //                 connection.query(insertQuery, [display_name, controller_name, method_name, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status],
  //                     (error, result) => {
  //                         if (error) {
  //                             console.log(error);
  //                             return res.status(500).json({ message: 'Failed to add product.' });
  //                         }

  //                         const parent_id = result.insertId;
  //                         const display_name_cr = display_name + ' Create';
  //                         const method_name_cr = controller_name + '_create';
  //                         const display_name_c = display_name + ' Copy';
  //                         const method_name_c = controller_name + '_copy';
  //                         const display_name_e = display_name + ' Edit';
  //                         const method_name_e = controller_name + '_edit';
  //                         const display_name_d = display_name + ' Delete';
  //                         const method_name_d = controller_name + '_delete';
  //                         const display_name_a = display_name + '  List';
  //                         const method_name_a = controller_name + '_all';

  //                         // Children create part start
  //                         connection.query(insertQuery, [display_name_cr, controller_name, method_name_cr, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status,],
  //                             (error, result) => {
  //                                 if (error) {
  //                                     console.log(error);
  //                                     return res.status(500).json({ message: 'Failed to add product.' });
  //                                 }
  //                                 // console.log(result);
  //                                 // Continue with other queries if needed
  //                             }
  //                         );
  //                         // Children create part end

  //                         // Children Copy part start
  //                         connection.query(insertQuery, [display_name_c, controller_name, method_name_c, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status,],
  //                             (error, result) => {
  //                                 if (error) {
  //                                     console.log(error);
  //                                     return res.status(500).json({ message: 'Failed to add product.' });
  //                                 }
  //                                 // console.log(result);
  //                                 // Continue with other queries if needed
  //                             }
  //                         );
  //                         // Children Copy part end

  //                         // Children Edit part start
  //                         connection.query(insertQuery, [display_name_e, controller_name, method_name_e, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status,],
  //                             (error, result) => {
  //                                 if (error) {
  //                                     console.log(error);
  //                                     return res.status(500).json({ message: 'Failed to add product.' });
  //                                 }
  //                                 // console.log(result);
  //                                 // Continue with other queries if needed
  //                             }
  //                         );
  //                         // Children Edit part end

  //                         // Children Delete part start
  //                         connection.query(insertQuery, [display_name_d, controller_name, method_name_d, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status,],
  //                             (error, result) => {
  //                                 if (error) {
  //                                     console.log(error);
  //                                     return res.status(500).json({ message: 'Failed to add product.' });
  //                                 }
  //                                 // console.log(result);
  //                                 // Continue with other queries if needed
  //                             }
  //                         );
  //                         // Children Delete part end

  //                         // Children All part start
  //                         connection.query(insertQuery, [display_name_a, controller_name, method_name_a, parent_id, menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status,],
  //                             (error, result) => {
  //                                 if (error) {
  //                                     console.log(error);
  //                                     return res.status(500).json({ message: 'Failed to add product.' });
  //                                 }
  //                                 // console.log(result);
  //                                 // Continue with other queries if needed
  //                             }
  //                         );
  //                         // Children All part end


  //                         // Continue with other queries if needed

  //                         return res.send(result);
  //                     }
  //                 );
  //             })
  //         });
  //     },






  // createAllAdminPageList: async (req, res) => {
  //     try {

  //         const { display_name, controller_name, method_name,  menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status } = req.body;

  //         const query = 'INSERT INTO admin_page_list (display_name, controller_name, method_name,  menu_type, icon, btn, default_page,  page_group, page_group_icon, controller_sort,  page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  //         connection.query(query, [display_name, controller_name, method_name,  menu_type, icon, btn, default_page, page_group, page_group_icon, controller_sort, page_group_sort, header_menu_page, controller_bg, controller_color, method_sort, status, method_code, controller_code, method_status], (error, result) => {
  //             if (!error) {
  //                 console.log(result, 'get data');
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

  getSingleAdminPageList: async (req, res) => {
    try {
      const query = 'SELECT * FROM admin_page_list WHERE id = ?';
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

  getPageGroupIconName: async (req, res) => {
    try {

      const query = 'SELECT DISTINCT  page_group FROM admin_page_list WHERE parent_id = 0 and page_group != NULL or page_group !="" ';
      connection.query(query, [req.query.parent_id], (error, result) => {
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


  getPageGroupControllerName: async (req, res) => {
    try {
      // const { parent_id } = req.query
      // const query = 'SELECT * FROM admin_page_list WHERE parent_id = 0';   
      const query = 'SELECT DISTINCT  controller_name FROM admin_page_list WHERE page_group = "academic_setup"';
      connection.query(query, [req.query.parent_id], (error, result) => {
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


  // getPageGroupAndControllerNamesssId: async (req, res) => {
  //     const query = `
  //     SELECT
  //       MIN(ap.id) AS page_group_id,
  //       ap.page_group,
  //       GROUP_CONCAT(DISTINCT ap.controller_name) AS controller_names
  //     FROM admin_page_list ap
  //     WHERE ap.parent_id = 0
  //       AND ap.page_group IS NOT NULL
  //       AND ap.page_group != ''
  //       AND ap.controller_name IS NOT NULL
  //       AND ap.controller_name != ''
  //     GROUP BY ap.page_group
  //   `;

  //   connection.query(query, (error, results) => {
  //     if (error) {
  //       console.error('Error fetching data: ' + error.stack);
  //       res.status(500).json({ message: 'Internal server error.' });
  //       return;
  //     }

  //     if (results.length > 0) {
  //       console.log(results);
  //       res.send(results);
  //     } else {
  //       console.log('Data not found');
  //       res.status(404).json({ message: 'Data not found.' });
  //     }
  //   });
  //   },

  // getPageGroupAndControllerNamesssId: async (req, res) => {
  //     const query = `
  //     SELECT ap.id AS page_group_id, ap.page_group, ap.controller_name, GROUP_CONCAT(DISTINCT ap.display_name) AS display_names

  //     FROM admin_page_list ap
  //     WHERE ap.parent_id != 0
  //     AND ap.menu_type = 1 
  //     GROUP BY ap.page_group, ap.controller_name
  //     HAVING ap.page_group IS NOT NULL AND ap.page_group != '';
  //   `;

  //   connection.query(query, (error, results) => {
  //     if (error) {
  //       console.error('Error executing MySQL query:', error);
  //       res.status(500).json({ message: 'Internal server error' });
  //       return;
  //     }

  //     // Process the data to group by page_group and create an object
  //     const groupedData = results.reduce((acc, row) => {
  //       const { page_group_id, page_group, controller_name, display_names } = row;
  //       if (!acc[page_group]) {
  //         acc[page_group] = {
  //           page_group_id,
  //           page_group,
  //           controllers: [],
  //         };
  //       }

  //       acc[page_group].controllers.push({
  //         controller_name,
  //         display_names: display_names.split(','),
  //       });

  //       return acc;
  //     }, {});

  //     const responseData = Object.values(groupedData);

  //     if (responseData.length > 0) {
  //       res.json(responseData);
  //     } else {
  //       res.status(404).json({ message: 'Data not found' });
  //     }
  //   });
  // },


  getPageGroupAndDisplayNameWithId: async (req, res) => {
//     const query = `
//     SELECT ap.id AS page_group_id, ap.page_group, ap.controller_name, ap.display_name, ap.id AS method_id
//     FROM admin_page_list ap
//     GROUP BY ap.page_group, ap.controller_name, ap.display_name, ap.id
//     HAVING ap.page_group IS NOT NULL AND ap.page_group != '';
// `;

//     connection.query(query, (error, results) => {
//       if (error) {
//         console.error('Error executing MySQL query:', error);
//         res.status(500).json({ message: 'Internal server error' });
//         return;
//       }

//       // Process the data to group by page_group and create an object
//       const groupedData = results.reduce((acc, row) => {
//         const { page_group_id, page_group, controller_name, display_name, method_id } = row; // Change method_name to method_id
//         if (!acc[page_group]) {
//           acc[page_group] = {
//             page_group_id,
//             page_group,
//             controllers: [],
//           };
//         }

//         const controller = acc[page_group].controllers.find((c) => c.controller_name === controller_name);

//         if (controller) {
//           const display = controller.display_names.find((display) => display.display_name === display_name);
//           if (display) {
//             display.method_ids.push(method_id); // Change method_names to method_ids
//           } else {
//             controller.display_names.push({ display_name, method_ids: [method_id] }); // Change method_names to method_ids
//           }
//         } else {
//           acc[page_group].controllers.push({
//             controller_name,
//             display_names: [{ display_name, method_ids: [method_id] }], // Change method_names to method_ids
//           });
//         }

//         return acc;
//       }, {});

//       const responseData = Object.values(groupedData);

//       if (responseData.length > 0) {
//         res.json(responseData);
//       } else {
//         res.status(404).json({ message: 'Data not found' });
//       }
//     });


// const query = `
//     SELECT ap.id AS page_group_id, ap.page_group, ap.controller_name, ap.display_name, ap.id AS method_id, ap.method_name
//     FROM admin_page_list ap
//     GROUP BY ap.page_group, ap.controller_name, ap.display_name, ap.id
//     HAVING ap.page_group IS NOT NULL AND ap.page_group != '';
// `;

// connection.query(query, (error, results) => {
//     if (error) {
//         console.error('Error executing MySQL query:', error);
//         res.status(500).json({ message: 'Internal server error' });
//         return;
//     }

//     // Process the data to group by page_group and create an object
//     const groupedData = results.reduce((acc, row) => {
//         const { page_group_id, page_group, controller_name, display_name, method_id, method_name } = row;
//         if (!acc[page_group]) {
//             acc[page_group] = {
//                 page_group_id,
//                 page_group,
//                 controllers: [],
//             };
//         }

//         const controller = acc[page_group].controllers.find((c) => c.controller_name === controller_name);

//         if (controller) {
//             const display = controller.display_names.find((display) => display.display_name === display_name);
//             if (display) {
//                 display.method_names.push({ method_id, method_name });
//             } else {
//                 controller.display_names.push({ display_name, method_names: [{ method_id, method_name }] });
//             }
//         } else {
//             acc[page_group].controllers.push({
//                 controller_name,
//                 display_names: [{ display_name, method_names: [{ method_id, method_name }] }],
//             });
//         }

//         return acc;
//     }, {});

//     const responseData = Object.values(groupedData);

//     if (responseData.length > 0) {
//         res.json(responseData);
//     } else {
//         res.status(404).json({ message: 'Data not found' });
//     }
// });
const query = `
    SELECT ap.id AS page_group_id, ap.page_group, ap.controller_name, ap.display_name, ap.id AS method_id, ap.method_name, ap.parent_id
    FROM admin_page_list ap
    GROUP BY ap.page_group, ap.controller_name, ap.display_name, ap.id
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
        const { page_group_id, page_group, controller_name, display_name, method_id, method_name, parent_id } = row;
        if (!acc[page_group]) {
            acc[page_group] = {
                page_group_id,
                page_group,
                controllers: [],
            };
        }

        const controller = acc[page_group].controllers.find((c) => c.controller_name === controller_name);

        if (controller) {
            const display = controller.display_names.find((display) => display.display_name === display_name);
            if (display) {
                const method = display.method_names.find((method) => method.method_id === method_id);
                if (method) {
                    // If method already exists, just add parent_id
                    method.parent_id = parent_id;
                } else {
                    display.method_names.push({ method_id, method_name, parent_id });
                }
            } else {
                controller.display_names.push({ display_name, method_names: [{ method_id, method_name, parent_id }] });
            }
        } else {
            acc[page_group].controllers.push({
                controller_name,
                display_names: [{ display_name, method_names: [{ method_id, method_name, parent_id }] }],
            });
        }

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



  getPageGroupAndControllerNamesssId: async (req, res) => {
    const query = `
        SELECT ap.id AS page_group_id, ap.page_group, ap.controller_name, ap.display_name, ap.method_name
        FROM admin_page_list ap
        WHERE ap.parent_id != 0
        AND ap.menu_type = 1 
        GROUP BY ap.page_group, ap.controller_name, ap.display_name, ap.method_name
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
        const { page_group_id, page_group, controller_name, display_name, method_name } = row;
        if (!acc[page_group]) {
          acc[page_group] = {
            page_group_id,
            page_group,
            controllers: [],
          };
        }

        const controller = acc[page_group].controllers.find((c) => c.controller_name === controller_name);

        if (controller) {
          const display = controller.display_names.find((display) => display.display_name === display_name);
          if (display) {
            display.method_names.push(method_name);
          } else {
            controller.display_names.push({ display_name, method_names: [method_name] });
          }
        } else {
          acc[page_group].controllers.push({
            controller_name,
            display_names: [{ display_name, method_names: [method_name] }],
          });
        }

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







  // getPageGroupAndControllerNamesssId: async (req, res) => {
  //   const query = `
  //     SELECT ap.id AS page_group_id, ap.page_group, ap.controller_name, GROUP_CONCAT(DISTINCT ap.display_name) AS display_names,
  //     GROUP_CONCAT(DISTINCT ap.method_name) AS method_names
  //     FROM admin_page_list ap
  //     WHERE ap.parent_id != 0
  //     AND ap.menu_type = 1 
  //     GROUP BY ap.page_group, ap.controller_name
  //     HAVING ap.page_group IS NOT NULL AND ap.page_group != '';
  //   `;

  //   connection.query(query, (error, results) => {
  //     if (error) {
  //       console.error('Error executing MySQL query:', error);
  //       res.status(500).json({ message: 'Internal server error' });
  //       return;
  //     }

  //     // Process the data to group by page_group and create an object
  //     const groupedData = results.reduce((acc, row) => {
  //       const { page_group_id, page_group, controller_name, display_names, method_names } = row;
  //       if (!acc[page_group]) {
  //         acc[page_group] = {
  //           page_group_id,
  //           page_group,
  //           controllers: [],
  //         };
  //       }

  //       acc[page_group].controllers.push({
  //         controller_name,
  //         display_names: display_names.split(','),
  //         method_names: method_names.split(','),
  //       });

  //       return acc;
  //     }, {});

  //     const responseData = Object.values(groupedData);

  //     if (responseData.length > 0) {
  //       res.json(responseData);
  //     } else {
  //       res.status(404).json({ message: 'Data not found' });
  //     }
  //   });
  // },











  // getPageGroupAndControllerNamesssId: async (req, res) => {
  //   const query = `
  //     SELECT ap.id AS page_group_id, ap.page_group, ap.controller_name, GROUP_CONCAT(DISTINCT ap.method_name) AS method_names
  //     FROM admin_page_list ap
  //     WHERE ap.parent_id != 0
  //     AND ap.menu_type = 1 
  //     GROUP BY ap.page_group, ap.controller_name
  //     HAVING ap.page_group IS NOT NULL AND ap.page_group != '';
  //   `;

  //   connection.query(query, (error, results) => {
  //     if (error) {
  //       console.error('Error executing MySQL query:', error);
  //       res.status(500).json({ message: 'Internal server error' });
  //       return;
  //     }

  //     // Process the data to group by page_group and create an object
  //     const groupedData = results.reduce((acc, row) => {
  //       const { page_group_id, page_group, controller_name, method_names } = row;
  //       if (!acc[page_group]) {
  //         acc[page_group] = {
  //           page_group_id,
  //           page_group,
  //           controllers: [],
  //         };
  //       }

  //       acc[page_group].controllers.push({
  //         controller_name,
  //         method_names: method_names.split(','),
  //       });

  //       return acc;
  //     }, {});

  //     const responseData = Object.values(groupedData);

  //     if (responseData.length > 0) {
  //       res.json(responseData);
  //     } else {
  //       res.status(404).json({ message: 'Data not found' });
  //     }
  //   });
  // },
  //   original
  getPageGroupAndControllerNamesss: async (req, res) => {
    try {
      const query = `
            SELECT
              ap.page_group,
              GROUP_CONCAT(DISTINCT ap.controller_name) AS controller_names
            FROM admin_page_list ap
            WHERE ap.parent_id = 0
              AND ap.page_group IS NOT NULL
              AND ap.page_group != ''
              AND ap.controller_name IS NOT NULL
              AND ap.controller_name != ''
            GROUP BY ap.page_group
            HAVING COUNT(DISTINCT ap.controller_name) = COUNT(ap.controller_name)
          `;

      connection.query(query, (error, result) => {
        if (!error && result.length > 0) {
          console.log(result);
          return res.send(result);
        } else {
          console.log(error || 'Data not found');
          return res.status(404).json({ message: 'Data not found.' });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },



  // email/email?=admin@gmail.com
  getSingleAdminPageListEmail: async (req, res) => {
    try {
      const { email } = req.query
      const query = 'SELECT * FROM users WHERE email = ?';
      connection.query(query, [email], (error, result) => {
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

  // deleteSingleAdminPageList: async (req, res) => {
  //     try {
  //         const idToDelete = req.params.id;

  //         // Check if the ID exists in admin_page_list
  //         const checkQuery = `SELECT COUNT(*) AS count FROM admin_page_list WHERE id = ?`;

  //         connection.query(checkQuery, [idToDelete], (checkError, checkResults) => {
  //           if (checkError) {
  //             console.error('Error checking if the ID exists:', checkError);
  //             connection.end();
  //             return;
  //           }

  //           const rowCount = checkResults[0].count;

  //           if (rowCount === 0) {
  //             console.log('ID does not exist in admin_page_list.');
  //             connection.end();
  //           } else {
  //             // If the ID exists in admin_page_list, proceed to delete it
  //             const deleteQuery = `DELETE FROM admin_page_list WHERE id = ?`;

  //             connection.query(deleteQuery, [idToDelete], (deleteError, deleteResults) => {
  //               if (deleteError) {
  //                 console.error('Error deleting the ID:', deleteError);
  //               } else {
  //                 console.log('ID deleted from admin_page_list.');
  //               }

  //               connection.end();
  //             });
  //           }
  //         });
  //     }
  //     catch (error) {
  //         console.log(error)
  //     }
  // },
  deleteSingleAdminPageList: async (req, res) => {
    try {
      const query = 'DELETE FROM admin_page_list WHERE id = ?';
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


}


module.exports = AdminPageListModel