'use client'
import React from 'react';
import '../../../admin_layout/modal/fa.css'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const UsersRoleCreates = () => {


    const { data: usersRoleCreate = [], isLoading, refetch
    } = useQuery({
        queryKey: ['usersRoleCreate'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page-group/display-name/with-id`)

            const data = await res.json()
            return data
        }
    })

    const formatString = (str) => {
        const words = str.split('_');

        const formattedWords = words.map((word) => {
            const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            return capitalizedWord;
        });

        return formattedWords.join(' ');
    };

    const convertToCamelCase = (input) => {
        return input.toLowerCase().replace(/ /g, '_');
    };


    // const [selectedMethods, setSelectedMethods] = useState([]);

    // const handleCheckboxClick = (methodId) => {
    //     console.log(methodId)
    //     if (selectedMethods.includes(methodId)) {
    //         // If the method_id is already in the selectedMethods array, remove it
    //         setSelectedMethods((prevSelectedMethods) =>
    //             prevSelectedMethods.filter((id) => id !== methodId)
    //         );
    //     } else {
    //         // If the method_id is not in the selectedMethods array, add it
    //         setSelectedMethods((prevSelectedMethods) => [...prevSelectedMethods, methodId]);
    //     }
    // };
    // const handleFormSubmit = () => {
    //     const selectedMethodIds = selectedMethods.join(', ');
    //     console.log('Selected Method IDs:', selectedMethodIds);
    // };
    // const [selectedMethods, setSelectedMethods] = useState({});

    // const handleCheckboxClick = (methodId, methodName, checked) => {
    //     setSelectedMethods((prevSelectedMethods) => {
    //         return {
    //             ...prevSelectedMethods,
    //             [methodName]: checked
    //                 ? [...(prevSelectedMethods[methodName] || []), methodId]
    //                 : prevSelectedMethods[methodName].filter((id) => id !== methodId),
    //         };
    //     });
    // };

    // const handleFormSubmit = () => {
    //     // Get the selected method names and their associated IDs
    //     const selectedMethodsArray = [];
    //     for (const methodName in selectedMethods) {
    //         if (selectedMethods[methodName].length > 0) {
    //             selectedMethodsArray.push({
    //                 method_name: methodName,
    //                 method_ids: selectedMethods[methodName],
    //             });
    //         }
    //     }

    //     console.log('Selected Method Names and IDs:', selectedMethodsArray);
    // };
    // const [selectedMethods, setSelectedMethods] = useState([]);

    // const handleCheckboxClick = (methodNames, checked) => {
    //     if (checked) {
    //         setSelectedMethods((prevSelectedMethods) => [...prevSelectedMethods, ...methodNames]);
    //     } else {
    //         setSelectedMethods((prevSelectedMethods) =>
    //             prevSelectedMethods.filter((methodName) => !methodNames.includes(methodName))
    //         );
    //     }
    // };
    // in here if i check any display.display_name checkbox which parent_id is 0 and which method_id will pass others as parent_id then checked all display_name which   method_id = parent_id 


    const [selectedMethods, setSelectedMethods] = useState([]);

    // const handleCheckboxClick = (methodId, checked) => {
    //     console.log(methodId)
    //     if (checked) {
    //         setSelectedMethods((prevSelectedMethods) => [...prevSelectedMethods, methodId]);
    //     } else {
    //         setSelectedMethods((prevSelectedMethods) =>
    //             prevSelectedMethods.filter((id) => id !== methodId)
    //         );
    //     };
    // };

    // const handleCheckboxClick = (methodId, checked) => {

    //     const updatedSelectedMethods = [...selectedMethods];
    //     const parentMethodId = usersRoleCreate
    //         .flatMap((roleCreate) => roleCreate.controllers)
    //         .flatMap((controllers) => controllers.display_names)
    //         .flatMap((display) => display.method_names)
    //         .find((method) => method.method_id === methodId)?.parent_id || 0;

    //     if (checked) {
    //         updatedSelectedMethods.push(methodId);
    //         if (parentMethodId === 0) {
    //             // Uncheck all checkboxes with method_id equal to their parent_id
    //             const childMethodIds = usersRoleCreate
    //                 .flatMap((roleCreate) => roleCreate.controllers)
    //                 .flatMap((controllers) => controllers.display_names)
    //                 .flatMap((display) => display.method_names)
    //                 .filter((method) => method.parent_id === methodId)
    //                 .map((method) => method.method_id);

    //             updatedSelectedMethods.push(...childMethodIds);
    //         }
    //     } else {
    //         updatedSelectedMethods.splice(updatedSelectedMethods.indexOf(methodId), 1);
    //         if (parentMethodId === 0) {
    //             // Uncheck all checkboxes with method_id equal to their parent_id
    //             const childMethodIds = usersRoleCreate
    //                 .flatMap((roleCreate) => roleCreate.controllers)
    //                 .flatMap((controllers) => controllers.display_names)
    //                 .flatMap((display) => display.method_names)
    //                 .filter((method) => method.parent_id === methodId)
    //                 .map((method) => method.method_id);

    //             childMethodIds.forEach((childMethodId) => {
    //                 updatedSelectedMethods.splice(updatedSelectedMethods.indexOf(childMethodId), 1);
    //             });
    //         }
    //     }
    //     console.log(updatedSelectedMethods)
    //     setSelectedMethods(updatedSelectedMethods);
    // };

    const handleCheckboxClick = (methodId, checked) => {
        const updatedSelectedMethods = new Set(selectedMethods);
    
        const parentMethodId = usersRoleCreate
            .flatMap((roleCreate) => roleCreate.controllers)
            .flatMap((controllers) => controllers.display_names)
            .flatMap((display) => display.method_names)
            .find((method) => method.method_id === methodId)?.parent_id || 0;
    
        if (checked) {
            updatedSelectedMethods.add(methodId);
    
            if (parentMethodId === 0) {
                // Uncheck all checkboxes with method_id equal to their parent_id
                const childMethodIds = usersRoleCreate
                    .flatMap((roleCreate) => roleCreate.controllers)
                    .flatMap((controllers) => controllers.display_names)
                    .flatMap((display) => display.method_names)
                    .filter((method) => method.parent_id === methodId)
                    .map((method) => method.method_id);
    
                childMethodIds.forEach((childMethodId) => updatedSelectedMethods.add(childMethodId));
            }
        } else {
            updatedSelectedMethods.delete(methodId);
    
            if (parentMethodId === 0) {
                // Uncheck all checkboxes with method_id equal to their parent_id
                const childMethodIds = usersRoleCreate
                    .flatMap((roleCreate) => roleCreate.controllers)
                    .flatMap((controllers) => controllers.display_names)
                    .flatMap((display) => display.method_names)
                    .filter((method) => method.parent_id === methodId)
                    .map((method) => method.method_id);
    
                childMethodIds.forEach((childMethodId) => updatedSelectedMethods.delete(childMethodId));
            } else {
                // If the checkbox being unchecked is for an item with menu_type = 1 and parent_id != 0,
                // remove the background
                const display = usersRoleCreate
                    .flatMap((roleCreate) => roleCreate.controllers)
                    .flatMap((controllers) => controllers.display_names)
                    .flatMap((display) => display.method_names)
                    .find((method) => method.method_id === methodId);
    
                if (display && display.menu_type === 1 && display.parent_id !== 0) {
                    setDoubleClickedDisplayName(null); // Remove background
                }
            }
        }
    
        const uniqueSelectedMethods = Array.from(updatedSelectedMethods);
        setSelectedMethods(uniqueSelectedMethods);
    };
    const handleFormSubmit = () => {
        console.log('Selected Method IDs:', selectedMethods);
    };



    const [doubleClickedDisplayName, setDoubleClickedDisplayName] = useState(0);



    // const handleDoubleClick = (display) => {

    //     const page = display.method_names[0].method_id
    //     console.log(page)
    //     if (display.method_names[0].menu_type === 1 && display.method_names[0].parent_id !== 0) {
    //         setDoubleClickedDisplayName(display.display_name);
    //     }
    // };
    // const handleDoubleClick = (display) => {

    //     const page = display.method_names[0].method_id;
    //     console.log(page);

    //     if (display.method_names[0].menu_type === 1 && display.method_names[0].parent_id !== 0) {
    //         setDoubleClickedDisplayName(display.display_name);

    //         // Set the value of the hidden input field
    //         const statusInput = document.querySelector('input[name="status"]');
    //         if (statusInput) {
    //             statusInput.value = page.toString(); // Convert 'page' to a string if it's not already
    //         }
    //     }

    // };

    const handleDoubleClick = (display) => {

        const page = display.method_names[0].method_id;
        const page1 = display.method_names[0].parent_id;
        console.log(page, page1);
        const checkbox = document.querySelector(`#yourCheckboxId_${display.method_names[0].method_id}`);
        if (display.method_names[0].menu_type === 1 && display.method_names[0].parent_id !== 0 && checkbox && checkbox.checked) {

            if (doubleClickedDisplayName === display.display_name) {
                setDoubleClickedDisplayName(null); // Remove 
                const statusInput = document.querySelector('input[name="status"]');
                if (statusInput) {
                    statusInput.value = '0';
                }
            } else {
                setDoubleClickedDisplayName(display.display_name);
                const statusInput = document.querySelector('input[name="status"]');
                if (statusInput) {
                    statusInput.value = page.toString();
                }
            }
        }
        else if (display.method_names[0].menu_type === 1 && display.method_names[0].parent_id !== 0) {
            alert('Please! At first checked selected page')
        }
    };


    // const handleDoubleClick = (display) => {
    //     const page = display.method_names[0].method_id;
    //     console.log(page);

    //     if (display.method_names[0].menu_type === 1 && display.method_names[0].parent_id !== 0) {
    //         if (display.display_name === previousDoubleClickedDisplay) {
    //             // If the same display is double-clicked again, revert to the previous state
    //             setDoubleClickedDisplayName(null); // Clear the double-clicked state
    //             setPreviousDoubleClickedDisplay(null); // Clear the previous state
    //         } else {
    //             // Set the new display as double-clicked and store the previous state
    //             setDoubleClickedDisplayName(display.display_name);
    //             setPreviousDoubleClickedDisplay(display.display_name);

    //             // Set the value of the hidden input field
    //             const statusInput = document.querySelector('input[name="status"]');
    //             if (statusInput) {
    //                 statusInput.value = page.toString(); // Convert 'page' to a string if it's not already
    //             }
    //         }
    //     } else {
    //         // If the condition is not met, set the status input field to 0
    //         const statusInput = document.querySelector('input[name="status"]');
    //         if (statusInput) {
    //             statusInput.value = '0';
    //         }
    //     }
    // };

    console.log(usersRoleCreate.map(userRole => userRole.controllers.map(nayan => nayan.display_names.map(hasan => hasan.method_names.map(method => method.method_id)))), 'user role')

    const [selectAllChecked, setSelectAllChecked] = useState(false);


    const handleSelectAllChange = (isChecked) => {
        setSelectAllChecked(isChecked);
        if (isChecked) {
            // If "Select All" is checked, select all checkboxes
            const allMethodIds = usersRoleCreate
                .flatMap((roleCreate) => roleCreate.controllers)
                .flatMap((controllers) => controllers.display_names)
                .flatMap((display) => display.method_names)
                .map((method) => method.method_id);
            setSelectedMethods(allMethodIds);
        } else {
            // If "Select All" is unchecked, clear selected checkboxes
            setSelectedMethods([]);
        }
    };


    return (
        <div class="col-md-12 bg-light body-content  p-4">
            <div class=" border-primary shadow-sm border-0">
                <div
                    style={{ backgroundColor: '#4267b2' }}
                    class="card-header custom-card-header  py-1  clearfix bg-gradient-primary text-white">
                    <h5 class="card-title card-header-color font-weight-bold mb-0  float-left mt-1">Create User Role</h5>
                    <div class="card-title card-header-color font-weight-bold mb-0  float-right"> <a href="https://atik.urbanitsolution.com/Admin/user_role/user_role_all?page_group=system_setup" class="btn btn-sm btn-info">Back to User role List</a></div>
                </div>
                <div class="alert alert-warning mb-0 mx-4 mt-4 text-danger font-weight-bold" role="alert">
                    (<small><sup><i class="text-danger fas fa-star"></i></sup></small>) field required
                </div>			<div class="card-body">
                    <form class=""

                        autocomplete="off">
                        <div class="form-group row">
                            <label class="col-form-label font-weight-bold col-md-2 font-weight-bold">Role Name:<small><sup><small><i class="text-danger fas fa-star"></i></small></sup></small></label>
                            <div class="col-md-6">
                                <input type="text" required="" name="role_name" class="form-control form-control-sm  required alpha_space unique_role_name" id="role_name" placeholder="Enter Role Name" value="" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-form-label font-weight-bold col-md-2 font-weight-bold ">Page List:<small><sup><small><i class="text-danger fas fa-star"></i></small></sup></small></label><br />
                            <div class="col-md-10">
                                <div class="w-100 mb-2">
                                    {/* <div class="form-check form-check-inline w-15">
                                        <input class="form-check-input check_all head" type="checkbox" />
                                        <label class="form-check-label font-weight-bold" for="inlineCheckbox1">Select All</label>
                                    </div> */}

                                    <div className="form-check form-check-inline w-15">
                                        <input
                                            className="form-check-input check_all head"
                                            type="checkbox"
                                            checked={selectAllChecked}
                                            onChange={(e) => handleSelectAllChange(e.target.checked)}
                                        />
                                        <label className="form-check-label font-weight-bold" htmlFor="inlineCheckbox1">
                                            Select All
                                        </label>
                                    </div>

                                    <div class="form-check form-check-inline w-15">
                                        <input class="form-check-input create_method_all head" type="checkbox" />
                                        <label class="form-check-label font-weight-bold" for="inlineCheckbox1">Create All <span class="badge badge-info" data-toggle="popover" title="" data-content="Double click to any 'create page text' for activating 'Default Dashboard' after Login." data-original-title="Default Page"><i class="fas fa-info-circle"></i></span></label>
                                    </div>
                                    <div class="form-check form-check-inline w-15">
                                        <input class="form-check-input list_method_all head" type="checkbox" />
                                        <label class="form-check-label font-weight-bold" for="inlineCheckbox1">View All <span class="badge badge-info" data-toggle="popover" title="" data-content="Double click to any 'view/list page text' for activating 'Default Dashboard' after Login." data-original-title="Default Page"><i class="fas fa-info-circle"></i></span></label>
                                    </div>
                                    <div class="form-check form-check-inline w-15">
                                        <input class="form-check-input edit_method_all head" type="checkbox" />
                                        <label class="form-check-label font-weight-bold" for="inlineCheckbox1">Edit All</label>
                                    </div>
                                    <div class="form-check form-check-inline w-15">
                                        <input class="form-check-input copy_method_all head" type="checkbox" />
                                        <label class="form-check-label font-weight-bold" for="inlineCheckbox1">Copy All</label>
                                    </div>
                                    <div class="form-check form-check-inline w-15">
                                        <input class="form-check-input delete_method_all head" type="checkbox" />
                                        <label class="form-check-label font-weight-bold" for="inlineCheckbox1">Delete All</label>
                                    </div>
                                </div>



                                {
                                    usersRoleCreate.map((roleCreate =>
                                        <div key={roleCreate.id}>

                                            <div
                                                style={{ backgroundColor: '#4267b2' }}
                                                class="card-header custom-card-header  py-1  clearfix bg-gradient-primary text-white mt-3">
                                                <h5 class="card-title card-header-color font-weight-bold mb-0  float-left ">
                                                    <strong>
                                                        {formatString(roleCreate.page_group)}
                                                    </strong>
                                                </h5>

                                            </div>
                                            {
                                                roleCreate.controllers.map((controllers =>
                                                    <div key={controllers.id} className='border-bottom'>
                                                        {/* <input
                                                                            className="form-check-input"
                                                                            type="checkbox"

                                                                            value={display.method_names.map(method => method.method_id)}
                                                                            onClick={() => handleCheckboxClick(display.method_names.map(method => method.method_id))}
                                                                        /> */}
                                                        {/* <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedMethods[display.display_name] ? true : false}
                                onChange={(e) => handleCheckboxClick(display.method_names[0].method_id, display.display_name, e.target.checked)}
                            /> */}
                                                        {/* <input
        className="form-check-input"
        type="checkbox"
        checked={display.method_names.every((method) => selectedMethods.includes(method.method_name))}
        onChange={(e) => {
            const isChecked = e.target.checked;
            handleCheckboxClick(
                display.method_names.map((method) => method.method_name),
                isChecked
            );
        }}
    /> */}
                                                        <div>

                                                            {
                                                                controllers.display_names.map((display =>




                                                                    <div key={display.id} className="form-check form-check-inline w-15 py-2 "

                                                                        style={{ fontWeight: '500', fontSize: '13px' }}                                                              >

                                                                        <input
                                                                            id={`yourCheckboxId_${display.method_names[0].method_id}`} // Add this ID attribute
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            checked={selectedMethods.includes(display.method_names[0].method_id)}
                                                                            onChange={(e) => handleCheckboxClick(display.method_names[0].method_id, e.target.checked)}
                                                                        />
                                                                        <label
                                                                            style={{ marginTop: '7px' }}
                                                                            className={` ${doubleClickedDisplayName === display.display_name ? 'bg-danger text-white rounded px-2 ' : 'text-black'} `}
                                                                            onDoubleClick={() => handleDoubleClick(display)}
                                                                        >
                                                                            {display.display_name}
                                                                        </label>
                                                                    </div>

                                                                ))
                                                            }
                                                        </div>

                                                    </div>

                                                ))
                                            }

                                            <hr />
                                        </div>
                                    ))
                                }



                            </div>
                        </div>

                        <input type="hidden" name="status" value='0' />
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <input
                                    onClick={handleFormSubmit}

                                    type="button" disabled="" class="btn btn-sm btn-success submit" value="Submit" />
                            </div>
                        </div>
                    </form>

                </div>
            </div >
        </div >
    );
};

export default UsersRoleCreates;