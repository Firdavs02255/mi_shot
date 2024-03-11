import { openModal, closeModal } from "./modals";
import { getData } from "./api";
import { use } from "marked";

export const authFunc = () => {
  const authBtn = document.getElementById("open-auth-btn");
  const modal = document.getElementById("auth-modal");
  const closeBtn = document.querySelectorAll(".close-btn");
  const loginBtn = document.querySelector(".login-btn");
  const opencartBtn = document.getElementById("open-cart-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const cartModal = document.getElementById("cart-modal");

  const login = () => {
    authBtn.classList.add("d-none");
    opencartBtn.classList.remove("d-none");
    logoutBtn.classList.remove("d-none");
    closeModal(modal);
  };

  const logout = () => {
    authBtn.classList.remove("d-none");
    opencartBtn.classList.add("d-none");
    logoutBtn.classList.add("d-none");
  };

  const checkAuth = () => {
     const user = JSON.parse(localStorage.getItem("auth"))

     if(user){
    getData('/profile').then((data) => {
      if(
        (data.login && data.login === user.login) && 
        (data.password && data.password === user.password)
        ) {
          login();
        }
      })
    }
  };

  authBtn.addEventListener("click", () => {
   openModal(modal)
  });

  closeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
     closeModal(modal)
    });
  });

  loginBtn.addEventListener("click", () => {
    const loginInput = modal.querySelector("#login-control");
    const passwordInput = modal.querySelector("#password-control");

    const user = {
      login: loginInput.value,
      password: passwordInput.value,
    };

    getData('/profile').then((data) => {
      if(
        (data.login && data.login === user.login) && 
        (data.password && data.password === user.password)
        ) {
          localStorage.setItem("auth", JSON.stringify(data));
          login();
        }else{
          alert('no');
        }
    })

 
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("auth");

    logout();
  });


  checkAuth();
};
