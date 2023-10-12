'use client'
import '../../../globals.css'
import { Image } from "react-bootstrap";
import handleLogin from "../auth";
// import { useRouter } from "next/navigation";



// import { useRouter } from 'next/navigation'

const Login1 = () => {


   
 
    return (
        <section className=" gradient-form gradient-custom" >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4 p-lg-5 mx-lg-4 p-4">

                                        <div className="text-center">
                                            <Image src="https:mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                style={{ width: "185px" }} alt="logo" />
                                            <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                                        </div>

                                        <form onSubmit={handleLogin}>
                                            <h2 className='text-center mb-5'>LogIn</h2>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" >Email</label>
                                                <input
                                                    type="email"
                                                    name="email"

                                                    id="form2Example11" className="form-control"
                                                    placeholder="Phone number or email address" />

                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" >Password</label>
                                                <input
                                                    placeholder='Password'
                                                    type="password"
                                                    name="password"
                                                    id="form2Example22" className="form-control" />
                                            </div>
                                            <a className="text-muted" href="#!">Forgot password?</a>

                                            <div className="text-center pt-1 mb-5 pb-1 mt-2">

                                                <input
                                                    className="btn w-75 btn-outline-success px-5 py-2 mt-2" type="submit" value="Login" />

                                            </div>



                                        </form>


                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex  align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">We are more than just a company</h4>
                                        <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login1;
