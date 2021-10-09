const myForm = document.getElementById("myForm");
const errorMessage = document.getElementById("errorMessage")
const leave = document.querySelector("#logout");

myForm.addEventListener('submit', function(e) {
    e.preventDefault();

    
    let full_name = document.getElementById('full_name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let formData = {

        "full_name" : full_name,
        "email" : email,
        "password" : password
    }

    // let initFormData = []
    // if (localStorage.getItem('users') == null) {
    //     initFormData.push(FormData)
    //     localStorage.setItem('users', JSON.stringify(initFormData))
    // } else {
    //     initFormData = JSON.parse(localStorage.getItem('users'));
    //     initFormData.push(initFormData)
    // }
    // console.log(initFormData);
    // alert('registration successful')
    // window.l


    fetch('https://flexxi-product.herokuapp.com/api/v1/auth/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(formData),
    }).then(function (res) {
        return res.text();
    }).then(function (data) {
        data = JSON.parse(data);
        if (data.error) {
            errorMessage.innerHTML = data.error.password || data.error
            console.log(data.error.password || data.error)
        }else{
            const {token} = data.data.token
            localStorage.setItem('token', token)
            console.log(data.data.token)
            window.location = "images.html"
        }
        return false
    }).catch(function (error) {
        console.log(error)
        return false
    })
})

async function isLoggedIn () {
    const token = store.get('token')
    if (!token) return false
  }

  async function autoRedirect () {
    const validLogin = await isLoggedIn()
    if (!validLogin && location.pathname !== '/login/') redirect('/login')
    if (validLogin && location.pathname === '/login/') redirect('/')
  }

  function logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
  leave.addEventListener("click", () => {
    alert("Logged out")
    window.location.href = "todologin.html"
    });