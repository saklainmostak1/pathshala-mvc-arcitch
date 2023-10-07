'use client'


import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './pageStyle.css';
import { faKey, faSignOutAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import AdminPageList from '../../admin/admin_page_list_create/page';
import { useQuery } from '@tanstack/react-query';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import $ from "jquery";

const AdminSidebar = ({ isSidebarActive }) => {
  useEffect(() => {
    // Initialize Bootstrap components when the component is mounted
    $('[data-toggle="collapse"]').on('click', function () {
      const targetId = $(this).attr('href');
      $(targetId).toggleClass('show');
    });

    return () => {
      // Clean up event listeners when the component is unmounted
      $('[data-toggle="collapse"]').off('click');
    };
  }, []);


  const { data: userss = [], isLoading, refetch } = useQuery({
    queryKey: ['userss'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5002/admin/group-names-id');
      const data = await res.json();
      return data;
    },
  });

  const [clickedButtons, setClickedButtons] = useState([]);

  const handleClick = (index) => {
    const updatedClickedButtons = [...clickedButtons];
    updatedClickedButtons[index] = !updatedClickedButtons[index];
    setClickedButtons(updatedClickedButtons);
  };




  const formatString = (str) => {
    str = str.charAt(0).toUpperCase() + str.slice(1);
    str = str.replace(/_/g, ' ');
    return str;
  };






  return (
    <nav id="sidebar" className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
      <div className="sidebar-header mt-2">
        <div></div>
        <div className="media d-flex">
          <img
            className="rounded-circle mt-2"
            src="https://atik.urbanitsolution.com/web_content/img/user.png"
            alt=""
            width="50"
            height="50"
          />

          <Dropdown>
            <Dropdown.Toggle className='  text-start text-white border-0' variant="none" id="dropdown-basic">
              <div className='sideLine'>
                <h6 className=' mt-1'>পাঠশালা স্কুল এন্ড কলেজ</h6>
                <h6> admin</h6>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className=' mt-2 ms-2'>
              <Dropdown.Item href="https://atik.urbanitsolution.com/Admin/users/users_edit/2">
                <FontAwesomeIcon icon={faUserEdit} />  Edit Profile
              </Dropdown.Item>
              <Dropdown.Item href="https://atik.urbanitsolution.com/Admin/users/change_password/2">
                <FontAwesomeIcon icon={faKey} />  Change Password
              </Dropdown.Item>
              <Dropdown.Item href="https://atik.urbanitsolution.com/Admin/login/logout">
                <FontAwesomeIcon icon={faSignOutAlt} />  Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>





      <ul className="text-white">
        <button className='dashboard p-2 '>
          <Link className='' href='/Admin/dashboard'>Dashboard</Link>
        </button>
        {userss?.map((group, index) => (
          <li key={group?.page_group_id}>
            <button
              className={`dashboard-dropdown ${clickedButtons[index] ? 'clicked' : ''}`}
              onClick={() => handleClick(index)}
            >
              <a
                href={`#${group?.page_group}`}
                data-toggle="collapse"
                aria-expanded="false"
              >
                <div className="d-flex justify-content-between">
                  {formatString(group?.page_group)}
                  <div>
                    {clickedButtons[index] ? <FaAngleDown /> : <FaAngleRight />}
                  </div>
                </div>
              </a>
              <ul className="collapse list-unstyled" style={{ background: '#3b5998' }} id={group?.page_group}>

                <li>
                  {group?.controllers?.map((d, index) => (
                    <div key={d.controller_name}>
                      <a href={`#${group.page_group}-${d.controller_name}`} data-toggle="collapse" aria-expanded="false" className=" border-bottom" >
                        {/* borderBottom */}
                        <div className='d-flex justify-content-between'>
                          {formatString(d.controller_name)}
                          <div>
                            {clickedButtons ? <FaAngleDown /> : <FaAngleRight />}
                          </div>
                        </div>
                      </a>
                      <ul className="collapse list-unstyled " style={{ background: '#314B81' }} id={`${group.page_group}-${d.controller_name}`}>
                        <li>
                          {d.display_names.map((displayName, displayNameIndex) => (
                            // border-bottom1
                            <Link
                              className='border-bottom'
                              key={displayNameIndex}
                              href={`/Admin/admin_page_list/admin_page_list_create?page_group=${group?.page_group}`}
                            >
                              {formatString(displayName)}{' '}
                            </Link>
                          ))}
                        </li>
                      </ul>
                    </div>
                  ))}
                </li>
              </ul>
            </button>
          </li>
        ))}
      </ul>

     
    </nav>
  );
}

export default AdminSidebar;






















{/* <ul className=" text-white">
        {userss?.map((group, index) => (
        
          <button className={`dashboard-dropdown ${clickedButtons[index] ? 'clicked' : ''}`} onClick={() => handleClick(index)} key={group?.page_group_id}>
            <li>
              <a
                href={`#${group?.page_group}`}
                data-toggle="collapse"
                aria-expanded="false"
           
              >
                <div className="d-flex justify-content-between">
                  {formatString(group?.page_group)}
                  <div>
                    {clickedButtons[index] ? <FaAngleDown /> : <FaAngleRight />}
                  </div>
                </div>
              </a>
              <ul className="collapse list-unstyled" style={{ background: '#3b5998' }} id={group?.page_group}>
                <li>
                  {group?.controllers?.map((d) => (
                    <div key={d.controller_name}>
                      <a href={`#${d.controller_name}`} data-toggle="collapse" aria-expanded="false" className=" borderBottom">
                      <div className='d-flex justify-content-between'>
                      {formatString(d.controller_name)}
                        <div>
                    {clickedButtons[index] ? <FaAngleDown /> : <FaAngleRight />}
                  </div>
                      </div>
                      </a>
                      <ul className="collapse list-unstyled " style={{ background: '#314B81' }} id={d.controller_name}>
                        <li>
                          {d.display_names.map((displayName) => (
                            <Link className='border-bottom' key={displayName} href={`/Admin/admin_page_list/admin_page_list_create?page_group=${group?.page_group}`}>{formatString(displayName)} </Link>
                          ))}
                        </li>
                      </ul>
                    </div>
                  ))}
                </li>
              </ul>
            </li>
          </button>
        ))}
      </ul> */}


{/* <ul class="text-white">
  <button class='dashboard p-2 '>
    <a class='' href='/Admin/dashboard'>Dashboard</a>
  </button>
  <li>
    <button class="dashboard-dropdown">
      <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" >
        <div class="d-flex justify-content-between">
          Dummy Heading
          <div>
            <i class="fa fa-angle-right"></i>
          </div>
        </div>
      </a>
      <ul class="collapse list-unstyled"  id="homeSubmenu">
        <li>
          <a href="#homeSubmenu1" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home 1</a>
          <ul class="collapse list-unstyled"  id="homeSubmenu1">
            <li>
              <a href="#homeSubmenu2" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home 1</a>
              <ul class="collapse list-unstyled"  id="homeSubmenu2">
                <li>
                  <a href="#">Submenu 1.1</a>
                </li>
                <li>
                  <a href="#">Submenu 1.2</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </button>
  </li>
  <li>
    <button class="dashboard-dropdown">
      <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Pages</a>
      <ul class="collapse list-unstyled"  id="pageSubmenu">
        <li>
          <a href="#">Page 1</a>
        </li>
        <li>
          <a href="#">Page 2</a>
        </li>
        <li>
          <a href="#">Page 3</a>
        </li>
      </ul>
    </button>
  </li>
  <li>
    <button class="dashboard-dropdown">
      <a href="#">Portfolio</a>
    </button>
  </li>
  <li>
    <button class="dashboard-dropdown">
      <a href="#">Contact</a>
    </button>
  </li>
</ul> */}