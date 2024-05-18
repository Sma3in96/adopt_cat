<template>
  <form @submit.prevent="submitFunction" class="pet-form">
    <div class="form-group">
      <label for="name">Pet Name</label>
      <input type="text" id="name" placeholder="Enter your pet name" v-model="name" />
    </div>
    <div>
      <label for="picture"> Upload a picture of your cat </label>
      <input type="file" id="file" placeholder="insert a picture" @change="handleUpload">
    </div>
    <div class="form-group">
      <label for="gender">Pet Gender</label>
      <input type="text" id="gender" placeholder="Enter its gender" v-model="gender" />
    </div>
    <div class="form-group">
      <label for="race">Pet Race</label>
      <input type="text" id="race" placeholder="Enter its race" v-model="race"/>
    </div>
    <div class="form-group">
      <label for="age">Pet Age</label>
      <input type="text" id="age" placeholder="Enter the age" v-model="age"/>
    </div>
    <div class="form-group">
      <label for="ownerContact">Pet Owner Contact</label>
      <input type="text" id="ownerContact" placeholder="Enter your phone" v-model="ownerContact" />
    </div>
    <div class="form-group">
      <input type="submit" value="Submit">
    </div>
  </form>
</template>
<script setup>
  import { ref } from 'vue';
  import { db } from '../firebase.js'
  import { doc, setDoc} from 'firebase/firestore'
  import { ref as stRef, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { storage } from '../firebase.js'
  import  router  from '../router.js'


  const name = ref('');
  const gender = ref('');
  const race = ref('');
  const age = ref(0);
  const ownerContact = ref('');
  const file = ref(null);
  const pic_link = ref('');


  const handleUpload = (e) => {
    file.value = e.target.files[0];
  }

  const submitFunction = async () => {
    if (file.value) {
      const storageRef = stRef(storage, `uploads/${file.value.name}`);
      const uploadTask = await uploadBytes(storageRef, file.value);
      const url = await getDownloadURL(uploadTask.ref);
      pic_link.value = url;
      }
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const docRef = doc(db, 'pets', userId);
    setDoc(docRef, {
      name: name.value,
      gender: gender.value,
      race: race.value,
      age: age.value,
      ownerUsername: userName,
      ownerContact: ownerContact.value,
      picLink: pic_link.value,
    })
    router.push('petsList')
  }
</script>
<style>
.pet-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.pet-form .form-group {
  margin-bottom: 15px;
}

.pet-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.pet-form input[type="text"] {
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.pet-form input[type="submit"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.pet-form input[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
