'use client'
import React from 'react';
import '../../../admin_layout/modal/fa.css'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';

const UserRoleEdit = ({ id }) => {


    const { data: usersRoleCreate = [], isLoading, refetch
    } = useQuery({
        queryKey: ['usersRoleCreate'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page-group/display-name/with-id`)

            const data = await res.json()
            return data
        }
    })

    const [userRole, setUserRole] = useState([])
    useEffect(() => {
        fetch(`http://192.168.0.110:5002/user/user-role-single/${id}`)
            .then(Response => Response.json())
            .then(data => setUserRole(data))
    }, [id])


    console.log(userRole, 'role of this page')








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




    const selectedMethodsArrays = userRole?.user_role?.user_role_permission[0]?.user_page_list_id



    const [selectedMethodsArrayss, setSelectedMethodsArrays] = useState([]);



    useEffect(() => {
        setSelectedMethodsArrays(selectedMethodsArrays)
    }, [selectedMethodsArrays])



    console.log(selectedMethodsArrayss, 'selectedMethodsArrayss')


    const [selectedMethods, setSelectedMethods] = useState([]);
    const handleCheckboxClick = (methodId, checked) => {


        const updatedSelectedMethods = new Set(selectedMethods);
        const checkedMethodSorts = []; // Array to store checked method_sort values


        const controller = usersRoleCreate
            .flatMap((roleCreate) => roleCreate.controllers)
            .find((controller) =>
                controller.display_names.some((display) =>
                    display.method_names.some((m) => m.method_id === methodId)
                )
            );

        if (controller) {
            // Find the checked display_names
            const checkedDisplayNames = controller.display_names.filter((display) =>
                display.method_names.some((m) => updatedSelectedMethods.has(m.method_id))
            );

            // Push the method_sort values for the checked display_names
            checkedDisplayNames.forEach((display) => {
                display.method_names.forEach((m) => {
                    checkedMethodSorts.push(m.method_sort);
                });
            });
        }







        const method_sort = usersRoleCreate
            .flatMap((roleCreate) => roleCreate.controllers)
            .flatMap((controllers) => controllers.display_names)
            .flatMap((display) => display.method_names)
            .filter((m) => m.method_id === methodId)
            .map((m) => m.method_sort);

        console.log(method_sort);



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
            }

            else {
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

        // Find the controller containing the method with the specified methodId
        const controllerWithMethodId = usersRoleCreate
            .flatMap((roleCreate) => roleCreate.controllers)
            .find((controllers) =>
                controllers.display_names.some((display) =>
                    display.method_names.some((m) => m.method_id === methodId)
                )
            );

        if (controllerWithMethodId) {
            // Access the method_sort from controllerWithMethodId
            const method = controllerWithMethodId.display_names
                .flatMap((display) => display.method_names)
                .find((m) => m.method_id === methodId);

            if (method) {
                const method_sort = method.method_sort;

                if (method_sort === 0) {
                    // Check or uncheck all display_names in the same controller
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            const displayMethodId = m.method_id;
                            if (checked) {
                                updatedSelectedMethods.add(displayMethodId);
                            } else {
                                updatedSelectedMethods.delete(displayMethodId);
                            }

                            // You can also update the checkbox state here
                            const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                            if (checkbox) {
                                checkbox.checked = checked;
                            }
                        });
                    });


                }

                else if (method_sort === 1) {
                    let checkedMethodSortCount1 = 0; // Initialize the count of checked method_sort values
                    console.log("Checked Method Sorts length:", checkedMethodSorts);
                    let shouldUncheck0And3 = false; // Initialize a flag

                    // Check if any of the checkboxes for method_sort 3 are currently checked
                    const methodSort3Checkboxes = []; // Store the checkboxes for method_sort 3
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 3 || m.method_sort === 5 || m.method_sort === 6 || m.method_sort === 7 || m.method_sort === 8 || m.method_sort === 9 || m.method_sort === 10) {
                                const displayMethodId = m.method_id;
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    methodSort3Checkboxes.push(checkbox);
                                    if (checkbox.checked) {
                                        shouldUncheck0And3 = true;
                                    }
                                }
                            }
                        });
                    });

                    if (checked) {
                        shouldUncheck0And3 = false;
                    }

                    // Process the checkboxes for method_sort 0 and 2
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 0 || m.method_sort === 2 || m.method_sort === 4) {
                                const displayMethodId = m.method_id;
                                if (checked || shouldUncheck0And3) {
                                    updatedSelectedMethods.add(displayMethodId);
                                } else {
                                    updatedSelectedMethods.delete(displayMethodId);
                                }

                                // Update the checkbox state
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    checkbox.checked = checked || !shouldUncheck0And3;
                                }
                            }
                        });
                    });
                }
                else if (method_sort === 2) {
                    let checkedMethodSortCount1 = 0; // Initialize the count of checked method_sort values
                    console.log("Checked Method Sorts length:", checkedMethodSorts);
                    let shouldUncheck0And3 = false; // Initialize a flag

                    // Check if any of the checkboxes for method_sort 3 are currently checked
                    const methodSort3Checkboxes = []; // Store the checkboxes for method_sort 3
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 1 || m.method_sort === 3 || m.method_sort === 5 || m.method_sort === 4 || m.method_sort > 5) {
                                const displayMethodId = m.method_id;
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    methodSort3Checkboxes.push(checkbox);
                                    if (checkbox.checked) {
                                        shouldUncheck0And3 = true;
                                    }
                                }
                            }
                        });
                    });

                    if (checked) {
                        shouldUncheck0And3 = false;
                    }

                    // Process the checkboxes for method_sort 0 and 2
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 0) {
                                const displayMethodId = m.method_id;
                                if (checked || shouldUncheck0And3) {
                                    updatedSelectedMethods.add(displayMethodId);
                                } else {
                                    updatedSelectedMethods.delete(displayMethodId);
                                }

                                // Update the checkbox state
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    checkbox.checked = checked || !shouldUncheck0And3;
                                }
                            }
                        });
                    });
                }
                else if (method_sort === 3) {
                    let checkedMethodSortCount1 = 0; // Initialize the count of checked method_sort values
                    console.log("Checked Method Sorts length:", checkedMethodSorts);
                    let shouldUncheck0And3 = false; // Initialize a flag

                    // Check if any of the checkboxes for method_sort 3 are currently checked
                    const methodSort3Checkboxes = []; // Store the checkboxes for method_sort 3
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 1 || m.method_sort === 5 || m.method_sort === 4 || m.method_sort > 5) {
                                const displayMethodId = m.method_id;
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    methodSort3Checkboxes.push(checkbox);
                                    if (checkbox.checked) {
                                        shouldUncheck0And3 = true;
                                    }
                                }
                            }
                        });
                    });

                    if (checked) {
                        shouldUncheck0And3 = false;
                    }

                    // Process the checkboxes for method_sort 0 and 2
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 0 || m.method_sort === 2) {
                                const displayMethodId = m.method_id;
                                if (checked || shouldUncheck0And3) {
                                    updatedSelectedMethods.add(displayMethodId);
                                } else {
                                    updatedSelectedMethods.delete(displayMethodId);
                                }

                                // Update the checkbox state
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    checkbox.checked = checked || !shouldUncheck0And3;
                                }
                            }
                        });
                    });
                }
                else if (method_sort === 4) {
                    let checkedMethodSortCount1 = 0; // Initialize the count of checked method_sort values
                    console.log("Checked Method Sorts length:", checkedMethodSorts);
                    let shouldUncheck0And3 = false; // Initialize a flag

                    // Check if any of the checkboxes for method_sort 3 are currently checked
                    const methodSort3Checkboxes = []; // Store the checkboxes for method_sort 3
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 3 || m.method_sort === 5 || m.method_sort > 5) {
                                const displayMethodId = m.method_id;
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    methodSort3Checkboxes.push(checkbox);
                                    if (checkbox.checked) {
                                        shouldUncheck0And3 = true;
                                    }
                                }
                            }
                        });
                    });

                    if (checked) {
                        shouldUncheck0And3 = false;
                    }

                    // Process the checkboxes for method_sort 0 and 2
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 0 || m.method_sort === 1 || m.method_sort === 2) {
                                const displayMethodId = m.method_id;
                                if (checked || shouldUncheck0And3) {
                                    updatedSelectedMethods.add(displayMethodId);
                                } else {
                                    updatedSelectedMethods.delete(displayMethodId);
                                }

                                // Update the checkbox state
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    checkbox.checked = checked || !shouldUncheck0And3;
                                }
                            }
                        });
                    });
                }
                else if (method_sort === 5) {
                    let checkedMethodSortCount1 = 0; // Initialize the count of checked method_sort values
                    console.log("Checked Method Sorts length:", checkedMethodSorts);
                    let shouldUncheck0And3 = false; // Initialize a flag

                    // Check if any of the checkboxes for method_sort 3 are currently checked
                    const methodSort3Checkboxes = []; // Store the checkboxes for method_sort 3
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 1 || m.method_sort === 3 || m.method_sort === 4 || m.method_sort > 5) {
                                const displayMethodId = m.method_id;
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    methodSort3Checkboxes.push(checkbox);
                                    if (checkbox.checked) {
                                        shouldUncheck0And3 = true;
                                    }
                                }
                            }
                        });
                    });

                    if (checked) {
                        shouldUncheck0And3 = false;
                    }

                    // Process the checkboxes for method_sort 0 and 2
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 0 || m.method_sort === 2) {
                                const displayMethodId = m.method_id;
                                if (checked || shouldUncheck0And3) {
                                    updatedSelectedMethods.add(displayMethodId);
                                } else {
                                    updatedSelectedMethods.delete(displayMethodId);
                                }

                                // Update the checkbox state
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    checkbox.checked = checked || !shouldUncheck0And3;
                                }
                            }
                        });
                    });
                }
                else if (method_sort > 5) {
                    let checkedMethodSortCount1 = 0; // Initialize the count of checked method_sort values
                    console.log("Checked Method Sorts length:", checkedMethodSorts);
                    let shouldUncheck0And3 = false; // Initialize a flag

                    // Check if any of the checkboxes for method_sort 3 are currently checked
                    const methodSort3Checkboxes = []; // Store the checkboxes for method_sort 3
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 1 || m.method_sort === 2 || m.method_sort === 3 || m.method_sort === 4 || m.method_sort === 5 || m.method_sort > 5) {
                                const displayMethodId = m.method_id;
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    methodSort3Checkboxes.push(checkbox);
                                    if (checkbox.checked) {
                                        shouldUncheck0And3 = true;
                                    }
                                }
                            }
                        });
                    });

                    if (checked) {
                        shouldUncheck0And3 = false;
                    }

                    // Process the checkboxes for method_sort 0 and 2
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 0) {
                                const displayMethodId = m.method_id;
                                if (checked || shouldUncheck0And3) {
                                    updatedSelectedMethods.add(displayMethodId);
                                } else {
                                    updatedSelectedMethods.delete(displayMethodId);
                                }

                                // Update the checkbox state
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    checkbox.checked = checked || !shouldUncheck0And3;
                                }
                            }
                        });
                    });
                }

            }
        }

        const uniqueSelectedMethods = Array.from(updatedSelectedMethods);
        setSelectedMethods(uniqueSelectedMethods);

        if (uniqueSelectedMethods.length === 0) {
            document.querySelector('input[name="default_page"]').value = '0';
        }

    };


    const [doubleClickedDisplayName, setDoubleClickedDisplayName] = useState(0);

    const handleDoubleClick = (display) => {
        // const default_page = userRole?.role_name?.user_role_permission[0]?.user_default_page
        const page = display.method_names[0].method_id;
        const page1 = display.method_names[0].parent_id;
        console.log(page, page1);
        const checkbox = document.querySelector(`#yourCheckboxId_${display.method_names[0].method_id}`);

        if (display.method_names[0].menu_type === 1 && display.method_names[0].parent_id !== 0 && checkbox && checkbox.checked) {

            if (doubleClickedDisplayName === display.display_name) {
                setDoubleClickedDisplayName(null); // Remove 
                const statusInput = document.querySelector('input[name="default_page"]');
                if (statusInput) {
                    statusInput.value = '0'
                }
            } else {
                setDoubleClickedDisplayName(display.display_name);
                const statusInput = document.querySelector('input[name="default_page"]');
                if (statusInput) {
                    statusInput.value = page.toString();
                }
            }
        }
        else if (display.method_names[0].menu_type === 1 && display.method_names[0].parent_id !== 0) {
            alert('Please! At first checked selected page')
        }
    };



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


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserRole((prevState) => ({
            ...prevState,
            user_role: {
                ...prevState.user_role,
                [name]: value,
            },
        }));
    };

    const handleEditUserRole = (event) => {
        event.preventDefault();
        const userRoleId = userRole.user_role.id; // Get the user role ID
        const formData = {
            user_role_id: userRoleId,
            role_name: userRole.user_role.role_name,
            // Include other user role properties...
            user_page_list_id: selectedMethodsArrays + ',' + selectedMethods.toString(), // Convert to string
            user_default_page:
                document.querySelector('input[name="default_page"]').value, // Example value, adjust as needed
            status: document.querySelector('input[name="status"]').value, // Example value, adjust as needed
        };
        console.log(formData)

        // Make a PUT request to update the user role
        fetch(`http://192.168.0.110:5002/user/user-role/edit/${userRoleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Handle success or error based on the response data
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error
            });
    };

    const [createAllChecked, setCreateAllChecked] = useState(false);


    const handleCreateAllChange = (isChecked) => {
        setCreateAllChecked(isChecked);

        if (isChecked) {
            // If "Create All" is checked, get the method IDs to check
            const methodIdsToCheck = filteredDisplayNames.map((method) => method.method_id);

            // Check the method IDs for "Create All"
            setSelectedMethods((prevSelectedMethods) => [...prevSelectedMethods, ...methodIdsToCheck]);
        } else {
            // If "Create All" is unchecked, clear selected checkboxes for "Create All" methods
            setSelectedMethods((prevSelectedMethods) => {
                // Keep the method_ids with method_sort === 0 when "Create All" is unchecked
                return prevSelectedMethods.filter((methodId) => {
                    const method = filteredDisplayNames.find((item) => item.method_id === methodId);
                    let keepMethod = !method;

                    // If "Edit All" is also checked, don't uncheck methods with method_sort === 3
                    if ((editAllChecked || deleteAllChecked || copyAllChecked || viewAllChecked) && method && (method.method_sort === 0 || method.method_sort === 2)) {
                        keepMethod = true;
                    }

                    return keepMethod;
                });
            });
        }
    };


    const filteredDisplayNames = usersRoleCreate
        .flatMap((roleCreate) => roleCreate.controllers)
        .flatMap((controllers) => controllers.display_names)
        .flatMap((display) => display.method_names)
        .filter((method) => [0, 1, 2, 4].includes(method.method_sort));

    console.log('Filtered Display Names create all:', filteredDisplayNames);








    const [viewAllChecked, setViewAllChecked] = useState(false);


    const handleViewAllChange = (isChecked) => {
        setViewAllChecked(isChecked);

        if (isChecked) {
            // If "Create All" is checked, get the method IDs to check
            const methodIdsToCheck = filteredDisplayNamesViewAll.map((method) => method.method_id);

            // Check the method IDs for "Create All"
            setSelectedMethods((prevSelectedMethods) => [...prevSelectedMethods, ...methodIdsToCheck]);
        } else {
            // If "Create All" is unchecked, clear selected checkboxes for "Create All" methods
            setSelectedMethods((prevSelectedMethods) => {
                // Keep the method_ids with method_sort === 0 when "Create All" is unchecked
                return prevSelectedMethods.filter((methodId) => {
                    const method = filteredDisplayNamesViewAll.find((item) => item.method_id === methodId);
                    let keepMethod = !method;

                    // If "Edit All" is also checked, don't uncheck methods with method_sort === 3
                    if ((editAllChecked || deleteAllChecked || copyAllChecked || createAllChecked) && method && (method.method_sort === 0)) {
                        keepMethod = true;
                    }

                    return keepMethod;
                });
            });
        }
    };



    const filteredDisplayNamesViewAll = usersRoleCreate
        .flatMap((roleCreate) => roleCreate.controllers)
        .flatMap((controllers) => controllers.display_names)
        .flatMap((display) => display.method_names)
        .filter((method) => [0, 2].includes(method.method_sort));








    const [editAllChecked, setEditAllChecked] = useState(false);
    const handleEditAllChange = (isChecked) => {
        setEditAllChecked(isChecked);

        if (isChecked) {
            // If "Create All" is checked, get the method IDs to check
            const methodIdsToCheck = filteredDisplayNamesEditAll.map((method) => method.method_id);

            // Check the method IDs for "Create All"
            setSelectedMethods((prevSelectedMethods) => [...prevSelectedMethods, ...methodIdsToCheck]);
        } else {
            // If "Create All" is unchecked, clear selected checkboxes for "Create All" methods
            setSelectedMethods((prevSelectedMethods) => {
                // Keep the method_ids with method_sort === 0 when "Create All" is unchecked
                return prevSelectedMethods.filter((methodId) => {
                    const method = filteredDisplayNamesEditAll.find((item) => item.method_id === methodId);
                    let keepMethod = !method;

                    // If "Edit All" is also checked, don't uncheck methods with method_sort === 3
                    if ((viewAllChecked || deleteAllChecked || copyAllChecked || createAllChecked) && method && (method.method_sort === 0 || method.method_sort === 2)) {
                        keepMethod = true;
                    }

                    return keepMethod;
                });
            });
        }
    };
    const filteredDisplayNamesEditAll = usersRoleCreate
        .flatMap((roleCreate) => roleCreate.controllers)
        .flatMap((controllers) => controllers.display_names)
        .flatMap((display) => display.method_names)
        .filter((method) => [0, 3, 2].includes(method.method_sort));

    console.log('Filtered Display Names edit all:', filteredDisplayNamesViewAll);











    const [copyAllChecked, setCopyAllChecked] = useState(false);
    const handleCopyAllChange = (isChecked) => {
        setCopyAllChecked(isChecked);

        if (isChecked) {
            // If "Create All" is checked, get the method IDs to check
            const methodIdsToCheck = filteredDisplayNamesCopyAll.map((method) => method.method_id);

            // Check the method IDs for "Create All"
            setSelectedMethods((prevSelectedMethods) => [...prevSelectedMethods, ...methodIdsToCheck]);
        } else {
            // If "Create All" is unchecked, clear selected checkboxes for "Create All" methods
            setSelectedMethods((prevSelectedMethods) => {
                // Keep the method_ids with method_sort === 0 when "Create All" is unchecked
                return prevSelectedMethods.filter((methodId) => {
                    const method = filteredDisplayNamesCopyAll.find((item) => item.method_id === methodId);
                    let keepMethod = !method;

                    // If "Edit All" is also checked, don't uncheck methods with method_sort === 3
                    if ((viewAllChecked || deleteAllChecked || editAllChecked || createAllChecked) && method && (method.method_sort === 0 || method.method_sort === 2)) {
                        keepMethod = true;
                    }

                    return keepMethod;
                });
            });
        }
    };
    const filteredDisplayNamesCopyAll = usersRoleCreate
        .flatMap((roleCreate) => roleCreate.controllers)
        .flatMap((controllers) => controllers.display_names)
        .flatMap((display) => display.method_names)
        .filter((method) => [0, 1, 2, 4].includes(method.method_sort));

    console.log('Filtered Display Names copy all:', filteredDisplayNamesViewAll);












    const [deleteAllChecked, setDeleteAllChecked] = useState(false);
    const handleDeleteAllChange = (isChecked) => {
        setDeleteAllChecked(isChecked);

        if (isChecked) {
            // If "Create All" is checked, get the method IDs to check
            const methodIdsToCheck = filteredDisplayNamesDeleteAll.map((method) => method.method_id);

            // Check the method IDs for "Create All"
            setSelectedMethods((prevSelectedMethods) => [...prevSelectedMethods, ...methodIdsToCheck]);
        } else {
            // If "Create All" is unchecked, clear selected checkboxes for "Create All" methods
            setSelectedMethods((prevSelectedMethods) => {
                // Keep the method_ids with method_sort === 0 when "Create All" is unchecked
                return prevSelectedMethods.filter((methodId) => {
                    const method = filteredDisplayNamesDeleteAll.find((item) => item.method_id === methodId);
                    let keepMethod = !method;

                    // If "Edit All" is also checked, don't uncheck methods with method_sort === 3
                    if ((viewAllChecked || copyAllChecked || editAllChecked || createAllChecked) && method && (method.method_sort === 0 || method.method_sort === 2)) {
                        keepMethod = true;
                    }

                    return keepMethod;
                });
            });
        }
    };
    const filteredDisplayNamesDeleteAll = usersRoleCreate
        .flatMap((roleCreate) => roleCreate.controllers)
        .flatMap((controllers) => controllers.display_names)
        .flatMap((display) => display.method_names)
        .filter((method) => [0, 2, 5].includes(method.method_sort));

    console.log('Filtered Display Names delete all:', filteredDisplayNamesViewAll);



    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2500)
    }, [])
    const [btnIconUsers, setBtnIconUsers] = useState([])
    useEffect(() => {
        fetch('http://192.168.0.110:5002/user-role/btn')
            .then(Response => Response.json())
            .then(data => setBtnIconUsers(data))


    }, [])

    const filteredControllerName = btnIconUsers.filter(btn =>
        btn.method_sort === 2
    );
    console.log(filteredControllerName[0], 'btndhghg')

    //    console.log(userRole.user_role.user_role_permission[0].user_role_id)
    return (

        <div class="col-md-12 bg-light body-content  p-4">
            <div class=" border-primary shadow-sm border-0">
                <div
                    style={{ backgroundColor: '#4267b2' }}
                    class="card-header custom-card-header  py-1  clearfix bg-gradient-primary text-white">
                    <h5 class="card-title card-header-color font-weight-bold mb-0  float-left mt-1">Create User Role</h5>
                    <div class="card-title card-header-color font-weight-bold mb-0  float-right"> <Link href={`/Admin/${filteredControllerName[0]?.controller_name}/${filteredControllerName[0]?.method_name}?page-group=${filteredControllerName[0]?.page_group}`} class="btn btn-sm btn-info">Back to User role List</Link></div>
                </div>
                <div class="alert alert-warning mb-0 mx-4 mt-4 text-danger font-weight-bold" role="alert">
                    (<small><sup><i class="text-danger fas fa-star"></i></sup></small>) field required
                </div>
                <div class="card-body">
                    <form class=""
                        onSubmit={handleEditUserRole}
                        autocomplete="off">
                        <div class="form-group row">
                            <label class="col-form-label font-weight-bold col-md-2 font-weight-bold">Role Name:<small><sup><small><i class="text-danger fas fa-star"></i></small></sup></small></label>
                            <div class="col-md-6">
                                <input type="text"
                                    onChange={handleChange}
                                    name="role_name" class="form-control form-control-sm  required " placeholder="Enter Role Name"
                                    defaultValue={userRole?.user_role?.role_name}
                                />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-form-label font-weight-bold col-md-2 font-weight-bold ">Page List:<small><sup><small><i class="text-danger fas fa-star"></i></small></sup></small></label>
                            <br />
                            <div class="col-md-10 "


                            >
                                <div class=" mb-2" >


                                    <div className='mt-2' >
                                        <div style={{ width: '15%', fontSize: '15px' }} className="form-check form-check-inline w-15">
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

                                        <div
                                            style={{ width: '15%', fontSize: '15px' }} class="form-check form-check-inline w-15">
                                            <input class="form-check-input create_method_all head" type="checkbox"
                                                checked={createAllChecked}
                                                onChange={(e) => handleCreateAllChange(e.target.checked)}
                                            // handleCreateAllChange
                                            />


                                            <label class="form-check-label font-weight-bold" for="inlineCheckbox1">Create All <span class="badge badge-info" data-toggle="popover" title="" data-content="Double click to any 'create page text' for activating 'Default Dashboard' after Login." data-original-title="Default Page"><i class="fas fa-info-circle"></i></span></label>
                                        </div>
                                        <div
                                            style={{ width: '15%', fontSize: '15px' }} class="form-check form-check-inline w-15">
                                            <input class="form-check-input list_method_all head" type="checkbox"
                                                checked={viewAllChecked}
                                                onChange={(e) => handleViewAllChange(e.target.checked)}
                                            />
                                            <label class="form-check-label font-weight-bold" for="inlineCheckbox1">View All <span class="badge badge-info" data-toggle="popover" title="" data-content="Double click to any 'view/list page text' for activating 'Default Dashboard' after Login." data-original-title="Default Page"><i class="fas fa-info-circle"></i></span></label>
                                        </div>
                                        <div
                                            style={{ width: '15%', fontSize: '15px' }} class="form-check form-check-inline w-15">
                                            <input class="form-check-input edit_method_all head" type="checkbox"

                                                checked={editAllChecked}
                                                onChange={(e) => handleEditAllChange(e.target.checked)}
                                            />
                                            <label class="form-check-label font-weight-bold" for="inlineCheckbox1">Edit All</label>
                                        </div>
                                        <div
                                            style={{ width: '15%', fontSize: '15px' }} class="form-check form-check-inline w-15">
                                            <input class="form-check-input copy_method_all head" type="checkbox"
                                                checked={copyAllChecked}
                                                onChange={(e) => handleCopyAllChange(e.target.checked)}

                                            />
                                            <label class="form-check-label font-weight-bold" for="inlineCheckbox1">Copy All</label>
                                        </div>
                                        <div
                                            style={{ width: '15%', fontSize: '15px' }} class="form-check form-check-inline w-15">
                                            <input class="form-check-input delete_method_all head"
                                                checked={deleteAllChecked}
                                                onChange={(e) => handleDeleteAllChange(e.target.checked)}
                                                type="checkbox" />
                                            <label class="form-check-label font-weight-bold" for="inlineCheckbox1">Delete All</label>
                                        </div>
                                    </div>


                                </div>



                                <div className=''>
                                    {loading ?


                                        <div class=" d-flex justify-content-center">
                                            <div class="spinner-border" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        :
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




                                                                        <div key={display.id}
                                                                            className="form-check form-check-inline  py-2 "
                                                                            id='methodss'

                                                                            style={{ width: '15%', fontWeight: '650', fontSize: '12px' }}                                                          >


                                                                            {
                                                                                display.display_name === '' &&
                                                                                <p><br /></p>
                                                                            }
                                                                            {

                                                                                display.display_name !== '' &&
                                                                                <>

                                                                                    <input
                                                                                        name='check_box'
                                                                                        id={`yourCheckboxId_${display?.method_names[0]?.method_id}`} // Add this ID attribute
                                                                                        className="form-check-input"
                                                                                        type="checkbox"


                                                                                        checked={selectedMethodsArrays?.includes(display.method_names[0].method_id) || selectedMethods.includes(display.method_names[0].method_id)}
                                                                                        value={selectedMethodsArrayss?.includes(display.method_names[0].method_id)}

                                                                                        onChange={(e) => handleCheckboxClick(display?.method_names[0]?.method_id, e.target.checked)}


                                                                                    />

                                                                                    <label
                                                                                        style={{ marginTop: '7px' }}
                                                                                        className={` ${doubleClickedDisplayName === display.display_name ? 'bg-danger text-white rounded px-2 ' : 'text-black'} `}
                                                                                        onDoubleClick={() => handleDoubleClick(display)}
                                                                                    >
                                                                                        {display.display_name}
                                                                                    </label>
                                                                                </>
                                                                            }



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
                        </div>

                        <input type="hidden" name="status" value='0' />
                        <input type="hidden" name="default_page" value={userRole?.user_role?.user_role_permission[0]?.user_role_id} />
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <input
                                    onClick={handleEditUserRole}

                                    type="button" disabled="" class="btn btn-sm btn-success submit" value="Submit" />
                            </div>
                        </div>
                    </form>

                </div>
            </div >
        </div >
    );
};


export default UserRoleEdit;