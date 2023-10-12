'use client'

import React, { useState } from 'react';
import { HiTrash } from 'react-icons/hi';
import Swal from 'sweetalert2';
import IconModal from '../../admin_layout/modal/iconModal/page';
import Link from 'next/link';

export default function AdminPageList() {
    const [error, setError] = useState('');
    const [rowError, setRowErrors] = useState([]);
    const [inputValues, setInputValues] = useState([
        {
            controller_name: '',
            controller_bg: '',
            controller_color: '',
            page_group: '',
            icon: '',
            page_group_icon: '',
        },
    ]);
    const [numToAdd, setNumToAdd] = useState(1);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newInputValues = [...inputValues];
        newInputValues[index][name] = value;
        setInputValues(newInputValues);


        setError('')
        setRowErrors('')


    };

    const handleDeleteRow = (index) => {
        console.log(index)
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this row.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                const newInputValues = [...inputValues];
                newInputValues.splice(index, 1);
                setInputValues(newInputValues);
                // setFormCount(formCount - 1);
                Swal.fire('Deleted!', 'The row has been deleted.', 'success');
            }
        });
    };



    const formDatabasePost = (event) => {
        event.preventDefault();
        const newErrors = new Array(inputValues.length).fill('');

        const isValid = inputValues.every((inputValue, index) => {
            if (!inputValue.controller_name.trim()) {
                newErrors[index] = 'Controller Name must be filled.';
                return false;
            }
            return true;
        });

        if (!isValid) {
            setRowErrors(newErrors);
            return;
        }
        setRowErrors(new Array(inputValues.length).fill(''));

        const form = event.target;

        for (let index = 0; index < inputValues.length; index++) {
            const controller_name = form.controller_name.value || form?.controller_name[index]?.value
            const controller_bg = form.controller_bg.value || form?.controller_bg[index]?.value
            const controller_color = form.controller_color.value || form?.controller_color[index]?.value
            const page_group = form.page_group?.value || form?.page_group[index]?.value
            const icon = form?.icon?.value || form?.icon[index]?.value
            const page_group_icon = form?.page_group_icon?.value || form?.page_group_icon[index]?.value
            const parent_id = 0;
            const display_name = controller_name
            const default_page = index
            const controller_sort = index
            const page_group_sort = index
            const status = index
            const controller_code = index
            const method_sort = index
            const menu_type = 1

            const addValue = {
                display_name, controller_name, parent_id, icon, default_page, page_group, page_group_icon, controller_sort, page_group_sort, controller_bg, controller_color, status, controller_code, method_sort, menu_type
            }
            console.log(addValue);

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/allAdmin`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(addValue)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertId) {
                        // toast.success('Sucessfully Add')
                        setError('')
                        Swal.fire({
                            title: 'Success!',
                            text: 'admin data post Successful !!',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                        window.location.href = '/Admin/admin_page_list/admin_page_list_all'
                    }
                    // server data post exit 
                })
            // form.reset();
        }
    }

    const handleAddMore = () => {
        const numToAddInt = parseInt(numToAdd);
        if (!isNaN(numToAddInt) && numToAddInt > 0) {
            const newInputValues = [...inputValues];
            for (let i = 0; i < numToAddInt; i++) {
                newInputValues.push({
                    controller_name: '',
                    controller_bg: '',
                    controller_color: '',
                    page_group: '',
                    icon: '',
                    page_group_icon: '',
                });
            }
            setInputValues(newInputValues);
            setNumToAdd(1); // Reset the input field after adding
        }
    };

    return (
        <div className='p-3'>
            <div className=" mx-auto ">
                <section className=" border shadow-lg rounded mx-auto">
                    <li className="list-group-item text-light  p-1 px-4" aria-current="true" style={{ background: '#4267b2' }}>
                        <div className='d-flex justify-content-between'>
                            <h5 > Create Admin Page List
                            </h5>
                            <button style={{ background: '#17a2b8' }} className='border-0 text-white shadow-sm rounded-1'><Link href='/Admin/admin_page_list/admin_page_list_all'>Back To Admin Page List</Link></button>
                        </div>
                    </li>
                    <div className=" mx-auto px-4  ">
                        <p style={{backgroundColor: '#ffeeba' , fontWeight: 'bold'}} className=' text-danger rounded p-3 mt-4'>(*) field required</p>
                        <section className=" border  rounded mx-auto">
                            <li className="list-group-item text-light  p-1 px-4" aria-current="true" style={{ background: '#4267b2' }}>
                                <div className='d-flex justify-content-between'>
                                    <h5 > Admin Page List
                                    </h5>

                                    <div
                                    style={{marginBottom: '1px'}} className="form-group row gap-5">
                                        <div className=" col-sm-12">
                                        <div className="input-group">
                                                <input style={{ width: '80px' }}
                                                    type="number"
                                                    min="1"
                                                    className="form-control "
                                                    placeholder="Enter number of forms to add"
                                                    value={numToAdd}
                                                    onChange={(event) => setNumToAdd(event.target.value)}
                                                />
                                                <div className="input-group-append">
                                                    <button
                                                        type="button"
                                                        className="btn btn-info btn-sm py-2 add_more "
                                                        onClick={handleAddMore}
                                                    >
                                                        Add More
                                                    </button>
                                                </div>
                                            </div>                                     
                                        </div>
                                    </div>

                                </div>
                            </li>

                            <div className="card-body">
                                <form className="form-horizontal" autoComplete="off" onSubmit={formDatabasePost}>
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <div className=" card-default">
                                            
                                                    <div className="card-body">
                                                        <div className="form-group row">
                                                            <div className="table-responsive">
                                                                <table role="presentation" className="table table-striped table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Controller Name</th>
                                                                            <th>Controller Background</th>
                                                                            <th>Controller Color</th>
                                                                            <th>Controller Icon</th>
                                                                            <th>Page Group</th>
                                                                            <th>PageGroup Icon</th>
                                                                            <th>Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    {inputValues.map((inputValue, index) => (
                                                                    <tbody  key={index} formindex={index} className="files">
                                                                        <tr>
                                                                            <td>
                                                                                <input
                                                                                    onChange={(event) => handleInputChange(index, event)}
                                                                                    type="text"

                                                                                    name="controller_name"
                                                                                    className="form-control form-control-sm  row_unique_controller_name"
                                                                                    placeholder="Enter Controller Name"
                                                                                    value={inputValue.controller_name}
                                                                                />
                                                                                {
                                                                                    rowError[index] && <p className='text-danger'>{rowError[index]}</p>
                                                                                }

                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    onChange={(event) => handleInputChange(index, event)}
                                                                                    type="color"

                                                                                    name="controller_bg"
                                                                                    className="form-control form-control-sm "
                                                                                    placeholder="Enter Controller bg"
                                                                                    value={inputValue.controller_bg}
                                                                                />
                                                                                <div className="sp-replacer sp-light"><div className="sp-preview"><div className="sp-preview-inner"></div></div><div className="sp-dd">▼</div></div>
                                                                                {
                                                                                    rowError[index] && <p className='text-danger'>{rowError[index]}</p>
                                                                                }
                                                                            </td>

                                                                            <td>
                                                                                <input
                                                                                    onChange={(event) => handleInputChange(index, event)}
                                                                                    type="color"

                                                                                    name="controller_color"
                                                                                    className="form-control form-control-sm "
                                                                                    placeholder="Enter Controller Name"
                                                                                    value={inputValue.controller_color}
                                                                                />
                                                                                <div className="sp-replacer sp-light"><div className="sp-preview"><div className="sp-preview-inner"></div></div><div className="sp-dd">▼</div></div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="input-group">
                                                                                    <IconModal
                                                                                        index={index}
                                                                                        names="icon"
                                                                                        handleInputChange={handleInputChange}
                                                                                        handleDeleteRow={handleDeleteRow}
                                                                                        page_group_icon={inputValue.icon}
                                                                                        inputValue={inputValue}

                                                                                    ></IconModal>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <select
                                                                                    name="page_group"
                                                                                    className="form-control form-control-sm  trim"
                                                                                    value={inputValue.page_group}
                                                                                    onChange={(event) => handleInputChange(index, event)}
                                                                                >
                                                                                    <option defaultValue="">Select Page Group</option>
                                                                                    <option defaultValue="academic_setup">academic_setup</option>
                                                                                    <option defaultValue="account_management">account_management</option>
                                                                                    <option defaultValue="certificate">certificate</option>
                                                                                    <option defaultValue="dev">dev</option>
                                                                                    <option defaultValue="dynamic_website">dynamic_website</option>
                                                                                    <option defaultValue="exam_management">exam_management</option>
                                                                                    <option defaultValue="fees_collection">fees_collection</option>
                                                                                    <option defaultValue="HR_management">HR_management</option>
                                                                                    <option defaultValue="library_management">library_management</option>
                                                                                    <option defaultValue="online_class">online_class</option>
                                                                                    <option defaultValue="results">results</option>
                                                                                    <option defaultValue="sms_management">sms_management</option>
                                                                                    <option defaultValue="student_management">student_management</option>
                                                                                    <option defaultValue="system_setup">system_setup</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <div className="input-group">
                                                                                    <div>
                                                                                        <IconModal
                                                                                            index={index}
                                                                                            names="page_group_icon"
                                                                                            handleInputChange={handleInputChange}
                                                                                            handleDeleteRow={handleDeleteRow}
                                                                                            page_group_icon={inputValue.page_group_icon}
                                                                                            inputValue={inputValue}
                                                                                        ></IconModal>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-danger btn-sm"
                                                                                    onClick={() => handleDeleteRow(index)}
                                                                                >
                                                                                    <HiTrash />
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                ))}
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row mt-4 mb-4">
                                        <div className="offset-md-3 col-sm-6">
                                            <input type="submit" name="create" className="btn btn-success btn-sm" defaultValue="Submit" />
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </section>
                    </div>


                </section>
            </div>
        </div>
     
    );
}



// 'use client'

// import React, { useState } from 'react';




// const DynamicInputForm = () => {
//   const [count, setCount] = useState(1); // Number of input fields
//   const [inputValues, setInputValues] = useState(
//     Array(1).fill({ value1: '', value2: '', value3: '', value4: '', value5: '', selectedValue: '' })
//   ); // Initialize with 1 empty input object
//   const [errorMessages, setErrorMessages] = useState(Array(1).fill({ value1: '', value2: '', value3: '', value4: '', value5: '', selectedValue: '' }));

//   const validateInputs = () => {
//     const errors = inputValues.map((values) => {
//       const fieldErrors = {
//         value1: '',
//         value2: '',
//         value3: '',
//         value4: '',
//         value5: '',
//         selectedValue: '',
//       };

//       if (!values.value1) {
//         fieldErrors.value1 = 'Input field cannot be empty';
//       }

//       if (!values.value2) {
//         fieldErrors.value2 = 'Input field cannot be empty';
//       }

//       if (!values.value3) {
//         fieldErrors.value3 = 'Input field cannot be empty';
//       }

//       if (!values.value4) {
//         fieldErrors.value4 = 'Input field cannot be empty';
//       }

//       if (!values.value5) {
//         fieldErrors.value5 = 'Input field cannot be empty';
//       }

//       if (!values.selectedValue) {
//         fieldErrors.selectedValue = 'Please select an option';
//       }

//       return fieldErrors;
//     });

//     setErrorMessages(errors);

//     return errors.every((fieldErrors) => {
//       return Object.values(fieldErrors).every((error) => !error); // Return true if there are no errors for any field
//     });
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedValues = [...inputValues];
//     updatedValues[index][field] = value;
//     setInputValues(updatedValues);

//     // Clear the error message when the input changes
//     const updatedErrorMessages = [...errorMessages];
//     updatedErrorMessages[index][field] = '';
//     setErrorMessages(updatedErrorMessages);
//   };

//   const handleAddFields = (numToAdd) => {
//     setCount(numToAdd);
//     setInputValues([...inputValues, ...Array(numToAdd).fill({ value1: '', value2: '', value3: '', value4: '', value5: '', selectedValue: '' })]);
//     setErrorMessages([...errorMessages, ...Array(numToAdd).fill({ value1: '', value2: '', value3: '', value4: '', value5: '', selectedValue: '' })]);
//   };

//   const handleRemoveField = (index) => {
//     const updatedValues = [...inputValues];
//     updatedValues.splice(index, 1);
//     setInputValues(updatedValues);

//     const updatedErrorMessages = [...errorMessages];
//     updatedErrorMessages.splice(index, 1);
//     setErrorMessages(updatedErrorMessages);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateInputs()) {
//       // Proceed with form submission or processing
//       alert('Form is valid. Submitting data...');
//     } else {
//       alert('Please fill in all required fields.');
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="mt-5">Dynamic Input Form</h2>
//       <div className="mb-3">
//         <div className="input-group">
//           <input
//             type="number"
//             min="1"
//             className="form-control"
//             value={count}
//             onChange={(e) => setCount(parseInt(e.target.value))}
//           />
//           <button className="btn btn-primary" onClick={() => handleAddFields(count)}>
//             Add
//           </button>
//         </div>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Input Field 1</th>
//               <th>Input Field 2</th>
//               <th>Input Field 3</th>
//               <th>Input Field 4</th>
//               <th>Input Field 5</th>
//               <th>Select Field</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {inputValues.map((values, index) => (
//               <tr key={index}>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={values.value1}
//                     onChange={(e) => handleInputChange(index, 'value1', e.target.value)}
//                   />
//                   {errorMessages[index].value1 && <p className="text-danger">{errorMessages[index].value1}</p>}
//                 </td>
//                 <td>
//                   <input
//                     type="color"
//                     className="form-control"
//                     value={values.value2}
//                     onChange={(e) => handleInputChange(index, 'value2', e.target.value)}
//                   />
//                   {errorMessages[index].value2 && <p className="text-danger">{errorMessages[index].value2}</p>}
//                 </td>
//                 <td>
//                   <input
//                     type="color"
//                     className="form-control"
//                     value={values.value3}
//                     onChange={(e) => handleInputChange(index, 'value3', e.target.value)}
//                   />
//                   {errorMessages[index].value3 && <p className="text-danger">{errorMessages[index].value3}</p>}
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={values.value4}
//                     onChange={(e) => handleInputChange(index, 'value4', e.target.value)}
//                   />
                  
//                   {errorMessages[index].value4 && <p className="text-danger">{errorMessages[index].value4}</p>}
//                 </td>
//                 <td>
//                   <select
//                     className="form-control"
//                     value={values.selectedValue}
//                     onChange={(e) => handleInputChange(index, 'selectedValue', e.target.value)}
//                   >
//                     <option value="">Select an option</option>
//                     <option value="Option 1">Option 1</option>
//                     <option value="Option 2">Option 2</option>
//                     <option value="Option 3">Option 3</option>
//                   </select>
//                   {errorMessages[index].selectedValue && (
//                     <p className="text-danger">{errorMessages[index].selectedValue}</p>
//                   )}
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={values.value5}
//                     onChange={(e) => handleInputChange(index, 'value5', e.target.value)}
//                   />
                
//                   {errorMessages[index].value5 && <p className="text-danger">{errorMessages[index].value5}</p>}
//                 </td>
               
//                 <td>
//                   <button
//                     type="button"
//                     className="btn btn-danger"
//                     onClick={() => handleRemoveField(index)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="mb-3">
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DynamicInputForm;