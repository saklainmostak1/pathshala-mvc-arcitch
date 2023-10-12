'use client'
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import '../../../(view)/admin_layout/modal/fa.css'
import { useState } from 'react';
import { useEffect } from 'react';
import IconModal from '../../admin_layout/modal/iconModal/page';

const AdminPageListEdit = ({id}) => {
console.log(id)
    const { data: adminPageListSingle = [], isLoading, refetch } = useQuery({
        queryKey: ['adminPageListSingle'],
        queryFn: async () => {
          const res = await fetch(`http://192.168.0.110:5002/admin/controllerName/${id}`);
          const data = await res.json();
          return data;
        }
      });



  console.log(adminPageListSingle.map(admin => admin.controller_name))
     
      const [controllerName, setControllerName] = useState('');
    
      const handleControllerNameChange = (event) => {
        const newControllerName = event.target.value;
        setControllerName(newControllerName);
      };


    
    return (
        <div>
      {
        adminPageListSingle.map(adminPageList => 
          
          <div class="row border-bottom py-3 px-5" key={adminPageList.id}>
          <div class="w-100">
            <a href="https://atik.urbanitsolution.com/Admin/admin_page_list/admin_page_list_copy/794?page_group=dev" title="Copy" class="text-white btn btn-primary btn-sm" data-toggle="tooltip" data-placement="top"><i class="fas fa-copy"></i></a> 							<a data_admin_page_list="admin_page_list" data_id_admin_page_list="794" id="delete_admin_page_list" title="Delete" class="text-white btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top"><i class="fas fa-trash-alt"></i></a> 						</div>
          <div class="col-md-4">
            <div class="form-group row">
              <label class="col-form-label font-weight-bold col-md-6">Display Name:</label>
              <div class="col-md-6">
                <input type="text" required="" name="display_name[794]" class="form-control form-control-sm required" id="display_name" placeholder="Enter Display Name" value={adminPageList.display_name}/>
                                </div>
              <label class="col-form-label font-weight-bold col-md-6">Controller Name:</label>
              <div class="col-md-6">
                {/* <input type="text" required="" class="form-control form-control-sm required controller_name" id="controller_name" placeholder="Enter Controller Name" 
                   
                   defaultValue={adminPageList.controller_name}/> */}
               {/* <input
              type="text"
              required=""
              class="form-control form-control-sm required controller_name"
              id="controller_name"
              placeholder="Enter Controller Name"
              value={controllerNames[adminPageList.id] || ''}
              onChange={(e) => handleControllerNameChange(e, adminPageList.id)}
            /> */}
                
                   <input
              type="text"
              required=""
              class="form-control form-control-sm required controller_name"
              id="controller_name"
              placeholder="Enter Controller Name"
              defaultValue={controllerName} // Bind value to the state
              onChange={handleControllerNameChange} // Handle changes
            />
                                </div>
              <label class="col-form-label font-weight-bold col-md-6">Method Name:</label>
              <div class="col-md-6">
                <input type="text" name="method_name[794]" class="form-control form-control-sm " id="method_name" placeholder="Enter Method Name" value=""/>
                                </div>
              <label class="col-form-label font-weight-bold col-md-6">Parent Id:</label>
              <div class="col-md-6">
                <input type="number" step="1"  class="form-control form-control-sm "  placeholder="Enter Parent Id" defaultValue={adminPageList.parent_id}/>
                                </div>
              <label class="col-form-label font-weight-bold col-md-6">Menu Type:</label>
              <div class="col-md-6">
              <select required="" name="menu_type[794]" class="form-control form-control-sm  trim" id="menu_type">
                              <option value="0">Non Menu</option>
                              <option value="1" selected="">Menu</option>
                              <option value="2">Setup</option>
                              </select>
                              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group row">
              <label class="col-form-label font-weight-bold col-md-4">Icon:</label>
              <div class="col-md-8">
               <IconModal></IconModal>
                                </div>
              <label class="col-form-label font-weight-bold col-md-4">Btn:</label>
              <div class="col-md-8">
                <input type="text" name="btn[794]" class="form-control form-control-sm " id="btn" placeholder="Enter Btn" value=""/>
                                </div>
              <label class="col-form-label font-weight-bold col-md-4">Default Page:</label>
              <div class="col-md-8">
              <select required="" name="default_page[794]" class="form-control form-control-sm  trim" id="default_page">
                              <option value="0" selected="">Non Default</option>
                              <option value="1">Default</option>
                              </select>
                              </div>
              <label class="col-form-label font-weight-bold col-md-4">Page Group:</label>
              <div class="col-md-8">
                <input type="text" name="page_group[794]" class="form-control form-control-sm page_group" id="page_group" placeholder="Enter Page Group" value="dev"/>
                                </div>
              <label class="col-form-label font-weight-bold col-md-6">Controller Background:</label>
              <div class="col-md-6">
                <input type="color" required="" name="controller_bg[794]" class="form-control form-control-sm required controller_bg" id="controller_bg" placeholder="Enter Controller Background"  /><div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner controller_background" ></div></div><div class="sp-dd">▼</div></div>
                                </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group row">
              <label class="col-form-label font-weight-bold col-md-6">Page Group Icon:</label>
              <div class="col-md-6">
              <IconModal></IconModal>
                                </div>
              <label class="col-form-label font-weight-bold col-md-6">Controller Sort:</label>
              <div class="col-md-6">
              <select required="" name="controller_sort[794]" class="form-control form-control-sm controller_sort trim" id="controller_sort">
                              <option value="1" selected="">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                        
                              </select>
                              </div>
              <label class="col-form-label font-weight-bold col-md-6">Page Group Sort:</label>
              <div class="col-md-6">
              <select required="" name="page_group_sort[794]" class="form-control form-control-sm page_group_sort trim" id="page_group_sort">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                          
                              </select>
                              </div>
              <label class="col-form-label font-weight-bold col-md-6">Method Sort:</label>
              <div class="col-md-6">
              <select required="" name="method_sort[794]" class="form-control form-control-sm method_sort trim" id="method_sort">
                              <option value="0" selected="">0</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                          
                              </select>
                              </div>
              <label class="col-form-label font-weight-bold col-md-6">Controller Color:</label>
              <div class="col-md-6">
                <input type="color" required="" name="controller_color[794]" class="form-control form-control-sm required controller_color" id="controller_color" placeholder="Enter Controller Color" value="#5b0f00" /><div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner controller_text_color" ></div></div><div class="sp-dd">▼</div></div>
                                </div>
            </div>
          </div>
        </div>
          
          )
      }
        






        </div>
    );
};

export default AdminPageListEdit;