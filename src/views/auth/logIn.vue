<template>
  <div class="upper-section">
      <img src="../auth/pics/adoptme.jpeg" alt="Adoptable Cat" />
  </div>
  
  <form @submit.prevent="submitFunction" class=".container">
      <div class="blog-left">
          <div class="blog">
              <h3 id="title">Log In</h3>
              <div class="input">
                  <i class="fa-solid fa-envelope"></i>
                  <input v-model="email" type="email" placeholder="Email" required>
              </div>
              <div class="input">
                  <i class="fa-solid fa-lock"></i>
                  <input v-model="password" type="password" placeholder="Password" required>
              </div>

              <button type="submit" :disabled="isLoading" class="hero-btn red-btn">{{ isLoading ? 'Loading...' : 'login' }}</button>
              <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
              <p class="acc">I dont have an accont. <a href="#">Click Here!</a></p>
              <div class="btn-field">
                  <router-link to="/logIn"><button>Sign Up</button></router-link>
              </div>
          </div>
      </div>
  </form>
</template>
<script setup>

import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue'
import { getDoc, doc } from '@firebase/firestore';
import {db} from '../../firebase'
import router  from '../../router'
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const email = ref('')
const password = ref('')

const submitFunction = async () => {
  isLoading.value = true
  try {
      await signInWithEmailAndPassword(auth, email.value, password.value).then((res) =>  {
              localStorage.setItem("userId", auth.currentUser.uid);
              successMessage.value = 'User login successfully';
          }).catch((err) => { alert(err)});
  } catch (e) {
      alert("something goes wrong")
  }
  try {
    const docRef = doc(db, "pets", localStorage.getItem("userId"));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      localStorage.setItem("userName", docSnap.data().username);
      router.push('/petsList')
    } else {
      alert("please try again");
    }
  } catch (e) {
    alert(e.message);
  }
  isLoading.value = false;
  console.log(auth.currentUser);
}

</script>

<style>
.blog {
  top: 0;
}

.container {
  top: 0;
  margin-top: 1%;
  width: 90%;
  max-width: 450px;
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%, 50%);
  background: #658494;
  padding: 50px 60px 80px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.input {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input i {
  margin-right: 10px;
}

.hero-btn {
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  top: 0;
  border-radius: 5px;
}

.red-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.success-message {
  color: green;
  margin-top: 20px;
}
/*image*/ 
.upper-section {
  text-align: center; /* Center the image horizontally */
  margin-bottom: 10px; /* Add some space between the image and the form */
}

.upper-section img {
  max-width: 100%; /* Ensure the image scales down if it's too large */
  height: auto; /* Maintain aspect ratio */
  border-radius: 20px; /* Optional: round the corners of the image */
}

.acc {
  font-size: 14px;
  color: #030d12;
}
</style>

