<template>
  <div class="cat-card">
    <img :src="cat.picLink" :alt="cat.name" class="cat-pic"/>
    <h3 class="cat-name">{{ cat.name }}</h3>
    <h3 class="cat-gender">{{ cat.gender }}</h3>
    <h3 class="cat-age">{{ cat.age }}</h3>
    <h3 class="cat-race">{{ cat.race }}</h3>
    <button v-if="!catIsAdopted" @click.prevent="adoptCat" class="adopt-button">I love this cat, I want it to adopt me</button>
    <h3 v-if="catIsAdopted" class="adopted-button">This cat is adopted</h3>
  </div>
  <div v-show="showContacts" class="contact-modal">
    <div class="contact-content">
      <h3>There are the contacts of the owner, please give them a call</h3>
      <p>{{ cat.ownerContact }}</p>
      <router-link to="/home">Go back to the home page</router-link>
    </div>
  </div>
</template>

<style scoped>
.cat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  background-color: white;
}

.cat-pic {
  width: 100%;
  border-radius: 10px;
}

.cat-name,
.cat-gender,
.cat-age,
.cat-race {
  margin: 10px 0;
  font-family: 'Arial, sans-serif';
  color: #333;
}

.adopt-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.adopt-button:hover {
  background-color: #ff4500;
}

.contact-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 1000; /* Ensure it is on top of other elements */
}

.contact-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 80%;
}

.contact-content h3,
.contact-content p {
  margin: 10px 0;
}

.contact-content a {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.contact-content a:hover {
  background-color: #0056b3;
}
</style>

<script setup>
import { getDoc, doc, setDoc } from '@firebase/firestore'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../firebase'
import { ref } from 'vue'

const route = useRoute()
const catId = route.params.id
const cat = ref({})
const catIsAdopted = ref(null)
const showContacts = ref(false)

const adoptCat = () => {
  showContacts.value = true
  catIsAdopted.value = true
  setDoc(doc(db, 'pets',catId), {
    isAdopted: true,
  }, {merge: true})
}

onMounted( async () => {
  console.log(catIsAdopted)
  const res = await getDoc(doc(db, 'pets', catId))
  if (res.exists()) {
    cat.value = res.data()
    catIsAdopted.value = cat.value.isAdopted
  }
})


</script>

