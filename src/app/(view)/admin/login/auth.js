// 'use client'

// const handleSubmit = async (email, password) => {

//     const loginDb = {
//         email, password
//     }

//     try {
//         const response = await fetch('http://localhost:5002/login', {
            
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(loginDb),
//         });
//         console.log(response)
        
//         if (response.ok) {
      
//             console.log('Handle successful login');
//             console.log(loginDb)
//         } else {
//             console.log('Handle login error');
//         }
//     } catch (error) {
//         console.error('Login failed:', error);
//     }
// }

// export default handleSubmit



'use client'



const handleSubmit = async (event) => {
    event?.preventDefault();
    const form = event?.target;
    const email = form?.email?.value;
    const password = form?.password?.value;
    const loginDb = {
        email, password
    }

    try {
        const response = await fetch('http://localhost:5002/login', {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginDb),
        });
        console.log(response)
        
        if (response.ok) {
       
            window.location.href = '/';
            console.log('Handle successful login');
            console.log(loginDb)
        } else {
            console.log('Handle login error');
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
}

export default handleSubmit



