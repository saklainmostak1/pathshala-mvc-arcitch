'use client'
import React from 'react';
import '../../../admin_layout/modal/fa.css'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useEffect } from 'react';

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

    const [selectedMethods, setSelectedMethods] = useState([]);






    //     const handleCheckboxClick = (methodId, checked) => {

    //         const method_sort = usersRoleCreate
    //         .flatMap((roleCreate) => roleCreate.controllers)
    //         .flatMap((controllers) => controllers.display_names)
    //         .flatMap((display) => display.method_names)
    //         .filter((m) => m.method_id === methodId)
    //         .map((m) => m.method_sort);
    // console.log(method_sort)

    //         const updatedSelectedMethods = new Set(selectedMethods);

    //         const parentMethodId = usersRoleCreate
    //             .flatMap((roleCreate) => roleCreate.controllers)
    //             .flatMap((controllers) => controllers.display_names)
    //             .flatMap((display) => display.method_names)
    //             .find((method) => method.method_id === methodId)?.parent_id || 0;

    //         if (checked) {
    //             updatedSelectedMethods.add(methodId);

    //             if (parentMethodId === 0) {
    //                 // Uncheck all checkboxes with method_id equal to their parent_id
    //                 const childMethodIds = usersRoleCreate
    //                     .flatMap((roleCreate) => roleCreate.controllers)
    //                     .flatMap((controllers) => controllers.display_names)
    //                     .flatMap((display) => display.method_names)
    //                     .filter((method) => method.parent_id === methodId)
    //                     .map((method) => method.method_id);

    //                 childMethodIds.forEach((childMethodId) => updatedSelectedMethods.add(childMethodId));
    //             }
    //         } else {
    //             updatedSelectedMethods.delete(methodId);

    //             if (parentMethodId === 0) {
    //                 // Uncheck all checkboxes with method_id equal to their parent_id
    //                 const childMethodIds = usersRoleCreate
    //                     .flatMap((roleCreate) => roleCreate.controllers)
    //                     .flatMap((controllers) => controllers.display_names)
    //                     .flatMap((display) => display.method_names)
    //                     .filter((method) => method.parent_id === methodId)
    //                     .map((method) => method.method_id);

    //                 childMethodIds.forEach((childMethodId) => updatedSelectedMethods.delete(childMethodId));
    //             } 
    //             else {
    //                 // If the checkbox being unchecked is for an item with menu_type = 1 and parent_id != 0,
    //                 // remove the background
    //                 const display = usersRoleCreate
    //                     .flatMap((roleCreate) => roleCreate.controllers)
    //                     .flatMap((controllers) => controllers.display_names)
    //                     .flatMap((display) => display.method_names)
    //                     .find((method) => method.method_id === methodId);

    //                 if (display && display.menu_type === 1 && display.parent_id !== 0) {
    //                     setDoubleClickedDisplayName(null); // Remove background
    //                 }
    //             }
    //         }

    //         const uniqueSelectedMethods = Array.from(updatedSelectedMethods);
    //         setSelectedMethods(uniqueSelectedMethods);
    //         if (uniqueSelectedMethods.length === 0) {
    //             document.querySelector('input[name="default_page"]').value = '0';
    //         }
    //     };



    // const handleCheckboxClick = (methodId, checked) => {
    //     const updatedSelectedMethods = new Set(selectedMethods);

    //     if (checked) {
    //         updatedSelectedMethods.add(methodId);
    //     } else {
    //         updatedSelectedMethods.delete(methodId);

    //         const display = usersRoleCreate
    //             .flatMap((roleCreate) => roleCreate.controllers)
    //             .flatMap((controllers) => controllers.display_names)
    //             .flatMap((display) => display.method_names)
    //             .find((method) => method.method_id === methodId);

    //         if (display && display.menu_type === 1 && display.parent_id !== 0) {
    //             setDoubleClickedDisplayName(null); // Remove background
    //         }
    //     }

    //     const uniqueSelectedMethods = Array.from(updatedSelectedMethods);
    //     setSelectedMethods(uniqueSelectedMethods);

    //     if (uniqueSelectedMethods.length === 0) {
    //         document.querySelector('input[name="default_page"]').value = '0';
    //     }
    // };






   
    // original

    // const handleCheckboxClick = (methodId, checked) => {
    //     const updatedSelectedMethods = new Set(selectedMethods);

    //     if (checked) {
    //         updatedSelectedMethods.add(methodId);
    //     } else {

    //          updatedSelectedMethods.delete(methodId);

    //         const display = usersRoleCreate
    //             .flatMap((roleCreate) => roleCreate.controllers)
    //             .flatMap((controllers) => controllers.display_names)
    //             .flatMap((display) => display.method_names)
    //             .find((method) => method.method_id === methodId);

    //         if (display && display.menu_type === 1 && display.parent_id !== 0) {
    //             setDoubleClickedDisplayName(null); // Remove background color
    //         }
    //     }

    //     // Find the controller containing the method with the specified methodId
    //     const controllerWithMethodId = usersRoleCreate
    //         .flatMap((roleCreate) => roleCreate.controllers)
    //         .find((controllers) =>
    //             controllers.display_names.some((display) =>
    //                 display.method_names.some((m) => m.method_id === methodId)
    //             )
    //         );

    //     if (controllerWithMethodId) {


    //         // Access the method_sort from controllerWithMethodId
    //         const method = controllerWithMethodId.display_names
    //             .flatMap((display) => display.method_names)
    //             .find((m) => m.method_id === methodId);

    //         if (method) {
    //             const method_sort = method.method_sort;

    //             if (method_sort === 0) {
    //                 // Check or uncheck all display_names in the same controller
    //                 controllerWithMethodId.display_names.forEach((display) => {
    //                     display.method_names.forEach((m) => {
    //                         const displayMethodId = m.method_id;
    //                         if (checked) {
    //                             updatedSelectedMethods.add(displayMethodId);
    //                         } else {
    //                             updatedSelectedMethods.delete(displayMethodId);
    //                         }

    //                         // You can also update the checkbox state here
    //                         const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
    //                         if (checkbox) {
    //                             checkbox.checked = checked;
    //                         }
    //                     });
    //                 });
    //             }
    //         }
    //     }

    //     // const uniqueSelectedMethods = Array.from(updatedSelectedMethods);
    //     // setSelectedMethods(uniqueSelectedMethods);

    //     // if (uniqueSelectedMethods.length === 0) {
    //     //     document.querySelector('input[name="default_page"]').value = '0';
    //     // }
    //     const uniqueSelectedMethods = Array.from(updatedSelectedMethods);
    //         setSelectedMethods(uniqueSelectedMethods);

    //         if (uniqueSelectedMethods.length === 0) {
    //             document.querySelector('input[name="default_page"]').value = '0';
    //         }
    // };

    // const handleCheckboxClick = (methodId, checked) => {
    //     const updatedSelectedMethods = new Set(selectedMethods);

    //     if (checked) {
    //         updatedSelectedMethods.add(methodId);
    //     } else {
    //         updatedSelectedMethods.delete(methodId);

    //         const display = usersRoleCreate
    //             .flatMap((roleCreate) => roleCreate.controllers)
    //             .flatMap((controllers) => controllers.display_names)
    //             .flatMap((display) => display.method_names)
    //             .find((method) => method.method_id === methodId);

    //         if (display && display.menu_type === 1 && display.parent_id !== 0) {
    //             setDoubleClickedDisplayName(null); // Remove background color
    //         }
    //     }

    //     // Find the controller containing the method with the specified methodId
    //     const controllerWithMethodId = usersRoleCreate
    //         .flatMap((roleCreate) => roleCreate.controllers)
    //         .find((controllers) =>
    //             controllers.display_names.some((display) =>
    //                 display.method_names.some((m) => m.method_id === methodId)
    //             )
    //         );

    //     if (controllerWithMethodId) {
    //         // Access the method_sort from controllerWithMethodId
    //         const method = controllerWithMethodId.display_names
    //             .flatMap((display) => display.method_names)
    //             .find((m) => m.method_id === methodId);

    //         if (method) {
    //             const method_sort = method.method_sort;

    //             // Check or uncheck display_names in the same controller with method_sort 0, 2, and 4 when method_sort is 1
    //             if (method_sort === 1) {
    //                 controllerWithMethodId.display_names.forEach((display) => {
    //                     display.method_names.forEach((m) => {
    //                         if (m.method_sort === 0 || m.method_sort === 2 || m.method_sort === 4) {
    //                             const displayMethodId = m.method_id;
    //                             if (checked) {
    //                                 updatedSelectedMethods.add(displayMethodId);
    //                             } else {
    //                                 updatedSelectedMethods.delete(displayMethodId);
    //                             }

    //                             // You can also update the checkbox state here
    //                             const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
    //                             if (checkbox) {
    //                                 checkbox.checked = checked;
    //                             }
    //                         }
    //                     });
    //                 });
    //             }
    //         }
    //     }

    //     const uniqueSelectedMethods = Array.from(updatedSelectedMethods);
    //     setSelectedMethods(uniqueSelectedMethods);

    //     if (uniqueSelectedMethods.length === 0) {
    //         document.querySelector('input[name="default_page"]').value = '0';
    //     }
    // };
    const allMethodSorts = [];
// const handleCheckboxClick = (methodId, checked) => {
//     const updatedSelectedMethods = new Set(selectedMethods);

//     if (checked) {
//         updatedSelectedMethods.add(methodId);
//     } else {
//         updatedSelectedMethods.delete(methodId);

//         const display = usersRoleCreate
//             .flatMap((roleCreate) => roleCreate.controllers)
//             .flatMap((controllers) => controllers.display_names)
//             .flatMap((display) => display.method_names)
//             .find((method) => method.method_id === methodId);

//         if (display && display.menu_type === 1 && display.parent_id !== 0) {
//             setDoubleClickedDisplayName(null); // Remove background
//         }
//     }
//     const controller = usersRoleCreate
//     .flatMap((roleCreate) => roleCreate.controllers)
//     .find((controller) =>
//         controller.display_names.some((display) =>
//             display.method_names.some((m) => m.method_id === methodId)
//         )
//     );

//     if (controller) {
//         // Find the method associated with the checked methodId
//         const method = controller.display_names
//             .flatMap((display) => display.method_names)
//             .find((m) => m.method_id === methodId);
    
//         // Check if the checkbox is checked
//         if (checked && method) {
//             const methodSort = method.method_sort;
//             console.log(`Method Sort for Checked Method (methodId ${methodId}): ${methodSort}`);
//         }
//     }
//     const uniqueSelectedMethods = Array.from(updatedSelectedMethods);
//     setSelectedMethods(uniqueSelectedMethods);

//     if (uniqueSelectedMethods.length === 0) {
//         document.querySelector('input[name="default_page"]').value = '0';
//     }
// }

// const handleCheckboxClick = (methodId, checked) => {
//     const updatedSelectedMethods = new Set(selectedMethods);
//     const checkedMethodSorts = []; // Array to store checked method_sort values

//     if (checked) {
//         updatedSelectedMethods.add(methodId);
//     } else {
//         updatedSelectedMethods.delete(methodId);

//         const display = usersRoleCreate
//             .flatMap((roleCreate) => roleCreate.controllers)
//             .flatMap((controllers) => controllers.display_names)
//             .flatMap((display) => display.method_names)
//             .find((method) => method.method_id === methodId);

//         if (display && display.menu_type === 1 && display.parent_id !== 0) {
//             setDoubleClickedDisplayName(null); // Remove background
//         }
//     }

//     // Here, instead of resetting the checkedMethodSorts, we'll keep the previous values.
//     // First, copy the previous values to the new array.
//     checkedMethodSorts.forEach((sort) => {
//         if (!checkedMethodSorts.includes(sort)) {
//             checkedMethodSorts.push(sort);
//         }
//     });

//     const controller = usersRoleCreate
//         .flatMap((roleCreate) => roleCreate.controllers)
//         .find((controller) =>
//             controller.display_names.some((display) =>
//                 display.method_names.some((m) => m.method_id === methodId)
//             )
//         );

//     if (controller) {
//         // Find the method associated with the checked methodId
//         const method = controller.display_names
//             .flatMap((display) => display.method_names)
//             .find((m) => m.method_id === methodId);

//         // Check if the checkbox is checked and the method is found
//         if (checked && method) {
//             const methodSort = method.method_sort;
//             if (!checkedMethodSorts.includes(methodSort)) {
//                 checkedMethodSorts.push(methodSort); // Push the method_sort into the array if not already added
//             }
//         }
//     }

//     console.log("Checked Method Sorts:", checkedMethodSorts);

//     const uniqueSelectedMethods = Array.from(updatedSelectedMethods);
//     setSelectedMethods(uniqueSelectedMethods);

//     if (uniqueSelectedMethods.length === 0) {
//         document.querySelector('input[name="default_page"]').value = '0';
//     }
// }

// const handleCheckboxClick = (methodId, checked) => {
//     const updatedSelectedMethods = new Set(selectedMethods);
//     const checkedMethodSorts = []; // Array to store checked method_sort values

//     if (checked) {
//         updatedSelectedMethods.add(methodId);
//     } else {
//         updatedSelectedMethods.delete(methodId);
//     }

//     const controller = usersRoleCreate
//         .flatMap((roleCreate) => roleCreate.controllers)
//         .find((controller) =>
//             controller.display_names.some((display) =>
//                 display.method_names.some((m) => m.method_id === methodId)
//             )
//         );

//     if (controller) {
//         // Find the method associated with the checked methodId
//         const method = controller.display_names
//             .flatMap((display) => display.method_names)
//             .find((m) => m.method_id === methodId);

//         // Check if the checkbox is checked and the method is found
//         if (checked && method) {
//             const methodSort = method.method_sort;
//             if (!checkedMethodSorts.includes(methodSort)) {
//                 checkedMethodSorts.push(methodSort); // Push the method_sort into the array if not already added
//             }
//         }
//     }

//     console.log("Checked Method Sorts:", checkedMethodSorts);

//     const uniqueSelectedMethods = Array.from(updatedSelectedMethods);
//     setSelectedMethods(uniqueSelectedMethods);

//     if (uniqueSelectedMethods.length === 0) {
//         document.querySelector('input[name="default_page"]').value = '0';
//     }
// };
    const handleCheckboxClick = (methodId, checked) => {
        const controller = usersRoleCreate
            .flatMap((roleCreate) => roleCreate.controllers)
            .find((controller) =>
                controller.display_names.some((display) =>
                    display.method_names.some((m) => m.method_id === methodId)
                )
            );

        if (controller) {
            // Extract all method_sort values for the controller's display names
            const methodSorts = controller.display_names
                .flatMap((display) => display.method_names)
                .map((m) => m.method_sort);

            // Update the allMethodSorts array with unique method_sort values
            methodSorts.forEach((method_sort) => {
                if (!allMethodSorts.includes(method_sort)) {
                    allMethodSorts.push(method_sort);
                }
            });
            console.log(allMethodSorts.length)
            // Display all method_sort values
            console.log(`All Method Sorts: [${allMethodSorts.join(', ')}]`);




        }







        const updatedSelectedMethods = new Set(selectedMethods);

        if (checked) {
            updatedSelectedMethods.add(methodId);
        } else {
            updatedSelectedMethods.delete(methodId);
        }

        const display = usersRoleCreate
            .flatMap((roleCreate) => roleCreate.controllers)
            .flatMap((controllers) => controllers.display_names)
            .flatMap((display) => display.method_names)
            .find((method) => method.method_id === methodId);

        if (display && display.menu_type === 1 && display.parent_id !== 0) {
            setDoubleClickedDisplayName(null); // Remove background color
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
                    
                    
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 0 || m.method_sort === 2 || m.method_sort === 4) {
                                const displayMethodId = m.method_id;
                                if (checked || m.method_sort === 0) {
                                    updatedSelectedMethods.add(displayMethodId);
                                    checkedMethodSortCount1++ ; // Increment the count when a method_sort is checked
                                } else {
                                    updatedSelectedMethods.delete(displayMethodId);
                                }

                                // You can also update the checkbox state here
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    checkbox.checked = checked;
                                }
                            }
                        });
                    });
                    
                    console.log("Total method_sort values: ", checkedMethodSortCount1);
                }
            
                else if (method_sort === 2) {
                    // Check or uncheck display_names in the same controller with method_sort 0, 2, and 4 when method_sort is 1

                    let checkedMethodSortCount = 0;


                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 0) {
                                const displayMethodId = m.method_id;
                                if (checked || m.method_sort === 0) {
                                    updatedSelectedMethods.add(displayMethodId);
                                    checkedMethodSortCount++
                                } else {
                                    updatedSelectedMethods.delete(displayMethodId);
                                }

                                // You can also update the checkbox state here
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    checkbox.checked = checked;
                                }
                            }
                        });
                    });
                    console.log("Total method_sort values: ", checkedMethodSortCount);
                }
                else if (method_sort === 3) {
                    // Check or uncheck display_names in the same controller with method_sort 0, 2, and 4 when method_sort is 1
                    let checkedMethodSortCount = 0;
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 0 || m.method_sort === 2) {
                                const displayMethodId = m.method_id;
                                if (checked || m.method_sort === 0) {
                                    updatedSelectedMethods.add(displayMethodId);
                                    checkedMethodSortCount++
                                } else {
                                    updatedSelectedMethods.delete(displayMethodId);
                                }

                                // You can also update the checkbox state here
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    checkbox.checked = checked;
                                }
                            }
                        });
                    });
                    console.log("Total method_sort values: ", checkedMethodSortCount);
                }
                else if (method_sort === 4) {
                    // Check or uncheck display_names in the same controller with method_sort 0, 2, and 4 when method_sort is 1
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 0 || m.method_sort === 1 || m.method_sort === 2 ) {
                                const displayMethodId = m.method_id;
                                if (checked || m.method_sort === 0) {
                                    updatedSelectedMethods.add(displayMethodId);
                                } else {
                                    updatedSelectedMethods.delete(displayMethodId);
                                }

                                // You can also update the checkbox state here
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    checkbox.checked = checked;
                                }
                            }
                        });
                    });
                }
                else if (method_sort === 5) {
                    // Check or uncheck display_names in the same controller with method_sort 0, 2, and 4 when method_sort is 1
                    controllerWithMethodId.display_names.forEach((display) => {
                        display.method_names.forEach((m) => {
                            if (m.method_sort === 0 || m.method_sort === 2) {
                                const displayMethodId = m.method_id;
                                if (checked || m.method_sort === 0) {
                                    updatedSelectedMethods.add(displayMethodId);
                                } else {
                                    updatedSelectedMethods.delete(displayMethodId);
                                }

                                // You can also update the checkbox state here
                                const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
                                if (checkbox) {
                                    checkbox.checked = checked;
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
   









    // const handleCheckboxClick = (methodId) => {
    //     // Find the controller containing the method with the specified methodId
    //     const controllerWithMethodId = usersRoleCreate
    //         .flatMap((roleCreate) => roleCreate.controllers)
    //         .find((controllers) =>
    //             controllers.display_names.some((display) =>
    //                 display.method_names.some((m) => m.method_id === methodId)
    //             )
    //         );

    //     if (controllerWithMethodId) {
    //         const controllerName = controllerWithMethodId.controller_name;
    //         console.log(`Controller Name: ${controllerName}`);

    //         // Access the method_sort from controllerWithMethodId
    //         const method = controllerWithMethodId.display_names
    //             .flatMap((display) => display.method_names)
    //             .find((m) => m.method_id === methodId);

    //         if (method) {
    //             const method_sort = method.method_sort;

    //             if (method_sort === 0) {
    //                 // Toggle the checked state of all display_names in the same controller
    //                 controllerWithMethodId.display_names.forEach((display) => {
    //                     const displayMethodId = display.method_names[0].method_id;
    //                     const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
    //                     if (checkbox) {
    //                         checkbox.checked = !checkbox.checked; // Toggle the checked state
    //                         if (checkbox.checked) {
    //                             console.log(`Checking ${display.display_name} (method_sort: ${display.method_names[0].method_sort})`);
    //                             // Perform your checkbox checking logic here
    //                         } else {
    //                             console.log(`Unchecking ${display.display_name}`);
    //                             // Perform your checkbox unchecking logic here
    //                         }
    //                     }
    //                 });
    //             } else if (method_sort === 0) {
    //                 // Check the clicked display_name if its method_sort is 0
    //                 const checkbox = document.getElementById(`yourCheckboxId_${methodId}`);
    //                 if (checkbox) {
    //                     checkbox.checked = !checkbox.checked; // Toggle the checked state
    //                     if (checkbox.checked) {
    //                         console.log(`Checking ${controllerWithMethodId.display_name}`);
    //                         // Perform your checkbox checking logic here
    //                     } else {
    //                         console.log(`Unchecking ${controllerWithMethodId.display_name.method_names.map(method_name => method_name.method_name)}`);
    //                         // Perform your checkbox unchecking logic here
    //                     }
    //                 }
    //             }
    //         }
    //     } else {
    //         console.log('Controller not found for the specified methodId.');
    //     }
    // };

    




    // const handleCheckboxClick = (methodId) => {

    //     const controllerWithMethodId = usersRoleCreate
    //         .flatMap((roleCreate) => roleCreate.controllers)
    //         .find((controllers) =>
    //             controllers.display_names.some((display) =>
    //                 display.method_names.some((m) => m.method_id === methodId)
    //             )
    //         );
    //     console.log(controllerWithMethodId)

    //     const method_sort = controllerWithMethodId.display_names.map(display_name => display_name.method_names.map(methodName => methodName.method_sort))

    //     console.log(method_sort)


    //     if (controllerWithMethodId) {
    //         const controllerName = controllerWithMethodId.controller_name;
    //         console.log(`Controller Name: ${controllerName}`);

    //         // Access the method_sort from controllerWithMethodId
    //         const method_sort = controllerWithMethodId.display_names
    //             .flatMap((display) => display.method_names)
    //             .find((m) => m.method_id === methodId)
    //             ?.method_sort;

    //         if (method_sort !== undefined) {
    //             console.log(`Method Sort: ${method_sort}`);
    //         } else {
    //             console.log(`Method Sort not found for Method ID ${methodId}`);
    //         }
    //     } else {
    //         console.log('Controller not found for the specified methodId.');
    //     }

    // };


    const [doubleClickedDisplayName, setDoubleClickedDisplayName] = useState(0);





    const handleDoubleClick = (display) => {

        const page = display.method_names[0].method_id;
        const page1 = display.method_names[0].parent_id;
        console.log(page, page1);
        const checkbox = document.querySelector(`#yourCheckboxId_${display.method_names[0].method_id}`);
        if (display.method_names[0].menu_type === 1 && display.method_names[0].parent_id !== 0 && checkbox && checkbox.checked) {

            if (doubleClickedDisplayName === display.display_name) {
                setDoubleClickedDisplayName(null); // Remove 
                const statusInput = document.querySelector('input[name="default_page"]');
                if (statusInput) {
                    statusInput.value = '0';
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


    const handleFormSubmit = () => {
        // Get the role_name input value
        const roleName = document.querySelector('input[name="role_name"]').value;


        // Create an object to store the data you want to submit
        const formData = {
            user_default_page: document.querySelector('input[name="default_page"]').value,
            role_name: roleName,
            user_page_list_id: selectedMethods,
            status: document.querySelector('input[name="status"]').value,
        };


        console.log('Form Data:', formData);
        // http://192.168.0.110:5002/user/user-role-create

        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Server response:', data);

            })
            .catch(error => {
                console.error('Error submitting the form:', error);

            });

        console.log('Selected Method IDs:', selectedMethods);
    };







    const [createAllChecked, setCreateAllChecked] = useState(false);
    // const handleCreateAllChange = (isChecked) => {

    //     setCreateAllChecked(isChecked);

    //     if (isChecked) {
    //         // If "Create All" is checked, get the method IDs to check
    //         const methodIdsToCheck = filteredDisplayNames.map((method) => method.method_id);

    //         // Check the method IDs for "Create All"
    //         setSelectedMethods((prevSelectedMethods) => [...prevSelectedMethods, ...methodIdsToCheck]);
    //     } else {
    //         // If "Create All" is unchecked, clear selected checkboxes for "Create All" methods
    //         setSelectedMethods((prevSelectedMethods) => prevSelectedMethods.filter((methodId) => !filteredDisplayNames.some((method) => method.method_id === methodId)));
    //     }
    // };
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
                    return !method || method.method_sort === 0;
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
            // If "View All" is checked, get the method IDs to check
            const methodIdsToCheck = filteredDisplayNamesViewAll.map((method) => method.method_id);

            // Check the method IDs for "View All"
            setSelectedMethods((prevSelectedMethods) => [...prevSelectedMethods, ...methodIdsToCheck]);
        } else {
            setSelectedMethods((prevSelectedMethods) => {
                // Keep the method_ids with method_sort === 0 when "Create All" is unchecked
                return prevSelectedMethods.filter((methodId) => {
                    const method = filteredDisplayNamesViewAll.find((item) => item.method_id === methodId);
                    return !method || method.method_sort === 0;
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
            // If "Create All" is checked, check all checkboxes for the filtered display names
            const methodIdsToCheck = filteredDisplayNamesEditAll.map((method) => method.method_id);

            setSelectedMethods((prevSelectedMethods) => [...prevSelectedMethods, ...methodIdsToCheck]);
        } else {

            setSelectedMethods((prevSelectedMethods) => {
                // Keep the method_ids with method_sort === 0 when "Create All" is unchecked
                return prevSelectedMethods.filter((methodId) => {
                    const method = filteredDisplayNamesEditAll.find((item) => item.method_id === methodId);
                    return !method || method.method_sort === 0;
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
            // If "Create All" is checked, check all checkboxes for the filtered display names
            const methodIdsToCheck = filteredDisplayNamesCopyAll.map((method) => method.method_id);
            setSelectedMethods((prevSelectedMethods) => [...prevSelectedMethods, ...methodIdsToCheck]);
        } else {
            setSelectedMethods((prevSelectedMethods) => {
                // Keep the method_ids with method_sort === 0 when "Create All" is unchecked
                return prevSelectedMethods.filter((methodId) => {
                    const method = filteredDisplayNamesCopyAll.find((item) => item.method_id === methodId);
                    return !method || method.method_sort === 0;
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
            // If "Create All" is checked, check all checkboxes for the filtered display names
            const methodIdsToCheck = filteredDisplayNamesDeleteAll.map((method) => method.method_id);

            // Add the method IDs to the selectedMethods state
            setSelectedMethods((prevSelectedMethods) => [...prevSelectedMethods, ...methodIdsToCheck]);
        } else {
            setSelectedMethods((prevSelectedMethods) => {
                // Keep the method_ids with method_sort === 0 when "Create All" is unchecked
                return prevSelectedMethods.filter((methodId) => {
                    const method = filteredDisplayNamesDeleteAll.find((item) => item.method_id === methodId);
                    return !method || method.method_sort === 0;
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

    // const [deleteAllChecked, setDeleteAllChecked] = useState(false);
    // const handleDeleteAllChange = (isChecked) => {
    //     setDeleteAllChecked(isChecked);

    //     if (isChecked) {
    //         // If "Create All" is checked, check all checkboxes for the filtered display names
    //         const methodIdsToCheck = filteredDisplayNamesDeleteAll.map((method) => method.method_id);

    //         // Add the method IDs to the selectedMethods state
    //         setSelectedMethods(methodIdsToCheck);
    //     } else {
    //         // If "Create All" is unchecked, clear selected checkboxes
    //         setSelectedMethods([]);
    //     }
    // };
    // const filteredDisplayNamesDeleteAll = usersRoleCreate
    //     .flatMap((roleCreate) => roleCreate.controllers)
    //     .flatMap((controllers) => controllers.display_names)
    //     .flatMap((display) => display.method_names)
    //     .filter((method) => [0, 2, 5].includes(method.method_sort));

    // console.log('Filtered Display Names delete all:', filteredDisplayNamesViewAll);

    // const [viewAllChecked, setViewAllChecked] = useState(false);


    // const handleViewAllChange = (isChecked) => {
    //   setViewAllChecked(isChecked);

    //   if (isChecked) {
    //     // If "View All" is checked, get the method IDs to check
    //     const methodIdsToCheck = filteredDisplayNamesViewAll.map((method) => method.method_id);

    //     // Check the method IDs for "View All"
    //     setSelectedMethods((prevSelectedMethods) => [...prevSelectedMethods, ...methodIdsToCheck]);
    //   } else {
    //     // If "View All" is unchecked, clear selected checkboxes for "View All" methods
    //     setSelectedMethods((prevSelectedMethods) => prevSelectedMethods.filter((methodId) => !filteredDisplayNamesViewAll.some((method) => method.method_id === methodId)));
    //   }
    // };

    // else if (method_sort === 1) {
    //     // Check or uncheck display_names in the same controller with method_sort 0, 2, and 4 when method_sort is 1
    //     controllerWithMethodId.display_names.forEach((display) => {
    //         display.method_names.forEach((m) => {
    //             if (m.method_sort === 0 || m.method_sort === 2 || m.method_sort === 4) {
    //                 const displayMethodId = m.method_id;
    //                 if (checked) {
    //                     updatedSelectedMethods.add(displayMethodId);
    //                 } else {
    //                     updatedSelectedMethods.delete(displayMethodId);
    //                 }

    //                 // You can also update the checkbox state here
    //                 const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
    //                 if (checkbox) {
    //                     checkbox.checked = checked;
    //                 }
    //             }
    //         });
    //     });
    // }

    // else if (method_sort === 1) {
    //     const methodSorts = [];

    //     controllerWithMethodId.display_names.forEach((display) => {
    //         display.method_names.forEach((m) => {
    //             if (m.method_sort === 0 || m.method_sort === 2 || m.method_sort === 4) {
    //                 const displayMethodId = m.method_id;
    //                 if (checked) {
    //                     updatedSelectedMethods.add(displayMethodId);
    //                 } else {
    //                     updatedSelectedMethods.delete(displayMethodId);
    //                 }

    //                 // You can also update the checkbox state here
    //                 const checkbox = document.getElementById(`yourCheckboxId_${displayMethodId}`);
    //                 if (checkbox) {
    //                     checkbox.checked = checked;
    //                     // || m.method_sort !== 0;
    //                 }

    //                 // Push the method_sort value to the array
    //                 methodSorts.push(m.method_sort);
    //             }
    //         });
    //     });

    //     console.log("All method_sort values:", methodSorts);
    // }
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
                                <input type="text" name="role_name" class="form-control form-control-sm  required " placeholder="Enter Role Name" />
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
                                        <input class="form-check-input create_method_all head" type="checkbox"
                                            checked={createAllChecked}
                                            onChange={(e) => handleCreateAllChange(e.target.checked)}
                                        // handleCreateAllChange
                                        />


                                        <label class="form-check-label font-weight-bold" for="inlineCheckbox1">Create All <span class="badge badge-info" data-toggle="popover" title="" data-content="Double click to any 'create page text' for activating 'Default Dashboard' after Login." data-original-title="Default Page"><i class="fas fa-info-circle"></i></span></label>
                                    </div>
                                    <div class="form-check form-check-inline w-15">
                                        <input class="form-check-input list_method_all head" type="checkbox"
                                            checked={viewAllChecked}
                                            onChange={(e) => handleViewAllChange(e.target.checked)}
                                        />
                                        <label class="form-check-label font-weight-bold" for="inlineCheckbox1">View All <span class="badge badge-info" data-toggle="popover" title="" data-content="Double click to any 'view/list page text' for activating 'Default Dashboard' after Login." data-original-title="Default Page"><i class="fas fa-info-circle"></i></span></label>
                                    </div>
                                    <div class="form-check form-check-inline w-15">
                                        <input class="form-check-input edit_method_all head" type="checkbox"

                                            checked={editAllChecked}
                                            onChange={(e) => handleEditAllChange(e.target.checked)}
                                        />
                                        <label class="form-check-label font-weight-bold" for="inlineCheckbox1">Edit All</label>
                                    </div>
                                    <div class="form-check form-check-inline w-15">
                                        <input class="form-check-input copy_method_all head" type="checkbox"
                                            checked={copyAllChecked}
                                            onChange={(e) => handleCopyAllChange(e.target.checked)}

                                        />
                                        <label class="form-check-label font-weight-bold" for="inlineCheckbox1">Copy All</label>
                                    </div>
                                    <div class="form-check form-check-inline w-15">
                                        <input class="form-check-input delete_method_all head"
                                            checked={deleteAllChecked}
                                            onChange={(e) => handleDeleteAllChange(e.target.checked)}
                                            type="checkbox" />
                                        <label class="form-check-label font-weight-bold" for="inlineCheckbox1">Delete All</label>
                                    </div>
                                </div>



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
                                                                            name='check_box' id={`yourCheckboxId_${display.method_names[0].method_id}`} // Add this ID attribute
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
                        <input type="hidden" name="default_page" value='0' />
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