import Link from 'next/link';
import React from 'react';

const AdminSubHeader = () => {
    return (
        <div className='sticky-top' >
            <nav style={{ marginTop: '-35px' }} className="navbar  navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid" >
                    <Link className="navbar-brand  text-primary" href="https://atik.urbanitsolution.com/Admin/admin_page_group/admin_page_group_all/system_setup">System Setup</Link>
                    <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#customNavbarCollapse" aria-controls="customNavbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        =
                    </button>
                    <div className="collapse navbar-collapse " id="customNavbarCollapse">
                        <ul className="nav navbar-nav ml-auto ">
                            <li className="nav-item active">
                                <Link className="nav-link" href="#">Page</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#">Page</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#">Page</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#">Page</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default AdminSubHeader;