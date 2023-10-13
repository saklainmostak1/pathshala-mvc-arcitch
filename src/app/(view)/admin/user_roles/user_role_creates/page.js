'use client'
import React from 'react';
import '../../../admin_layout/modal/fa.css'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useEffect } from 'react';
import { event } from 'jquery';
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


    const [selectedMethods, setSelectedMethods] = useState([]);

    const handleCheckboxClick = (methodId) => {
        console.log(methodId)
        if (selectedMethods.includes(methodId)) {
            // If the method_id is already in the selectedMethods array, remove it
            setSelectedMethods((prevSelectedMethods) =>
                prevSelectedMethods.filter((id) => id !== methodId)
            );
        } else {
            // If the method_id is not in the selectedMethods array, add it
            setSelectedMethods((prevSelectedMethods) => [...prevSelectedMethods, methodId]);
        }
    };
    const handleFormSubmit = () => {
        const selectedMethodIds = selectedMethods.join(', ');
        console.log('Selected Method IDs:', selectedMethodIds);
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
                        onSubmit={handleFormSubmit}
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
                                    <div class="form-check form-check-inline w-15">
                                        <input class="form-check-input check_all head" type="checkbox" />
                                        <label class="form-check-label font-weight-bold" for="inlineCheckbox1">Select All</label>
                                    </div>
                                    <div class="form-check form-check-inline w-15">


                                        <label class="form-check-label font-weight-bold" for="selectAllCheckbox">
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

                                                        <div>
                                                            {
                                                                controllers.display_names.map((display =>

                                                                    // <tr
                                                                    //     key={display.id}
                                                                    //     class="form-check form-check-inline w-15 py-2 ">
                                                                    //     <input data-class="controller-code-135" class="form-check-input check_one_delete head controller-code-135  method_delete class_method" name="page_name[]" type="checkbox" value="285" />
                                                                    //     <label class="form-check-label  " for="inlineCheckbox1"><small class="font-weight-bold ">
                                                                    //         {display}
                                                                    //     </small></label>


                                                                    //     <hr />

                                                                    // </tr>



                                                                    // <div key={display.id} className="form-check form-check-inline w-15 py-2">
                                                                    //     <input
                                                                    //         class="form-check-input "
                                                                    //         name="page_name"
                                                                    //         type="checkbox"
                                                                    //         onClick={handleClick}
                                                                    //          value={display.method_names.map(method => method.method_id)}

                                                                    //     />

                                                                    //     <label class="form-check-label">
                                                                    //         <small class="font-weight-bold">{display.display_name}</small>
                                                                    //     </label>
                                                                    // </div>



                                                                    <div key={display.id} className="form-check form-check-inline w-15 py-2">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            // checked={selectedMethods.includes(display.method_names.map(method => method.method_name))}
                                                                            value={display.method_names.map(method => method.method_id)}
                                                                            onClick={() => handleCheckboxClick(display.method_names.map(method => method.method_id))}
                                                                        />
                                                                        <label className="form-check-label">
                                                                            <small className="font-weight-bold">{display.display_name}</small>
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

                        <div class="form-group row">
                            <div class="col-sm-6">
                                <input type="hidden" name="status" value="740" />
                                <input
                                    onClick={handleFormSubmit}

                                    type="button" disabled="" name="create" class="btn btn-sm btn-success submit" value="Submit" />
                            </div>
                        </div>
                    </form>

                </div>
            </div >
        </div >
    );
};

export default UsersRoleCreates;