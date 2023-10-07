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
            const res = await fetch(`http://localhost:5002/admin/allAdmin`)

            const data = await res.json()
            return data
        }
    })

    console.log(users, 'nayan')

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

    const pageCount = Math.ceil(users?.length / itemsPerPage);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const slicedItems = users?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // paigination end

    
    const handleDelete = (id) => {
        const userToDelete = users.find((user) => user.id === id);
      
        if (!userToDelete) {
          alert('User not found.');
          return;
        }
      
        if (userToDelete.parent_id === 0) {
          alert('Cannot delete this is running');
          return;
        }
      
        const proceed = window.confirm('Are you sure you want to delete?');
        
        if (proceed) {
          fetch(`http://localhost:5002/admin/allAdmin/${id}`, {
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
            });
        }
      };



    return (
        <div className='p-3'>

            <div className=" mx-auto">
                <section className=" border  rounded mx-auto">
                    <li className="list-group-item text-light  p-1 px-4" aria-current="true" style={{ background: '#4267b2' }}>
                        <div className='d-flex justify-content-between'>
                            <h5 > Users List</h5>
                            <button style={{ background: '#17a2b8' }} className='border-0 text-white shadow-sm rounded-1'><Link href='/AdminController/CreateUsersController'>Create Users</Link></button>
                        </div>
                    </li>
                    <Table responsive="lg">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Display Name</th>
                                <th>Controller Name</th>
                                <th>Method Name</th>
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
                                                {adminPageAll.method_name}
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
                                                <Link href={`/AdminController/UserPageListController/update/${adminPageAll.id}`}>

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



