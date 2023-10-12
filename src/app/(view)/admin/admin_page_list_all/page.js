'use client'
import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import { useState } from 'react';
import '../userStyle.css'
import { HiEye, HiPencilAlt, HiTrash } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { FaTrashAlt } from "react-icons/fa";
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

const AdminPageListAll = () => {
    const { data: users = [], isLoading, refetch
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/allAdmin`)

            const data = await res.json()
            return data
        }
    })
console.log(users)




   

 const usersWithParentIdZero = users.filter((user) => user.parent_id === 0);
 console.log(usersWithParentIdZero, 'nayan')
    // console.log(users, 'nayan')
    // const [users, setUsers] = useState([])

    // useEffect(() => {
    //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/allAdmin`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setUsers(data)
    //         })
    // }, [])
    // paigination Start
    const itemsPerPage = 20;

    const [currentPage, setCurrentPage] = useState(0);

    const pageCount = Math.ceil(usersWithParentIdZero?.length / itemsPerPage);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const slicedItems = usersWithParentIdZero?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // paigination end

    const handleDelete = async (parentId) => {
        try {
          // Fetch child data based on the parent ID
          const childDataResponse = await fetch(`http://192.168.0.110:5002/admin/allAdmin?parent_id=${parentId}`);
          const childData = await childDataResponse.json();
      
          // Use find to check if child data exists
          const childExists = childData.find(child => child.parent_id === parentId);
          const proceed = window.confirm('Are you sure you want to delete?');
          if (childExists) {
            alert("Cannot delete Data is running");
            return;
          }
      
          // If no child data exists, proceed with parent data deletion
       if(proceed){
        const deleteResponse = await fetch(`http://192.168.0.110:5002/admin/allAdmin/${parentId}`, {
            method: 'DELETE',
          })
          .then((response) => response.json())
          .then((data) => {
            if (data.affectedRows > 0) {
              refetch();
              Swal.fire({
                title: 'Delete!',
                text: 'User deleted successfully!',
                icon: 'success',
                confirmButtonText: 'Ok',
              });
              console.log(data);
            }
          })
          if (deleteResponse) {
            // Handle successful deletion
            console.log('Parent data deleted successfully.');
            // You may want to update your UI or refetch data here.
          } 
        //   else {
        //     // Handle deletion error
        //     console.error('Error deleting parent data.');
        //   }
       }
      
          
        } 
        catch (error) {
          console.error('Error:', error);
        }
      };
    // const handleDelete = (id) => {

    //     // const userToDelete = users.find((user) => user.id === id);
      
    //     // if (!userToDelete) {
    //     //   alert('User not found.');
    //     //   return;
    //     // }
      
    //     // if (userToDelete.parent_id === 0) {
    //     //   alert('Cannot delete this is running');
    //     //   return;
    //     // }
    //     console.log(users.filter((data) => console.log(data.id ) ), 'what the hell')
    //     console.log(users.filter((data) => console.log(data.parent_id ) ), 'what the hell')

     
    //     const proceed = window.confirm('Are you sure you want to delete?');
        
    //     if (proceed) {
    //       fetch(`http://192.168.0.110:5002/admin/allAdmin/${id}`, {
    //         method: 'DELETE',
    //       })
    //         .then((response) => response.json())
    //         .then((data) => {
    //           if (data.affectedRows > 0) {
    //             refetch();
    //             Swal.fire({
    //               title: 'Delete!',
    //               text: 'User deleted successfully!',
    //               icon: 'success',
    //               confirmButtonText: 'Ok',
    //             });
    //             console.log(data);
    //           }
    //         })
           
    //     }
    //     else {
    //         alert('You cannot delete this data.');
    //       }
        
    //   };

//     const updatedDataList = users.filter((data) => data.id );
//     console.log(users.filter((data) => console.log(data.id ) ), 'what the hell')
// console.log(users.filter((data) => console.log(data.parent_id ) ), 'what the hell')
    //   const [dataList, setDataList] = useState([]);
    //   const handleDelete = (id) => {
      
    //     fetch(`http://192.168.0.110:5002/admin/allAdmin/${id}`, {
    //       method: 'DELETE',
    //     })
    //       .then((response) => {
    //         if (response.ok) {
   
    //           const updatedDataList = dataList.filter((data) => data.id !== dataToDelete.parent_id);
    //           setDataList(updatedDataList);
    //         } else {
            
    //           console.error('Failed to delete data');
    //         }
    //       })
    //       .catch((error) => {
    //         console.error('Error:', error);
    //       });
    //   };


    return (
        <div className='p-3'>

            <div className=" mx-auto">
                <section className=" border  rounded mx-auto">
                    <li className="list-group-item text-light  p-1 px-4" aria-current="true" style={{ background: '#4267b2' }}>
                        <div className='d-flex justify-content-between'>
                            <h5 > Users List</h5>
                            <button style={{ background: '#17a2b8' }} className='border-0 text-white shadow-sm rounded-1'><Link href='/Admin/admin_page_list/admin_page_list_create'>Create Admin Page List</Link></button>
                        </div>
                    </li>
                    <Table responsive="lg">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Display Name</th>
                                <th>Controller Name</th>
                                <th>Page Group</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                slicedItems?.map((adminPageAll, i) =>
                                    <tr key={adminPageAll.id} >
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td>
                                            <p className=" text-sm">
                                                {adminPageAll.display_name}
                                            </p>
                                        </td>

                                        <td>
                                            <p className=" text-sm">
                                                {adminPageAll.controller_name}
                                            </p>
                                        </td>
                                      
                                        <td>
                                            <p className=" text-sm">
                                                {adminPageAll.page_group}
                                            </p>
                                        </td>


                                        <td className="">
                                            <div className="flex items-center ">
                                                <button
                                                    style={{ width: "35px ", height: '30px', marginLeft: '2px' }}
                                                    className=" rounded border-0 bg-success text-white
                                    
                                        "
                                                >

                                                    <HiEye></HiEye>
                                                </button>
                                                <Link href={`/Admin/admin_page_list/admin_page_list_edit/${adminPageAll.id}`}>

                                                    <button
                                                        style={{ width: "35px ", height: '30px', marginLeft: '2px', }}
                                                        className=" rounded border-0 bg-primary text-white 
                                     
                                        "
                                                    >

                                                        <HiPencilAlt></HiPencilAlt>
                                                    </button>
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(adminPageAll.id)}
                                                    style={{ width: "35px ", height: '30px', marginLeft: '2px' }}
                                                    className=" rounded border-0 bg-danger text-white
                                       
                                        "
                                                >
                                                    <FaTrashAlt></FaTrashAlt>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </section>
            </div>
            <div className=" mt-5 ">
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={0}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>
        </div>
    );
};

export default AdminPageListAll;



