import AdminPageListEdit from '@/app/(view)/admin/admin_page_list_edit/page';
import React from 'react';

const AdminPageListUpdate = ({params}) => {
    const [id] = params.segments || []    
    console.log(id) 
    return (
        <div>
            <AdminPageListEdit
            id={id}
            ></AdminPageListEdit>
        </div>
    );
};

export default AdminPageListUpdate;